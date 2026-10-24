import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ALREADY_EARMARKED_CODE, createEarmark} from "../api/earmark.ts";
import {earmarkKeys} from "../queryKeys.ts";
import {getErrorCode} from "../../../lib/errors.ts";

export function useCreateEarmark(spotifyAlbumId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({note}: { note?: string }) => createEarmark(spotifyAlbumId, note),
        onSuccess: (earmark) => {
            queryClient.setQueryData(earmarkKeys.album(spotifyAlbumId), {earmark});
        },
        onError: (error) => {
            if (getErrorCode(error) === ALREADY_EARMARKED_CODE) {
                void queryClient.invalidateQueries({queryKey: earmarkKeys.album(spotifyAlbumId)});
            }
        },
        onSettled: () => {
            queryClient.removeQueries({queryKey: earmarkKeys.lists(), type: "inactive"});
            void queryClient.invalidateQueries({queryKey: earmarkKeys.lists()});
        },
    });
}