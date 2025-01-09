import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const data = {
  email: 'assanali.tungat@aneko.io',
};

const result = schema.safeParse(data);

console.log(JSON.stringify(result, null, 2));
