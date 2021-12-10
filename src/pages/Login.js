import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputField, PasswordField } from "../components/Input";

const LoginSchema = yup.object().shape({
    username: yup.string().required().min(5).max(10),
    password: yup.string().required().min(8).max(16).matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$", "password must has at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"),
});

function Login({ userLogin }) {
    const { handleSubmit, control, setError } = useForm({
        resolver: yupResolver(LoginSchema),
        mode: "onTouched",
    });

    let navigate = useNavigate();

    function submitHanlder(data) {
        // verify user info
        let res = userLogin(data);
        if (res.status === 200) {
            // valid info
            navigate("/dashboard");
        } else {
            setError(res.name, {
                type: "manual",
                message: res.msg,
            });
        }
    }

    return (
        <div className="input-form">
            <form onSubmit={handleSubmit(submitHanlder)}>
                <p className="form-title">
                    Login in to post-viewer
                </p>
                <br />
                <InputField name="username" control={control} />
                <PasswordField name="password" control={control} />
                <br />
                <div>
                    <button
                        type="button"
                        className="btn"
                        onClick={() => navigate("/register")}
                    >
                        register
                    </button>
                    <button
                        type="submit"
                        className="btn"
                        style={{ float: "right" }}
                    >
                        login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
