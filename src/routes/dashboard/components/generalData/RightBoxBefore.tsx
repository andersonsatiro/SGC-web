
export function RightBoxBefore() {
    return (
        <div className='w-72 h-32 border-solid border-[1px] border-zinc-500 rounded hover:bg-zinc-900/70 cursor-pointer'>
            <header className='h-1/3 flex items-center justify-between px-3 py-4 border-b-solid border-b-[1px] border-b-zinc-500/30'>
                <span className="rounded-sm bg-zinc-900 h-2 w-40"></span>
                <span className="rounded-full bg-zinc-900 h-3 w-3"></span>
            </header>

            <main className='flex h-2/3'>
                <div className='flex flex-col items-center gap-2 justify-center w-1/2 h-full border-r-solid border-r-[1px] border-r-zinc-500/30'>
                    <div className='flex flex-col items-center'>
                        <span className="rounded-sm bg-zinc-900 h-2 w-10"></span>
                        <span className="mt-1 rounded-sm bg-zinc-900 h-2 w-16"></span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <span className="rounded-sm bg-zinc-900 h-2 w-14"></span>
                        <span className="mt-1 rounded-sm bg-zinc-900 h-2 w-16"></span>
                    </div>
                </div>

                <div className='flex flex-col items-center gap-2 justify-center w-1/2 h-full'>
                    <div className='flex flex-col items-center'>
                        <span className="rounded-sm bg-zinc-900 h-2 w-10"></span>
                        <span className="mt-1 rounded-sm bg-zinc-900 h-2 w-16"></span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <span className="rounded-sm bg-zinc-900 h-2 w-10"></span>
                        <span className="mt-1 rounded-sm bg-zinc-900 h-2 w-16"></span>
                    </div>
                </div>
            </main>
        </div>
    )
}