import {useCurrentUser} from "../hooks/useCurrentUser.ts";
import {Navigate, Outlet} from "react-router";

export default function GuestOnly() {
    const currentUser = useCurrentUser();

    if (currentUser.isPending) return null;
    if (currentUser.data)
        return <Navigate to="/" replace/>
    return <Outlet/>;
}