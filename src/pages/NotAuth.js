import { useNavigate } from "react-router-dom";

function NotAuth() {
    let navigate = useNavigate();

    return (
        <div className="page">
            <h1>Unauthorized</h1>
            <p>You havn't loggin.</p>
            <button className="btn" onClick={() => navigate("/login")}>
                login
            </button>
        </div>
    );
}
export default NotAuth;
