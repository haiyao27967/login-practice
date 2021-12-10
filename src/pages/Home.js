import { useNavigate } from "react-router-dom";

function Homepage() {
    let navigate = useNavigate();

    return (
        <div className="page">
            <h1>Home</h1>
            <p>This is the homepage.</p>
            <button className="btn" onClick={() => navigate("/login")}>login</button>
        </div>
    );
};
export default Homepage;