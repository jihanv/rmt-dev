import { useSearchTextContextProvider } from "../lib/hooks";

// import { useEffect, useState } from "react";
export default function SearchForm() {


  const { searchText, handleChangeSearchText } = useSearchTextContextProvider();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeSearchText(e.target.value);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        onChange={(e) => handleChange(e)}
        value={searchText}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
