import {useCurrentUser} from "../features/auth/hooks/useCurrentUser.ts";
import {Landing} from "./Landing.tsx";
import Dashboard from "./Dashboard.tsx";

export default function Home() {
    const {data: user, isPending} = useCurrentUser();

    if (isPending) return <p>Loading...</p>;
    return user ? <Dashboard/> : <Landing/>
}