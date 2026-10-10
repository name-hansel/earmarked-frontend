import './App.css'
import {Route, Routes} from "react-router";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import Layout from "./Layout.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import ActivateAccount from "./pages/ActivateAccount.tsx";

function App() {
    return <Routes>
        <Route element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/activate-account" element={<ActivateAccount/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Route>
    </Routes>
}

export default App
