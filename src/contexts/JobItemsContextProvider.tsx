import { createContext, useState } from "react"
import { useSearchQuery, useSearchTextContextProvider } from "../lib/hooks";
import { JobItem, PageDirection, SortBy } from "../lib/types";
import { RESULTS_PER_PAGE } from "../lib/constants";


export const JobItemsContext = createContext<JobItemsContextValue | null>(null)

type JobItemsContextProviderProps = {
    children: React.ReactNode;
};

export type JobItemsContextValue = {
    jobItems: JobItem[] | undefined;
    jobItemsSliced: JobItem[];
    isLoading: boolean;
    totalResults: number;
    totalNumberOfPages: number;
    currentPage: number;
    sortBy: SortBy;
    handleChangePage: (direction: PageDirection) => void;
    handleSortBy: (newSort: SortBy) => void;
};
export default function JobItemsContextProvider({ children }: JobItemsContextProviderProps) {

    const { debouncedSearchText } = useSearchTextContextProvider()
    const { jobItems, isLoading } = useSearchQuery(debouncedSearchText)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState<SortBy>("relevant")

    const jobsItemsSorted = [...(jobItems || [])]?.sort((a, b) => {
        if (sortBy === "relevant") {
            return b.relevanceScore - a.relevanceScore
        } else {
            return a.daysAgo - b.daysAgo
        }
    })

    const totalResults = jobItems?.length || 0
    const totalNumberOfPages = totalResults / RESULTS_PER_PAGE
    const jobItemsSliced = jobsItemsSorted?.slice(currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE) || []

    const handleChangePage = (direction: PageDirection) => {
        if (direction === "next") {
            setCurrentPage(((prev: number) => prev + 1))
        } else if (direction === "previous") {
            setCurrentPage(((prev: number) => prev - 1))
        }
    }

    const handleSortBy = (newSort: SortBy) => {
        setSortBy(newSort);
        setCurrentPage(1);
    }



    return (
        <JobItemsContext.Provider value={{
            jobItems,
            jobItemsSliced,
            isLoading,
            totalResults,
            totalNumberOfPages,
            currentPage,
            sortBy,
            handleChangePage,
            handleSortBy,
        }}>{children}
        </JobItemsContext.Provider>
    )
}
