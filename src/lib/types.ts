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
