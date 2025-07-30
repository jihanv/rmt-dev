import { useEffect, useState } from "react";

export default function SearchForm() {

  const [searchText, setSearchText] = useState("")
  const [jobItems, setJobItems] = useState([])

  useEffect(() => {
    if (!searchText) {
      return
    }

    const fetchData = async () => {
      const response = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`)
      const data = await response.json()

      setJobItems(data.jobItems)

      console.log(jobItems)
    }
    fetchData()
  }, [searchText])

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
