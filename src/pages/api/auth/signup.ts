import type { APIRoute } from 'astro';

import { supabase } from '@/lib/supabase';
import { jsonResp, errResp } from '@/utils/astro-utils';
import { UserCredentialsDto } from '@/dto';

export const POST: APIRoute = async ({ request }) => {
  const result = UserCredentialsDto.safeParse(await request.json());
  if (result.success === false) {
    return errResp('Email and password should be secure!', 400);
  }

  const { email, password } = result.data;
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) return errResp(error.message);

  return jsonResp({ ok: true });
};
