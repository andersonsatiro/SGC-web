import { createContext, useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import { api } from '../lib/axios';

interface Leader {
  id: string,
  influence: number,
  jobRole: string,
  monthlyIncome: number,
  averageInfluence: number,
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

interface Jobs {
  id: string,
  name: string,
  influence: number
}

export const GlobalContext = createContext<{
  username: string | null,
  setUsername: (newUsername: string) => void,
  password: string | null,
  setPassword: (newPassword: string) => void,

  getData: () => void,
  leaders: Leader[],
  collaborators: Collaborator[],
  leadersInfluence: Leader[],
  dataExists: boolean,

  leaderFormIsActive: boolean,
  setLeaderFormIsActive: (paramsLeaderFormIsActive: boolean) => void,

  jobPositions: Jobs[],
  leadershipPositions: Jobs[],

  handleInput: (paramsValue: string | number, paramsType: string, paramsContent: string) => void,
  leadersName: string | number,
  leaderInfluenceValue: number | string,
  colaboratorsName: string | number,
  collaboratorSalary: number | string,
  CollaboratorInfluenceValue: number | string,
  leaderJobId: string,
  setLeaderJobId: (paramsJobId: string) => void,
  collaboratorJobId: string,
  setCollaboratorJobId: (paramsJobId: string) => void,
  collaboratorLeaderId: string,
  setCollaboratorLeaderId: (paramsCollaboratorLeaderId: string) => void,
  submitForm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,

  formErrorMessage: string,
  formErrorMessageIsActive: boolean,


}>({
  username: "",
  setUsername: () => {},
  password: "",
  setPassword: () => {},

  getData: () => {},
  leaders: [],
  collaborators: [],
  leadersInfluence: [],
  dataExists: false,

  leaderFormIsActive: false,
  setLeaderFormIsActive: () => {},

  jobPositions: [],
  leadershipPositions: [],

  handleInput: () => {},
  leadersName: "",
  leaderInfluenceValue: 0,
  colaboratorsName: "",
  collaboratorSalary: 0.0,
  CollaboratorInfluenceValue: 0,
  leaderJobId: "",
  setLeaderJobId: () => {},
  collaboratorJobId: "",
  setCollaboratorJobId: () => {},
  collaboratorLeaderId: "",
  setCollaboratorLeaderId: () => {},
  submitForm: () => {},

  formErrorMessage: "",
  formErrorMessageIsActive: false,
});

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [leaders, setLeaders] = useState<Leader[]>([])
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [leadersInfluence, setLeadersInfluence] = useState<Leader[]>([])
  const [dataExists, setDataExists] = useState(false)

  const [leaderFormIsActive, setLeaderFormIsActive] = useState(false)

  const [jobPositions, setJobPositions] = useState<Jobs[]>([])
  const [leadershipPositions, setLeadershipPositions] = useState<Jobs[]>([])

  const [leadersName, setLeadersName] = useState<string | number>("")
  const [leaderInfluenceValue, setLeaderInfluenceValue] = useState<number | string>(0)
  const [colaboratorsName, setColaboratorsName] = useState<string | number>("")
  const [collaboratorSalary, setCollaboratorSalary] = useState<string | number>(0.0)
  const [CollaboratorInfluenceValue, setCollaboratorInfluenceValue] = useState<number | string>(0)
  const [leaderJobId, setLeaderJobId] = useState("")
  const [collaboratorJobId, setCollaboratorJobId] = useState("")
  const [collaboratorLeaderId, setCollaboratorLeaderId] = useState("")
  
  const [formErrorMessage, setFormErrorMessage] = useState("")
  const [formErrorMessageIsActive, setFormErrorMessageIsActive] = useState(false)

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

    const leadersByAverageInfluence = await api.get('/leaders/influence', ({
        headers: {
          Authorization: `Bearer ${token}`
        }
    }))
    setLeadersInfluence(leadersByAverageInfluence.data)

    const jobPositionsResponse = await api.get('/jobPositions', ({
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
    setJobPositions(jobPositionsResponse.data)

    const leadershipPositionsResponse = await api.get('/leadershipPositions', ({
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
    setLeadershipPositions(leadershipPositionsResponse.data)

    setDataExists(true)
  }

  const handleInput = (value: string | number, type: string, content: string) => {
    leaderFormIsActive ?
    (type == "text" ?  setLeadersName(value): setLeaderInfluenceValue(value))
    :
    (type == "text" ? setColaboratorsName(value):
    (content == "salário" ? setCollaboratorSalary(value) : setCollaboratorInfluenceValue(value))
    )
  }

  /// SUBMIT FORM 

  const submitForm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const token = Cookies.get('token')

    if(typeof leadersName === 'string' && leadersName.trim() === ""){
      setFormErrorMessage("Insira um nome para a Liderança")
      setFormErrorMessageIsActive(true)
    } else if(leaderJobId.trim() === "") {
      setFormErrorMessage("Escola o cargo da Liderança")
      setFormErrorMessageIsActive(true)
    } else {


      // Verificar a sensibilidade de maiúsculo e minúsculo
      let leadersNameLowerCase
      if(typeof leadersName === 'string'){
        leadersNameLowerCase = leadersName.toLowerCase()
      }

      const leaderExists = await api.get(`leader/${leadersNameLowerCase}`, ({
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))

      if(leaderExists.data){
        console.log("O líder existe")
      } else {
        console.log("o líder n existe, papai. rexpeita nóis")
      }

      /*try{
        const response = await api.post('register/leader', {
          name: leadersName,
          jobId: leaderJobId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        console.log(response.data)
      } catch(error){
        leaderJobId == "" ? (setFormErrorMessage("Escolha um cargo para a Liderança"), setFormErrorMessageIsActive(true)) : console.log(error)
      }*/
    
    }
  }

  /// SUBMIT FORM 

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormErrorMessageIsActive(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [formErrorMessageIsActive])


  useEffect(() => {
    setLeadersName("")
    setLeaderInfluenceValue(0)
    setColaboratorsName("")
    setCollaboratorSalary(0.0)
    setCollaboratorInfluenceValue(0)

    setLeaderJobId("")
    setCollaboratorJobId("")
    setCollaboratorLeaderId("")
}, [leaderFormIsActive])

  return (
    <GlobalContext.Provider value={{
      username,
      setUsername,
      password,
      setPassword,

      getData,
      leaders,
      collaborators,
      leadersInfluence,
      dataExists,

      leaderFormIsActive,
      setLeaderFormIsActive,

      jobPositions,
      leadershipPositions,

      handleInput,
      leadersName,
      leaderInfluenceValue,
      colaboratorsName,
      collaboratorSalary,
      CollaboratorInfluenceValue,
      leaderJobId,
      setLeaderJobId,
      collaboratorJobId,
      setCollaboratorJobId,
      collaboratorLeaderId,
      setCollaboratorLeaderId,
      submitForm,

      formErrorMessage,
      formErrorMessageIsActive,

    }}>
      {children}
    </GlobalContext.Provider>
  );
}
