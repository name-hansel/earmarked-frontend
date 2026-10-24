import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateListened} from "../api/earmark.ts";
import {earmarkKeys} from "../queryKeys.ts";

export function useUpdateListened(spotifyAlbumId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({earmarkId, listened}: {
            earmarkId: string, listened: boolean
        }) => updateListened(earmarkId, listened),
        onSuccess: (earmark) => {
            queryClient.setQueryData(earmarkKeys.album(spotifyAlbumId), {earmark});
        },
        onError: () => {
            void queryClient.invalidateQueries({queryKey: earmarkKeys.album(spotifyAlbumId)});
        },
        onSettled: () => {
            queryClient.removeQueries({queryKey: earmarkKeys.lists(), type: "inactive"});
            void queryClient.invalidateQueries({queryKey: earmarkKeys.lists()});
        },
    });
}