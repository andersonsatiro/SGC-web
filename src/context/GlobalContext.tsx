import { createContext, useState } from 'react';

export const GlobalContext = createContext<{
  count: number;
  isAuthenticated: boolean;
  click: () => void;

}>({
  count: 0,
  click: () => {},
  isAuthenticated: true,
});

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0)
  const [isAuthenticated] = useState(true)

  const click = () => {
    setCount(count + 1);
  };

  return (
    <GlobalContext.Provider value={{
      count,
      click,
      isAuthenticated,
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
