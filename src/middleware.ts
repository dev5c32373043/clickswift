import { defineMiddleware } from 'astro:middleware';
import { supabase } from '@/lib/supabase';
import * as sentry from '@sentry/astro';

function publicRoute(url) {
  const { pathname } = url;

  const publicPages = ['/', '/login', '/signup'].includes(pathname);
  const authRoutes = pathname.startsWith('/api/auth/');
  const linkRedirect = pathname.startsWith('/l/');

  return publicPages || authRoutes || linkRedirect;
}

export const onRequest = defineMiddleware(async (ctx, next) => {
  if (publicRoute(ctx.url)) return next();

  const access_token = ctx.cookies.get('sb-access-token')?.value ?? ctx.request.headers.get('sb-access-token');
  const refresh_token = ctx.cookies.get('sb-refresh-token')?.value ?? ctx.request.headers.get('sb-refresh-token');
  if (!access_token || !refresh_token) {
    return Response.redirect(new URL('/login', ctx.url), 302);
  }

  const { data, error } = await supabase.auth.setSession({ refresh_token, access_token });

  if (error) {
    sentry.captureException(error);
    ctx.cookies.delete('sb-access-token', { path: '/' });
    ctx.cookies.delete('sb-refresh-token', { path: '/' });

    return ctx.redirect('/login');
  }

  ctx.locals.user = data.user;

  return next();
});
