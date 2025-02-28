import { createClient } from "@supabase/supabase-js";
// import * as dotenv from 'dotenv';
// dotenv.config();
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_KEY)
export default supabase
