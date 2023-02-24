import { useState, useEffect } from 'react';

const getWindowDimensions = () => {
  
  const width=window.screen.width;
  const height=window.screen.height;
  return {width,height};

};

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
 //  document.writeln(window.innerWidth);
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
