import { Users2 } from 'lucide-react'

export function LeftContent() {
    return(
        <div className='hidden sm:flex flex-col items-center justify-between h-full w-1/2 bg-zinc-900'>
            <span></span>
            <Users2 className='h-16 w-16 text-zinc-400' strokeWidth={.6} />
            <p className='text-xs font-medium text-zinc-400 text-center
                mb-12 max-w-[296px]'>
                Entre em contato com o administrador para
                obter os seus dados de acesso ao sistema
            </p>
        </div>
    )
}