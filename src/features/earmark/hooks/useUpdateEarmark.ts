import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateEarmark} from "../api/earmark.ts";
import {earmarkKeys} from "../queryKeys.ts";

export function useUpdateEarmark(spotifyAlbumId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({earmarkId, note, listenedAt, listened}: {
            earmarkId: string, note: string, listenedAt: string | null, listened: boolean
        }) => updateEarmark(earmarkId, note, listenedAt, listened),
        onSuccess: (earmark) => {
            queryClient.setQueryData(earmarkKeys.album(spotifyAlbumId), {earmark});
        },
        onError: () => {
            void queryClient.invalidateQueries({queryKey: earmarkKeys.lists()})
        },
        onSettled: () => {
            queryClient.removeQueries({queryKey: earmarkKeys.lists(), type: "inactive"});
            return queryClient.invalidateQueries({queryKey: earmarkKeys.lists()});
        },
    });
}