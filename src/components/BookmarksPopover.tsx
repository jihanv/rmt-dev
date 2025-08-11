import { useBookmarksContextProvider } from "../lib/hooks";
import JobList from "./JobList";

export default function BookmarksPopover() {

  const { bookmarkedJobItems, isLoading } = useBookmarksContextProvider()

  console.log(bookmarkedJobItems)
  return <div className="bookmarks-popover">
    {!isLoading && <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />}
  </div>;
}
