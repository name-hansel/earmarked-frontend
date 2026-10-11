import './App.css'
import {Route, Routes} from "react-router";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import Layout from "./Layout.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import ActivateAccount from "./pages/ActivateAccount.tsx";
import GuestOnly from "./components/GuestOnly.tsx";

function App() {
    return <Routes>
        <Route element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="*" element={<NotFound/>}/>

            <Route element={<GuestOnly/>}>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/activate-account" element={<ActivateAccount/>}/>
            </Route>
        </Route>
    </Routes>
}

export default App
