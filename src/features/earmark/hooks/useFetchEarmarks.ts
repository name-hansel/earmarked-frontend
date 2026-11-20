import {useInfiniteQuery} from "@tanstack/react-query";
import {earmarkKeys} from "../queryKeys.ts";
import {fetchEarmarks} from "../api/earmark.ts";
import type {EarmarkSort} from "../utils/earmarkSort.ts";
import {type EarmarkRating, type EarmarkStatus} from "../utils/filter.ts";

const PAGE_SIZE = 20;

export function useFetchEarmarks(
    sort: EarmarkSort,
    q: string,
    status: EarmarkStatus | undefined,
    hasNote: boolean | undefined,
    rating: EarmarkRating | undefined,
) {
    return useInfiniteQuery({
        queryKey: earmarkKeys.paged(sort, q, status, hasNote, rating),
        queryFn: ({pageParam}) => fetchEarmarks(pageParam, PAGE_SIZE, sort, q, status, hasNote, rating),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            const {number, totalPages} = lastPage.page;
            return number + 1 < totalPages ? number + 1 : undefined;
        },
    });
}