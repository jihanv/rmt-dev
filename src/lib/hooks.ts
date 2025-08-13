import { useContext, useEffect, useState } from "react";
import {
  JobItemApiResponse,
  JobItemExpanded,
  JobItemsApiResponse,
} from "./types";
import { BASE_API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";
import { BookmarksContext } from "../contexts/BookmarkContextProvider";
import { ActiveIdContext } from "../contexts/ActiveIdContextProvider";
import { SearchTextContext } from "../contexts/SearchTextContextProvider";
import { JobItemsContext } from "../contexts/JobItemsContextProvider";

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
      onError: handleError,
    }
  );
  const isLoading = isInitialLoading;
  const jobItem = data?.jobItem;
  return { jobItem, isLoading };
}

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    })),
  });
  const jobItems = results
    .map((result) => result.data?.jobItem)
    .filter((jobItem) => jobItem !== undefined) as JobItemExpanded[];

  const isLoading = results.some((results) => results.isLoading);
  return { jobItems, isLoading };
}

export function useSearchQuery(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => (searchText ? fetchJobItems(searchText) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: handleError,
    }
  );
  const isLoading = isInitialLoading;
  const jobItems = data?.jobItems;
  return { jobItems, isLoading };
}

export function useDebounce<T>(value: T, delay = 500): T {
  value;
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

// export function useLocalStorage<T>(
//   key: string,
//   initialValue: T
// ): [T, React.Dispatch<React.SetStateAction<T>>] {
//   const [value, setValue] = useState(() =>
//     JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
//   );

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [value, key]);

//   return [value, setValue] as const;
// }

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue; // SSR-safe
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      // corrupted value or JSON parse error
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage may be full / denied — ignore
    }
  }, [key, value]);

  return [value, setValue]; // <-- no "as const"
}
//------------------------------------------------

export function useBookmarksContextProvider() {
  const context = useContext(BookmarksContext);
  if (!context)
    throw new Error(
      "useBookmarksContextProvider must be used within BookmarkContextProvider"
    );

  return context;
}

export function useActiveIdContextProvider() {
  const context = useContext(ActiveIdContext);
  if (!context)
    throw new Error(
      "useActiveIdContext must be used within ActiveIdContextProvider"
    );

  return context;
}

export function useSearchTextContextProvider() {
  const context = useContext(SearchTextContext);
  if (!context)
    throw new Error(
      "useSearchTextContextProvider must be used within SearchTextContextProvider"
    );

  return context;
}

export function useJobItemsContextProvider() {
  const context = useContext(JobItemsContext);
  if (!context)
    throw new Error(
      "useJobItemsContextProvider must be used within JobItemsContextProvider"
    );

  return context;
}

export function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        refs.every((ref) => !ref.current?.contains(e.target as Node))
      ) {
        handler();
      }
    };
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [refs, handler]);
}
