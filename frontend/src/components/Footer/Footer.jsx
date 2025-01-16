import "./Footer.css"
import linkedinLogo from "../../../../logos/linkedin-logo.png";
import githubLogo from "../../../../logos/github-logo.png";

const Footer = () => {

    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div>
                    <a href="https://github.com/Savsou/GetFitWit">
                        <img src={githubLogo} alt="github-logo" className="social-icon github-icon" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/savannah-sou/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={linkedinLogo} alt="savannah-linkedin" className="social-icon" />
                    </a>
                    <p>Savannah Sou © 2025</p>
                </div>
                <div className="footer-information">
                    <p>About</p>
                    <p>Contact Us</p>
                    <p>Terms & Conditions</p>
                    <p>Privacy Policy</p>
                </div>

            </div>
        </footer>
    )
}

export default Footer;
