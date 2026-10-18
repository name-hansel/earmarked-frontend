import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ALREADY_EARMARKED_CODE, createEarmark} from "../api/earmark.ts";
import {earmarkKeys} from "../queryKeys.ts";
import {getErrorCode} from "../../../lib/errors.ts";

export function useCreateEarmark() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createEarmark,
        onSuccess: (earmark, spotifyAlbumId) => {
            queryClient.setQueryData(earmarkKeys.album(spotifyAlbumId), earmark)
        },
        onError: (error, spotifyAlbumId) => {
            if (getErrorCode(error) === ALREADY_EARMARKED_CODE) {
                void queryClient.invalidateQueries({queryKey: earmarkKeys.album(spotifyAlbumId)});
            }
        },
        onSettled: () =>
            queryClient.invalidateQueries({queryKey: earmarkKeys.lists()}),
    });
}