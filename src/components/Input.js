import { Controller } from "react-hook-form";
import { useState } from "react";

export function InputField({ name, label=name, control, type="text"}) {

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: {invalid, error, isTouched} }) => (
                <div className="input-field">
                    <label className="input-label" htmlFor={name}>
                        {label}
                    </label>
                    <br />
                    <input className={"input-control " + (invalid ? "input-control-invalid" : (isTouched && "input-control-valid"))} id={name} type={type} {...field}/>
                    <p className="helper-text">{error && ("⚠ " + error.message)}&nbsp;</p>
                </div>
            )}
        />
    );
}

export function PasswordField({ name, label=name, control}) {
    const [show, setShow] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: {invalid, error, isTouched} }) => (
                <div className="input-field">
                    <label className="input-label" htmlFor={name}>
                        {label}
                    </label>
                    <br />
                    <input className={"input-control " + (invalid ? "input-control-invalid" : (isTouched && "input-control-valid"))} id={name} type={show ? "text" : "password"} {...field}/>
                    <button className="show-password" type="button" onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
                    <p className="helper-text">{error && ("⚠ " + error.message)}&nbsp;</p>
                </div>
            )}
        />
    );
}
