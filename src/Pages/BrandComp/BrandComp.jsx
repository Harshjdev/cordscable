import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Marquee from "../../Components/Marquee/Marquee";
import CardSlider from "../../Components/CardSlider/CardSlider";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { getheadline, mostUsedTags, cordsCategory } from "../../store/Services/AllApi";
import "./BrandComp.css";

const BrandComp = () => {
    const [searchParams] = useSearchParams();
    const [headline, setHeadline] = useState([]);
    const [tagsData, setTagsData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [brandProducts, setBrandProducts] = useState([]);
    const [brand, setBrand] = useState({});
    const [brandName, setBrandName] = useState("");

    const brandId = searchParams.get("brand_id");
    const navigate = useNavigate();

    const handleViewMoreByBrand = (brandName) => {
        if (!brandName) return;
        const encodedName = encodeURIComponent(brandName);
        navigate(`/product?search=${encodedName}&page=1`);
    };

    useEffect(() => {
        cordsCategory({ body: {} })
            .then((response) => setCategoryData(response))
            .catch((error) => console.error("Error fetching cruise categories:", error));

        getheadline({ body: {} })
            .then((res) => setHeadline(res))
            .catch((error) => console.error("Error fetching headline:", error));

        mostUsedTags({ body: {} })
            .then((res) => setTagsData(res))
            .catch((error) => console.log("Error fetching tags:", error));
    }, []);

    useEffect(() => {
        if (brandId) {
            const fetchBrandData = async () => {
                try {
                    const response = await fetch(`https://cords.tranktechnologies.com/api/about-brand?brand_id=${brandId}`);
                    const result = await response.json();
                    if (result.status && result.data) {
                        setBrand(result.data);
                        if (result.data.name) {
                            setBrandName(result.data.name);
                        }
                    } else {
                        console.error("Invalid brand data");
                    }
                } catch (error) {
                    console.error("Failed to fetch brand data:", error);
                }
            };
            fetchBrandData();
        }
    }, [brandId]);

    useEffect(() => {
        if (brandId) {
            const fetchBrandProducts = async () => {
                try {
                    const response = await fetch(`https://cords.tranktechnologies.com/api/brand-product?brand_id=${brandId}`);
                    const result = await response.json();
                    if (result.status && result.data) {
                        setBrandProducts(result.data);
                        // Set brand name if still not set
                        if (!brandName && result.data.length > 0 && result.data[0].brand_name) {
                            setBrandName(result.data[0].brand_name);
                        }
                    } else {
                        console.error("Invalid product data");
                    }
                } catch (error) {
                    console.error("Failed to fetch brand products:", error);
                }
            };
            fetchBrandProducts();
        }
    }, [brandId]);

    return (
        <div className="brandpage">
            <Header tagsData={tagsData} categoryData={categoryData} />
            <Marquee headline={headline} />
            <div className="brand-page" style={{ padding: "2rem", margin: "0 auto" }}>
                {brand.image_url && (
                    <img
                        src={brand.image_url}
                        alt={`Brand ${brandId}`}
                        style={{ maxWidth: "100%", height: "auto", marginBottom: "2rem" }}
                    />
                )}

                <div className="brand-content" dangerouslySetInnerHTML={{ __html: brand.introduction }} />
                <div className="brand-content" dangerouslySetInnerHTML={{ __html: brand.offerings }} />

                {brandProducts.length > 0 && (
                    <div style={{ padding: "2rem" }}>
                        <h2 style={{ marginBottom: "1rem" }}>Explore Products</h2>
                        <CardSlider
                            items={brandProducts}
                            renderItem={(product) => <ProductCard product={product} />}
                            slidesToShow={4}
                        />
                        {brandName && (
                            <div className="view-more-btn">
                                <button
                                    onClick={() => handleViewMoreByBrand(brandName)}
                                >
                                    View More
                                </button>
                            </div>

                        )}
                    </div>
                )}

                <div className="brand-content" dangerouslySetInnerHTML={{ __html: brand.certifications }} />
                <div className="brand-content" dangerouslySetInnerHTML={{ __html: brand.clientele }} />
                <div className="brand-content" dangerouslySetInnerHTML={{ __html: brand.history }} />
            </div>
            <Footer />
        </div>
    );
};

export default BrandComp;
