// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hfxjekxcobclpocxzepa.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmeGpla3hjb2JjbHBvY3h6ZXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNjU2NzEsImV4cCI6MjA1Njc0MTY3MX0.zWFKTsRuSNRACclyIMP5njy-PkRFW79oevuNqu1NOy4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);