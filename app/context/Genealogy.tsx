import { Family, Kindred } from "@/types";
import { createContext, useState } from "react";

interface GenealogyContextType {
  kindreds: Kindred[];
  setKindreds: React.Dispatch<React.SetStateAction<Kindred[]>>;
  existingFamily: Family | null;
  setExistingFamily: React.Dispatch<React.SetStateAction<Family | null>>;
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

const GenealogyContext = createContext<GenealogyContextType | null>(null);

export const GenealogyProvider = ({ children }: { children: React.ReactNode }) => {
  const [kindreds, setKindreds] = useState<Kindred[]>([]);
  const [existingFamily, setExistingFamily] = useState<Family | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <GenealogyContext.Provider value={{
      kindreds,
      setKindreds,
      existingFamily,
      setExistingFamily,
      isSearching,
      setIsSearching
    }}>
      {children}
    </GenealogyContext.Provider>
  );
};