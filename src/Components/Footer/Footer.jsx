import './Footer.css';
import linkedin from "../../assets/LinkedIn.svg"
import twitter from "../../assets/Twitter.svg"
import instagram from "../../assets/Instagram.svg"
import facebook from "../../assets/Facebook.svg"
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    const navtoPrivacy = () => {
        navigate("/privacy-policy")
    }

    const navtoTerms = () => {
        navigate("/terms-condition")
    }
    const navtoReturn = () => {
        navigate("/return-policy")
    }
    return (
        <>
            <footer className='footer'>
                <div className="footer-container">
                    <div className="grid-4">
                        <div className="column">
                            <h3>About us</h3>
                            <ul className="ft-menu">
                                {/* Note: {{url(...)}} is replaced with a standard path */}
                                <li><a href="/vendor-signup">Register as business partner</a></li>
                                <li><a href="/career">Career</a></li>
                                <li><a href="/customers">Customers</a></li>
                                <li><a href="/community">Community</a></li>
                                <li><a href="/investors">Investors</a></li>
                                <li><a href="/media">Media</a></li>
                            </ul>
                        </div>
                        <div className="column">
                            <h3>Order Support</h3>
                            <ul className="ft-menu">
                                <li><a href="/orders/existing">Existing orders</a></li>
                                <li><a href="/orders/invoices">Invoices</a></li>
                            </ul>
                        </div>
                        <div className="column">
                            <h3>Contact us</h3>
                            <ul className="ft-menu">
                                <li><a href="mailto:dummy@dummy.com">contact@stemfac.com</a></li>
                                <li><a href="tel:+0198765432"> +91-9958688484</a></li>
                            </ul>
                        </div>
                        <div className="column">
                            <h3>Social connect</h3>
                            <form className="sign-form" onSubmit={(e) => e.preventDefault()}>
                                <input type="email" placeholder="type your email" />
                                <input type="submit" value="SUBMIT" />
                            </form>
                            <ul className="social-media">
                                <li>
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><img src={facebook} alt="Facebook" /></a>
                                </li>
                                <li>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><img src={twitter} alt="Twitter" /></a>
                                </li>
                                <li>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram" /></a>
                                </li>
                                <li>
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="LinkedIn" /></a>
                                </li>
                            </ul>
                            <ul className='ofcaddress'>
                                <h4>Office Address</h4>
                                <li><a>94, 1st floor, Shambhu Dayal Bagh Marg,
                                    New Okhla Industrial Area Phase – III,
                                    Old Ishwar Nagar, New Delhi – 110020</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="ft-bottom-menu">
                <div className="bottom-links">
                    <a href="/">Home</a> |
                    <a href="/about-us">About us</a> |
                    <a href="/product">Product</a> |
                    <a href="/technicals">Technicals</a> |
                    <a href="/financials">Financials</a> |
                    <a href="/query">Query</a>
                </div>
                <div className="container fotter-ending">
                    <div className="policy-links">
                        <span onClick={navtoPrivacy}>Privacy Policy</span>
                        <span>|</span>
                        <span onClick={navtoTerms}>Terms and Condition</span>
                        <span>|</span>
                        <span onClick={navtoReturn}>Return Policy</span>
                    </div>
                    <div className="copyright">
                        <span>© 2025 Stemfac.com| All Rights Reserved</span>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Footer;