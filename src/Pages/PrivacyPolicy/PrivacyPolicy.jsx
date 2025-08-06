import "./PrivacyPolicy.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Marquee from "../../Components/Marquee/Marquee";
import { useEffect, useState } from "react";
import { getheadline } from "../../store/Services/AllApi";
import { cordsCategory } from "../../store/Services/AllApi";
import { mostUsedTags } from "../../store/Services/AllApi";

const PrivacyPolicy = () => {
    const [tagsData, setTagsData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [headline, setHeadline] = useState("");
    useEffect(() => {
        cordsCategory({ body: {} })
            .then((response) => {
                setCategoryData(response)
            })
            .catch((error) => {
                console.error("Error fetching cruise categories:", error);
            });
        getheadline({ body: {} })
            .then((headlineres) => {
                console.log("headline", headlineres)
                setHeadline(headlineres);
            })
            .catch((error) => {
                console.error("Error fetching cruise categories:", error);
            })
        mostUsedTags({ body: {} }).then((res) => {
            setTagsData(res)
        }).catch((error) => {
            console.log("error occured in tags", error)
        })
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Header tagsData={tagsData} categoryData={categoryData} />
            <Marquee headline={headline} seamless />
            <div className="container">
                <div className="privacy-content">
                    <p className="privacyhead">Privacy Policy</p>
                    <p className="final">This Privacy Policy is applicable to any person (‘User’) who associates with Stem Factory Solutions Pvt. Ltd., Delhi [...]</p>

                    <h3 className="final">Introduction</h3>
                    <p className="final">Stem Factory Solutions Private Limited, Delhi and its subsidiaries / affiliates [...]</p>

                    <h3 className="final">Information We Collect</h3>
                    <p className="final">We collect personal information from you when you use our website [...]</p>
                    <ul className="final">
                        <li>Personal Identifiers such as name, email address, etc.</li>
                        <li>Demographic information such as age, gender, etc.</li>
                        <li>Business details such as GSTIN, PAN, etc.</li>
                        <li>Payment information such as credit/debit card details, etc.</li>
                        <li>Device information: IP, browser, OS, etc.</li>
                        <li>Visit information: URLs, time spent, interaction.</li>
                        <li>Customer service interactions and surveys.</li>
                        <li>Newsletter subscriptions and sign-ups.</li>
                    </ul>

                    <p className="final">We also collect info about your use of our website, using cookies.</p>

                    <h3 className="final">How We Use Your Information</h3>
                    <p className="final">We use the personal information we collect to:</p>
                    <ul className="final">
                        <li>Provide and improve services</li>
                        <li>Process orders</li>
                        <li>Communicate account/product info</li>
                        <li>Send promotions</li>
                        <li>Improve ad relevance</li>
                        <li>Customer support</li>
                        <li>Monitor trends</li>
                        <li>Prevent fraud</li>
                        <li>Comply with laws</li>
                    </ul>

                    <h3 className="final">Sharing Your Information</h3>
                    <p className="final">We do not share personal info, except:</p>
                    <ul className="final">
                        <li>Third-party services (e.g., shipping, payment)</li>
                        <li>Suppliers for order fulfillment</li>
                    </ul>
                    <p className="final">You authorize us to share data with them to fulfill services. Use beyond that is outside our control.</p>
                    <ul className="final">
                        <li>With your consent, for promotions</li>
                        <li>To comply with law/legal requests</li>
                    </ul>

                    <h3 className="final">Cookies and Web Beacons</h3>
                    <p className="final">We use cookies to store visitor preferences and optimize user experience.</p>

                    <h3 className="final">Advertising Partners Privacy Policies</h3>
                    <p className="final">Third-party ad networks may use cookies, JavaScript, or Web Beacons. We do not control their use.</p>

                    <h3 className="final">Third Party Privacy Policies</h3>
                    <p className="final">Our policy doesn’t apply to third-party websites. Review their privacy statements separately.</p>

                    <h3 className="final">Your Choices</h3>
                    <p className="final">You can access/update your info or unsubscribe from emails anytime. You may also request deletion of your data.</p>

                    <h3 className="final">Security</h3>
                    <p className="final">We use firewalls, encryption, and secure systems, but no method is 100% secure. Use public networks cautiously.</p>

                    <h3 className="final">Changes to This Privacy Policy</h3>
                    <p className="final">We may update this policy. Check our website for the latest version.</p>

                    <h3 className="final">Copyright Protection</h3>
                    <p className="final">All content on this site is the property of Stem Factory and protected under Indian Copyright Law.</p>

                    <h3 className="final">Consent and Dispute Resolution</h3>
                    <p className="final">By using this site, you agree to this Privacy Policy. All disputes are governed by Indian laws.</p>

                    <h3 className="final">Contact Us</h3>
                    <p className="final">If you have any questions, email us at <a href="mailto:contact@stemfac.com">contact@stemfac.com</a></p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
