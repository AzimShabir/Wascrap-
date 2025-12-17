import { useEffect } from 'react';

const prefetchedRoutes = new Set<string>();

export const usePrefetch = () => {
  const prefetchRoute = (path: string) => {
    if (prefetchedRoutes.has(path)) return;
    
    prefetchedRoutes.add(path);
    
    // Create a link element to prefetch the route
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = path;
    document.head.appendChild(link);
    
    // Clean up after 30 seconds
    setTimeout(() => {
      document.head.removeChild(link);
    }, 30000);
  };

  const prefetchOnHover = (element: HTMLElement, path: string) => {
    const handleMouseEnter = () => prefetchRoute(path);
    element.addEventListener('mouseenter', handleMouseEnter, { once: true });
    
    return () => element.removeEventListener('mouseenter', handleMouseEnter);
  };

  return { prefetchRoute, prefetchOnHover };
};

export const useRoutePreloader = () => {
  useEffect(() => {
    // Preload critical routes after initial load
    const timer = setTimeout(() => {
      const criticalRoutes = ['/services', '/booking', '/about'];
      criticalRoutes.forEach(route => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        document.head.appendChild(link);
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
};