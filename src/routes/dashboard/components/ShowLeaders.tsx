import { Users2, ArrowDownAZ, ChevronsRight, ChevronsLeft } from "lucide-react";
import { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

interface Leader {
    id: string,
    influence: number,
    jobRole: string,
    monthlyIncome: number,
    name: string,
    numberOfCollaborators: number
}

export function ShowLeaders() {
    const { leaders, callingDB, setListedLeaders, setLeadersFilterIsActive } = useContext(GlobalContext)
    const [showingLeaders, setShowingLeaders] = useState(false)

    const navigate = useNavigate()

    const changeRoute = () => {
        setListedLeaders(leaders)
        setLeadersFilterIsActive(false)
        return navigate('/menu-inicial/lideranças')
    }
    
    return (
        <div className='relative'>
            <div
                className="flex items-center gap-3 p-3 max-w-[150px]
                border-solid border-[1px] border-zinc-500/20 rounded-md
                cursor-pointer hover:bg-zinc-900/90 text-zinc-200 font-bold"
                onClick={() => setShowingLeaders(!showingLeaders)}
            >

                <Users2 className='h-5 w-5 text-zinc-200' strokeWidth={1} />
                <h2 className='text-xs'>Lideranças</h2>
                <ArrowDownAZ  className='h-5 w-5 text-zinc-200' strokeWidth={1}/>
            
            </div>

            {showingLeaders ? 
            leaders[0] != null ?
                <div
                    className='w-full absolute mt-1 max-w-[150px] border-solid border-[1px] 
                    bg-zinc-950 border-zinc-500/20 rounded-md cursor-pointer'
                    >
                    <header
                        className={`flex items-center justify-between p-3 border-b-zinc-500/20 border-b-solid
                         border-b-[1px] bg-indigo-400 rounded-t-md text-zinc-100 hover:text-zinc-50
                         hover:bg-indigo-500 ${callingDB && 'hover:cursor-not-allowed'}`}
                        onClick={!callingDB ? changeRoute : () => {}}
                    >                       
                        <ChevronsRight className='h-4 w-4' strokeWidth={1}/>
                        <h1 className='text-xs font-semibold'>detalhes</h1>
                        <ChevronsLeft className='h-4 w-4' strokeWidth={1}/>
                    </header>

                    {leaders.map((leader: Leader, index) => (
                        <div key={leader.id} className={`flex items-center justify-between p-2 
                            ${index !== leaders.length - 1 ? 'border-b-zinc-500/20 border-b-solid border-b-[1px]' : ''}
                            hover:bg-zinc-900/90`}>
                            <h1 className='text-zinc-200 text-xs font-medium mr-3'>{leader.name}</h1>
                            <p className='text-indigo-400 text-xs font-bold'>{leader.numberOfCollaborators}</p>
                        </div>
                    ))}
                    
                </div>
                : 
                <div className="w-full absolute mt-1 max-w-[150px] border-solid border-[1px] bg-zinc-950 border-zinc-500/20 rounded-md cursor-pointer">
                    <div className="p-2 hover:bg-zinc-900/90">
                        <h1 className='text-zinc-300 text-xs font-normal text-center'>nenhuma liderança cadastrada</h1>
                    </div>
                </div>
                
            : '' }
        </div>
    )
}