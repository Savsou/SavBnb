import { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './LoginForm.css'

const LoginFormModal = () => {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal()

    const isButtonDisabled = credential.length < 4 || password.length < 6;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const userInfo = {
            credential,
            password
        };

        return dispatch(login(userInfo))
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        })
    }

    const demoUserLogin = async (e) => {
        e.preventDefault();
        setErrors({});

        const demoUser = {
            credential: "Demo-lition",
            password: "password"
        };

        return dispatch(login(demoUser))
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        })
    }

    return (
        <div className="login-form-modal">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                    placeholder="Username or Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                />
                {errors.credential && <p className="error">{errors.credential}</p>}
                <button type="submit" disabled={isButtonDisabled} className="login-button">Log In</button>
                <button type="button" onClick={demoUserLogin} className="demo-button">Demo User</button>
            </form>
        </div>
    )
}

export default LoginFormModal;
