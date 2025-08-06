import "./Marquee.css";

const Marquee = ({ content, brandsData = [], clients = [], headline, speed = 30 }) => {
    const headlineText = headline?.status ? headline.data : null;

    const hasLoopData =
        (brandsData?.data?.length || 0) > 0 ||
        clients.length > 0 ||
        (Array.isArray(content) ? content.length > 0 : !!content);

    const combinedImages = [
        ...(brandsData?.data || []).map((item, index) => ({
            src: item.image_url,
            alt: item.title || `brand-${index}`,
            brand_id: item.id,
        })),
        ...clients.map((img, index) => ({
            src: img.src,
            alt: img.alt || `client-${index}`,
        })),
    ];

    const handleBrandClick = (brandId) => {
        window.open(`/brand?brand_id=${brandId}`, "_blank");
    };

    return (
        <div className="marquee-wrapper">
            {headlineText && (
                <div className="headline-container">
                    <div className="marquee-headline-scroll">
                        <span className="marquee-headline">{headlineText}</span>
                    </div>
                </div>
            )}

            {hasLoopData && (
                <div className="marquee-loop-wrapper">
                    <div className="marquee-inner" style={{ "--speed": `${speed}s` }}>
                        {[...Array(2)].flatMap((_, loopIndex) => (
                            [
                                ...(Array.isArray(content) ? content.map((text, index) => (
                                    <span key={`text-${loopIndex}-${index}`} className="marquee-text">
                                        {text}
                                    </span>
                                )) : content ? [
                                    <span key={`text-${loopIndex}`} className="marquee-text">
                                        {content}
                                    </span>
                                ] : []),

                                ...combinedImages.map((img, index) => (
                                    <img
                                        key={`loop-img-${loopIndex}-${index}`}
                                        src={img.src}
                                        alt={img.alt}
                                        className="marquee-image"
                                        onClick={() => img.brand_id && handleBrandClick(img.brand_id)}
                                    />
                                ))
                            ]
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default Marquee;