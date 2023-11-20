import type { APIRoute } from 'astro';
import * as sentry from '@sentry/astro';

import { supabase } from '@/lib/supabase';
import { errResp } from '@/utils/astro-utils';

export const GET: APIRoute = async ({ url, params, redirect }) => {
  const { short_code } = params;
  if (!short_code) return errResp('Link not found or expired', 404);

  const { data, error } = await supabase
    .from('savvy_links')
    .select('id, click_count, click_limit, original_url, passcode')
    .eq('short_code', short_code)
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    sentry.captureException(error);
    return errResp('No link forwarding today 😅', 500);
  }

  if (!data) return errResp('Link not found or expired', 404);

  const { click_count, click_limit } = data;
  if (click_limit > 0 && click_count >= click_limit) return errResp('Link not found or expired', 404);

  const userPasscode = url.searchParams.get('passcode');
  const accessGranted = !data.passcode || userPasscode === data.passcode;
  if (!accessGranted) {
    let url = `/l/${short_code}/auth`;

    if (userPasscode?.length > 0) {
      url += '?guessing=1';
    }

    return redirect(url);
  }

  const resp = await supabase.rpc('inc_click_count', { row_id: data.id });
  if (resp.error) {
    sentry.captureException(resp.error);
  }

  return redirect(data.original_url);
};
