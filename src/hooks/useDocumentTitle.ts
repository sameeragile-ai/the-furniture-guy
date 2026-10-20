import { useEffect } from 'react';
import { siteConfig } from '../config/site';

export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    const defaultTitle = `${siteConfig.businessName} | ${siteConfig.subBrand} — Luxury Mirrored & Crushed Diamond Furniture`;
    document.title = title ? `${title} | ${siteConfig.businessName}` : defaultTitle;

    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }
  }, [title, description]);
}
