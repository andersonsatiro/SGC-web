import { Users2, ArrowDownAZ, BarChart4, LogOut } from 'lucide-react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { GlobalContext } from '../../../context/GlobalContext'

export function Header() {
    const navigate = useNavigate()
    const [showingLeaders, setShowingLeaders] = useState(false)
    const { leaders } = useContext(GlobalContext)

    interface Leader {
        id: string,
        influence: number,
        jobRole: string,
        monthlyIncome: number,
        name: string,
        numberOfCollaborators: number
    }

    const logout = () => {
        Cookies.remove('token')
        return navigate('/')
    }
    
    return(
        <header className="flex items-center justify-between px-5 h-20 border-b-solid border-b-2 border-b-zinc-500/20">
            <div className='flex items-center gap-7 text-zinc-200 font-bold'>
                <div className='relative'>
                    <div
                    className="flex items-center gap-3 p-3 max-w-[150px]
                    border-solid border-[1px] border-zinc-500/20 rounded-md
                    cursor-pointer hover:bg-zinc-900/90"
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
                <h1 className='text-base cursor-pointer hover:text-zinc-300'>Colaboradores</h1>
                <h1 className='text-base cursor-pointer hover:text-zinc-300'>Estatísticas</h1>
            </div>

            <div
                className="flex items-center gap-3 p-3 max-w-[250px]
                border-solid border-[1px] border-zinc-500/20 rounded-md
                cursor-pointer hover:bg-zinc-900/90"
                onClick={logout}
                >

                <BarChart4 className='h-3.5 w-3.5 text-zinc-200' strokeWidth={1} />
                <h2 className='text-zinc-200 text-xs font-boldwhitespace-nowrap'>
                    Sistema de Gestão de Cargos
                </h2>
                <LogOut className='h-3.5 w-3.5 text-red-500' strokeWidth={3}/>
            </div>
        </header>
    )
}