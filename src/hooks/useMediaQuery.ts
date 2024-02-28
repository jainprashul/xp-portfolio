import { containerWidthDesktop, containerWidthMobile } from "@/views/2048Game/constant";

export default function useMediaQuery(){
    
    const isMobile = window.matchMedia('(max-width: 512px)').matches;
    
    const width = isMobile ? containerWidthMobile : containerWidthDesktop;
    
    return {
        isMobile,
        width,
    }
}