import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const supabaseServer = createServerComponentClient({ cookies });

export const supabaseAction = createServerActionClient({ cookies });

export default supabase;
