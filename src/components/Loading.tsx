import { twMerge } from 'tailwind-merge'

interface LoadingProps {
    className ?: string
}
export function Loading({className}: LoadingProps){
    return (
        <div className={twMerge("animate-spin border-b-solid border-b-2 border-b-indigo-500 h-4 w-4 rounded-full", className)}/>
    )
}