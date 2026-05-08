import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { fetchLinks, Link } from '../utils';
import { supabase } from '../utils/supabase';

export default function Home(): JSX.Element {
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    // Initial data fetch on mount
    fetchLinks().then(setLinks);

    // Subscribe to any INSERT, UPDATE, or DELETE on the links table
    const channel = supabase
      .channel('links-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'links' },
        () => {
          // Re-fetch all links to stay in sync with the latest state
          fetchLinks().then(setLinks);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return <Layout pageName="" links={links} pages={[]} />;
}
