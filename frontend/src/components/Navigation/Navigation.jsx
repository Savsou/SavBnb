import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import { FaAirbnb } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import './Navigation.css';

const Navigation = ({ loading }) => {
    const sessionUser = useSelector((state) => state.session.user);
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const ulClassName = "login-dropdown" + (showMenu ? "" : " hidden");

    const sessionLinks = sessionUser ? (
        <>
            <li className="create-spot-link">
                <NavLink to='/spots/new'>
                    Create a Spot
                </NavLink>
            </li>
            <li className="profile-button">
                <ProfileButton user={sessionUser}/>
            </li>
        </>
    ) : (
        <>
            <button
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "5px 10px",
                color: "black",
                fontSize: "30px",
                borderRadius: "20px"
            }}
            onClick={toggleMenu}
            >
                <RxHamburgerMenu />
                <CgProfile />
            </button>
            <ul className={ulClassName} ref={ulRef}>
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
            </ul>
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
