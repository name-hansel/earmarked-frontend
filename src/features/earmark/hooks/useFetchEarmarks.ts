import {useQuery} from "@tanstack/react-query";
import {earmarkKeys} from "../queryKeys.ts";
import {fetchRecentEarmarks} from "../api/earmark.ts";

const RECENT_EARMARKS_COUNT = 5;

export function useRecentEarmarks() {
    return useQuery({
        queryKey: earmarkKeys.recent(RECENT_EARMARKS_COUNT),
        queryFn: () => fetchRecentEarmarks(RECENT_EARMARKS_COUNT),
    });
}