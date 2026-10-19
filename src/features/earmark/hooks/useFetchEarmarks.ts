import {useInfiniteQuery} from "@tanstack/react-query";
import {earmarkKeys} from "../queryKeys.ts";
import {fetchEarmarks} from "../api/earmark.ts";

const PAGE_SIZE = 20;

export function useFetchEarmarks() {
    return useInfiniteQuery({
        queryKey: earmarkKeys.paged(),
        queryFn: ({pageParam}) => fetchEarmarks(pageParam, PAGE_SIZE),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            const {number, totalPages} = lastPage.page;
            return number + 1 < totalPages ? number + 1 : undefined;
        },
    });
}