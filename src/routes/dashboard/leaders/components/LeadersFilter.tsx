import { ArrowLeftFromLine, List, Sparkles, Coins, ArrowUp01, Briefcase } from "lucide-react";
import { useState, useContext, ElementType } from "react";
import { GlobalContext } from "../../../../context/GlobalContext";
import Cookies from 'js-cookie'
import { api } from "../../../../lib/axios";

interface filterItems {
  name: string,
  hasSecondFilter: boolean,
  icon: ElementType
  id ?: string,
  influence ?: number,
  typeOfJob ?: string
}

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

export function LeadersFilter(){
  const {leadersFilterModalIsActive, setLeadersFilterModalIsActive, leaders, setListedLeaders,
    setLeadersFilterIsActive, listedLeaders, collaborators } = useContext(GlobalContext)
  
  const [fetchingFilterData, setFetchingFilterData] = useState(false)
  const [leadersFilterList, setLeadersFilterList] = useState(
      [
          {name: 'cargo de liderança',        hasSecondFilter: true,  icon: Briefcase},
          {name: 'cargo de colaboradores',    hasSecondFilter: true,  icon: Briefcase},
          {name: 'maior receita mensal',      hasSecondFilter: false, icon: Coins,},
          {name: 'maior média de influência', hasSecondFilter: false, icon: ArrowUp01,},
      ])

  const copyInicialLeadersFilter = 
    [
        {name: 'cargo de liderança',        hasSecondFilter: true,  icon: Briefcase},
        {name: 'cargo de colaboradores',    hasSecondFilter: true,  icon: Briefcase},
        {name: 'maior receita mensal',      hasSecondFilter: false, icon: Coins,},
        {name: 'maior média de influência', hasSecondFilter: false, icon: ArrowUp01,},
    ]

  const apiCall = async (endpoint: string) => {
    const token = Cookies.get('token');
    if(!token) return null
    try{
      const response = await api.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      return response.data
    }catch(error){
      alert("Erro: atualize a página")
      return null
    }
  }

  const manageAPICall = async (endpoint: string, Icon: ElementType) => {
    const response = await apiCall(endpoint)
    if(response === null){
      return 
    } else {
      const typeOfJob = endpoint === '/leadershipPositions' ? "leader" : "collaborator"
      const copyArray = response.map((item: filterItems) => ({
        ...item,
        hasSecondFilter: false,
        icon: Icon,
        typeOfJob
      }))
      setLeadersFilterList(copyArray)
    }
  }

  const sortByLeadersWithMore = async (value: string) => {
    const response = await apiCall('/leaders')
    if(response !== null){
      const leadersArray: Leader[] = Object.values(response);

      switch (value) {
        case 'monthlyIncome': 
          leadersArray.sort((a, b) => b.monthlyIncome - a.monthlyIncome)
          break;
        case 'averageInfluence':
          leadersArray.sort((a, b) => b.averageInfluence - a.averageInfluence)
          break;
        default:
          break;
      }
      setListedLeaders(leadersArray)
      setLeadersFilterIsActive(true)
      returnToInitialFilter()
    }else {
      return
    }
  }

  const sortBySpecificLeaderPosition = async (name: string) => {
    const response = await apiCall('/leaders')
    if(response !== null){
      const leadersArray: Leader[] = Object.values(response);
      const arrayWithFilter = leadersArray.filter((leader) => leader.jobRole === name)
      setListedLeaders(arrayWithFilter)
      setLeadersFilterIsActive(true)
      returnToInitialFilter()
    } else{
      return 
    }
  }

  
  const sortBySpecificCollaboratorPosition = async (name: string) => {
    const filteredLeaders = leaders.map((leader: Leader) => {
        const collaboratorsOfLeader = collaborators.filter((collaborator: Collaborator) =>
            collaborator.jobRole === name && collaborator.leaderName === leader.name
        );

        const averageInfluence = collaboratorsOfLeader.reduce((count, current) => count + current.influence, 0) / collaboratorsOfLeader.length
        const monthlyIncome = collaboratorsOfLeader.reduce((count, current) => count + current.salary, 0)

        return {
            id: leader.id,
            influence: leader.influence,
            jobRole: leader.jobRole,
            monthlyIncome,
            averageInfluence: averageInfluence > 0 ? averageInfluence : 0,
            name: leader.name,
            numberOfCollaborators: collaboratorsOfLeader.length
        };
    });

    const ordainedLeaders: Leader[] = filteredLeaders.sort((a, b) => b.numberOfCollaborators - a.numberOfCollaborators)
    setListedLeaders(ordainedLeaders)
    setLeadersFilterIsActive(true)
    returnToInitialFilter()
  }

  const filterBy = (name: string, hasSecondFilter: boolean, Icon: ElementType, typeOfJob: string | undefined) => {
    setFetchingFilterData(true)
    if(hasSecondFilter){
      name === 'cargo de liderança' ? manageAPICall("/leadershipPositions", Icon)
      : name === 'cargo de colaboradores' && manageAPICall("/jobPositions", Icon)
    } else {
      name === 'maior receita mensal' ? sortByLeadersWithMore('monthlyIncome')
      : name === 'maior média de influência' ? sortByLeadersWithMore('averageInfluence')
      : typeOfJob === 'leader' ? sortBySpecificLeaderPosition(name)
      : typeOfJob === 'collaborator' ? sortBySpecificCollaboratorPosition(name)
      : ''
    }
    setFetchingFilterData(false)
  }

  const returnToInitialFilter = () => {
    setLeadersFilterList(copyInicialLeadersFilter)
  }

  return(
    <div className="relative">
      <button
        className={`flex items-center justify-between gap-2 p-3 min-w-[200px] border-solid border-[1px]
        border-zinc-500/20 rounded-md cursor-pointer hover:bg-zinc-900/90 text-zinc-200
        ${leaders.length === 0 || listedLeaders.length === 0 && 'hover:cursor-not-allowed'}`}
        onClick={() => setLeadersFilterModalIsActive(!leadersFilterModalIsActive)}
        disabled={leaders.length === 0 || listedLeaders.length === 0 ? true : false}
      >
        <span></span>
        <h2 className='text-xs font-semibold'>Filtrar lideranças</h2>
        <List className='h-3 w-3 text-zinc-200'/>
      </button>

      {leadersFilterModalIsActive &&
        <section
          className='w-full absolute max-w-[200px] border-solid border-[1px] 
          bg-zinc-950 border-zinc-500/20 rounded-md mt-1'
        >
          <header
            className='flex items-center justify-between p-3 
            border-b-zinc-500/20 border-b-solid border-b-[1px]'
          >
              <ArrowLeftFromLine className="h-3 w-3 text-red-500 hover:cursor-pointer" onClick={returnToInitialFilter}/>
              <h1 className='text-zinc-200 text-xs font-bold mr-3'>filtrar por</h1>
              <Sparkles className="h-3 w-3 text-indigo-400" />
          </header>
          
          {
            leadersFilterList.map(({name, hasSecondFilter, icon: Icon, typeOfJob }: filterItems, index) => (
              <div
                className={`flex items-center justify-between p-2 
                    ${index !== leadersFilterList.length - 1 ? 'border-b-zinc-500/10 border-b-solid border-b-[1px]' : ''}
                    hover:bg-zinc-900/90 cursor-pointer  ${fetchingFilterData &&
                      'hover:cursor-not-allowed animate-pulse duration-1000 bg-zinc-900'}`
                }
                onClick={fetchingFilterData ? () => {} : () => filterBy(name, hasSecondFilter, Icon, typeOfJob)}
                key={index}
              >
                <h1 className='text-zinc-200 text-xs'>{name}</h1>
                <Icon className="w-3 h-3 text-green-500" />
              </div>
            ))
          }   
        </section>
      }
    </div>
  )
}
