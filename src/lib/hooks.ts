// import { useEffect, useState } from "react";
// import { JobItem } from "./types";

// export function useJobItems(searchText: string) {
//   const [jobItems, setJobItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const jobItemsSliced: JobItem[] = jobItems.slice(0, 7);
//   useEffect(() => {
//     if (!searchText) {
//       return;
//     }

//     const fetchData = async () => {
//       setIsLoading(true);
//       const response = await fetch(
//         `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
//       );
//       const data = await response.json();
//       setIsLoading(false);
//       setJobItems(data.jobItems);
//     };
//     fetchData();
//   }, [searchText]);

//   return [jobItemsSliced, isLoading] as const;
// }

import { useEffect, useState } from "react";
import { JobItem } from "./types";

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = Number(window.location.hash.slice(1));
      setActiveId(id);
    };
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
}

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced: JobItem[] = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) {
      setJobItems([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
          );
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

  return [jobItemsSliced, isLoading] as const;
}
