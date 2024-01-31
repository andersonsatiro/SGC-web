import { Briefcase } from 'lucide-react'
import { useContext } from 'react'
import { GlobalContext } from '../../../../context/GlobalContext'
import { SelectionButton } from './SelectionButton'
import { Input } from './Input'
import { useMediaQuery } from 'react-responsive'

export function FullForm(){
    const { 
        leaderFormIsActive,
        submitFormLeader,
        submitFormCollaborator,
        formErrorMessageIsActive,
        formErrorMessage,
        submitState,
        workModalIsActive,
        setWorkModalIsActive,
    } = useContext(GlobalContext)

    const screenSmaller400 = useMediaQuery({maxWidth: 399})

    return (
        <div className='flex flex-col items-center justify-center gap-4'>
                    <Briefcase
                        className='w-6 h-6 text-zinc-400 hover:cursor-pointer hover:text-zinc-500'
                        onClick={() => setWorkModalIsActive(!workModalIsActive)}
                    />
            
                    <main 
                        className={`${leaderFormIsActive ? 'flex flex-col gap-2' :
                        screenSmaller400 ? 'flex flex-col gap-3 w-64' :
                        'grid grid-cols-2 grid-flow-dense gap-2'}`}
                    >
                        
                        <Input type="text" placeholder="Digite o nome" />
                        <SelectionButton type="jobs" />
                        

                        {!leaderFormIsActive ?
                            <>
                                <Input type="number" placeholder="Nível de influência [1-5]" />
                                <SelectionButton type="leaders" />
                                <Input type="number" placeholder="salário" />
                            </>
                        : ''}

                    </main>

                    <footer className='flex flex-col w-full gap-1'>
                        <div className='flex items-center gap-2'>
                            <div data-error-message={formErrorMessageIsActive} className='w-full h-[0.5px] bg-zinc-500 data-[error-message=true]:bg-red-300'></div>
                            {formErrorMessageIsActive ? 
                                    <p className='text-[10px] font-medium whitespace-nowrap text-red-300'> {formErrorMessage} </p>
                                :
                                    <p className='text-zinc-400 text-[10px] whitespace-nowrap'>
                                    Sistema de Gestão de Cargos
                                    </p>
                            }
                            <div data-error-message={formErrorMessageIsActive} className='w-full h-[0.5px] bg-zinc-500 data-[data-error-message=true]:bg-red-300'></div>
                        </div>
                    
                        <button
                            onClick={leaderFormIsActive ? submitFormLeader : submitFormCollaborator}
                            className={`w-full py-2 text-sm text-white font-bold bg-indigo-400 rounded-lg hover:bg-indigo-500
                                ${submitState == 'cadastrando' && 'bg-indigo-800 hover:bg-indigo-800 cursor-not-allowed'}
                                ${submitState == 'sucesso' && 'bg-teal-700 hover:bg-teal-800 cursor-not-allowed'}
                            `}
                            disabled={submitState != 'cadastrar' ? true : false}
                            >
                            {submitState}
                        </button>
                    </footer>
                </div>
    )
}