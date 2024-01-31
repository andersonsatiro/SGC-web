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
  leaderName: string,
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
  collaboratorsName: string | number,
  collaboratorSalary: number | string,
  CollaboratorInfluenceValue: number | string,
  leaderJobId: string,
  setLeaderJobId: (paramsJobId: string) => void,
  collaboratorJobId: string,
  setCollaboratorJobId: (paramsJobId: string) => void,
  collaboratorLeaderId: string,
  setCollaboratorLeaderId: (paramsCollaboratorLeaderId: string) => void,
  submitFormLeader: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  submitFormCollaborator: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,

  formErrorMessage: string,
  formErrorMessageIsActive: boolean,

  submitState: string,

  listedCollaborators: Collaborator[],
  setListedCollaborators: (collaborators: Collaborator[]) => void,

  workModalIsActive: boolean,
  setWorkModalIsActive: (value: boolean) => void,

  listedLeaders: Leader[],
  setListedLeaders: (leaders: Leader[]) => void,
  leadersFilterIsActive: boolean,
  setLeadersFilterIsActive: (value: boolean) => void,
  leadersFilterModalIsActive: boolean,
  setLeadersFilterModalIsActive: (value: boolean) => void,

  callingDB: boolean,
  setCallingDB: (value: boolean) => void,
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
  collaboratorsName: "",
  collaboratorSalary: 0.0,
  CollaboratorInfluenceValue: 0,
  leaderJobId: "",
  setLeaderJobId: () => {},
  collaboratorJobId: "",
  setCollaboratorJobId: () => {},
  collaboratorLeaderId: "",
  setCollaboratorLeaderId: () => {},
  submitFormLeader: () => {},
  submitFormCollaborator: () => {},

  formErrorMessage: "",
  formErrorMessageIsActive: false,

  submitState: "",
  listedCollaborators: [],
  setListedCollaborators:  () => {},

  workModalIsActive: false,
  setWorkModalIsActive: () => {},

  listedLeaders: [],
  setListedLeaders: () => {},
  leadersFilterIsActive: false,
  setLeadersFilterIsActive: () => {},
  leadersFilterModalIsActive: false,
  setLeadersFilterModalIsActive: () => {},

  callingDB: false,
  setCallingDB: () => {},
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
  const [collaboratorsName, setCollaboratorsName] = useState<string | number>("")
  const [collaboratorSalary, setCollaboratorSalary] = useState<string | number>(0.0)
  const [CollaboratorInfluenceValue, setCollaboratorInfluenceValue] = useState<number | string>(0)
  const [leaderJobId, setLeaderJobId] = useState("")
  const [collaboratorJobId, setCollaboratorJobId] = useState("")
  const [collaboratorLeaderId, setCollaboratorLeaderId] = useState("")
  
  const [formErrorMessage, setFormErrorMessage] = useState("")
  const [formErrorMessageIsActive, setFormErrorMessageIsActive] = useState(false)

  const [submitState, setSubmitState] = useState('cadastrar')

  const [listedCollaborators, setListedCollaborators] = useState<Collaborator[]>([])

  const [workModalIsActive, setWorkModalIsActive] = useState(false)

  const [listedLeaders, setListedLeaders] = useState<Leader[]>([])
  const [leadersFilterIsActive, setLeadersFilterIsActive] = useState(false)
  const [leadersFilterModalIsActive, setLeadersFilterModalIsActive] = useState(false)

  const [callingDB, setCallingDB] = useState(false)

  const getData = async () => {
    try {
      const token = Cookies.get('token');
  
      const apiCall = async (endpoint: string) => {
        const response = await api.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      };

      const [leaders, collaborators, leadersInfluence, jobPositions, leadershipPositions] = await Promise.all([
        apiCall('/leaders'),
        apiCall('/collaborators'),
        apiCall('/leaders/influence'),
        apiCall('/jobPositions'),
        apiCall('/leadershipPositions'),
      ]);
  
      setLeaders(leaders)
      setCollaborators(collaborators)
      setLeadersInfluence(leadersInfluence)
      setJobPositions(jobPositions)
      setLeadershipPositions(leadershipPositions)
  
      setDataExists(true)
    } catch (error) {
      console.error('Erro ao obter dados:', error);
    }
  };

  const handleInput = (value: string | number, type: string, content: string) => {
    leaderFormIsActive ?
    (type == "text" ?  setLeadersName(value): setLeaderInfluenceValue(value))
    :
    (type == "text" ? setCollaboratorsName(value):
    (content == "salário" ? setCollaboratorSalary(value) : setCollaboratorInfluenceValue(value))
    )
  }

  const checkIfLeaderExists = async (token: string | undefined) => {

    let leadersNameLowerCase
    if(typeof leadersName === 'string'){
      leadersNameLowerCase = leadersName.toLowerCase()
    }

    try{
      const leaderExists = await api.get(`leader/${leadersNameLowerCase}`, ({
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))
      return leaderExists.data

    } catch(error){
      return null
    }
  }
  
  const registerNewLeader = async (token: string | undefined) => {
    try{
      await api.post('register/leader', {
        name: leadersName,
        jobId: leaderJobId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return true

    }catch(error){
      return false
    }
  }

  const submitFormLeader = async () => {
    setCallingDB(true)
    const token = Cookies.get('token')

    if(typeof leadersName === 'string' && leadersName.trim() === ""){
      setFormErrorMessage("Insira um nome para a liderança")
      setFormErrorMessageIsActive(true)
    } else if(leaderJobId.trim() === "") {
      setFormErrorMessage("Escolha o cargo da liderança")
      setFormErrorMessageIsActive(true)
    } else {

      setSubmitState('cadastrando')
      const responseCheckName = await checkIfLeaderExists(token)

      if(responseCheckName == false){
        const registeredLeader = await registerNewLeader(token)

        if(registeredLeader){
          setSubmitState('sucesso')
          setTimeout(() => {
            setSubmitState('cadastrar')
          },3000)
        } else {
          setFormErrorMessage("Houve um problema. Tente novamente.")
          setFormErrorMessageIsActive(true)
          setSubmitState('cadastrar')
        }
           
      } else {
        responseCheckName == null ? 
        setFormErrorMessage("Houve um problema. Tente novamente.") : setFormErrorMessage(`${leadersName} já é uma Liderança`)
        setFormErrorMessageIsActive(true)
        setSubmitState('cadastrar')
      }

      }
      setCallingDB(false)
  }

  const checkIfCollaboratorExists = async (token: string | undefined) => {

    let collaboratorNameLowerCase
    if(typeof collaboratorsName === 'string'){
      collaboratorNameLowerCase = collaboratorsName.toLowerCase()
    }

    try{
      const collaboratorExists = await api.get(`collaborator/${collaboratorNameLowerCase}`, ({
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))
      return collaboratorExists.data

    } catch(error){
      return null
    }
  }

  const registerNewCollaborator = async (token: string | undefined, numberOfInfluence: number, salary: number) => {
    try{
      await api.post('register/collaborator', {
        name: collaboratorsName,
        salary: salary,
        jobId: collaboratorJobId,
        leaderId: collaboratorLeaderId,
        influence: numberOfInfluence,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return true

    }catch(error){
      return false
    }
  }

  
  const submitFormCollaborator = async () => {
    setCallingDB(true)
    const token = Cookies.get('token')

    let numberOfInfluence = 0
    if(typeof CollaboratorInfluenceValue === 'string' && CollaboratorInfluenceValue.trim() != ""){
      numberOfInfluence = Math.floor(parseInt(CollaboratorInfluenceValue))
    }

    let salary = 0
    if(typeof collaboratorSalary === 'string'){
      salary = parseFloat(collaboratorSalary)
    }

    if(typeof collaboratorsName === 'string' && collaboratorsName.trim() === ""){
      setFormErrorMessage("Insira um nome para o colaborador")
      setFormErrorMessageIsActive(true)
    } else if(collaboratorJobId.trim() === "") {
      setFormErrorMessage("Escolha o cargo do colaborador")
      setFormErrorMessageIsActive(true)
    } else if(numberOfInfluence < 0 || numberOfInfluence > 5){
      setFormErrorMessage("Nível de influência inválido")
      setFormErrorMessageIsActive(true)
    } else if(collaboratorLeaderId.trim() === "") {
      setFormErrorMessage("Escolha a liderança do colaborador")
      setFormErrorMessageIsActive(true)
    } else if(salary <= 0) {
      setFormErrorMessage("Insira o salário do colaborador")
      setFormErrorMessageIsActive(true)
    } else {

      setSubmitState('cadastrando')
      const responseCheckName = await checkIfCollaboratorExists(token)

      if(responseCheckName == false){
        const registeredCollaborator = await registerNewCollaborator(token, numberOfInfluence, salary)

        if(registeredCollaborator){
          setCollaboratorInfluenceValue(0)
          setSubmitState('sucesso')
          setTimeout(() => {
            setSubmitState('cadastrar')
          },3000)
        } else {
          setFormErrorMessage("Houve um problema. Tente novamente.")
          setFormErrorMessageIsActive(true)
          setSubmitState('cadastrar')
        }
           
      } else {
        responseCheckName == null ? 
        setFormErrorMessage("Houve um problema. Tente novamente.") : setFormErrorMessage(`${collaboratorsName} já é um colaborador`)
        setFormErrorMessageIsActive(true)
        setSubmitState('cadastrar')
      } 
    }
    setCallingDB(false)
  }

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
    setCollaboratorsName("")
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
      collaboratorsName,
      collaboratorSalary,
      CollaboratorInfluenceValue,
      leaderJobId,
      setLeaderJobId,
      collaboratorJobId,
      setCollaboratorJobId,
      collaboratorLeaderId,
      setCollaboratorLeaderId,
      submitFormLeader,
      submitFormCollaborator,

      formErrorMessage,
      formErrorMessageIsActive,

      submitState,
      listedCollaborators,
      setListedCollaborators,

      workModalIsActive,
      setWorkModalIsActive,

      listedLeaders,
      setListedLeaders,
      leadersFilterIsActive,
      setLeadersFilterIsActive,
      leadersFilterModalIsActive,
      setLeadersFilterModalIsActive,

      callingDB,
      setCallingDB,
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
