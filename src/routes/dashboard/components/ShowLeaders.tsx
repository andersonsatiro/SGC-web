import { Users2, ArrowDownAZ } from "lucide-react";
import { useContext, useState } from "react";
import { GlobalContext } from "../../../context/GlobalContext";

interface Leader {
    id: string,
    influence: number,
    jobRole: string,
    monthlyIncome: number,
    name: string,
    numberOfCollaborators: number
}

export function ShowLeaders() {
    const { leaders } = useContext(GlobalContext)
    const [showingLeaders, setShowingLeaders] = useState(false)
    
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

            {showingLeaders && leaders != null ?
            <div
                className='w-full absolute mt-1 max-w-[150px] border-solid border-[1px] 
                bg-zinc-950 border-zinc-500/20 rounded-md cursor-pointer'
                >
                {leaders.map((leader: Leader, index) => (
                    <div key={leader.id} className={`flex items-center justify-between p-2 
                    ${index !== leaders.length - 1 ? 'border-b-zinc-500/20 border-b-solid border-b-[1px]' : ''}
                    hover:bg-zinc-900/90`}>
                    <h1 className='text-zinc-200 text-xs mr-3'>{leader.name}</h1>
                    <p className='text-indigo-400 text-xs'>{leader.numberOfCollaborators}</p>
                </div>
                ))}
                
            </div>
            : '' }
        </div>
    )
}