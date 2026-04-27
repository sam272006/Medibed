import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lnxjcipgbssqdefgevjy.supabase.co';
const supabaseAnonKey = 'sb_publishable_ZxLLBM7eImGquz-j-CVzvQ_b-do2inB';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testLogin() {
    const { data, error } = await supabase
        .from("admins")
        .select("*")
        .eq("username", "admin")
        .eq("password", "admin123")
        .single();
    
    console.log("Data:", data);
    console.log("Error:", error);
}

testLogin();
