
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/users";

export const useUsers = () => {
    const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage} = 
    useInfiniteQuery({
      queryKey: ['projects'],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
  })

  return {
    isLoading, isError, data, refetch, fetchNextPage, hasNextPage,
    users: data?.pages.flatMap((page) => page.results) ?? [],

  }
}