import type {
  TransformedTask,
  SprintMetrics,
  EpicWithTasks,
  EpicInfo,
  ActivityItem
} from './types';

/**
 * Calculate sprint metrics from tasks
 */
export function calculateSprintMetrics(tasks: TransformedTask[]): SprintMetrics {
  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const doneTasks = tasks.filter(t => t.status === 'done');

  const sumPoints = (arr: TransformedTask[]) => arr.reduce((sum, t) => sum + (t.storyPoints || 0), 0);

  const totalPoints = sumPoints(tasks);
  const todoPoints = sumPoints(todoTasks);
  const inProgressPoints = sumPoints(inProgressTasks);
  const donePoints = sumPoints(doneTasks);

  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((doneTasks.length / totalTasks) * 100) : 0;
  const pointsCompletionPercentage = totalPoints > 0 ? Math.round((donePoints / totalPoints) * 100) : 0;

  return {
    totalTasks,
    totalPoints,
    todoTasks: todoTasks.length,
    todoPoints,
    inProgressTasks: inProgressTasks.length,
    inProgressPoints,
    doneTasks: doneTasks.length,
    donePoints,
    completionPercentage,
    pointsCompletionPercentage,
  };
}

/**
 * Group tasks by their epic
 */
export function groupTasksByEpic(tasks: TransformedTask[]): EpicWithTasks[] {
  const epicMap = new Map<string | null, TransformedTask[]>();

  // Group tasks by epic key (null for tasks without epic)
  for (const task of tasks) {
    const epicKey = task.epic?.key ?? null;
    if (!epicMap.has(epicKey)) {
      epicMap.set(epicKey, []);
    }
    epicMap.get(epicKey)!.push(task);
  }

  // Convert to array with metrics
  const result: EpicWithTasks[] = [];

  for (const [epicKey, epicTasks] of epicMap) {
    const epic = epicKey ? epicTasks[0].epic : null;
    const doneTasks = epicTasks.filter(t => t.status === 'done');
    const totalPoints = epicTasks.reduce((sum, t) => sum + (t.storyPoints || 0), 0);
    const donePoints = doneTasks.reduce((sum, t) => sum + (t.storyPoints || 0), 0);

    result.push({
      epic,
      tasks: epicTasks,
      metrics: {
        totalTasks: epicTasks.length,
        totalPoints,
        doneTasks: doneTasks.length,
        donePoints,
        completionPercentage: epicTasks.length > 0
          ? Math.round((doneTasks.length / epicTasks.length) * 100)
          : 0,
      },
    });
  }

  // Sort: epics with work remaining first, then by completion %
  return result.sort((a, b) => {
    // Tasks without epic go last
    if (!a.epic && b.epic) return 1;
    if (a.epic && !b.epic) return -1;

    // Sort by completion (incomplete first)
    return a.metrics.completionPercentage - b.metrics.completionPercentage;
  });
}

/**
 * Generate activity feed from tasks
 */
export function generateActivityFeed(tasks: TransformedTask[], limit = 20): ActivityItem[] {
  const activities: ActivityItem[] = [];

  for (const task of tasks) {
    // Add task creation as activity
    activities.push({
      id: `created-${task.key}`,
      type: 'created',
      taskKey: task.key,
      taskSummary: task.summary,
      actor: task.assignee || 'Unknown',
      actorAvatar: task.assigneeAvatar,
      content: `Created ${task.issueType.toLowerCase()}`,
      timestamp: task.created,
    });

    // Add comments as activity
    for (const comment of task.comments) {
      activities.push({
        id: `comment-${comment.id}`,
        type: 'comment',
        taskKey: task.key,
        taskSummary: task.summary,
        actor: comment.author,
        actorAvatar: comment.authorAvatar,
        content: comment.body.length > 100 ? comment.body.slice(0, 100) + '...' : comment.body,
        timestamp: comment.created,
      });
    }
  }

  // Sort by timestamp (most recent first) and limit
  return activities
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, limit);
}

/**
 * Get unique labels from all tasks
 */
export function getUniqueLabels(tasks: TransformedTask[]): string[] {
  const labels = new Set<string>();
  for (const task of tasks) {
    for (const label of task.labels) {
      labels.add(label);
    }
  }
  return Array.from(labels).sort();
}

/**
 * Get unique components from all tasks
 */
export function getUniqueComponents(tasks: TransformedTask[]): string[] {
  const components = new Set<string>();
  for (const task of tasks) {
    for (const component of task.components) {
      components.add(component);
    }
  }
  return Array.from(components).sort();
}

/**
 * Get unique assignees from all tasks
 */
export function getUniqueAssignees(tasks: TransformedTask[]): string[] {
  const assignees = new Set<string>();
  for (const task of tasks) {
    if (task.assignee) {
      assignees.add(task.assignee);
    }
  }
  return Array.from(assignees).sort();
}

/**
 * Get unique epics from all tasks
 */
export function getUniqueEpics(tasks: TransformedTask[]): EpicInfo[] {
  const epicMap = new Map<string, EpicInfo>();
  for (const task of tasks) {
    if (task.epic && !epicMap.has(task.epic.key)) {
      epicMap.set(task.epic.key, task.epic);
    }
  }
  return Array.from(epicMap.values()).sort((a, b) => a.summary.localeCompare(b.summary));
}

/**
 * Filter tasks by criteria
 */
export interface FilterCriteria {
  epicKey?: string | null;
  labels?: string[];
  components?: string[];
  assignee?: string | null;
  priority?: string;
  status?: 'todo' | 'in-progress' | 'done';
}

export function filterTasks(tasks: TransformedTask[], filters: FilterCriteria): TransformedTask[] {
  return tasks.filter(task => {
    // Filter by epic
    if (filters.epicKey !== undefined) {
      if (filters.epicKey === null && task.epic !== null) return false;
      if (filters.epicKey !== null && task.epic?.key !== filters.epicKey) return false;
    }

    // Filter by labels (any match)
    if (filters.labels?.length) {
      const hasMatchingLabel = filters.labels.some(l => task.labels.includes(l));
      if (!hasMatchingLabel) return false;
    }

    // Filter by components (any match)
    if (filters.components?.length) {
      const hasMatchingComponent = filters.components.some(c => task.components.includes(c));
      if (!hasMatchingComponent) return false;
    }

    // Filter by assignee
    if (filters.assignee !== undefined) {
      if (task.assignee !== filters.assignee) return false;
    }

    // Filter by priority
    if (filters.priority && task.priority !== filters.priority) return false;

    // Filter by status
    if (filters.status && task.status !== filters.status) return false;

    return true;
  });
}
