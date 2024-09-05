import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import { FaAirbnb } from "react-icons/fa";
import './Navigation.css';

const Navigation = ({ loading }) => {
    const sessionUser = useSelector((state) => state.session.user);

    const sessionLinks = sessionUser ? (
        <li className="profile-button">
            <ProfileButton user={sessionUser}/>
        </li>
    ) : (
        <>
            <li>
                <OpenModalButton
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />}
                />
            </li>
            <li>
                <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                />
            </li>
        </>
    );

    return (
        <nav className="navigation">
            <ul className="nav-content">
                <li className="logo">
                    <NavLink to='/' className="nav-logo">
                        <FaAirbnb /> SavBnb
                    </NavLink>
                </li>
                <div className="nav-links">
                    {loading && sessionLinks}
                </div>
            </ul>
        </nav>
    )
}

export default Navigation;
