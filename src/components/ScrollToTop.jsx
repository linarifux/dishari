import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component automatically scrolls the window to the top on every route change.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Dependency array ensures this runs only when the path changes

  return null; // This component does not render anything
};

export default ScrollToTop;
