export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export interface Link {
  link: string,
  page: string,
  path: string,
  rank: number,
}

export interface PageProps {
  links: Link[] | undefined
}
