import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PaginationButtonProps } from "../lib/types";
import { useJobItemsContextProvider } from "../lib/hooks";


export default function PaginationControls() {

  const { handleChangePage, currentPage, totalNumberOfPages } = useJobItemsContextProvider()
  return <section className="pagination">
    {currentPage > 1 && <PaginationButton
      direction="previous"
      currentPage={currentPage}
      onClick={() => handleChangePage("previous")} />}
    {currentPage < totalNumberOfPages && <PaginationButton
      direction="next"
      currentPage={currentPage}
      onClick={() => handleChangePage("next")} />}
  </section>;
}


function PaginationButton({ direction, currentPage, onClick }: PaginationButtonProps) {
  return (
    <button onClick={(e) => {
      onClick();
      e.currentTarget.blur();
    }} className={`pagination__button pagination__button--${direction}`}>
      {direction === "previous" &&
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>}
      {direction === "next" &&
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>}
    </button>
  )
}