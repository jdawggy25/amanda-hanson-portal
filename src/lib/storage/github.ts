/**
 * GitHub API Client for Committing Generated Reports
 *
 * Commits markdown files directly to the repository via GitHub API.
 */

interface GitHubConfig {
  token: string;
  repo: string; // format: owner/repo
  branch: string;
}

interface GitHubFile {
  path: string;
  content: string;
  message: string;
}

interface GitHubCommitResult {
  success: boolean;
  sha?: string;
  url?: string;
  error?: string;
}

/**
 * Get GitHub configuration from environment
 */
function getGitHubConfig(): GitHubConfig {
  const token = import.meta.env.GITHUB_TOKEN || process.env.GITHUB_TOKEN;
  const repo = import.meta.env.GITHUB_REPO || process.env.GITHUB_REPO;
  const branch = import.meta.env.GITHUB_BRANCH || process.env.GITHUB_BRANCH || 'main';

  if (!token || !repo) {
    throw new Error('GITHUB_TOKEN and GITHUB_REPO environment variables are required');
  }

  return { token, repo, branch };
}

/**
 * Get the SHA of a file (needed for updates)
 */
async function getFileSha(
  config: GitHubConfig,
  path: string
): Promise<string | null> {
  const url = `https://api.github.com/repos/${config.repo}/contents/${path}?ref=${config.branch}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (response.status === 404) {
      return null; // File doesn't exist
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return data.sha;
  } catch (error) {
    console.error(`Failed to get file SHA: ${(error as Error).message}`);
    return null;
  }
}

/**
 * Commit a single file to the repository
 */
export async function commitFile(file: GitHubFile): Promise<GitHubCommitResult> {
  const config = getGitHubConfig();

  // Get existing file SHA if updating
  const existingSha = await getFileSha(config, file.path);

  // Encode content to base64
  const contentBase64 = Buffer.from(file.content, 'utf8').toString('base64');

  const url = `https://api.github.com/repos/${config.repo}/contents/${file.path}`;

  const body: Record<string, string> = {
    message: file.message,
    content: contentBase64,
    branch: config.branch,
  };

  if (existingSha) {
    body.sha = existingSha;
  }

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      sha: data.commit.sha,
      url: data.content.html_url,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}

/**
 * Commit multiple files in a single commit
 */
export async function commitFiles(
  files: GitHubFile[],
  commitMessage: string
): Promise<GitHubCommitResult> {
  const config = getGitHubConfig();

  try {
    // Step 1: Get the latest commit SHA for the branch
    const refUrl = `https://api.github.com/repos/${config.repo}/git/ref/heads/${config.branch}`;
    const refResponse = await fetch(refUrl, {
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!refResponse.ok) {
      throw new Error(`Failed to get branch ref: ${refResponse.status}`);
    }

    const refData = await refResponse.json();
    const latestCommitSha = refData.object.sha;

    // Step 2: Get the tree SHA from the latest commit
    const commitUrl = `https://api.github.com/repos/${config.repo}/git/commits/${latestCommitSha}`;
    const commitResponse = await fetch(commitUrl, {
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!commitResponse.ok) {
      throw new Error(`Failed to get commit: ${commitResponse.status}`);
    }

    const commitData = await commitResponse.json();
    const baseTreeSha = commitData.tree.sha;

    // Step 3: Create blobs for each file
    const treeItems = await Promise.all(
      files.map(async (file) => {
        const blobUrl = `https://api.github.com/repos/${config.repo}/git/blobs`;
        const blobResponse = await fetch(blobUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${config.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: file.content,
            encoding: 'utf-8',
          }),
        });

        if (!blobResponse.ok) {
          throw new Error(`Failed to create blob for ${file.path}`);
        }

        const blobData = await blobResponse.json();
        return {
          path: file.path,
          mode: '100644',
          type: 'blob',
          sha: blobData.sha,
        };
      })
    );

    // Step 4: Create a new tree
    const treeUrl = `https://api.github.com/repos/${config.repo}/git/trees`;
    const treeResponse = await fetch(treeUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree: treeItems,
      }),
    });

    if (!treeResponse.ok) {
      throw new Error(`Failed to create tree: ${treeResponse.status}`);
    }

    const treeData = await treeResponse.json();

    // Step 5: Create a new commit
    const newCommitUrl = `https://api.github.com/repos/${config.repo}/git/commits`;
    const newCommitResponse = await fetch(newCommitUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: commitMessage,
        tree: treeData.sha,
        parents: [latestCommitSha],
      }),
    });

    if (!newCommitResponse.ok) {
      throw new Error(`Failed to create commit: ${newCommitResponse.status}`);
    }

    const newCommitData = await newCommitResponse.json();

    // Step 6: Update the branch reference
    const updateRefUrl = `https://api.github.com/repos/${config.repo}/git/refs/heads/${config.branch}`;
    const updateRefResponse = await fetch(updateRefUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sha: newCommitData.sha,
      }),
    });

    if (!updateRefResponse.ok) {
      throw new Error(`Failed to update branch ref: ${updateRefResponse.status}`);
    }

    return {
      success: true,
      sha: newCommitData.sha,
      url: `https://github.com/${config.repo}/commit/${newCommitData.sha}`,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}

/**
 * Check if GitHub API is configured and accessible
 */
export async function checkGitHubAccess(): Promise<{ configured: boolean; accessible: boolean; error?: string }> {
  try {
    const config = getGitHubConfig();

    const response = await fetch(`https://api.github.com/repos/${config.repo}`, {
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (response.ok) {
      return { configured: true, accessible: true };
    }

    return {
      configured: true,
      accessible: false,
      error: `HTTP ${response.status}: ${response.statusText}`,
    };
  } catch (error) {
    if ((error as Error).message.includes('environment variables')) {
      return { configured: false, accessible: false };
    }
    return {
      configured: true,
      accessible: false,
      error: (error as Error).message,
    };
  }
}
