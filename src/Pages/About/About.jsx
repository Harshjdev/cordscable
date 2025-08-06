import "./About.css";
import banner from "../../assets/banner.png"
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import counterBg from "../../assets/counterbg.webp";
import chopanki from "../../assets/chopanki.png"
import kahrani from "../../assets/kahrani.jpg"
import chairman from "../../assets/chairman.jpg"
import mission from "../../assets/mission.png"
import { useState, useEffect } from "react";
import Marquee from "../../Components/Marquee/Marquee";
import { cordsCategory, mostUsedTags, getheadline } from "../../store/Services/AllApi";

const About = () => {
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
    return (
        <div className="about-wrapper">
            <Header tagsData={tagsData} categoryData={categoryData} />
            <Marquee headline={headline} />
            <div className="about-banner">
                <img src={banner} alt="About Banner" />
            </div>

            <div className="about-intro">
                <div className="about-container text-center">
                    <h1 className="about-title">About Cords</h1>
                    <p className="about-description">
                        Cords is in the business of providing cost-effective and quality
                        solutions for various electrical connectivity requirements.<br /><br />
                        Presently, we accomplish this through customized design and
                        development, quality manufacturing and reliable delivery of all
                        types of LT range cables and household wires.<br /><br />
                        Cords was established in 1987 by a group of industry professionals
                        with an objective of catering to a growing requirement for high
                        quality customized cables. Over the years Cords has developed a wide
                        range of specialized cables...
                    </p>
                </div>
            </div>

            <div
                className="about-counter"
                style={{
                    backgroundImage: `url(${counterBg})`,
                }}
            >
                <div className="counter-section">
                    <div className="about-container counter-grid">
                        <div className="counter-card">
                            <h2>30</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                        <div className="counter-card">
                            <h2>20</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                        <div className="counter-card">
                            <h2>70</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                        <div className="counter-card">
                            <h2>50</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                    </div>
                </div>




            </div>

            <div className="about-quality">
                <div className="about-container">
                    <div className="quality-section">
                        <h2>Manufacturing & Quality</h2>
                        <hr />                        <p>
                            Our manufacturing units are located in the Indian State of Rajasthan with complete testing & manufacturing facilities starting from rod-breakdown & compounding up to the finished product. Our manufacturing plants boast of state-of-the-art design & manufacturing facilities with machinery from reputed International & Indian makes. Continuous process and design improvements are carried out to take production efficiency to the highest possible levels. We keep abreast of market breakthroughs, and constantly work towards honing a competitive edge to deliver the best product in the industry to the customer, along with a splendid service.
                        </p>

                        <div className="chopankidiv">
                            <div className="about-col-40">
                                <img src={chopanki} alt="Chopanki" />
                            </div>
                            <div className="about-col-60">
                                <h3>Chopanki Unit</h3>

                                <ul className="aboutlist">
                                    <li>Manufacturing range - LV Power, Instrumentation...</li>
                                    <li>In-house Wire-drawing, Tinning and Compounding...</li>
                                    <li>Extrusion processes on Uninterruptible Power...</li>
                                    <li>Year of Commissioning - 2003</li>
                                </ul>

                            </div>
                        </div>
                        <hr />
                        <div className="chopankidiv">
                            <div className="about-col-60">
                                <h3>Kahrani Unit</h3>
                                <ul className="aboutlist">
                                    <li>Manufacturing range - Control, Instrumentation...</li>
                                    <li>State-of-the-art In-house Wire-drawing, Tinning...</li>
                                    <li>Extrusion processes on Uninterruptible Power Supply...</li>
                                    <li>Year of Commissioning - 2011</li>
                                </ul>
                            </div>
                            <div className="about-col-40">
                                <img src={kahrani} alt="Kahrani" />
                            </div>
                        </div>
                    </div>

                    <div className="total-quality">
                        <h2>Total Quality</h2>
                        <p>
                            Quality is our philosophy - it is the mainstay for all decisions and activities at Cords. Quality does not stop at investment in expensive equipment; it covers every facet of conducting business - customer interface, product design, choice of vendors, manufacturing process, human resource development and customer service.
                        </p>
                        <p>
                            Our total quality approach enables us to satisfy and even exceed our customers' expectations. We are known for our customer service, timely deliveries and efficient order execution.
                        </p>
                        <p>
                            We have well equipped and separate Test labs ensuring the quality of Incoming Raw-materials, In-process and Finished Products covering the entire manufacturing process starting from rod-breakdown, wire drawing & compounding till the finished products. Courtesy our undeterred obsession for total quality, we have enjoyed an outstanding track record of compliance over the years. Pursuing this constant quest for quality, we continue to tread on the path of success.
                        </p>
                    </div>
                    <hr />
                </div>
            </div>

            <div className="about-profile">
                <div className="about-container">
                    <div className="chopankidiv">
                        <div className="chairmanimg">
                            <img src={chairman} alt="Chairman" />
                        </div>
                        <div className="about-col-70">
                            <h3>Mr. Naveen Sawhney,</h3>
                            <strong>Chairman & Managing Director</strong>
                            <p>
                                A Mechanical Engineer (AMIME) with a postgraduate diploma in Marketing Management, he has been associated with the Cable Industry for over 35 years, and has an enriching experience in Strategic Planning, Marketing and Quality Control.
                            </p>
                        </div>
                    </div>

                    <div className="about-section-text">
                        <h3>Our Team</h3>
                        <p>
                            Cords is governed by a board of directors that comprises of well-qualified professionals from engineering & management disciplines with over thirty-five years of hands-on experience in the cable industry. The directors work in close collaboration with each other and in association with our highly competent human resource across every department. Our people are connected to each other across planes & positions, and this enables them to share their learnings with one another & add up to the competitive advantage of the company. This collaborative work environment enables the people to work in sync with each other and attain common organizational goals. We also lay special emphasis on team-work & multi-skilling of our teams through regular HR interventions & training programs. We believe that such a multi-skilled and multi-disciplinary team brings creativity, quality and efficiency to our processes, decision making and execution.
                        </p>
                    </div>
                    <hr />

                    <div className="about-section-text">
                        <h3>Core Values</h3>
                        <ul className="aboutlist">
                            <li>Honour commitments</li>
                            <li>Consistently maintain High Quality</li>
                            <li>Strive for long-term relations and partnerships...</li>
                            <li>Focus on product-development based on changing needs...</li>
                            <li>Ensure Dignity of Labour</li>
                            <li>Advancement in Technology</li>
                            <li>Enhancement and Development of our Human Resource</li>
                        </ul>
                    </div>
                    <hr />

                    <div className="chopankidiv">
                        <div className="about-col-40">
                            <img
                                src={mission}
                                alt="Mission"
                            />
                        </div>
                        <div className="about-col-60">
                            <div className="about-inner-text">
                                <h3>Mission</h3>
                                <p>
                                    Our mission is to strive for growth in new and existing markets and provide cost-effective and quality solutions for the data transmission & electrical connectivity requirements of the industry by offering high quality, customized cables at a competitive price, with best service and unfailing commitment. This will require us to move through challenging situations with determination and forge long-term partnerships with our business associates and vendors to attain satisfaction for our valued customers and all other stakeholders. The company shall contribute towards its immediate community and society at large.
                                </p>
                            </div>
                            <hr />
                            <div className="about-inner-text">
                                <h3>Vision</h3>
                                <p>
                                    To be recognized as a leading global player providing products and services offering comprehensive solutions for the data transmission & electrical connectivity requirements of the industry
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
