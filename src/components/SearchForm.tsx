// import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";

export default function SearchForm({ searchText, setSearchText }: {
  searchText: string,
  setSearchText: Dispatch<SetStateAction<string>>
}) {


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
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
