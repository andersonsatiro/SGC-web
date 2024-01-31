import { Header } from "../components/Header";
import { List, Trash, SlidersHorizontal, WholeWord, Briefcase, Coins, User, ArrowUp01, Square, FilterX } from 'lucide-react'
import { TableTitle } from "./components/TableTitle";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import Cookies from 'js-cookie'
import { api } from "../../../lib/axios";
import { ModifyTableButton } from "./components/ModifyTableButton";
import { Loading } from "../../../components/Loading";
import { NoCollaborators } from "./NoCollaborators";

export function Collaborators () {
    const { getData, leaders, listedCollaborators, setListedCollaborators, collaborators, setCallingDB } = useContext(GlobalContext)
    const [trashItems, setTrashItems] = useState<string[]>([])
    const [sendingData, setSendingData] = useState(false)
    const [filterIsActive, setFilterIsActive] = useState(false)
    const [filterModalIsActive, setFilterModalIsActive] = useState(false)

    const changeTrashItems = async (id: string) => {
        let itemExists = trashItems.includes(id)
        if(itemExists){
            setTrashItems(trashItems.filter((item) => item != id))
        } else {
            setTrashItems([...trashItems, id])
        }
    }

    const deleteCollaborators = async () => {
        setCallingDB(true)
        try {
            const token = Cookies.get('token');
            setSendingData(true)

            await api.put('remover/colaborador', {
                ids: trashItems
              }, {
                headers: { 
                  Authorization: `Bearer ${token}`
                }
            })

            getData()
            const newListedCollaborators = listedCollaborators.filter((collaborator) => !trashItems.includes(collaborator.id))
            setListedCollaborators(newListedCollaborators)
            setTrashItems([])
            setSendingData(false)
        } catch(error){
            setSendingData(false)
            console.log(error)
        }
        setCallingDB(false)
    }

    const changeFilterState = () => {
        setFilterModalIsActive(!filterModalIsActive)
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

                        Lista dos colaboradores
                        <p className="text-xs text-zinc-500 font-medium">
                            { listedCollaborators.length === 0 && !filterIsActive
                                ? 'adicione o primeiro colaborador para visualizar a lista'
                                : listedCollaborators.length === 0 && filterIsActive
                                ? 'não existe nenhum colaborador que pertença ao filtro selecionado'
                                :
                                filterIsActive
                                ?
                                    `com o filtro ativado, ${listedCollaborators.length} dos
                                    ${collaborators.length} colaboradores estão listados`
                                :
                                    `nenhum filtro ativado, portanto, todos os ${collaborators.length} colaboradores estão listados`
                            }
                        </p>   

                    </h1>
                </div>

                <div className="flex gap-4">
                    { trashItems.length > 0 ?
                        <ModifyTableButton
                            name={listedCollaborators.length == 1 ? 'Remover selecionado' : 'Remover selecionados'}
                            arraySize={trashItems.length}                           
                            icon={Trash}
                            onclick={deleteCollaborators}
                            className="bg-indigo-400 hover:bg-indigo-500"
                            sendingData={sendingData}
                            />
                        : ''
                    }

                    {
                        filterIsActive  &&
                        <button
                            onClick={() => {setListedCollaborators(collaborators), setFilterIsActive(false)}}
                            className='flex items-center gap-2 p-3 max-w-[200px]
                            border-solid border-[1px] border-zinc-500/20 rounded-md
                            ursor-pointer bg-indigo-400 hover:bg-indigo-500 text-zinc-200'
                        >
                            <h2 className='text-xs font-semibold'>Remover filtro</h2>
                            <FilterX className='h-3 w-3 text-zinc-200'/>
                        </button>
                    }

                    <ModifyTableButton
                        name="Filtrar colaboradores"
                        arraySize={trashItems.length}                          
                        icon={SlidersHorizontal}
                        onclick={changeFilterState}
                        className={`${collaborators.length === 0 && 'cursor-not-allowed'}`}
                        sendingData={sendingData}
                        filter={filterModalIsActive}
                        setFilterIsActive={setFilterIsActive}
                        disabled={collaborators.length === 0 ? true : false}
                    />        
                </div>
            </section>


            {leaders.length === 0 && listedCollaborators.length === 0
                ? 
                    <div className="flex items-center justify-center w-full mt-36">
                        <Loading className="w-10 h-10" />
                    </div>
                : leaders.length > 0 && listedCollaborators.length === 0
                ? <NoCollaborators setFilterIsActive={setFilterIsActive} />
                :
                    <div className="border-solid border-[1px] border-zinc-500/40 mx-16 rounded-lg">
                        <header className="flex items-center border-b-[1px] border-b-solid border-b-zinc-500/10">

                            <button className="px-10">
                                <Square className="text-zinc-400 w-4 h-4 "  />
                            </button>
                            <div className="flex items-start py-4 w-full">
                                <TableTitle name="nome" icon={WholeWord}/>
                                <TableTitle name="emprego" icon={Briefcase}/>
                                <TableTitle name="liderança" icon={User}/>
                                <TableTitle name="salário" icon={Coins}/>
                                <TableTitle name="influência" icon={ArrowUp01}/>
                            </div>
                        </header>

                        <main>
                            {listedCollaborators.map(({name, jobRole, salary, influence, leaderName, id}, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center border-b-[1px] border-b-solid border-b-zinc-500/10
                                    ${trashItems.includes(id) ? sendingData ? 'animate-pulse duration-1000 bg-zinc-900' : 'bg-zinc-900' : ''}`}>
                                    <div
                                        onClick={() => changeTrashItems(id)}
                                        className={`border-solid border-[1px] border-zinc-400 w-4 h-4 cursor-pointer hover:border-zinc-200 mx-10 rounded-sm
                                        ${trashItems.includes(id) && 'border-none bg-indigo-600 hover:bg-indigo-600'}`}
                                    />
                                    <div className={`${index % 2 == 0 ? 'text-gray-200' : 'text-indigo-400 '}
                                                    flex items-start py-4 w-full text-xs font-semibold`}>
                                        <p className="flex justify-center w-1/5">{name}</p>
                                        <p className="flex justify-center w-1/5">{jobRole}</p>
                                        <p className="flex justify-center w-1/5">{leaderName}</p>
                                        <p className="flex justify-center w-1/5">R$ {salary}</p>                                   
                                        <p className="flex justify-center w-1/5"> peso {influence}</p>
                                    </div>
                                </div>
                            ))}
                        </main>
                    </div>                   
                }
        </div>
    )
}