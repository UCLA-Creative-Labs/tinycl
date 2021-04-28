export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export interface Link {
  displayName: string;
  url: string;
  redirectPath: string;
}

export interface PageProps {
  pageName: string;
  pages: string[];
  links: Link[];
}

export const linksQuery = (link: unknown):unknown =>`{
  linkCollection (where: {redirectPath: "${link}"}){
    items {
      url
    }
  }
}`;

export const pageQuery = `{
  pageCollection {
    items {
      pageName
      linksCollection {
        items {
          displayName
          url
          redirectPath
        }
      }
    }
  }
}`;

export async function fetchContentful (queryInfo) {
  const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
    },
    body: JSON.stringify({query: queryInfo}),
  });

  const {data} = await res.json();

  return data;
}