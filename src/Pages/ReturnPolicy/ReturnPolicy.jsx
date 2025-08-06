import "./ReturnPolicy.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { getheadline } from "../../store/Services/AllApi";
import Marquee from "../../Components/Marquee/Marquee";
import { useState, useEffect } from "react";
import { mostUsedTags } from "../../store/Services/AllApi";
import { cordsCategory } from "../../store/Services/AllApi";

export default function ReturnPolicy() {
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
            <Header tagsData={tagsData} categoryData={categoryData}/>
            <Marquee headline={headline} seamless />
            <div className="container">
                <div className="returnpolicy-page">
                    <div className="returnpolicy-content">
                        <p className="final">
                            <p className="returnhead">Return Policy</p>
                            At Stem Factory Solutions Pvt. Ltd. (referred as ‘Stem Factory’) our goal is to ensure that our customers are completely satisfied with their purchases. In lieu of this we work with the best Indian / International brands and quality delivery partners. This document outlines our return policy to ensure a smooth and hassle-free return experience.
                        </p>

                        <h3 className="final">Acceptable Reasons for Return, Replacement:</h3>
                        <ul className="final">
                            <li>Products received in damaged condition.</li>
                            <li>Products with manufacturing defects.</li>
                            <li>Incorrect products received.</li>
                        </ul>

                        <h3 className="final">Eligibility for Return, Replacement:</h3>
                        <ul className="final">
                            <li>Returns must be initiated within 5 days of the delivery date.</li>
                            <li>Products must be in their original packaging and condition, with all tags, manuals and accessories intact. Valid invoice(s) must be available with customer.</li>
                            <li>Products that have been used or altered in any way cannot be returned.</li>
                            <li>Custom-made products cannot be returned.</li>
                            <li>Any item(s) ordered as a group or a package cannot be returned separately.</li>
                            <li>Any item(s) ordered under a price sale will not be eligible for return.</li>
                            <li>Products of consumable nature such as cable ties, cable markers, cable cleats, sleeves etc may or may not be covered under any Guarantee / Warranty terms. Such products are NOT ALLOWED for Returns, Refunds, Replacements and no claims for returns, refunds or replacements shall be entertained for such item(s).</li>
                        </ul>

                        <h3 className="final">Return, Replacement Process:</h3>
                        <p className="final">
                            To initiate a return request, please contact our customer service team by email at <a href="mailto:care@stemfac.com">care@stemfac.com</a>. Provide the following details:
                        </p>
                        <ul className="final">
                            <li>Reason for return</li>
                            <li>Order reference and invoice number</li>
                            <li>Details of the affected item(s)</li>
                            <li>Photograph of the affected item(s)</li>
                            <li>Unboxing video if applicable</li>
                        </ul>

                        <h3 className="final">Inspection and Approval:</h3>
                        <p className="final">
                            Once we receive your return request, our team will review the details and determine the eligibility of the return. If approved, you will receive instructions for returning the product. After receiving the returned item, we will inspect it and notify you of the approval or rejection of your return.
                        </p>

                        <h3 className="final">Refund or Replacement:</h3>
                        <p className="final">
                            If your return is approved, you can choose between receiving a replacement product (if available) or a refund. Refunds will be processed to the original method of payment and may take a few business days depending on your bank or payment provider.
                        </p>

                        <h3 className="final">Non-returnable Items:</h3>
                        <ul className="final">
                            <li>Custom-made products</li>
                            <li>Used or altered products</li>
                            <li>Products without original packaging</li>
                            <li>Consumables like cable ties, markers, sleeves, etc.</li>
                        </ul>

                        <h3 className="final">Contact Us:</h3>
                        <p className="final">
                            If you have any questions or concerns about our return policy, please contact our customer service team at <a href="mailto:care@stemfac.com">care@stemfac.com</a>.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
