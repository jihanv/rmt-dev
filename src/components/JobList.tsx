import { JobItem, JobListProps } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({ jobItems, isLoading }: JobListProps) {
  return (
    <ul className="job-list">
      {isLoading ? <Spinner /> : null}
      {!isLoading && jobItems.map((jobItem: JobItem) => <JobListItem jobItem={jobItem} />)}
    </ul>

  );
}

export default JobList;
