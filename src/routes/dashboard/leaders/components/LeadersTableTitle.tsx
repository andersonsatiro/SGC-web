import { ElementType } from "react"

interface leadersTableTitleProps {
    name: string,
    icon: ElementType,
}

export function LeadersTableTitle({name, icon: Icon}: leadersTableTitleProps) {
    return(
        <section className="flex items-center justify-center w-1/5">
            <div className="flex flex-col items-center">
                <h2 className="text-base text-zinc-200 font-semibold leading-5">{name}</h2>
                <Icon className="h-3 w-3 text-zinc-500"/>
            </div>
        </section>
    )
}
