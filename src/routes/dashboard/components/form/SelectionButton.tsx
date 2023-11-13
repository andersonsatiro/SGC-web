import { CheckCircle, ArrowDownCircle } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../../context/GlobalContext"

interface Jobs {
    id: string,
    name: string,
    influence: number
}

interface PropsButton {
    type: string;
}

export function SelectionButton(props: PropsButton) {

    const { leaderFormIsActive,
            leaders,
            jobPositions,
            leadershipPositions,
            setLeaderJobId,
            setCollaboratorJobId,
            setCollaboratorLeaderId,
        } = useContext(GlobalContext)

    const [showingOptions, setShowingOptions] = useState(false)
    const [content, setContent] = useState('')

    const handleWithOptions = () => {
        if(props.type === "jobs") {
            if(jobPositions != null && leadershipPositions != null){
                setShowingOptions(!showingOptions)
            }
        } else {
            if(leaders != null){
                setShowingOptions(!showingOptions)
            }
        }
    }

    const returnOptions = () => {
        return props.type === "jobs" ?
        (leaderFormIsActive ? leadershipPositions : jobPositions) :
        leaders
    }

    const selectedOptions = (job: Jobs) => {
        leaderFormIsActive ? setLeaderJobId(job.id) :
        (props.type == "jobs" ? setCollaboratorJobId(job.id) : setCollaboratorLeaderId(job.id))

        setShowingOptions(false)
        setContent(job.name)
    }

    useEffect(() => {
        setContent('')
    }, [leaderFormIsActive])

    return (
        <div className='relative'>
                    {content
                        ?   
                            <div 
                                className='w-full flex items-center justify-between px-3 py-2 text-xs text-white font-bold border-[1px]
                                border-solid border-indigo-950 bg-indigo-400 rounded-lg hover:bg-indigo-500 cursor-pointer'
                                onClick={handleWithOptions}
                            >
                                    <h1>{content}</h1>
                                    <CheckCircle className='w-4 h-4 text-white' />
                            </div>
                        :
                            <button onClick={handleWithOptions} className='w-full flex items-center justify-between px-3 py-2 text-xs text-zinc-400 border-[1px]
                                border-solid border-zinc-400 bg-zinc-950 rounded-lg hover:bg-zinc-800'
                            >
                                <p>
                                    {props.type === "jobs" ? 'Escolha o cargo' : 'Escolha a liderança'}
                                </p>
                                <ArrowDownCircle className='w-4 h-4 text-zinc-200' />
                            </button>
                    }

                        
                    {showingOptions ?
                        <div
                            className={`${props.type === "jobs" ? 'z-10' : 'z-20'} w-full absolute mt-1 border-solid border-[1px] 
                            bg-zinc-950 border-zinc-500/20 rounded-md cursor-pointer`}
                            >
                            {returnOptions().map((job: Jobs, index) => (
                                <div
                                    onClick={() => selectedOptions(job)}
                                    key={job.id}
                                    className={`flex items-center justify-between p-2 
                                    ${index !== returnOptions().length - 1 ? 'border-b-zinc-500/20 border-b-solid border-b-[1px]' : ''}
                                    hover:bg-zinc-900/90`}>
                                    <h1 className='text-zinc-200 text-xs mr-3'>{job.name}</h1>
                                    <p className='text-indigo-400 text-xs'>peso {job.influence}</p>
                                </div>
                            ))}
                            
                        </div>
                    : '' }
                </div>
    )
}