const { writeFileSync } = require('fs');
const path = require('path');
require('dotenv').config({ path: `${__dirname}/../.env.local` });

const main = async () => {
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  const { data, error } = await supabase
    .from('links')
    .select('redirectpath, url');

  if (error) {
    console.error('Supabase error:', error);
    process.exit(1);
  }

  const redirects = (data ?? []).reduce((acc, { redirectpath, url }) => {
    return `${acc}/${redirectpath} ${url}\n`;
  }, '');

  writeFileSync(path.resolve(__dirname, '../out/_redirects'), redirects);
  console.log('_redirects written successfully');
};

main();