import { Link, LinkProps } from 'react-router-dom';
import { usePrefetch } from '@/hooks/usePrefetch';
import { useRef, useEffect } from 'react';

interface OptimizedLinkProps extends LinkProps {
  prefetch?: boolean;
  children: React.ReactNode;
}

const OptimizedLink = ({ prefetch = true, to, children, ...props }: OptimizedLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { prefetchOnHover } = usePrefetch();

  useEffect(() => {
    if (prefetch && linkRef.current) {
      const cleanup = prefetchOnHover(linkRef.current, to.toString());
      return cleanup;
    }
  }, [prefetch, to, prefetchOnHover]);

  return (
    <Link ref={linkRef} to={to} {...props}>
      {children}
    </Link>
  );
};

export default OptimizedLink;