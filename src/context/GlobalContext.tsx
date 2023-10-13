import { createContext, useState } from 'react'
import Cookies from 'js-cookie'
import { api } from '../lib/axios';

interface Leader {
  id: string,
  influence: number,
  jobRole: string,
  monthlyIncome: number,
  name: string,
  numberOfCollaborators: number
}

interface Collaborator {
  id: string,
  name: string,
  jobRole: string,
  salary: number,
  influence: number,
  leaderId: string
}

export const GlobalContext = createContext<{
  username: string | null,
  setUsername: (newUsername: string) => void,
  password: string | null,
  setPassword: (newPassword: string) => void,

  getData: () => void,
  leaders: Leader[],
  collaborators: Collaborator[],
  dataExists: boolean,

  submitForm: () => void,
}>({
  username: "",
  setUsername: () => {},
  password: "",
  setPassword: () => {},

  getData: () => {},
  leaders: [],
  collaborators: [],
  dataExists: false,
  submitForm: () => {}
});

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [leaders, setLeaders] = useState<Leader[]>([])
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [dataExists, setDataExists] = useState(false)

  const getData = async () => {
    const token = Cookies.get('token')
    const leadersResponse = await api.get('/leaders', ({
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
    setLeaders(leadersResponse.data)

    const collaboratorsResponse = await api.get('/collaborators', ({
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
    setCollaborators(collaboratorsResponse.data)
    setDataExists(true)
  }

  const submitForm = () => {
    console.log("clicou")
    getData()
  }

  return (
    <GlobalContext.Provider value={{
      username,
      setUsername,
      password,
      setPassword,

      getData,
      leaders,
      collaborators,
      dataExists,
      submitForm,
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
