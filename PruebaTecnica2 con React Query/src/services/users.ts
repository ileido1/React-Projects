
export const fetchUsers = async({pageParam = 1}:{pageParam?:number}) => {
    return fetch(`https://randomuser.me/api/?results=10&seed=midu&page=${pageParam}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Error");
        return await res.json();
      })
      .then((res) => {
        const currentPage = Number(res.info.page);
        const nextCursor = currentPage> 10 ? undefined: res.info.page + 1;
        return {
          results: res.results,
          nextCursor,
        }
        }
    );
  };