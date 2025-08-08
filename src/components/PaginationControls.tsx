import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlsProps = {
  onClick: (direction: string) => void,
  currentPage: number
}

type PaginationButtonProps = PaginationControlsProps & {
  onClick: () => void,
  direction: string;
}

export default function PaginationControls({ onClick, currentPage }: PaginationControlsProps) {
  return <section className="pagination">
    <PaginationButton
      direction="previous"
      currentPage={currentPage}
      onClick={() => onClick("previous")} />
    <PaginationButton
      direction="next"
      currentPage={currentPage}
      onClick={() => onClick("next")} />
  </section>;
}


function PaginationButton({ direction, currentPage, onClick }: PaginationButtonProps) {
  return (
    <button onClick={onClick} className="pagination__button">
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