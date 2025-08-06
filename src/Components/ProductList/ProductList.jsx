import "./ProductList.css";
import ProductCard from "../ProductCard/ProductCard";
import CardSlider from "../CardSlider/CardSlider";
import { useState } from "react";

const ProductList = ({ catProductData, featProductData }) => {
    const catProducts = catProductData?.data || [];
    const featProducts = featProductData?.data || [];
    const [loading, setLoading] = useState(false)
    const formatProducts = (products) =>
        products.map((prod) => ({
            id: prod.id,
            title: prod.title,
            feature_image_url: prod.feature_image_url,
            final_price: parseFloat(prod.final_price),
            price: parseFloat(prod.price),
            discount: `${prod.discount}`,
            code: prod.item_code,
            brand: prod.brand_name,
            list1_value: prod.list1_value || "",
            list2_value: prod.list2_value || "",
            part_number: prod.part_number || "",
            request_to_quote: prod.request_to_quote || "No", // ✅ Add this line
            vendor_id: prod.vendor_id
        }));


    const catSliderItems = formatProducts(catProducts);
    const featSliderItems = formatProducts(featProducts);

    if (catSliderItems.length === 0 && featSliderItems.length === 0) {
        return <div className="no-products">No products found for this category</div>;
    }

    return (

        <div className="product-list">
            {loading && <FullScreenLoader />}
            {catSliderItems.length > 0 && (
                <>
                    <CardSlider
                        items={catSliderItems}
                        renderItem={(item) => <ProductCard key={item.id} product={item} />}
                    />
                </>
            )}

            {featSliderItems.length > 0 && (
                <>
                    <CardSlider
                        items={featSliderItems}
                        renderItem={(item) => <ProductCard key={item.id} product={item} />}
                    />
                </>
            )}
        </div>
    );
};

export default ProductList;
