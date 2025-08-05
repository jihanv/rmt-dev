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
  console.log("ACTIVE: " + activeId);

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

  return [jobItem, isLoading] as const;
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

    const delayDebounce = setTimeout(() => {
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
    }, 1000);

    return () => {
      clearTimeout(delayDebounce);
    };
  }, [searchText]);

  return [jobItems, isLoading, totalResults] as const;
}
