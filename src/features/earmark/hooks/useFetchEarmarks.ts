import {useInfiniteQuery} from "@tanstack/react-query";
import {earmarkKeys} from "../queryKeys.ts";
import {fetchEarmarks} from "../api/earmark.ts";
import type {EarmarkSort} from "../utils/earmarkSort.ts";
import type {EarmarkStatus} from "../utils/earmarkFilters.ts";

const PAGE_SIZE = 20;

export function useFetchEarmarks(
    sort: EarmarkSort,
    q: string,
    status: EarmarkStatus | undefined,
    hasNote: boolean | undefined,
) {
    return useInfiniteQuery({
        queryKey: earmarkKeys.paged(sort, q, status, hasNote),
        queryFn: ({pageParam}) => fetchEarmarks(pageParam, PAGE_SIZE, sort, q, status, hasNote),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            const {number, totalPages} = lastPage.page;
            return number + 1 < totalPages ? number + 1 : undefined;
        },
    });
}