const { writeFileSync } = require('fs');
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config({path: `${__dirname}/../.env.local`});

const linksQuery = `{
  linkCollection {
    items {
      redirectPath
      url
    }
  }
}`;

const main = async () => {
  const contentfulRes = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query: linksQuery }),
  });
  const {data} = await contentfulRes.json();
  const redirects = data.linkCollection.items.reduce((acc, {redirectPath, url}) => {
    return `${acc}/${redirectPath} ${url}\n`;
  }, '');
  // the next export command in yarn build will move the build folder to /out
  // so we write to /out/_redirects
  writeFileSync(path.resolve(__dirname, '../out/_redirects'), redirects);
}

main();