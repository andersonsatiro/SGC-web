import { Users2, ArrowDownAZ, BarChart4, LogOut } from 'lucide-react'
export function Header() {
    return(
        <header className="flex items-center justify-between px-5 h-20 border-b-solid border-b-2 border-b-zinc-500/20">
            <div className='flex items-center gap-7 text-zinc-200 font-bold'>
                <div
                className="flex items-center gap-3 p-3 max-w-[150px]
                border-solid border-[1px] border-zinc-500/20 rounded-md
                cursor-pointer hover:bg-zinc-900/70">

                    <Users2 className='h-5 w-5 text-zinc-200' strokeWidth={1} />
                    <h2 className='text-xs'>Lideranças</h2>
                    <ArrowDownAZ  className='h-5 w-5 text-zinc-200' strokeWidth={1}/>
                
                </div>
                <h1 className='text-base cursor-pointer hover:text-zinc-300'>Colaboradores</h1>
                <h1 className='text-base cursor-pointer hover:text-zinc-300'>Estatísticas</h1>
            </div>

            <div
                className="flex items-center gap-3 p-3 max-w-[250px]
                border-solid border-[1px] border-zinc-500/20 rounded-md
                cursor-pointer hover:bg-zinc-900/70">

                <BarChart4 className='h-3.5 w-3.5 text-zinc-200' strokeWidth={1} />
                <h2 className='text-zinc-200 text-xs font-boldwhitespace-nowrap'>
                    Sistema de Gestão de Cargos
                </h2>
                <LogOut className='h-3.5 w-3.5 text-red-500' strokeWidth={3}/>
            </div>
        </header>
    )
}