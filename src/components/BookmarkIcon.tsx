import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarkContextProvider";

type BookmarkIconProps = {
  id: number;
}
export default function BookmarkIcon({ id }: BookmarkIconProps) {

  const context = useContext(BookmarksContext);
  if (!context) throw new Error("BookmarkIcon must be used within BookmarkContextProvider");

  const { bookmarkedIds, handleToggleBookmark } = context;

  return (
    <button onClick={(e) => {
      handleToggleBookmark(id);
      e.stopPropagation();
      e.preventDefault()
    }} className="bookmark-btn">
      <BookmarkFilledIcon className={bookmarkedIds.includes(id) ? "filled" : ""} />
    </button>
  );
}
