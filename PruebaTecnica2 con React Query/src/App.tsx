import {  useMemo, useState } from "react";
import "./App.css";
import { SortBy, type User } from "./types.d";
import UsersList from "./components/UsersLists";
import { Options } from "./components/Options";
import { useUsers } from "./hooks/useUser";




function App() {

const {isLoading,isError,users,refetch,fetchNextPage,hasNextPage} = useUsers();


const [color, setColor] = useState(false);
  const [sorting, SetSorting] = useState<SortBy>(SortBy.NONE);
  // const originalusers = useRef<User[]>([]);
  const [FilterCountry, setFilterCountry] = useState<string | null>(null);
  function setColorTable() {
    setColor(!color);
  }
  function SortCountry() {
    const newSortyValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    SetSorting(newSortyValue);
  }
  const deteleUser = (id: string) => {
  };
  const setReset = async () => {
    await refetch()
  };
  const ChangeFilterCountry = (country: string) => {
    setFilterCountry(country);
  };

  const HandleChangeSort = (sort: SortBy) => {
    SetSorting(sort);
  };
  const FilteredUsers = useMemo(() => {
    return FilterCountry
      ? users.filter((user) =>
          user.location.country
            .toLowerCase()
            .includes(FilterCountry.toLowerCase())
        )
      : users;
  }, [users, FilterCountry]);

  const SortedUsers = useMemo(() => {
    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
      [SortBy.COUNTRY]: (user) => user.location.country,
    };
    return sorting === SortBy.NONE
      ? [...FilteredUsers]
      : [...FilteredUsers].sort((a, b) => {
          const extractProperty = compareProperties[sorting];
          return extractProperty(a).localeCompare(extractProperty(b));
        });
  }, [sorting, FilteredUsers]);

  return (
    <>
      <h1>Random User</h1>
      <Options
        setColor={setColorTable}
        setSortCountry={SortCountry}
        sort={sorting}
        setReset={setReset}
        setFilterCountry={ChangeFilterCountry}
      />
     
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && isError && <h1>Error</h1>}
      {!isLoading && !isError && users.length === 0 && <h1>No users</h1>}
      {!isLoading && !isError && users.length > 0 && 
        <UsersList
          changeSorting={HandleChangeSort}
          users={SortedUsers}
          color={color}
          handleDelete={deteleUser}
        />}
      {!isLoading && !isError && hasNextPage && (
        <button onClick={() =>fetchNextPage()}>
          Load more
        </button>
      )}
    </>
  );
}

export default App;
