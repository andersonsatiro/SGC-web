import './App.css'
import { LeftContent } from './components/LeftContent'
import { Forms } from './components/Forms'

export function App() {
  return (
    <div className='flex h-screen'>
      <LeftContent />

      <div className='flex flex-col items-center justify-between h-full w-1/2 bg-zinc-950'>
        <div className='flex justify-end w-full mt-5 px-6'>
          <h2 className='text-zinc-400 text-base font-bold'>Login</h2>
        </div>
        <Forms />
        <span></span>
      </div>

    </div>
  )
}

