import {useQuery, useQueryClient} from "@tanstack/react-query";
import {earmarkKeys} from "../queryKeys.ts";
import {type AlbumEarmarkResponse, getAlbumEarmarks} from "../api/earmark.ts";

export function useAlbumEarmarks(ids: string[]) {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: earmarkKeys.albums(ids),
        queryFn: async () => {
            const earmarks = await getAlbumEarmarks(ids);

            for (const id of ids) {
                queryClient.setQueryData<AlbumEarmarkResponse>(earmarkKeys.album(id), {
                    earmark: earmarks[id] ?? null,
                });
            }

            return earmarks;
        },
        enabled: ids.length > 0,
    });
}