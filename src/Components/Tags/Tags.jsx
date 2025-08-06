import "./Tags.css";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

// Set the default limit to 20 tags.
// `enableShowMore` defaults to `false` to ensure it's an opt-in feature.
const Tags = ({ tagsData, limit = 30, enableShowMore = false, onTagClick }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const tags = useMemo(() => {
    const raw = Array.isArray(tagsData?.data)
      ? tagsData.data
      : Array.isArray(tagsData)
        ? tagsData
        : [];
    return [...raw].sort(() => Math.random() - 0.5);
  }, [tagsData]);

  // --- LOGIC TO DETERMINE VISIBLE TAGS ---
  // If the "show more" feature is enabled AND we are not showing all,
  // then slice the array to the specified limit. Otherwise, show all tags.
  const visibleTags = enableShowMore && !showAll ? tags.slice(0, limit) : tags;

  // --- LOGIC TO DETERMINE IF THE BUTTON SHOULD APPEAR ---
  // The button should only be rendered if the feature is enabled
  // AND there are actually more tags to show than the limit.
  const shouldShowToggleButton = enableShowMore && tags.length > limit;

  const handleClick = (tagId) => {
    if (onTagClick) {
      onTagClick(tagId);
    } else {
      const newParams = new URLSearchParams();
      newParams.set("tag", tagId);
      navigate(`/product?${newParams.toString()}`);
    }
  };

  return (
    <div className="tags-container">
      <div className="tags-box">
        {visibleTags.map((item) => (
          <span
            key={item.id}
            className={`tag ${item.used_count > 39 ? "highlight-tag" : ""}`}
            onClick={() => handleClick(item.id)}
          >
            {item.title || item.name}
          </span>
        ))}
        <div>
          {shouldShowToggleButton && (
            <div className="tags-controls">
              {showAll ? (
                <button className="read-more-btn" onClick={() => setShowAll(false)}>
                  Show Less
                </button>
              ) : (
                <button className="read-more-btn" onClick={() => setShowAll(true)}>
                  +{tags.length - limit} More
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tags;