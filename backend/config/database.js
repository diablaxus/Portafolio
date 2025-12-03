import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: SUPABASE_URL y SUPABASE_KEY son requeridas en .env');
    process.exit(1);
}

export const supabase = createClient(supabaseUrl, supabaseKey);

console.log('✅ Cliente de Supabase inicializado correctamente');