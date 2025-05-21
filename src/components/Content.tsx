import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

interface ContentProps {
  type?: string;
}

function loadComponent(type: string, urlType: string, slug?: string): React.LazyExoticComponent<any> {
  const fileName = slug ? slug : 'index';
  const typePath = type === 'home' ? 'home' : type || urlType;
  
  return lazy(() => import(`../content/${typePath}/${fileName}.tsx`));
}

export function Content({ type }: ContentProps) {
  const { type: urlType, slug: urlSlug } = useParams();
  
  // 타입 체크
  const Component = loadComponent(
    type || '',
    urlType || '',
    urlSlug || ''
  );

  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <Component />
    </Suspense>
  );
}
