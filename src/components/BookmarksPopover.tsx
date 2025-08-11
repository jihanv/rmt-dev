import { forwardRef } from "react";
import { useBookmarksContextProvider } from "../lib/hooks";
import JobList from "./JobList";
import { createPortal } from "react-dom";

const BookmarksPopover = forwardRef<HTMLDivElement>(
  function (_, ref) {
    const { bookmarkedJobItems, isLoading } = useBookmarksContextProvider()

    return createPortal(<div ref={ref} className="bookmarks-popover">
      {!isLoading && <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />}
    </div>, document.body);
  })

export default BookmarksPopover