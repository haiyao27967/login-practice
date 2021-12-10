import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import Homepage from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotAuth from "./pages/NotAuth";

const authContext = createContext(false);

function RequireAuth({ children, ...rest }) {
    let auth = useContext(authContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (!auth) {
            navigate("/notAuth");
        }
    });
    return children;
}

function App() {
    // contain all user info
    const [users, setUsers] = useState([
        {
            username: "admin",
            password: "Testing193!",
        },
    ]);
    const [auth, setAuth] = useState(false);

    function createUser(newUser) {
        // check username
        if (users.find((user) => user.username === newUser.username)) {
            return {
                status: 400,
                name: "username",
                msg: "username is already exist.",
            };
        }

        // add new user
        setUsers([...users, newUser]);

        // redirect to login page
        return {
            status: 200,
            msg: "create account successfully.",
        };
    }

    function login(verifyUser) {
        // check username
        let user = users.find((user) => user.username === verifyUser.username);
        if (user) {
            // check password
            if (user.password === verifyUser.password) {
                // redirect to dashbord
                setAuth(true);
                return {
                    status: 200,
                    msg: "Login successfully.",
                };
            } else {
                return {
                    status: 400,
                    name: "password",
                    msg: "Invalid password.",
                };
            }
        } else {
            return {
                status: 400,
                name: "username",
                msg: "username is not exist.",
            };
        }
    }

    function logout() {
        setAuth(false);
    }

    return (
        <authContext.Provider value={auth}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="login" element={<Login userLogin={login} />} />
                    <Route
                        path="register"
                        element={<Register userRegister={createUser} />}
                    />
                    <Route path="notAuth" element={<NotAuth />} />
                    <Route
                        path="dashboard"
                        element={
                            <RequireAuth>
                                <Dashboard userLogout={logout} />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </authContext.Provider>
    );
}

export default App;
