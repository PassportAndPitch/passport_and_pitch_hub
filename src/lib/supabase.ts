import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://gypxgbcsdaxdebxlzhtp.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImIyNWJjYjYxLTZkYmEtNGY5ZC04MzA2LTVlMmI3Yzc5NzBmMSJ9.eyJwcm9qZWN0SWQiOiJneXB4Z2Jjc2RheGRlYnhsemh0cCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc4OTg2MjAwLCJleHAiOjIwOTQzNDYyMDAsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.S13vc0wzLg0gO50hVWOeUbHH-Z6y5q1je7e_DXE_Cqs';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };