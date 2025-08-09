import { Dispatch, SetStateAction } from "react";

export type JobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  date: string;
  relevanceScore: number;
  daysAgo: number;
};

export type JobItemExpanded = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  salary: string;
  location: string;
  coverImgURL: string;
  companyURL: string;
};

export type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};

export type SearchFormProps = {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
};

export type JobItemProps = {
  jobItem: JobItemExpanded | null | JobItem;
  isActive: boolean;
};

export type ResultsCountProps = {
  totalResults: number;
};

export type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

export type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

export type PaginationControlsProps = {
  onClick: (direction: PageDirection) => void;
  currentPage: number;
  totalNumberOfPages: number;
};

export type PaginationButtonProps = {
  onClick: () => void;
  currentPage: number;
  direction: PageDirection;
};

export type SortBy = "relevant" | "recent";

export type SortingControlProps = {
  handleSortBy: (newSort: SortBy) => void;
  sortBy: SortBy;
};

export type PageDirection = "next" | "previous";
