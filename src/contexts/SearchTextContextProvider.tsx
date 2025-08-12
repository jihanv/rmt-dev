import { createContext, useState } from "react"
import { useDebounce } from "../lib/hooks";

type SearchTextContextProviderProps = {
    children: React.ReactNode;
};
export type SearchTextContextValue = {
    searchText: string;
    debouncedSearchText: string;
    handleChangeSearchText: (newSearchText: string) => void
};
export const SearchTextContext = createContext<SearchTextContextValue | null>(null)

export default function SearchTextContextProvider({ children }: SearchTextContextProviderProps) {

    const [searchText, setSearchText] = useState("")
    const debouncedSearchText = useDebounce(searchText, 1000)


    const handleChangeSearchText = (newSearchText: string) => {
        setSearchText(newSearchText)
    }


    return (
        <SearchTextContext.Provider value={{
            searchText,
            debouncedSearchText,
            handleChangeSearchText,
        }}>{children}
        </SearchTextContext.Provider>
    )
}
