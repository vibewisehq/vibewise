// src/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

// Replace these with your project's details from https://app.supabase.com/project/YOUR_PROJECT_NAME/api
const supabaseUrl = "https://bzicauqmlhxiaaklzdxu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6aWNhdXFtbGh4aWFha2x6ZHh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2ODAzNjAsImV4cCI6MjA2NzI1NjM2MH0.14xEOjaLgdh5QEKAw76EQTZRBoRWrMWQtGkPAEmlCj8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
