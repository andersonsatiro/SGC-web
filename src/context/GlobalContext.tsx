import { createContext, useState } from 'react';

export const GlobalContext = createContext<{
  count: number;
  click: () => void;

}>({
  count: 0,
  click: () => {},
});

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  const click = () => {
    setCount(count + 1);
  };

  return (
    <GlobalContext.Provider value={{ count, click }}>
      {children}
    </GlobalContext.Provider>
  );
}
