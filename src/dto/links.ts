import { z as t } from 'zod';

export const LinkCreatePayloadDto = t.object({
  name: t.string(),
  original_url: t.string(),
  click_limit: t.optional(t.number().int()),
  passcode: t.optional(t.string())
});
