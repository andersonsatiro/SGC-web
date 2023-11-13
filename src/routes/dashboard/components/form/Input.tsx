import { useContext } from "react"
import { GlobalContext } from "../../../../context/GlobalContext"

interface PropsInput {
    type: string,
    placeholder: string
}

export function Input(props: PropsInput) {
    const { handleInput} = useContext(GlobalContext)

    return(
        <input
        onChange={(e) => handleInput(e.target.value, props.type, props.placeholder)}
        className={`${props.placeholder === "salário" ? 'col-start-1 col-span-2 text-center' : ''} px-3 py-2 text-xs text-zinc-400 border-[1px] border-solid border-zinc-400 bg-zinc-950 rounded-lg`}
        type={props.type}
        placeholder={props.placeholder}
        />
    )
}