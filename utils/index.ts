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

export async function fetchLinks(): Promise<Link[]> {
  const { supabase } = await import('./supabase');
  const { data, error } = await supabase
    .from('links')
    .select('display_name, url, redirectpath');

  if (error) {
    console.error('Supabase error:', error);
    return [];
  }

  return (data ?? []).map(row => ({
    displayName: row.display_name,
    url: row.url,
    redirectPath: row.redirectpath,
  }));
}