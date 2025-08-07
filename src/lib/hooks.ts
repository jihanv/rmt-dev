import { useEffect, useState } from "react";
import { JobItem, JobItemApiResponse } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

export function useOneJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const isLoading = isInitialLoading;
  const jobItem = data?.jobItem;
  return { jobItem, isLoading };
}

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const totalResults = jobItems.length;

  useEffect(() => {
    if (!searchText) {
      setJobItems([]);
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
        const data = await response.json();
        setJobItems(data.jobItems);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchText]);

  return { jobItems, isLoading, totalResults };
}

export function useDebounce<T>(value: T, delay = 500): T {
  console.log(value);
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounceValue;
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = Number(window.location.hash.slice(1));
      setActiveId(id);
    };
    window.addEventListener("hashchange", handleHashChange);

    handleHashChange();
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return activeId;
}
