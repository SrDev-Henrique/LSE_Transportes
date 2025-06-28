"use client";

import { createContext, useContext } from "react";
import Lenis from "lenis";

type LocalLenisContextType = {
  lenis: Lenis | null;
};

export const LocalLenisContext = createContext<LocalLenisContextType>({
  lenis: null,
});

export const useLocalLenis = () => useContext(LocalLenisContext);