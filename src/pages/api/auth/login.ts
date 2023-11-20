import type { APIRoute } from 'astro';

import { supabase } from '@/lib/supabase';
import { jsonResp, errResp } from '@/utils/astro-utils';
import { UserCredentialsDto } from '@/dto';

export const POST: APIRoute = async ({ request, cookies }) => {
  const result = UserCredentialsDto.safeParse(await request.json());
  if (result.success === false) {
    return errResp('Wrong Email or password', 400);
  }

  const { email, password } = result.data;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return errResp(error.message, error.status);

  const { access_token, refresh_token } = data.session;
  cookies.set('sb-access-token', access_token, { path: '/' });
  cookies.set('sb-refresh-token', refresh_token, { path: '/' });

  return jsonResp({ ok: true });
};
