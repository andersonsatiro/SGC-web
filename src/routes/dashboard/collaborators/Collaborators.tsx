import { Header } from "../components/Header";
import { List, Trash, SlidersHorizontal, FilterX } from 'lucide-react'
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import Cookies from 'js-cookie'
import { api } from "../../../lib/axios";
import { ModifyTableButton } from "./components/ModifyTableButton";
import { Loading } from "../../../components/Loading";
import { NoCollaborators } from "./NoCollaborators";
import { useMediaQuery } from "react-responsive";
import { Table } from "./components/Table";

export function Collaborators () {
    const { getData, leaders, listedCollaborators, setListedCollaborators, collaborators,
            setCallingDB, nameToFilter, setNameToFilter } = useContext(GlobalContext)

    const [trashItems, setTrashItems] = useState<string[]>([])
    const [sendingData, setSendingData] = useState(false)
    const [filterIsActive, setFilterIsActive] = useState(false)
    const [filterModalIsActive, setFilterModalIsActive] = useState(false)
    
    const screenLarge = useMediaQuery({minWidth: 1008})
    const screenMedium = useMediaQuery({minWidth: 641, maxWidth: 1007})
    const screenSmall = useMediaQuery({maxWidth: 640})

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

    const transformToReal = (value: number) => {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
    }

    const removeFilters = () => {
        setListedCollaborators(collaborators)
        setFilterIsActive(false)
        setNameToFilter("")
    }

    const changeFilterByName = (name: string) => {
        setNameToFilter(name)
        if(name !== ""){
            const filteredCollaborators = collaborators.filter((collaborator) =>
                collaborator.name.toLowerCase().startsWith(name.toLowerCase()) 
            )
            setListedCollaborators(filteredCollaborators)
            setFilterIsActive(true)
        } else {
            setListedCollaborators(collaborators)
            setFilterIsActive(false)
        }
    }

    useEffect(() => {
        getData()
    },[])

    return(
        <div className="flex flex-col gap-14 h-full min-h-screen bg-zinc-950 pb-16">
            <Header goTo="/menu-inicial" />

            <section
                className={
                    `${screenLarge ? 'flex items-center justify-between px-16'
                    : screenMedium || screenSmall ? 'flex flex-col gap-6 items-center justify-center px-4' : ''}`}
            >

                <div className='flex items-center justify-center gap-2'>
                    <List className={`${!screenLarge && 'hidden'} text-zinc-400 h-5 w-5`} />
                    <h1 className={`${!screenLarge && 'text-center'} text-zinc-300 font-bold`}>

                        <span
                            className={`text-2xl ${!screenLarge && 'text-xl'}`}
                        >
                            Lista dos colaboradores
                        </span>
                        <p className="text-xs text-zinc-500 font-medium">
                            { listedCollaborators.length === 0 && !filterIsActive
                                ? 'adicione o primeiro colaborador para visualizar a lista ou clique em atualizar'
                                : listedCollaborators.length === 0 && filterIsActive
                                ? 'não existe nenhum colaborador que pertença ao filtro selecionado'
                                :
                                filterIsActive
                                ?
                                    `com o filtro ativado, ${listedCollaborators.length} dos
                                    ${collaborators.length} colaboradores estão listados`
                                :
                                    listedCollaborators.length === 1
                                    ? `nenhum filtro ativado, portanto, o único colaborador está listada`
                                    : `nenhum filtro ativado, portanto, todos os ${collaborators.length} colaboradores estão listados`
                            }
                        </p>   

                    </h1>
                </div>

                    <div className={`flex gap-4 items-center ${!screenLarge && 'flex-col'}`}>
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

                    <ModifyTableButton
                        name="Filtrar colaboradores"
                        arraySize={trashItems.length}                          
                        icon={SlidersHorizontal}
                        onclick={changeFilterState}
                        className={`${collaborators.length === 0 && 'cursor-not-allowed'}`}
                        sendingData={sendingData}
                        filter={filterModalIsActive}
                        setFilterIsActive={setFilterIsActive}
                        disabled={collaborators.length === 0 || listedCollaborators.length === 0 ? true : false}
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
                    <Table
                        sendingData={sendingData}
                        changeTrashItems={changeTrashItems}
                        trashItems={trashItems}
                        transformToReal={transformToReal}
                    />                        
                }
        </div>
    )
}