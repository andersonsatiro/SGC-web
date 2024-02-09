import { CircleOff, RefreshCcw, Undo2 } from 'lucide-react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../../../context/GlobalContext'


//VERIFICAR
interface NoLeadersProps {
  setLeadersFilterIsActive: (value: boolean) => void
}

export function NoLeaders({setLeadersFilterIsActive}: NoLeadersProps){
    const { setListedLeaders, leaders, setNameToFilter } = useContext(GlobalContext)
    const navigate = useNavigate()

    const updatePage = () => {
        setListedLeaders(leaders)
        setLeadersFilterIsActive(false)
        setNameToFilter("")
    }

    const registerLeader = () => {
        setNameToFilter("")
        return navigate('/menu-inicial')
    }
    
    return(
        <div className="flex flex-col gap-3 items-center col-start-1 justify-center w-full mt-36">
            <CircleOff className="w-6 h-6 text-zinc-400" />
            <h1
                className="text-base text-zinc-300 font-semibold max-w-md text-center"
            >
                Ops! Não encontramos nenhuma liderança por aqui. Que tal cadastrar a primeira?
            </h1>
            <div className='flex items-center gap-2'>
                <button
                    className="flex items-center gap-2 p-3 max-w-[250px]
                    border-solid border-[1px] border-zinc-500/20 rounded-md
                    cursor-pointer hover:bg-zinc-900/90"
                    onClick={updatePage}
                    >

                    <RefreshCcw className='h-3.5 w-3.5 text-zinc-200' strokeWidth={1} />
                    <h2 className='text-zinc-200 text-xs font-bold whitespace-nowrap'>
                        Atualizar
                    </h2>
                </button>

                <div
                    className="flex items-center gap-2 p-3 max-w-[250px]
                    border-solid border-[1px] border-zinc-500/20 rounded-md
                    cursor-pointer hover:bg-zinc-900/90"
                    onClick={registerLeader}
                    >

                    <Undo2 className='h-3.5 w-3.5 text-zinc-200' strokeWidth={1} />
                    <h2 className='text-zinc-200 text-xs font-bold whitespace-nowrap'>
                        Cadastrar
                    </h2>
                </div>
            </div>
        </div>
    )
}