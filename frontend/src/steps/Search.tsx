import { useEffect, useState } from "react";
import { type Data } from "../types";
import { useDebounce } from "@uidotdev/usehooks";
import { seachData } from "../services/search";
import { toast } from "sonner";

const DEBOUNCE_TIME = 200;

export const Search = ({ initialData }: { initialData: Data }) => {
  const [data, setData] = useState<Data>(initialData);
  const [search, setSearch] = useState<string>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("q") ?? "";
  });

  const debouncedSearch = useDebounce(search, DEBOUNCE_TIME);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const newPathName =
      debouncedSearch === ""
        ? window.location.pathname
        : `?q=${debouncedSearch}`;

    window.history.replaceState({}, "", newPathName);
  }, [debouncedSearch]);

  useEffect(() => {
    if (!debouncedSearch) {
      return;
    }
    // Call to api
    seachData(debouncedSearch).then(([err, newData]) => {
      if (err) {
        toast.error(err.message);
        return;
      }
      if (newData) setData(newData);
    });
  }, [debouncedSearch, initialData]);

  return (
    <div>
      <h1>Search</h1>
      <form action="">
        <input
          onChange={handleSearch}
          type="search"
          placeholder="Buscar información ..."
          defaultValue={search}
        />
      </form>

      <ul>
        {data.map((row) => (
          <li key={row.id}>
            <article>
              {Object.entries(row).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};
