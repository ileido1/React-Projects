import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { SortBy, type User } from "./types.d";
import UsersList from "./components/UsersLists";
import { Options } from "./components/Options";

const fetchUsers = (page: number) => {
  return fetch(
    `https://randomuser.me/api/?results=10&seed=midu&page=${page}`
  ).then(async (res) => {
    if(!res.ok) throw new Error('Error')
    return await res.json()})
  .then((res) => res.results)
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [color, setColor] = useState(false);
  const [sorting, SetSorting] = useState<SortBy>(SortBy.NONE);
  const originalusers = useRef<User[]>([]);
  const [FilterCountry, setFilterCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setLoading(true);
    fetchUsers(currentPage).then((res) => {
        setUsers(prevUsers => {
        if(currentPage === 1) {
          originalusers.current = res;
          return res;
        }
        const newUsers= prevUsers.concat(res);
        originalusers.current = newUsers;
       return newUsers
      })})
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  function setColorTable() {
    setColor(!color);
  }
  function SortCountry() {
    const newSortyValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    SetSorting(newSortyValue);
  }
  const deteleUser = (id: string) => {
    const newUsers = users.filter((user) => user.login.uuid !== id);
    setUsers(newUsers);
  };
  const setReset = () => {
    setUsers(originalusers.current);
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
      {users.length > 0 && (
        <UsersList
          changeSorting={HandleChangeSort}
          users={SortedUsers}
          color={color}
          handleDelete={deteleUser}
        />
      )}
      {loading && <h1>Loading...</h1>}
      {!loading && error && <h1>Error</h1>}
      {!loading && !error && users.length === 0 && <h1>No users</h1>}

      {!loading && !error && (
        <button onClick={() => setCurrentPage(currentPage + 1)}>
          Load more
        </button>
      )}
    </>
  );
}

export default App;
