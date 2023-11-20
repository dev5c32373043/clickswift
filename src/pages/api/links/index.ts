import type { APIRoute } from 'astro';
import * as sentry from '@sentry/astro';

import { nanoid } from 'nanoid';
import { supabase } from '@/lib/supabase';
import { jsonResp, errResp } from '@/utils/astro-utils';
import { LinkCreatePayloadDto } from '@/dto';

export const GET: APIRoute = async ({ locals: { user } }) => {
  const { data, error } = await supabase
    .from('savvy_links')
    .select()
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    sentry.captureException(error);
    return errResp(error.message);
  }

  return jsonResp(data);
};

export const POST: APIRoute = async ({ request, locals: { user } }) => {
  const result = LinkCreatePayloadDto.safeParse(await request.json());
  if (result.success === false) {
    return errResp(result.error, 400);
  }

  const payload = { ...result.data, user_id: user.id, short_code: nanoid(11) };
  const { error, data } = await supabase.from('savvy_links').insert(payload).select().single();
  if (error) {
    sentry.captureException(error);
    return errResp(error.message);
  }

  return jsonResp(data);
};
