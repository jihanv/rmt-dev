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

export type JobItemProps = {
  jobItem: JobItem;
};

export type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};

export type SearchFormProps = {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
};
