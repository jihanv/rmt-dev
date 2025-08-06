import { useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";

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

export function useOneJobItem(id: number | null) {
  const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    console.log(id);
    //fetch data
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}/${id}`);
      const data = await response.json();
      setIsLoading(false);
      setJobItem(data.jobItem);
    };
    fetchData();
  }, [id]);

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
