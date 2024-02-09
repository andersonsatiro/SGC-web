import { List, Square, WholeWord, Briefcase, HelpingHand, Coins, ArrowUp01, Trash, FilterX } from "lucide-react";
import { Header } from "../components/Header";
import { LeadersFilter } from "./components/LeadersFilter";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { Loading } from "../../../components/Loading";
import { NoLeaders } from "./components/NoLeaders";
import { LeadersTableTitle } from "./components/LeadersTableTitle";
import Cookies from 'js-cookie'
import { api } from "../../../lib/axios";

export function Leaders(){
  const { getData, leadersFilterIsActive, setLeadersFilterIsActive, listedLeaders,
          leaders, nameToFilter, setNameToFilter, setListedLeaders, setCallingDB
  } = useContext(GlobalContext)
  
  const [leadersTrashItems, setLeadersTrashItems] = useState<string[]>([])
  const [sendingData, setSendingData] = useState(false)

  const transformToReal = (value: number) => {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  }

  const changeFilterByName = (name: string) => {
    setNameToFilter(name)
    if(name !== ""){
        const filteredCollaborators = leaders.filter((leader) =>
          leader.name.toLowerCase().startsWith(name.toLowerCase()) 
        )
        setListedLeaders(filteredCollaborators)
        setLeadersFilterIsActive(true)
    } else {
      setListedLeaders(leaders)
      setLeadersFilterIsActive(false)
    }
  }

  const changeLeadersTrashItems = async (id: string) => {
    let itemExists = leadersTrashItems.includes(id)
    if(itemExists){
        setLeadersTrashItems(leadersTrashItems.filter((item) => item != id))
    } else {
      setLeadersTrashItems([...leadersTrashItems, id])
    }
  }

  const deleteLeaders = async () => {
    setCallingDB(true)
    try {
        const token = Cookies.get('token');
        setSendingData(true)

        if(token){
          await api.put('remover/lideranca', {
            ids: leadersTrashItems,
            token
          }, {
            headers: { 
              Authorization: `Bearer ${token}`
            }
          })
        } else {
          return
        }

        getData()
        const newListedLeaders = listedLeaders.filter((leader) => !leadersTrashItems.includes(leader.id))
        setListedLeaders(newListedLeaders)
        setLeadersTrashItems([])
        setSendingData(false)
    } catch(error){
        setSendingData(false)
        console.log(error)
    }
    setCallingDB(false)
  }

  const removeFilters = () => {
    setListedLeaders(leaders)
    setLeadersFilterIsActive(false)
    setNameToFilter("")
  }

  useEffect(() => {
    getData()
  },[])

  return(
    <div className="flex flex-col gap-14 h-full min-h-screen bg-zinc-950 pb-16">
      <Header goTo="/menu-inicial" />
            
      <section className="flex items-center justify-between px-16">
        <div className='flex items-center justify-center gap-2'>
          <List className='text-zinc-400 h-5 w-5' />
          <h1 className='text-zinc-300 text-2xl font-bold'>
              Lista das lideranças
              <p className="text-xs text-zinc-500 font-medium">
                {listedLeaders.length === 0 && !leadersFilterIsActive      
                  ?
                    'adicione a primeira liderança para visualizar a lista ou clique em atualizar'
                  : 
                    listedLeaders.length === 0 && leadersFilterIsActive
                      ? 'não existe nenhuma liderança que pertença ao filtro selecionado'
                      :
                        leadersFilterIsActive
                          ?
                            `com o filtro ativado, ${listedLeaders.length} das
                            ${leaders.length} lideranças estão listadas`                           
                          : 
                            listedLeaders.length === 1
                              ? `nenhum filtro ativado, portanto, a única liderança está listada`
                              : `nenhum filtro ativado, portanto, todas as ${leaders.length} lideranças estão listadas`
                }
              </p>   
          </h1>
        </div>

        <div className="flex items-center gap-4">
          
          {leadersTrashItems.length > 0 &&
            <button
              onClick={deleteLeaders}
              className='flex items-center gap-2 p-3 max-w-[200px]
              border-solid border-[1px] border-zinc-500/20 rounded-md
              ursor-pointer bg-indigo-400 hover:bg-indigo-500 text-zinc-200'
            >
              <h2 className='text-xs font-semibold'>Remover selecionados</h2>
              <Trash className='h-3 w-3 text-zinc-200'/>
            </button>
          }

          {leadersFilterIsActive === true &&
            <button
              onClick={removeFilters}
              className='flex items-center gap-2 p-3 max-w-[200px]
              border-solid border-[1px] border-zinc-500/20 rounded-md
              ursor-pointer bg-indigo-400 hover:bg-indigo-500 text-zinc-200'
            >
              <h2 className='text-xs font-semibold'>Remover filtro</h2>
              <FilterX className='h-3 w-3 text-zinc-200'/>
            </button>
          }

          <input
            type="text"
            className={`p-3 max-w-[150px] cursor-pointer text-center
            border-solid border-[1px] border-zinc-500/20 rounded-md
            bg-zinc-950 hover:bg-zinc-900/90 text-zinc-200 text-xs
            font-semibold ${sendingData && 'hover:cursor-not-allowed'}`}
            placeholder="buscar por nome"
            value={nameToFilter}
            disabled={sendingData ? true : false}
            onChange={(e) => changeFilterByName(e.target.value)}                      
          />

          <LeadersFilter />            
        </div>        
      </section>

      {leaders.length === 0 && listedLeaders.length === 0
        ? 
          <div className="flex items-center justify-center w-full mt-36">
              <Loading className="w-10 h-10" />
          </div>
        : leaders.length > 0 && listedLeaders.length === 0
        ? <NoLeaders setLeadersFilterIsActive={setLeadersFilterIsActive} />
        :
          <div className="border-solid border-[1px] border-zinc-500/40 mx-16 rounded-lg">
            <header className="flex items-center border-b-[1px] border-b-solid border-b-zinc-500/10">
              <button className="px-10">
                  <Square className="text-zinc-400 w-4 h-4 "  />
              </button>
              <div className="flex items-start py-4 w-full">
                  <LeadersTableTitle name="nome" icon={WholeWord}/>
                  <LeadersTableTitle name="emprego" icon={Briefcase}/>
                  <LeadersTableTitle name="número de colaboradores" icon={HelpingHand}/>
                  <LeadersTableTitle name="receita mensal" icon={Coins}/>
                  <LeadersTableTitle name="média de influência" icon={ArrowUp01}/>
              </div>
            </header>
            <main>
              {listedLeaders.map(({name, jobRole, numberOfCollaborators, monthlyIncome, averageInfluence, id}, index) => (               
                  <div
                      key={index}
                      className={`flex items-center border-b-[1px] border-b-solid border-b-zinc-500/10
                      ${leadersTrashItems.includes(id) ? sendingData ? 'animate-pulse duration-1000 bg-zinc-900' : 'bg-zinc-900' : ''}`}>
                      <div
                          onClick={() => changeLeadersTrashItems(id)}
                          className={`border-solid border-[1px] border-zinc-400 w-4 h-4 cursor-pointer
                                     hover:border-zinc-200 mx-10 rounded-sm
                                     ${leadersTrashItems.includes(id) && 'border-none bg-indigo-600 hover:bg-indigo-600'}`}
                      />
                      <div className={`${index % 2 == 0 ? 'text-gray-200' : 'text-indigo-400 '}
                                      flex items-start py-4 w-full text-xs font-semibold`}>
                          <p className="flex justify-center w-1/5">{name}</p>
                          <p className="flex justify-center w-1/5">{jobRole}</p>
                          <p
                            className="flex justify-center w-1/5">
                              {numberOfCollaborators}
                              {numberOfCollaborators === 1 ? ' colaborador' : ' colaboradores'}
                          </p>
                          <p className="flex justify-center w-1/5">{transformToReal(monthlyIncome)}</p>                                   
                          <p className="flex justify-center w-1/5">{Number(averageInfluence.toFixed(2))}</p>
                      </div>
                  </div>
              ))}
            </main>
          </div>  
      }
    </div>
  )
}