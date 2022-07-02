import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { ReactNode, createContext, useContext, useEffect } from "react";
import { useLocation } from 'react-router-dom';

interface SidebarDrawerProviderProps{
  children: ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({children}: SidebarDrawerProviderProps){
  const disclouse = useDisclosure();
  const router = useLocation();

  useEffect(() => {
    disclouse.onClose();
  }, [router.pathname])
  
  return(
    <SidebarDrawerContext.Provider value={disclouse}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);