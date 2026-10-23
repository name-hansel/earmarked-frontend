import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteEarmark} from "../api/earmark.ts";
import {earmarkKeys} from "../queryKeys.ts";

export function useDeleteEarmark(spotifyAlbumId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteEarmark,
        onSuccess: () => {
            queryClient.setQueryData(earmarkKeys.album(spotifyAlbumId), {
                earmark: null
            });
        },
        onSettled: () => {
            queryClient.removeQueries({queryKey: earmarkKeys.lists(), type: "inactive"});
            void queryClient.invalidateQueries({queryKey: earmarkKeys.lists()})
        }
    });
}