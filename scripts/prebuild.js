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
  writeFileSync(path.resolve(__dirname, '../_redirects'), redirects);
  console.log("1: redirect Path: "+path.resolve(__dirname, '../_redirects'));
}

main();