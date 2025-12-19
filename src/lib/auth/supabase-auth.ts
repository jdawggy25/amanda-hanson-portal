/**
 * Supabase Auth Utilities
 *
 * Server-side authentication using Supabase Auth with cookie-based sessions.
 * Uses email whitelist for access control.
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import type { AstroCookies } from 'astro';
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Get allowed admin emails from environment variable
 * Expects comma-separated list: "admin@example.com,user@example.com"
 */
export function getAllowedAdminEmails(): string[] {
  const emails = import.meta.env.ADMIN_EMAILS || process.env.ADMIN_EMAILS || '';
  return emails
    .split(',')
    .map((e: string) => e.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Check if an email is authorized to access admin
 */
export function isAuthorizedAdmin(email: string | undefined): boolean {
  if (!email) return false;
  const allowed = getAllowedAdminEmails();
  // If no emails configured, deny all access
  if (allowed.length === 0) return false;
  return allowed.includes(email.toLowerCase());
}

/**
 * Create a Supabase client for server-side auth with cookie handling
 */
export function createSupabaseServerClient(cookies: AstroCookies): SupabaseClient {
  const supabaseUrl = import.meta.env.SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY environment variables are required');
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(key: string) {
        return cookies.get(key)?.value;
      },
      set(key: string, value: string, options: CookieOptions) {
        cookies.set(key, value, {
          path: options.path || '/',
          maxAge: options.maxAge,
          domain: options.domain,
          secure: options.secure,
          httpOnly: options.httpOnly,
          sameSite: options.sameSite as 'strict' | 'lax' | 'none' | undefined,
        });
      },
      remove(key: string, options: CookieOptions) {
        cookies.delete(key, {
          path: options.path || '/',
        });
      },
    },
  });
}

/**
 * Get the current user session
 */
export async function getSession(cookies: AstroCookies) {
  const supabase = createSupabaseServerClient(cookies);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

/**
 * Get the current user
 */
export async function getUser(cookies: AstroCookies) {
  const supabase = createSupabaseServerClient(cookies);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Check if user is authenticated AND authorized (email in whitelist)
 */
export async function checkAuth(cookies: AstroCookies): Promise<{
  authenticated: boolean;
  authorized: boolean;
  email: string | null;
  user: Awaited<ReturnType<typeof getUser>> | null;
}> {
  try {
    const user = await getUser(cookies);

    if (!user) {
      return {
        authenticated: false,
        authorized: false,
        email: null,
        user: null,
      };
    }

    const email = user.email || null;

    return {
      authenticated: true,
      authorized: isAuthorizedAdmin(email),
      email,
      user,
    };
  } catch (error) {
    console.error('Auth check error:', error);
    return {
      authenticated: false,
      authorized: false,
      email: null,
      user: null,
    };
  }
}

/**
 * Sign in with email and password
 */
export async function signIn(
  cookies: AstroCookies,
  email: string,
  password: string
): Promise<{
  success: boolean;
  error: string | null;
  authorized: boolean;
}> {
  const supabase = createSupabaseServerClient(cookies);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      error: error.message,
      authorized: false,
    };
  }

  if (!data.user) {
    return {
      success: false,
      error: 'No user returned',
      authorized: false,
    };
  }

  // Check if user's email is authorized
  const authorized = isAuthorizedAdmin(data.user.email);

  if (!authorized) {
    // Sign out the user since they're not authorized
    await supabase.auth.signOut();
    return {
      success: false,
      error: 'Your email is not authorized to access the admin area',
      authorized: false,
    };
  }

  return {
    success: true,
    error: null,
    authorized: true,
  };
}

/**
 * Sign out the current user
 */
export async function signOut(cookies: AstroCookies): Promise<void> {
  const supabase = createSupabaseServerClient(cookies);
  await supabase.auth.signOut();
}
