import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchPopup.css";

const SearchPopup = ({ tagsData, categoryData }) => {
    const [recentSearches, setRecentSearches] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("recentSearches")) || [];
        setRecentSearches(saved);
    }, []);

    const clearSearches = (e) => {
        e.stopPropagation(); // Prevent popup from closing
        localStorage.removeItem("recentSearches");
        setRecentSearches([]);
        setSearchTerm("");
    };

    const handleTagClick = (tagId) => {
        navigate(`/product?tag=${tagId}`);
    };
    const handleCategoryClick = (categoryId) => {
        navigate(`/product?category_id=${categoryId}&per_page=12`);
    };

    const handleRecentClick = (query) => {
        navigate(`/product?search=${encodeURIComponent(query)}`);
    };
    const tagListRaw = Array.isArray(tagsData)
        ? tagsData
        : Array.isArray(tagsData?.data)
            ? tagsData.data
            : [];

    const tagList = [...tagListRaw]
        .sort((a, b) => b.used_count - a.used_count)
        .slice(0, 8);

    const categoryList = Array.isArray(categoryData)
        ? categoryData.slice(0, 8)
        : Array.isArray(categoryData?.data)
            ? categoryData.data.slice(0, 8)
            : [];




    return (
        <div className="search-popup">
            {recentSearches.length > 0 && (
                <div className="search-section">
                    <div className="flex space-between align-center">
                        <h4>Recent Searches</h4>
                        <button className="clear-btn" onClick={clearSearches}>Clear</button>
                    </div>
                    {recentSearches.map((item, index) => (
                        <li key={index} className="recent-item">
                            <span onClick={() => handleRecentClick(item)}>{item}</span>
                            <button
                                className="remove-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const updated = recentSearches.filter((search) => search !== item);
                                    setRecentSearches(updated);
                                    localStorage.setItem("recentSearches", JSON.stringify(updated));
                                }}
                                aria-label="Remove"
                            >
                                &times;
                            </button>
                        </li>
                    ))}

                </div>
            )}

            <div className="search-section">
                <h4>Top Searches</h4>
                <div className="tags-list">
                    {tagList.length > 0 ? (
                        tagList.map((tag) => (
                            <span key={tag.id} className="tag-item" onClick={() => handleTagClick(tag.id)}>
                                {tag.title}
                            </span>
                        ))
                    ) : (
                        <p>No tags found.</p>
                    )}
                </div>
            </div>

            <div className="search-section">
                <h4>Top Categories</h4>
                <div className="category-grid">
                    {categoryList.length > 0 ? (
                        categoryList.map((cat) => (
                            <div key={cat.id} className="category-card" onClick={() => handleCategoryClick(cat.id)}>
                                <img
                                    src={cat.image_url}
                                    alt={cat.title || cat.category_name}
                                    className="category-card-image"
                                />
                                <div className="category-card-title">
                                    {cat.title || cat.category_name}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No categories found.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default SearchPopup;
