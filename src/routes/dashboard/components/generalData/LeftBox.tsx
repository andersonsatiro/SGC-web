import { useContext } from "react"
import { GlobalContext } from "../../../../context/GlobalContext"

interface propsLeftBox {
    position: string,
    numberOfPeople: number,
    monthlyIncome: number,
    perCapita: number,
}

export function LeftBox({position, numberOfPeople, monthlyIncome, perCapita}: propsLeftBox) {

    const { dataExists } = useContext(GlobalContext)

    const transformToReal = (value: number) => {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
    }

    return(
        <div className='w-72 h-32 border-solid border-[1px] border-zinc-500 rounded hover:bg-zinc-900/70 cursor-pointer'>
            {dataExists ?
                <>
                    <main className='flex flex-col items-center justify-center h-2/3 border-b-solid border-b-[1px] border-b-zinc-500/30'>
                        <h1 className='text-zinc-200 text-2xl font-extrabold leading-5'>{numberOfPeople}</h1>
                        <h2 className='text-zinc-400 text-xs font-bold'>{position}</h2>
                    </main>

                    <footer className='h-1/3 px-4 flex items-center justify-between'>
                        <div className='flex flex-col items-start'>
                            <h3 className='text-zinc-400 text-[10px] font-semibold leading-3'>receita mensal</h3>
                            <h2 className='text-green-500 text-[10px] font-semibold'>{transformToReal(monthlyIncome)}</h2>
                        </div>
                        <div className='flex flex-col items-start'>
                            <h3 className='text-zinc-400 text-[10px]  font-semibold leading-3'>per capita</h3>
                            <h2 className='text-green-500 text-[10px]  font-semibold'>{transformToReal(perCapita)}</h2>
                        </div>
                    </footer>
                </>
            :
                <>
                    <main className='animate-pulse flex flex-col items-center justify-center h-2/3 border-b-solid border-b-[1px] border-b-zinc-500/30'>
                        <span className="rounded-full bg-zinc-900 h-6 w-6"></span>
                        <span className="mt-1 rounded-sm bg-zinc-900 h-2 w-12"></span>
                    </main>

                    <footer className='h-1/3 px-4 flex items-center justify-between'>
                        <div className='flex flex-col items-start'>
                            <span className="rounded-sm bg-zinc-900 h-2 w-10"></span>
                            <span className="mt-1 rounded-sm bg-zinc-900 h-2 w-14"></span>
                        </div>
                        <div className='flex flex-col items-start'>
                            <span className="rounded-sm bg-zinc-900 h-2 w-10"></span>
                            <span className="mt-1 rounded-sm bg-zinc-900 h-2 w-14"></span>
                        </div>
                    </footer>
                </>
            }
        </div>
    )
}