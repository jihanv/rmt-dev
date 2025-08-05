import { ResultsCountProps } from "../lib/types";

export default function ResultsCount({ totalResults }: ResultsCountProps) {

  return <p className="count"><span className="u-bold">{totalResults}</span> results</p>;
}
