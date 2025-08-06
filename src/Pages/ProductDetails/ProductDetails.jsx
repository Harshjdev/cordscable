import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Marquee from "../../Components/Marquee/Marquee";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { getheadline } from "../../store/Services/AllApi";
import ProductGallery from "../../Components/ProductGallery/ProductGallery";
import ProductCard from "../../Components/ProductCard/ProductCard";
import CardSlider from "../../Components/CardSlider/CardSlider";
import FullScreenLoader from "../../Components/FullScreenLoader/FullScreenLoader";
import Breadcrumb from "../../Components/BreadCrumb/BreadCrumb";
import { cordsCategory } from "../../store/Services/AllApi";
import { mostUsedTags } from "../../store/Services/AllApi";
import { getProductDetails } from "../../store/Services/AllApi";
import { getSimilarProducts } from "../../store/Services/AllApi";
import { getBreadcrumb } from "../../store/Services/AllApi";
import { useSearchParams, useNavigate } from "react-router-dom";

import { useCart } from "../../Context/CartContext";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";
import { useLoader } from "../../Context/LoaderContext";
import RequestQuoteModal from "../../Components/RequestQuoteModal/RequestQuoteModal";

const ProductDetails = () => {
    const location = useLocation();
    const {
        user,
        isLoginModalOpen,
        setIsLoginModalOpen,
    } = useContext(UserContext);
    const { loading, setLoading } = useLoader();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const productId = searchParams.get("product_id");

    const [breadcrumbData, setBreadcrumbData] = useState([]);
    const [headline, setHeadline] = useState([]);
    const [product, setProduct] = useState(null);
    const [variantList, setVariantList] = useState([]);
    const [variantSummary, setVariantSummary] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [tagsData, setTagsData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    const initialVendorId = searchParams.get("vendor_id");
    const [vendorId, setVendorId] = useState(initialVendorId);


    const [requestToQuote, setRequestToQuote] = useState("No");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const product_id = searchParams.get("product_id");
    const category_id = searchParams.get("category_id");
    const sub_category_id = searchParams.get("sub_category_id");
    const child_category_id = searchParams.get("child_category_id");

    const { addToCart } = useCart();

    const handleVendorSelect = (newVendorId) => {
        setVendorId(newVendorId);

        // Update URL without reloading
        searchParams.set("vendor_id", newVendorId);
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: false });
    };


    useEffect(() => {
        if (!product_id && !category_id && !sub_category_id && !child_category_id) {
            console.warn("⛔ Breadcrumb: Missing all query params");
            return;
        }

        const fetchBreadcrumb = async () => {
            try {
                const res = await getBreadcrumb({
                    product_id,
                    category_id,
                    sub_category_id,
                    child_category_id,
                });

                if (res?.status && Array.isArray(res?.breadcrumb)) {
                    setBreadcrumbData(res.breadcrumb);
                }
            } catch (error) {
                console.error("❌ Failed to fetch breadcrumb:", error);
            }
        };

        fetchBreadcrumb();
    }, [location.search]);

    useEffect(() => {
        cordsCategory({ body: {} })
            .then((response) => setCategoryData(response))
            .catch((error) => console.error("Error fetching cruise categories:", error));

        mostUsedTags({ body: {} })
            .then((tagsres) => setTagsData(tagsres))
            .catch((error) => console.error("Error fetching tags:", error));

        getheadline({ body: {} })
            .then((headlineres) => setHeadline(headlineres))
            .catch((error) => console.error("Error fetching headlines:", error));
    }, []);

    useEffect(() => {
        if (productId) {
            setLoading(true);
            getProductDetails({ product_id: productId, vendor_id: vendorId })
                .then((res) => {
                    const data = res?.data || [];
                    const summary = res?.variant_summary || [];

                    const parsedVariants = data.map((variant) => {
                        try {
                            variant.variantAttributes = JSON.parse(variant.varientData);
                        } catch (err) {
                            variant.variantAttributes = {};
                            console.error("Error parsing varientData for ID:", variant.id, err);
                        }
                        return variant;
                    });

                    setRequestToQuote(res?.data?.[0]?.request_to_quote || "No");
                    setVariantList(parsedVariants);
                    setVariantSummary(summary);

                    const mainProduct = parsedVariants.find(
                        (p) => p.id.toString() === productId
                    ) || parsedVariants[0];

                    setProduct(mainProduct);
                })
                .catch((err) => console.error("Error fetching product details:", err))
                .finally(() => setLoading(false));
        }
    }, [productId, vendorId]); // ✅ included vendorId dependency to refetch on change

    useEffect(() => {
        if (productId) {
            getSimilarProducts({ product_id: productId })
                .then((res) => {
                    const products = res?.data?.data || [];
                    setSimilarProducts(products);
                })
                .catch((err) => console.error("Error fetching similar products:", err));
        }
    }, [productId]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [productId]);

    if (!product) return <div>Product not found</div>;

    return (
        <div>
            <Header tagsData={tagsData} categoryData={categoryData} />
            <Marquee headline={headline} />
            {breadcrumbData.length > 0 && <Breadcrumb breadcrumbData={breadcrumbData} />}

            <ProductGallery
                product={product}
                onVendorSelect={handleVendorSelect}
                variantList={variantList}
                variantSummary={variantSummary}
                requestToQuote={requestToQuote}
                openQuoteModal={() => {
                    if (!user) {
                        setIsLoginModalOpen(true);
                    } else {
                        setIsModalOpen(true);
                    }
                }}
            />

            <RequestQuoteModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

            {similarProducts?.length > 0 && (
                <>
                    <h1 className="similarhead">Similar Products</h1>
                    <CardSlider
                        items={similarProducts}
                        renderItem={(item) => (
                            <ProductCard
                                key={item.id}
                                product={item}
                                setLoading={setLoading}
                                requestToQuote={item?.request_to_quote}
                                hidePrice={item?.request_to_quote === "Yes"}
                            />
                        )}
                    />
                </>
            )}
            <Footer />
        </div>
    );
};

export default ProductDetails;

