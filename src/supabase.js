import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zlygoyqdnayoaikgqohn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpseWdveXFkbmF5b2Fpa2dxb2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2MTI4NzQsImV4cCI6MjAyMTE4ODg3NH0.-R9V_eWwocHLSMMFG16aJbM13nJ1N8jO4wgCyvjtjYA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
