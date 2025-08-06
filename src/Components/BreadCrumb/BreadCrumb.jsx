import { Link } from "react-router-dom";
import "./Breadcrumb.css";

const Breadcrumb = ({ breadcrumbData }) => {
    return (
        <nav className="breadcrumb">
            {breadcrumbData.map((item, index) => {
                const isLast = index === breadcrumbData.length - 1;

                // Special case for Home
                const url = item.label.toLowerCase() === "home" ? "/" : `/${item.url}`;

                return (
                    <span key={index} className="breadcrumb-item">
                        {!isLast ? (
                            <>
                                <Link to={url}>{item.label}</Link>
                                <span className="breadcrumb-separator">›</span>
                            </>
                        ) : (
                            <span>{item.label}</span>
                        )}
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
