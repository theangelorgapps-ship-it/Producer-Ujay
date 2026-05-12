import { useEffect, useState } from 'react';
import { defaultSiteContent, fetchSiteContent, type SiteContent } from '../lib/siteContent';

let cachedSiteContent: SiteContent | null = null;

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(cachedSiteContent ?? defaultSiteContent);

  useEffect(() => {
    let isMounted = true;

    if (cachedSiteContent) {
      setContent(cachedSiteContent);
      return;
    }

    fetchSiteContent().then((nextContent) => {
      cachedSiteContent = nextContent;
      if (isMounted) setContent(nextContent);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return content;
}
