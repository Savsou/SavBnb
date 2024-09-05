import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../store/session";
import { useModal } from "../../context/Modal";
import './SignupForm.css';

const SignupFormModal = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors({});
            return dispatch(
                signup({
                    email,
                    username,
                    firstName,
                    lastName,
                    password
                })
            )
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data?.errors) {
                    setErrors(data.errors)
                }
            });
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        })
    }

    return (
        <div className="signup-form-modal">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                />
                {errors.email && <p className="error">{errors.email}</p>}
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
                />
                {errors.username && <p className="error">{errors.username}</p>}
                <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="First Name"
                />
                {errors.firstName && <p className="error">{errors.firstName}</p>}
                <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Last Name"
                />
                {errors.lastName && <p className="error">{errors.lastName}</p>}
                <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                />
                {errors.password && <p className="error">{errors.password}</p>}
                <input
                type="text"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm Password"
                />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignupFormModal;
