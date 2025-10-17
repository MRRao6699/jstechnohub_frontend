import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * This component automatically scrolls the page to the top
 * whenever the user navigates to a new route.
 */
function ScrollToTop() {
  // The useLocation hook returns the location object that represents the current URL.
  const { pathname } = useLocation();

  // The useEffect hook will run every time the 'pathname' changes.
  useEffect(() => {
    // The 'window.scrollTo(0, 0)' method scrolls the window to the top-left corner.
    window.scrollTo(0, 0);
  }, [pathname]); // The effect depends on the pathname, so it runs on route change.

  // This component does not render any visible UI, so it returns null.
  return null;
}

export default ScrollToTop;