// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tnhpvlljhcbwegkoirzs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuaHB2bGxqaGNid2Vna29pcnpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NTI2NTAsImV4cCI6MjA1ODAyODY1MH0.nNRo7xXPDks38fnDuH9MzORGGFSshZS9H5SUFW1eClE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);