import "./ProductCategories.css";

const ProductCategories = ({ categoryData, onSelectCategory }) => {
    return (
        <div className="productcat">
            <h1>Product Categories</h1>
            <p>
                Cords offers extensive expertise in design, development and manufacture of high quality power,
                control, instrumentation, thermocouple extension/compensating and communication cables conforming to
                Indian/international standards and customer specifications. The products include:
            </p>

            <div className="category-buttons-wrapper">
                {categoryData?.data?.slice(0, 8).map((item) => (
                    <div className="togglebtns" key={item.id}>
                        <button onClick={() => onSelectCategory(item.id)}>
                            {item.title}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCategories;
