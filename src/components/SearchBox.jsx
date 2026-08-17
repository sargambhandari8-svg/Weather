import { useState } from "react";

function SearchBox({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    onSearch(city);
  };

  return (
    <form
      className="search-box"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search any city or country..."
        value={city}
        onChange={(event) =>
          setCity(event.target.value)
        }
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBox;