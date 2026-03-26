import { createContext, ReactNode, useContext, useRef, useState } from "react";

type TabBarContextType = {
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
  handleScroll: (event: any) => void;
};

const TabBarContext = createContext<TabBarContextType | undefined>(undefined);

// Custom hook
export const useTabBar = () => {
  const context = useContext(TabBarContext);
  if (!context) {
    throw new Error("useTabBar must be used within a TabBarProvider");
  }
  return context;
};

export const TabBarProvider = ({ children }: { children: ReactNode }) => {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  const handleScroll = (event: any) => {
    const currentY = event.nativeEvent.contentOffset.y;

    // Ignore small scroll movements
    if (Math.abs(currentY - lastScrollY.current) < 10) return;

    if (currentY > lastScrollY.current && currentY > 50) {
      // scrolling down
      setHidden(true);
    } else {
      // scrolling up
      setHidden(false);
    }

    lastScrollY.current = currentY;
  };

  return (
    <TabBarContext.Provider value={{ hidden, setHidden, handleScroll }}>
      {children}
    </TabBarContext.Provider>
  );
};
