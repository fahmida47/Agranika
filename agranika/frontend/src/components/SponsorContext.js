// src/components/SponsorContext.js
import React, { createContext, useState } from "react";

export const SponsorContext = createContext();

export function SponsorProvider({ children }) {
  const [unsponsored, setUnsponsored] = useState(1000);

  return (
    <SponsorContext.Provider value={{ unsponsored, setUnsponsored }}>
      {children}
    </SponsorContext.Provider>
  );
}