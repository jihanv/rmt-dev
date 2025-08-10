import { createContext } from "react"
import { useLocalStorage } from "../lib/hooks";

type BookmarkContextProviderProps = {
    children: React.ReactNode
}
type BookmarkContextValue = {
    bookmarkedIds: number[];
    handleToggleBookmark: (id: number) => void;
};
export const BookmarksContext = createContext<BookmarkContextValue | null>(null)
export default function BookmarkContextProvider({ children }: BookmarkContextProviderProps) {

    const [bookmarkedIds, setBookmarkedIds] = useLocalStorage("bookmarkedIds", "[]")

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
        }}>{children}</BookmarksContext.Provider>
    )
}
