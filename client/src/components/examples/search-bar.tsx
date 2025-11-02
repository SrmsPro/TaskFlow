import { SearchBar } from "../search-bar";
import { useState } from "react";

export default function SearchBarExample() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-6">
      <SearchBar value={search} onChange={setSearch} />
    </div>
  );
}
