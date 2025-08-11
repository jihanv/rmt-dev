import { createContext } from "react"
import { useJobItems, useLocalStorage } from "../lib/hooks";
import { BookmarkContextProviderProps, BookmarkContextValue } from "../lib/types";


export const BookmarksContext = createContext<BookmarkContextValue | null>(null)
export default function BookmarkContextProvider({ children }: BookmarkContextProviderProps) {

    const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>("bookmarkedIds", [])

    const { jobItems: bookmarkedJobItems, isLoading } = useJobItems(bookmarkedIds)


    const handleToggleBookmark = (id: number) => {
        if (bookmarkedIds.includes(id)) {
            setBookmarkedIds((prev) => prev.filter((item) => item !== id))
        } else {
            setBookmarkedIds((prev) => [...prev, id])
        }
    }
    return (
        <BookmarksContext.Provider value={{
            bookmarkedIds,
            handleToggleBookmark,
            bookmarkedJobItems,
            isLoading
        }}>{children}</BookmarksContext.Provider>
    )
}
