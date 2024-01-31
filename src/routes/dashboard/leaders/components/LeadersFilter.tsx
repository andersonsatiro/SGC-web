import { ArrowLeftFromLine, List, Sparkles, HelpingHand, Coins, ArrowUp01, Briefcase } from "lucide-react";
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
}

export function LeadersFilter(){
  const {leadersFilterModalIsActive, setLeadersFilterModalIsActive } = useContext(GlobalContext)
  
  const [leadersFilterList, setLeadersFilterList] = useState(
      [
          {name: 'cargo de liderança',        hasSecondFilter: true,  icon: Briefcase},
          {name: 'cargo de colaboradores',    hasSecondFilter: true,  icon: Briefcase},
          {name: '+ colaboradores',           hasSecondFilter: false, icon: HelpingHand},
          {name: 'maior receita mensal',      hasSecondFilter: false, icon: Coins,},
          {name: 'maior média de influência', hasSecondFilter: false, icon: ArrowUp01,},
      ])

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
      console.log("error")
      return null
    }
  }

  const manageAPICall = async (endpoint: string, Icon: ElementType) => {
    const response = await apiCall(endpoint)
    if(response === null){
      return 
    } else {
      const copyArray = response.map((item: filterItems) => ({
        ...item,
        hasSecondFilter: false,
        icon: Icon,
      }))
      setLeadersFilterList(copyArray)
    }
  }

  const filterBy = (name: string, hasSecondFilter: boolean, Icon: ElementType) => {
    if(hasSecondFilter){
      name === 'cargo de liderança' && manageAPICall("/leadershipPositions", Icon)
    }

  }

  return(
    <div className="relative">
      <button
        className='flex items-center justify-between gap-2 p-3 min-w-[200px] border-solid border-[1px]
        border-zinc-500/20 rounded-md cursor-pointer hover:bg-zinc-900/90 text-zinc-200'
        onClick={() => setLeadersFilterModalIsActive(!leadersFilterModalIsActive)}
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
              <ArrowLeftFromLine className="h-3 w-3 text-red-500 hover:cursor-pointer"/>
              <h1 className='text-zinc-200 text-xs font-bold mr-3'>filtrar por</h1>
              <Sparkles className="h-3 w-3 text-indigo-400" />
          </header>
          
          {
            leadersFilterList.map(({name, hasSecondFilter, icon: Icon}, index) => (
              <div
                className={`flex items-center justify-between p-2 
                    ${index !== leadersFilterList.length - 1 ? 'border-b-zinc-500/10 border-b-solid border-b-[1px]' : ''}
                    hover:bg-zinc-900/90 cursor-pointer`
                }
                onClick={() => filterBy(name, hasSecondFilter, Icon)}
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
