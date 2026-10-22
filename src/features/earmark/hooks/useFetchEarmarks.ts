import {useInfiniteQuery} from "@tanstack/react-query";
import {earmarkKeys} from "../queryKeys.ts";
import {fetchEarmarks} from "../api/earmark.ts";
import type {EarmarkSort} from "../utils/earmarkSort.ts";

const PAGE_SIZE = 20;

export function useFetchEarmarks(sort: EarmarkSort) {
    return useInfiniteQuery({
        queryKey: earmarkKeys.paged(sort),
        queryFn: ({pageParam}) => fetchEarmarks(pageParam, PAGE_SIZE, sort),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            const {number, totalPages} = lastPage.page;
            return number + 1 < totalPages ? number + 1 : undefined;
        },
    });
}