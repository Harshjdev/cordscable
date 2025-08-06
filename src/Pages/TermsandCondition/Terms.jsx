import Header from "../../Components/Header/Header";
import "./Terms.css"
import Footer from "../../Components/Footer/Footer";
import { getheadline } from "../../store/Services/AllApi";
import Marquee from "../../Components/Marquee/Marquee";
import { useState, useEffect } from "react";
import { cordsCategory } from "../../store/Services/AllApi";
import { mostUsedTags } from "../../store/Services/AllApi";

const TermsAndConditions = () => {
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
            <Header  tagsData={tagsData} categoryData={categoryData}/>
            <Marquee headline={headline} seamless />
            <div className="container">
                <div className="stem-content">
                    <p className="stemhead">Terms and Conditions – Stem Factory Solutions Pvt. Ltd.’s User Agreement</p>
                    <p className="final">
                        Terms and Conditions for use of Stem Factory Solutions Pvt. Ltd.’s website, mobile site – cablecommunity.com and our mobile app(s). Stem Factory Solutions Pvt. Ltd. shall be referred as “Stem Factory” in this document.
                    </p>

                    <h3 className="final">Introduction:</h3>
                    <p className="final">
                        These Terms and Conditions (“Terms”) govern your access to and use of the Stem Factory’s website, mobile site located at cablecommunity.com (the “Site”), Stem Factory’s mobile app(s) and the services provided by Stem Factory (collectively, the “Services”). The Services are provided to you, the Site User (or “User”) by Stem Factory, a company incorporated under the laws of India with its registered office located at: 94, 1st floor, Shambhu Dayal Bagh Marg, Near Okhla Industrial Area Phase-3, Old Ishwar Nagar, New Delhi Delhi 110020, India.
                    </p>

                    <h3 className="final">Eligibility:</h3>
                    <p className="final">
                        The Services are intended for business and Industrial use and not for personal, household, or consumer use. By accessing or using the Services, you represent and warrant that you are a business and have the capacity to enter into a legally binding agreement.
                    </p>

                    <h3 className="final">Account Registration:</h3>
                    <p className="final">
                        To access the Services, except for reviewing our website, products and services listed therein, you must register for an account (“Account”). You agree to provide accurate and complete information when registering for an Account and to keep your Account information up-to-date. You are responsible for maintaining the confidentiality of your Account login information and for all activities that occur under your Account.
                    </p>

                    <h3 className="final">Order Processing:</h3>
                    <p className="final">
                        All orders for products and services through the Site are subject to Stem Factory's acceptance. Stem Factory reserves the right to refuse any order for any reason.
                    </p>

                    <h3 className="final">Pricing and Payment:</h3>
                    <p className="final">
                        The prices for products and services offered on the Site are subject to change without notice. You agree to pay the prices and any applicable taxes, duties, or other charges in accordance with the payment terms specified on the Site.
                    </p>

                    <h3 className="final">Shipping and Delivery:</h3>
                    <p className="final">
                        Shipping and delivery terms will be specified on the Site and in the order confirmation. Stem Factory will make commercially reasonable efforts to deliver products and services within the specified timeframe.
                    </p>

                    <h3 className="final">Returns and Refunds:</h3>
                    <p className="final">
                        Stem Factory has a separate Return Policy – the same can be accessed from the Site. You agree to the terms of Stem Factory's Return Policy.
                    </p>

                    <h3 className="final">Force Majeure</h3>
                    <p className="final">
                        There can be exceptional circumstances where Stem Factory may be unable to honor the confirmed products due to various reasons like act of God, labor unrest, insolvency, business exigencies, government decisions, terrorist activity, any operational and technical issues, etc. or any other reason beyond the control of Stem Factory. If Stem Factory has advance knowledge of any such situations where dishonor of transaction may happen, it will make its best efforts to provide similar alternative to the User or refund the amount. The User agrees that Stem Factory being merely a facilitator of the services and products, cannot be held responsible for any such Force Majeure circumstance.
                    </p>
                    <p className="final">
                        The User agrees that in the event of non-confirmation of products due to any technical reasons (like network downtime, disconnection with third party platforms such as payment gateways, banks etc.) or any other similar failures, Stem Factory’s obligation shall be limited to refunding the paid amount, if any, received from the customer. Such refund shall completely discharge Stem Factory from all liabilities with respect to that transaction. Additional liabilities, if any, shall be borne by you (the Site user with registered Account).
                    </p>
                    <p className="final">
                        In no event shall Stem factory be liable for any direct, indirect, punitive, incidental, special or consequential damages, and any other damages like damages for loss of use, data or profits, arising out of or in any way connected with the use or performance of the Site or any other Sales Channel.
                    </p>

                    <h3 className="final">Product Description and Availability:</h3>
                    <p className="final">
                        Stem Factory endeavors to be as accurate as possible in its product descriptions and pricing. However, Stem Factory does not warrant that product descriptions or other content of the Site is accurate, complete, reliable, current, or error-free. If a product offered by Stem Factory is not as described, your sole remedy is to return it in an unused condition.
                    </p>

                    <h3 className="final">Intellectual Property:</h3>
                    <p className="final">
                        The Site and its content, including without limitation, text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, software, and the compilation thereof (the “Content”) are the property of Stem Factory or its licensors and are protected by Indian and international copyright and trademark laws. The Content may not be used, copied, reproduced, distributed, transmitted, broadcast, displayed, sold, licensed, or otherwise exploited for any other purposes without the prior written consent of Stem Factory or the respective owners of the Content.
                    </p>

                    <h3 className="final">Use of Communication Details of Site User</h3>
                    <p className="final">
                        Stem Factory will send product confirmation, cancellation, payment confirmation, refund status, or any such other information relevant for the transaction made by the User or any failed transaction, via SMS, voice call, whatsapp call / data call, e-mail or any other alternate communication detail provided by the User at the time of registering Account or at the time of purchase.
                    </p>
                    <p className="final">
                        The Site User hereby unconditionally consents that such communications via SMS, voice call, whatsapp call / data call, email or any other mode by Stem Factory are upon the request and authorization of the User and ‘transactional’ and not an ‘unsolicited commercial communication’ in compliance of the local laws, and in compliance with the relevant guidelines framed by the Telecommunications Regulatory Authority (TRA) or such other relevant authority in the relevant jurisdiction.
                    </p>
                    <p className="final">
                        Site User will indemnify Stem Factory against all types of losses and damages incurred by Stem Factory due to any action taken by the Telecommunications Regulatory Authority (TRA) or such other relevant authority in the relevant jurisdiction, Access Providers or any other local authority due to any erroneous complaint raised by the Site User on Stem Factory with respect to the communications mentioned above or due to a wrong number or email id being provided by the User for any reason whatsoever.
                    </p>
                    <p className="final">
                        Site User also understands that they will always have an option of withdrawing the consent as set out above. User will have an unconditional right to opt out of receiving messages and email including but not limited to communications that are of marketing in nature by simply writing to Stem Factory on contact@stemfac.com.
                    </p>

                    <h3 className="final">Advertisers on Stem Factory’s Site</h3>
                    <p className="final">
                        The Site may contain links to third party websites. Stem factory does not control such websites and is not responsible for its contents. If a User accesses any third-party website, the same shall be done entirely at the User’s risk and Stem factory shall not assume any liability for the same.
                    </p>
                    <p className="final">
                        Stem Factory is not responsible for any errors, omissions or representations on any of its pages, links or any linked websites to the extent such information is updated or provided directly by the service providers or the advertisers.
                    </p>
                    <p className="final">
                        Stem Factory does not endorse any advertisers on the Site, or any linked websites in any manner. The User is requested to verify accuracy of all information provided on third-party websites. Such linked websites are not under control of Stem Factory, and Stem Factory is not responsible for any content on linked websites or any further links on such websites or for any future updates to such websites. Stem Factory provides these links to the User only as a convenience.
                    </p>

                    <h3 className="final">Phishing, Spamming, Fraudulent Activities:</h3>
                    <p className="final">
                        Stem Factory’s authorized representatives / employees will never contact a User asking for his/ her credit or debit card number, expiry date, CVV, net banking login, passwords, UPI PIN, OTP etc. nor will they ever request for a fund transfer to a personal or an individual bank account. Further, they will also not ask a User to install any third-party applications that enable them to view a User’s mobile or computer screen. Acting on any of these requests may make you a victim of fraud, and could lead to loss of your valuable money or information. If you are ever asked for any of the aforesaid information by someone impersonating as an employee, representative, channel partner of Stem Factory, please do not provide any above sensitive information and report it immediately on contact@stemfac.com with your detail
                    </p>

                    <h3 className="final">Disclaimer of Warranties:</h3>
                    <p className="final">
                        The site and services are provided “as is” and “as available” without warranty of any kind, either express or implied, including without limitation any warranty for information, services, uninterrupted access, or products provided through or in connection with the site, including without limitation the software licensed to you and the results obtained through the site. specifically, stem factory disclaims any and all warranties, including without limitation:
                    </p>
                    <ul className="final">
                        <li>Warranties of merchantability or fitness for a particular purpose, and</li>
                        <li>Any warranty against infringement. stem factory does not warrant that the site or services will meet your requirements or that the operation of the site or services will be uninterrupted or error-free.</li>
                    </ul>

                    <h3 className="final">Limitation of Liability:</h3>
                    <p className="final">
                        You agree to indemnify and hold Stem Factory and its affiliates, channel partners, officers, agents, co-branders, and other partners harmless from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of the Site and Services, your violation of the Terms, or your violation of any rights of another.
                    </p>

                    <h3 className="final">Modifications to the Terms:</h3>
                    <p className="final">
                        Stem Factory reserves the right to modify these Terms at any time and without prior notice. The updated “Terms and Conditions” document can be accessed by you from the Site. Your continued use of the Site and Services following any changes to the Terms constitutes your acceptance of the new Terms.
                    </p>

                    <h3 className="final">Governing Law:</h3>
                    <p className="final">
                        These Terms shall be governed by and construed in accordance with the laws of India without giving effect to any principles of conflicts of law. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of India.
                    </p>

                    <h3 className="final">Entire Agreement:</h3>
                    <p className="final">
                        These Terms, together with Stem Factory's Privacy Policy, Return policy and Disclaimer constitutes the entire agreement between you and Stem Factory with respect to the use of the Site and Services. Updated versions of all policy documents, namely Privacy Policy, Return Policy, Disclaimer and Terms and Conditions can be accessed by you from the Site.
                    </p>

                    <h3 className="final">Termination:</h3>
                    <p className="final">
                        Stem Factory may terminate these Terms and your use of the Site and Services at any time and without prior notice. Upon termination, you must cease all use of the Site and Services and destroy all materials obtained from the Site and all related documentation.
                    </p>

                    <h3 className="final">General Terms:</h3>
                    <p className="final">
                        These Terms constitute the entire agreement between you and Stem Factory with respect to the use of the Site and Services. If any provision of these Terms is found to be invalid, the remaining provisions shall be enforced to the fullest extent possible. The failure of Stem Factory to enforce any right or provision in these Terms shall not constitute a waiver of such right or provision unless acknowledged and agreed to by Stem Factory in writing. The section titles in these Terms are for convenience only and have no legal or contractual effect. Stem Factory may assign these Terms, in whole or in part, at any time without notice to you. Your right to use the Site and Services is not transferable. Stem factory shall have the right to take action it deems necessary, including legal action, against anyone who violates these Term
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TermsAndConditions;
