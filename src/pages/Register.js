import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputField, PasswordField } from "../components/Input";

const RegisterSchema = yup.object().shape({
    username: yup.string().required().min(5).max(10),
    email: yup.string().required().email(),
    password: yup.string().required().min(8).max(16).matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$", "password must has at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"),
    confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password"), null], "must match password."),
});

function Register({ userRegister }) {
    const { handleSubmit, control, setError } = useForm({
        resolver: yupResolver(RegisterSchema),
        mode: "onTouched",
    });

    let navigate = useNavigate();

    function submitHanlder(data) {
        // verify user info
        let res = userRegister(data);
        if (res.status === 200) {
            // valid info
            navigate("/login");
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
                <p className="form-title">Register for post-viewer</p>
                <br />
                <InputField name="username" control={control} />
                <InputField name="email" control={control} type="email" />
                <PasswordField name="password" control={control} />
                <PasswordField name="confirmPassword" label="confirm password" control={control} />
                <br />
                <div>
                    <button
                        className="btn"
                        type="button"
                        onClick={() => navigate(-1)}
                    >
                        cancel
                    </button>
                    <button
                        className="btn"
                        type="submit"
                        style={{ float: "right" }}
                    >
                        confirm
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
