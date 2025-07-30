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

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced: JobItem[] = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) {
      console.log("No search text — clearing results");
      setJobItems([]);
      return;
    }

    console.log(`Effect triggered for searchText: "${searchText}"`);

    const delayDebounce = setTimeout(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
          );
          const data = await response.json();
          console.log("Fetched data:", data.jobItems);
          setJobItems(data.jobItems);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, 100);

    return () => {
      clearTimeout(delayDebounce);
    };
  }, [searchText]);

  return [jobItemsSliced, isLoading] as const;
}
