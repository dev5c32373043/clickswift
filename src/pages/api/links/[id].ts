import type { APIRoute } from 'astro';
import * as sentry from '@sentry/astro';

import { supabase } from '@/lib/supabase';
import { jsonResp, errResp } from '@/utils/astro-utils';

export const DELETE: APIRoute = async ({ params, locals: { user } }) => {
  const id = params.id && parseInt(params.id, 10);
  if (!Number.isInteger(id)) return errResp('Incorrect id', 400);

  const { error } = await supabase.from('savvy_links').delete().eq('id', id).eq('user_id', user.id);
  if (error) {
    sentry.captureException(error);
    return errResp(error.message);
  }

  return jsonResp({ ok: true });
};
