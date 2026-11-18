import { useEffect, useState } from 'react';

function getBreakpoint(width) {
  switch (true) {
    case width < 576:
      return 'xs';

    case width < 768:
      return 'sm';

    case width < 992:
      return 'md';

    case width < 1200:
      return 'lg';

    case width < 1400:
      return 'xl';

    default:
      return 'xxl';
  }
}

export default function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(
    () => getBreakpoint(window.innerWidth)
  );

  useEffect(() => {
    function handleResize() {
      const currentBreakpoint = getBreakpoint(window.innerWidth);

      setBreakpoint((previousBreakpoint) => {
        if (previousBreakpoint !== currentBreakpoint) {
          return currentBreakpoint;
        }

        return previousBreakpoint;
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return breakpoint;
}