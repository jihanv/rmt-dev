import { useJobItemsContextProvider } from "../lib/hooks";

export default function ResultsCount() {

  const { totalResults } = useJobItemsContextProvider()
  return <p className="count"><span className="u-bold">{totalResults}</span> results</p>;
}
