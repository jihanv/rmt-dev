// import { useBookmarksContextProvider } from "../lib/hooks";
// import JobList from "./JobList";

// export default function BookmarksPopover() {

//   const { bookmarkedJobItems, isLoading } = useBookmarksContextProvider()

//   console.log(bookmarkedJobItems)
//   return <div className="bookmarks-popover">
//     {!isLoading && <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />}
//   </div>;
// }


import { forwardRef } from "react";
import { useBookmarksContextProvider } from "../lib/hooks";
import JobList from "./JobList";

const BookmarksPopover = forwardRef<HTMLDivElement>(
  function (_, ref) {
    const { bookmarkedJobItems, isLoading } = useBookmarksContextProvider()

    return (<div ref={ref} className="bookmarks-popover">
      {!isLoading && <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />}
    </div>);
  })

export default BookmarksPopover