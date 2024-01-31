import { ArrowUp01, Briefcase, ChevronsDown, Users, HelpingHand, CheckCircle } from 'lucide-react'
import { useContext, useState } from 'react'
import { GlobalContext } from '../../../context/GlobalContext'

export function WorkModal() {
    const { setWorkModalIsActive } = useContext(GlobalContext)
    const [ chooseJobTypeIsActive, setChooseJobTypeIsActive] = useState(false)
    const [ typeOfPosition, setTypeOfPosition ] = useState("")

    const [nameOfPosition, setNameOfPosition] = useState("")
    const [weightOfThePosition, setWeightOfThePosition] = useState("")

    const choosingLeaderAsType = () => {
        setTypeOfPosition("leader")
        setChooseJobTypeIsActive(false)
    }

    const choosingCollaboratorAsType = () => {
        setTypeOfPosition("collaborator")
        setChooseJobTypeIsActive(false)
    }

    // CONTINUAR AQUI!!!
    const registerNewPosition = () => {
        if(typeOfPosition === ""){
            console.log("campo de tipo de cargo vazio")
        } else {
            console.log("campo de tipo de cargo preenchido")
        }
    }

    return(
        <div className="flex items-center justify-center fixed z-30 w-full h-full bg-zinc-950/80">
            <div className="w-96 h-64 rounded-lg">

                <header className="flex items-center justify-center w-full h-14 bg-indigo-400 rounded-t-lg">
                    <h1 className="text-zinc-100 text-base font-bold">novo cargo</h1>
                </header>

                <main className="flex flex-col items-center justify-between w-full h-full bg-zinc-200 rounded-b-lg">

                    <section className="flex flex-col items-center gap-2 mt-10 text-xs text-zinc-400 font-medium w-52">

                        <div className="relative w-full" >
                            <div
                                className={`flex items-center justify-between w-full pl-3 pr-2 py-2 border border-indigo-400 rounded-md
                                ${typeOfPosition != "" ? 'bg-indigo-400 hover:bg-indigo-500 text-zinc-200': 
                                'bg-white hover:bg-zinc-100'} hover:cursor-pointer`}

                                onClick={() => setChooseJobTypeIsActive(!chooseJobTypeIsActive)}>
                                <p>
                                    {typeOfPosition === "leader"
                                        ? 'cargo de liderança'
                                        : typeOfPosition === "collaborator"
                                        ? 'cargo de colaborador'
                                        : 'tipo do cargo'
                                    }
                                </p>

                                {typeOfPosition === ""
                                    ? <ChevronsDown className='text-indigo-400 w-4 h-4'/>
                                    : <CheckCircle  className='text-zinc-200 w-4 h-4'/>
                                }

                                
                            </div>
                            {chooseJobTypeIsActive &&
                                <section className='text-zinc-200 absolute w-full z-20 mt-2'>
                                    <div
                                        className='flex items-center justify-between w-full pl-3 pr-2 py-3 rounded-t-md
                                        bg-indigo-400 hover:cursor-pointer hover:bg-indigo-500 mb-[.5px]'
                                        onClick={choosingLeaderAsType}>
                                        <p>cargo de liderança</p>  
                                        <Users className='text-zinc-200 w-4 h-4'/>
                                    </div>
                                    <span className='bg-zinc-300 w-full h-1'></span>
                                    <div
                                        className='flex items-center justify-between w-full pl-3 pr-2 py-3  rounded-b-md
                                        bg-indigo-400 hover:cursor-pointer hover:bg-indigo-500'
                                        onClick={choosingCollaboratorAsType}>
                                        <p>cargo de colaborador</p>
                                        <HelpingHand className='text-zinc-200 w-4 h-4'/>
                                    </div>
                                </section>
                            }                          
                        </div>

                        <div className="relative w-full">
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-indigo-400 rounded-md"
                                placeholder="nome do cargo"
                                onChange={(e) => setNameOfPosition(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <Briefcase className='text-indigo-400 w-4 h-4' />
                            </div>
                        </div>

                        <div className="relative w-full">
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-indigo-400 rounded-md"
                                placeholder="peso do cargo"
                                onChange={(e) => setWeightOfThePosition(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ArrowUp01 className='text-indigo-400 w-4 h-4' />
                            </div>
                        </div>

                    </section>

                    <div className="flex gap-2 text-sm text-zinc-100 font-bold mb-5">
                        <button
                            className="w-40 py-2 rounded-md bg-red-800 hover:bg-red-800/80"
                            onClick={() => setWorkModalIsActive(false)}>
                            cancelar
                        </button>
                        <button
                            className="w-40 py-2 rounded-md bg-indigo-500 hover:bg-indigo-400"
                            onClick={registerNewPosition}
                            >
                            cadastar                        
                        </button>
                    </div>

                </main>

            </div>
        </div> 
    )
}