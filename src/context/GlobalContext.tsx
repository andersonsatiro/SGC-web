import { createContext, useState } from 'react';

export const GlobalContext = createContext<{
  isAuthenticated: boolean,
  username: string | null,
  setUsername: (newUsername: string) => void,
  password: string | null,
  setPassword: (newPassword: string) => void,
}>({
  isAuthenticated: true,
  username: "",
  setUsername: () => {},
  password: "",
  setPassword: () => {}
});

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  return (
    <GlobalContext.Provider value={{
      isAuthenticated,
      username,
      setUsername,
      password,
      setPassword
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
