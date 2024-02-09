import { ElementType , useContext, useState } from "react"
import { twMerge } from 'tailwind-merge'
import { Sparkles, Briefcase, Coins, User, ArrowUp01, ArrowLeftFromLine } from 'lucide-react'
import { api } from "../../../../lib/axios"
import Cookies from 'js-cookie'
import { GlobalContext } from "../../../../context/GlobalContext"

interface ModifyTableButtonProps {
    name: string,
    arraySize: number,
    icon: ElementType,
    className ?: string,
    onclick ?: () => void,
    sendingData: boolean,
    filter ?: boolean,
    setFilterIsActive ?: (value: boolean) => void,
    disabled ?: boolean,
}

interface filterItems {
    name: string,
    type: string,
    id ?: string,
    influence ?: number
    icon: ElementType
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

export function ModifyTableButton(
    {   name, arraySize, icon: Icon, className,
        onclick, sendingData, filter, setFilterIsActive, disabled
    }: ModifyTableButtonProps) {

    const {setListedCollaborators, collaborators, setNameToFilter} = useContext(GlobalContext)

    const [fetchingFilterData, setFetchingFilterData] = useState(false)
    const [filterList, setFilterList] = useState(
        [
            {name: 'emprego',        type: 'emprego',        icon: Briefcase},
            {name: 'faixa salarial', type: 'faixa salarial', icon: Coins,},
            {name: 'liderança',      type: 'liderança',      icon: User,},
            {name: 'influência',     type: 'influência',     icon: ArrowUp01},
        ])

        const copyFilterList = [
            {name: 'emprego',        type: 'emprego',        icon: Briefcase},
            {name: 'faixa salarial', type: 'faixa salarial', icon: Coins,},
            {name: 'liderança',      type: 'liderança',      icon: User,},
            {name: 'influência',     type: 'influência',     icon: ArrowUp01},
        ]

        const apiCall = async (endpoint: string) => {
            try{
                const token = Cookies.get('token');
                const response = await api.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                
                return response.data
            } catch(error){
                return false
            }
        }

        const manageAPICall = async (endpoint: string, type: string, Icon: ElementType) => {
            const response = await apiCall(endpoint)
            if(response){
                const copyArray = response.map((item: filterItems) => ({
                    ...item,
                    icon: Icon,
                    type
                }));
                
                setFilterList(copyArray)
            }
        }

        const filterBy = async (type: string, name: string, Icon: ElementType) => {
            setFetchingFilterData(true)
            setNameToFilter("")
            try{
                switch (type) {
                    case 'emprego':
                        if(type === name){
                            manageAPICall('/jobPositions', type, Icon)
                        } else {
                            const newArray: Collaborator[] = collaborators.filter((item) => item.jobRole === name)
                            setListedCollaborators(newArray)
                            setFilterList(copyFilterList)
                            if(setFilterIsActive){
                                setFilterIsActive(true) 
                            }                                                                            
                        }
                        break

                    case 'faixa salarial':
                        if(type === name){
                            setFilterList([
                                {name: 'até R$ 2000', type: 'faixa salarial', icon: Coins},
                                {name: 'R$ 2001 - R$ 3000', type: 'faixa salarial', icon: Coins},
                                {name: 'R$ 3001 - R$ 4000', type: 'faixa salarial', icon: Coins},
                                {name: 'R$ 4001 - R$ 6000', type: 'faixa salarial', icon: Coins},
                                {name: 'R$ 6001 - R$ 8000', type: 'faixa salarial', icon: Coins},
                                {name: 'R$ 8001 ou mais',    type: 'faixa salarial', icon: Coins},
                            ])
                        } else {
                            if(name === "até R$ 2000"){
                                const correspondencia = name.match(/\d+/)
                                let salaryRange = 0

                                if(correspondencia){
                                    salaryRange = parseInt(correspondencia[0], 10)
                                    const newArray = collaborators.filter((item) => item.salary <= salaryRange)
                                    setListedCollaborators(newArray)               
                                }
                                setFilterList(copyFilterList)
                                if(setFilterIsActive){
                                    setFilterIsActive(true) 
                                }
                            } else if(name === "R$ 8001 ou mais"){
                                const correspondencia = name.match(/\d+/)
                                let salaryRange = 0

                                if(correspondencia){
                                    salaryRange = parseInt(correspondencia[0], 10)
                                    const newArray = collaborators.filter((item) => item.salary >= salaryRange)
                                    setListedCollaborators(newArray)                                            
                                }
                                setFilterList(copyFilterList)
                                if(setFilterIsActive){
                                    setFilterIsActive(true) 
                                }
                            } else {
                                const salaryRange = name.match(/\d+/g);

                                if(salaryRange && salaryRange.length >= 2){
                                    const minValue = parseInt(salaryRange[0], 10)
                                    const maxValue = parseInt(salaryRange[1], 10)

                                    const newArray = collaborators.filter((item) => item.salary >= minValue && item.salary <= maxValue)
                                    setListedCollaborators(newArray)

                                    if(setFilterIsActive){
                                        setFilterIsActive(true) 
                                    } 
                                }
                                setFilterList(copyFilterList)
                            }
                        }                    

                        break

                    case 'liderança':
                        if(type === name){
                            manageAPICall('/leaders', type, Icon)
                        } else {
                            const newArray: Collaborator[] = collaborators.filter((item) => item.leaderName === name)
                            setListedCollaborators(newArray)
                            setFilterList(copyFilterList)   
                            
                            if(setFilterIsActive){
                                setFilterIsActive(true) 
                            } 
                        }
                        break

                    case 'influência': 
                        if(type === name){
                            setFilterList([               
                            {name: 'peso 1', type: 'influência', icon: ArrowUp01},
                            {name: 'peso 2', type: 'influência', icon: ArrowUp01},
                            {name: 'peso 3', type: 'influência', icon: ArrowUp01},
                            {name: 'peso 4', type: 'influência', icon: ArrowUp01},
                            {name: 'peso 5', type: 'influência', icon: ArrowUp01}                           
                        ])
                        } else {
                            const correspondencia = name.match(/\d+/);
                            let number = 0

                            if (correspondencia) {
                                number = parseInt(correspondencia[0], 10);
                            } else {
                                console.log("Nenhum número encontrado na string");
                            }

                            const newArray: Collaborator[] = collaborators.filter((item) => item.influence === number)
                            setListedCollaborators(newArray)
                            setFilterList(copyFilterList)    
                            
                            if(setFilterIsActive){
                                setFilterIsActive(true) 
                            } 
                        }
                        break
                    
                    default:
                        break;
                }
                setFetchingFilterData(false)
            }catch(error){
                setFetchingFilterData(false)
                alert("Erro: tente novamente")
            }
        }

        const returnToInitialFilter = () => {
            setFilterList(copyFilterList)
        }

    return(
        <div className="relative">
            <button
                onClick={onclick}
                disabled={disabled}
                
                className={twMerge(
                    `flex items-center gap-2 p-3 max-w-[200px]
                    border-solid border-[1px] border-zinc-500/20 rounded-md
                    cursor-pointer hover:bg-zinc-900/90 text-zinc-200
                    ${arraySize === 0 ||  sendingData && 'hover:cursor-not-allowed'}`,
                    className
                )}
            >
                <h2 className='text-xs font-semibold'>{name}</h2>
                <Icon className='h-3 w-3 text-zinc-200'/>
            </button>

            {filter
            &&
                <div
                    className='w-full absolute max-w-[200px] border-solid border-[1px] 
                    bg-zinc-950 border-zinc-500/20 rounded-md mt-1'
                    >
                        <header className='flex items-center justify-between p-3 
                            border-b-zinc-500/20 border-b-solid border-b-[1px]'
                        >
                            <ArrowLeftFromLine
                                className="h-3 w-3 text-red-500 hover:cursor-pointer"
                                onClick={returnToInitialFilter}
                            />
                            <h1 className='text-zinc-200 text-xs font-bold mr-3'>filtrar</h1>
                            <Sparkles className="h-3 w-3 text-indigo-400" />
                        </header>
                    

                        {filterList.map(({name, type, icon: Icon}: filterItems, index) => (
                            <div
                                className={`flex items-center justify-between p-2 
                                    ${index !== filterList.length - 1 ? 'border-b-zinc-500/10 border-b-solid border-b-[1px]' : ''}
                                    hover:bg-zinc-900/90 cursor-pointer ${fetchingFilterData &&
                                    'hover:cursor-not-allowed animate-pulse duration-1000 bg-zinc-900'}`
                                }
                                onClick={fetchingFilterData ? () => {} : () => filterBy(type, name, Icon)}
                                key={index}
                                
                            >
                                <h1 className='text-zinc-200 text-xs mr-3'>{name}</h1>
                                <Icon className="w-3 h-3 text-green-500" />
                            </div>
                        ))}
                    
                </div>
            }
        </div>
    )
}