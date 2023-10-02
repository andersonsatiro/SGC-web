import './App.css'
import { useContext } from 'react'
import { GlobalContext } from './context/GlobalContext'
import { Header } from './components/Header'
 

export function App() {
  const { click, count } = useContext(GlobalContext)
  return (
    <div className='h-screen bg-zinc-950'>
      <Header />
      <button onClick={click}>{count} cliques</button>
    </div>
  )
}
