import { CircleOff, RefreshCcw, Undo2 } from 'lucide-react'
import { useContext } from 'react'
import { GlobalContext } from '../../../context/GlobalContext'
import { useNavigate } from 'react-router-dom'

interface NoCollaboratorsProps {
    setFilterIsActive: (value: boolean) => void
}

export function NoCollaborators({setFilterIsActive}: NoCollaboratorsProps){
    const { setListedCollaborators, collaborators } = useContext(GlobalContext)
    const navigate = useNavigate()
    
    return(
        <div className="flex flex-col gap-3 items-center col-start-1 justify-center w-full mt-36">
            <CircleOff className="w-6 h-6 text-zinc-400" />
            <h1
                className="text-base text-zinc-300 font-semibold max-w-md text-center"
            >
                Ops! Não encontramos nenhum colaborador por aqui. Que tal cadastrar o primeiro?
            </h1>
            <div className='flex items-center gap-2'>
                <button
                    className="flex items-center gap-2 p-3 max-w-[250px]
                    border-solid border-[1px] border-zinc-500/20 rounded-md
                    cursor-pointer hover:bg-zinc-900/90"
                    onClick={() => {
                        setListedCollaborators(collaborators)
                        setFilterIsActive(false)
                    }}
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
                    onClick={() => {return navigate('/menu-inicial')}}
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