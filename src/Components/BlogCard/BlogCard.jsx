import "./BlogCard.css";
import staticImage from ".././../assets/blogimg.png"

const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
};

const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const BlogCard = ({ blog }) => {
    const thumbnail =
        blog._embedded?.["wp:featuredmedia"]?.[0]?.source_url || staticImage;

    const titleText = truncateText(stripHtml(blog.title.rendered), 40);
    const excerptText = truncateText(stripHtml(blog.excerpt.rendered), 90);

    return (
        <div className="blog-card">
            <div className="blog-image-wrapper">
                <img src={thumbnail} alt="Blog thumbnail" className="blog-image" />
            </div>
            <div className="blog-details">
                <h2 className="blog-title">{titleText}</h2>
                <p className="blog-excerpt">{excerptText}</p>
                <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="read-more-btn"
                >
                    Read More
                </a>
            </div>
        </div>
    );
};

export default BlogCard;
