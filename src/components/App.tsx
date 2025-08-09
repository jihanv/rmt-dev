import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import { useDebounce, useJobItems } from "../lib/hooks";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { SortBy } from "../lib/types";

function App() {

  const [searchText, setSearchText] = useState("")
  const debounceSearch = useDebounce(searchText, 1000)
  const { jobItems, isLoading } = useJobItems(debounceSearch)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortBy>("relevant")

  const jobsItemsSorted = jobItems?.sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore
    } else {
      return a.daysAgo - b.daysAgo
    }
  })
  const totalResults = jobItems?.length || 0
  const totalNumberOfPages = totalResults / RESULTS_PER_PAGE
  const jobItemsSliced = jobsItemsSorted?.slice(currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE) || []

  const handleChangePage = (direction: string) => {
    if (direction === "next") {
      setCurrentPage(((prev: number) => prev + 1))
    } else if (direction === "previous") {
      setCurrentPage(((prev: number) => prev - 1))
    }
  }

  const handleSortBy = (newSort: SortBy) => {
    console.log(newSort)
    setSortBy(newSort)
  }

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container>
        <Sidebar >
          <SidebarTop>
            <ResultsCount totalResults={totalResults} />
            <SortingControls sortBy={sortBy} handleSortBy={handleSortBy} />
          </SidebarTop>
          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
          <PaginationControls onClick={handleChangePage} currentPage={currentPage} totalNumberOfPages={totalNumberOfPages} />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>

  );
}

export default App;
