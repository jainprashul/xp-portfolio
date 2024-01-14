import { useEffect, useState } from "react";

/* function to check the dimensions of the window */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};


// export function useUserAgent(){
//   const [userAgent, setUserAgent] = useState({
//     isMobile: false,
//     isDesktop: false,
//     isTablet: false,
//     isAndroid: false,
//     isWinPhone: false,
//     isIOS: false,
//     isMac: false,
//     isWindows: false,
//     isLinux: false,
//   });

//   useEffect(() => {
//     const ua = navigator.userAgent;
//     console.log(ua);
//     const isMobile = /Mobile/.test(ua);
//     const isDesktop = !isMobile;
//     const isTablet = /Tablet/.test(ua);
//     const isAndroid = /Android/.test(ua);
//     const isWinPhone = /Windows Phone/.test(ua);
//     const isIOS = /iPad|iPhone|iPod/.test(ua);
//     const isMac = /Mac/.test(ua);
//     const isWindows = /Windows/.test(ua);
//     const isLinux = /Linux/.test(ua);

//     setUserAgent({
//       isMobile,
//       isDesktop,
//       isTablet,
//       isAndroid,
//       isWinPhone,
//       isIOS,
//       isMac,
//       isWindows,
//       isLinux,
//     });
//   }, []);


// }