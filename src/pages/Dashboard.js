import { useNavigate } from "react-router-dom";

function Dashboard({userLogout}) {
    let navigate = useNavigate();

    return (
        <div className="page">
            <h1>Dashboard</h1>
            <p>This is the dashboard.</p>
            <button className="btn" type="button" onClick={() => {userLogout(); navigate("/");}}>logout</button>
        </div>
    );
};
export default Dashboard;