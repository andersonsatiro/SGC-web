import { UserPlus, HelpingHand, Users} from 'lucide-react'
import { ShowLeaders } from '../ShowLeaders'
import { useContext } from 'react'
import { GlobalContext } from '../../../../context/GlobalContext'
export function ChangeForms() {
    const { leaderFormIsActive, setLeaderFormIsActive } = useContext(GlobalContext)

    const handleWithForm = () => {
        setLeaderFormIsActive(!leaderFormIsActive)
    }
    return (
        <div className='flex flex-col items-center gap-3'>
            {leaderFormIsActive
                ? 
                <UserPlus className='h-6 w-6 text-zinc-400'/>
                : 
                <HelpingHand className='h-6 w-6 text-zinc-400'/>
            }
            
            <div className='flex flex-col items-center gap-2'>
                <h1 className='text-2xl text-zinc-200 font-extrabold leading-3'>
                    Cadastrar {leaderFormIsActive ? 'Liderança' : 'Colaborador'}
                </h1>
                <h2 className='text-sm text-zinc-400 font-semibold'>Preencha os campos de cadastro</h2>
            </div>

            <ShowLeaders />

            <div className='flex flex-col items-center gap-3'>
                <div className='flex items-center gap-2'>
                    <div className='w-14 h-[0.5px] bg-zinc-500'></div>
                    <p className='text-zinc-400 text-[10px]'>
                        Mudar para {leaderFormIsActive ? 'Colaborador' : 'Liderança'}
                    </p>
                    <div className='w-14 h-[0.5px] bg-zinc-500'></div>
                </div>

                <button onClick={handleWithForm} className='flex items-center gap-2 p-3 border-[1px] border-solid border-zinc-500/20 rounded-lg hover:bg-zinc-900/90'>
                    {leaderFormIsActive
                        ? <HelpingHand className='h-4 w-4 text-zinc-200'/>
                        : <Users className='h-4 w-4 text-zinc-200'/>
                    }
                
                    <h2 className='text-xs text-zinc-200 font-bold'>
                        {leaderFormIsActive ? 'Colaborador' : 'Liderança'}
                    </h2>
                </button>
            </div>
            
        </div>
    )
}