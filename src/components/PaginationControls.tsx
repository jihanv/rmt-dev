import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlsProps = {
  handleChangePage: (direction: string) => void,
  currentPage: number
}

export default function PaginationControls({ handleChangePage, currentPage }: PaginationControlsProps) {
  return <section className="pagination">
    <button onClick={() => handleChangePage("previous")} className="pagination__button">
      <ArrowLeftIcon />
      Page {currentPage - 1}</button>
    <button onClick={() => handleChangePage("next")} className="pagination__button">Page {currentPage + 1}
      <ArrowRightIcon /></button>

  </section>;
}
