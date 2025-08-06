// components/CardSlider/CardSlider.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CardSlider.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


// Custom Arrow Components
const NextArrow = (props) => {
    const { onClick } = props;
    return <div className="arrow next" onClick={onClick}><IoIosArrowForward /></div>;
};

const PrevArrow = (props) => {
    const { onClick } = props;
    return <div className="arrow prev" onClick={onClick}><IoIosArrowBack /></div>;
};

const CardSlider = ({ items, renderItem, slidesToShow = 4, customResponsive = null }) => {
    const settings = {
        dots: false,
        infinite: items.length > slidesToShow + 1,
        speed: 500,
        slidesToShow,
        slidesToScroll: 1,
        centerMode: items.length < slidesToShow, // enable centerMode if items < slidesToShow
        centerPadding: "0px",
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: customResponsive || [
            {
                breakpoint: 1024,
                settings: { slidesToShow: Math.min(slidesToShow, 2) }
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: Math.min(slidesToShow, 1) }
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: Math.min(slidesToShow, 1) }
            }
        ]
    };

    return (
        <div className="card-slider">
            <Slider {...settings}>
                {items.map((item) => (
                    <div key={item.id || item._id}> {/* Replace with your actual unique ID */}
                        {renderItem(item)}
                    </div>
                ))}

            </Slider>
        </div>
    );
};


export default CardSlider;
