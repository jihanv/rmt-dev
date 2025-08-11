import { useActiveIdContextProvider } from "../lib/hooks";
import { JobItem, JobListProps } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({ jobItems, isLoading }: JobListProps) {
  const { activeId } = useActiveIdContextProvider()


  return (
    <ul className="job-list">
      {isLoading ? <Spinner /> : null}
      {!isLoading &&
        jobItems.map((jobItem: JobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={jobItem.id === activeId ? true : false} />
        ))}
    </ul>
  );
}

export default JobList;
