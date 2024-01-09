import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Login} from "../pages/Login"
import Cadastro from "../pages/Cadastro";

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element = { <Login />} />
                <Route path="/cadastro" element = { <Cadastro />} />
            </Routes>
        </Router>
    )
}