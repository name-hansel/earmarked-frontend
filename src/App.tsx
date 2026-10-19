import './App.css'
import {Route, Routes} from "react-router";
import Home from "./pages/Home.tsx";
import Register from "./features/auth/pages/Register.tsx";
import Layout from "./components/Layout.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./features/auth/pages/Login.tsx";
import ActivateAccount from "./features/auth/pages/ActivateAccount.tsx";
import GuestOnly from "./features/auth/components/GuestOnly.tsx";
import ProtectedRoute from "./features/auth/components/ProtectedRoute.tsx";
import DeleteAccount from "./features/auth/pages/DeleteAccount.tsx";
import ChangePassword from "./features/auth/pages/ChangePassword.tsx";
import ForgotPassword from "./features/auth/pages/ForgotPassword.tsx";
import ResetPassword from "./features/auth/pages/ResetPassword.tsx";
import AlbumPage from "./pages/AlbumPage.tsx";
import Earmarks from "./features/earmark/pages/Earmarks.tsx";

function App() {
    return <Routes>
        <Route element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="*" element={<NotFound/>}/>

            <Route element={<GuestOnly/>}>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/activate-account" element={<ActivateAccount/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
            </Route>

            <Route element={<ProtectedRoute/>}>
                <Route path="/change-password" element={<ChangePassword/>}/>
                <Route path="/delete-account" element={<DeleteAccount/>}/>
                <Route path="/albums/:spotifyId" element={<AlbumPage/>}/>
                <Route path="/earmarks" element={<Earmarks/>}/>
            </Route>
        </Route>
    </Routes>
}

export default App
