/**
 * POST /admin/api/auth/logout
 *
 * Handle logout via Supabase Auth.
 */

import type { APIRoute } from 'astro';
import { signOut } from '../../../../lib/auth/supabase-auth';

export const POST: APIRoute = async ({ cookies, redirect }) => {
  try {
    await signOut(cookies);
    return redirect('/admin');
  } catch (error) {
    console.error('Logout error:', error);
    // Still redirect even on error
    return redirect('/admin');
  }
};
