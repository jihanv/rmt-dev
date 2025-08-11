import { createContext } from "react"
import { ActiveIdContextProviderProps, ActiveIdContextValue } from "../lib/types";
import { useActiveId } from "../lib/hooks";


export const ActiveIdContext = createContext<ActiveIdContextValue | null>(null)
export default function ActiveIdContextProvider({ children }: ActiveIdContextProviderProps) {


    const activeId = useActiveId()
    return (
        <ActiveIdContext.Provider value={{
            activeId,
        }}>{children}
        </ActiveIdContext.Provider>
    )
}
