import { ClipboardPaste } from "lucide-react";

export function Forms(){
    return(
        <form className='flex items-center justify-center flex-col gap-6'>
          <ClipboardPaste className='text-zinc-400 w-6 h-6' />
          <div className='flex flex-col gap-2'>
            <input type="text" className='p-3 min-w-[280px] bg-zinc-950 border-[1px] border-solid border-zinc-400 rounded-md text-zinc-400 text-xs font-medium' placeholder='Usuário' />
            <input type="password" className='p-3 min-w-[280px] bg-zinc-950 border-[1px] border-solid border-zinc-400 rounded-md text-zinc-400 text-xs font-medium' placeholder='Senha' />
          </div>
      
          <div className='flex flex-col items-center gap-3 w-full'>
            <div className='w-full flex items-center gap-3'>
              <div className='w-full border-[.5px] border-solid border-zinc-500 bg-green-100'></div>
              <p className='text-xs font-medium text-zinc-400 whitespace-nowrap'>ir para a página principal</p>
              <div className='w-full border-[.5px] border-solid border-zinc-500 bg-green-100'></div>
            </div>

            <button className='w-full text-white text-sm font-bold p-3 bg-indigo-500 rounded-md hover:bg-indigo-400'>Entrar</button>
          </div>
        </form>

    )
}