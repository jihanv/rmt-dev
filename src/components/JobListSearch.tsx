import { useJobItemsContextProvider } from "../lib/hooks"
import JobList from "./JobList"

export default function JobListSearch() {

    const { jobItemsSliced, isLoading } = useJobItemsContextProvider()
    return (
        <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
    )
}
