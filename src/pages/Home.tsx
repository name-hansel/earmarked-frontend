import {useCurrentUser} from "../features/auth/hooks/useCurrentUser.ts";
import {Landing} from "./Landing.tsx";
import Dashboard from "./Dashboard.tsx";
import PageLoader from "../components/PageLoader.tsx";

export default function Home() {
    const {data: user, isPending} = useCurrentUser();

    if (isPending) return <PageLoader/>;
    
    return user ? <Dashboard username={user.username}/> : <Landing/>
}