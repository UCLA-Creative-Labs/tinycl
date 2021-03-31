export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export interface Link {
  displayName: string;
  url: string;
  redirectPath: string;
}

export interface PageProps {
  pageName?: string;
  links?: Link[];
  redirect?: boolean;
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