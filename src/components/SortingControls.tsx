import { SortingButtonProps, SortingControlProps } from "../lib/types";

export default function SortingControls({ handleSortBy, sortBy }: SortingControlProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        onClick={() => handleSortBy("relevant")}
        isActive={sortBy === "relevant"}>
        Relevant
      </SortingButton>

      <SortingButton
        onClick={() => handleSortBy("recent")}
        isActive={sortBy === "recent"}>
        Recent
      </SortingButton>
    </section >
  );
}


function SortingButton({ children, isActive, onClick }: SortingButtonProps) {

  return (<button onClick={onClick} className={`sorting__button sorting__button--relevant 
        ${isActive ? "sorting__button--active" : ""}`}>
    {children}
  </button>)

}