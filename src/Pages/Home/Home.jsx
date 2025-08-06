import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Marquee from '../../Components/Marquee/Marquee'
import CategoryMenu from '../../Components/CategoryMenu/CategoryMenu'
import ProductCategories from '../../Components/ProductCategories/ProductCategories'
import ProductList from '../../Components/ProductList/ProductList'
import Tags from '../../Components/Tags/Tags'
import axios from 'axios'
import "./Home.css"
import { useState, useEffect } from 'react'
import BlogCard from '../../Components/BlogCard/BlogCard'
import { cordsCategory, mostUsedTags, catProduct, featureProduct, getbrands, fetchDataByTable, getheadline } from '../../store/Services/AllApi'
import CardSlider from '../../Components/CardSlider/CardSlider'
import FullScreenLoader from '../../Components/FullScreenLoader/FullScreenLoader'


const Home = () => {
    const [categoryData, setCategoryData] = useState([]);
    const [bannerData, setBannerData] = useState([]);
    const [subbannerData, setSubBannerData] = useState([]);
    const [sectionData, setSectionData] = useState([]);
    const [tagsData, setTagsData] = useState([]);
    const [brandsData, setBrandsData] = useState([]);
    const [catProductData, setCatProductData] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [featProductData, setFeatProductData] = useState([]);
    const [blogData, setBlogData] = useState([]);
    const [post, setPost] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [headline, setHeadline] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        cordsCategory({ body: {} })
            .then((response) => {
                // console.log("cords category", response);
                setCategoryData(response)
            })
            .catch((error) => {
                console.error("Error fetching cruise categories:", error);
            });
        fetchDataByTable({ tableName: "banner", body: {} })
            .then((bannerres) => {
                setBannerData(bannerres)
            })
            .catch((error) => {
                console.error("Error fetching cruise categories:", error);
            });
        fetchDataByTable({ tableName: "sub_banner", body: {} })
            .then((subbannerres) => {
                console.log("subbanner", subbannerres);
                setSubBannerData(subbannerres)
            })
            .catch((error) => {
                console.error("Error fetching cruise categories:", error);
            });
        fetchDataByTable({ tableName: "section", body: {} })
            .then((sectionres) => {
                console.log("sectionres", sectionres);
                setSectionData(sectionres);
            })
            .catch((error) => {
                console.error("Error fetching cruise categories:", error);
            });
        mostUsedTags({ body: {} })
            .then((tagsres) => {
                console.log("tags", tagsres);
                setTagsData(tagsres);
            })
            .catch((error) => {
                console.error("Error fetching cruise categories:", error);
            });
        getbrands({ body: {} })
            .then((brandsres) => {
                console.log("brands", brandsres);
                setBrandsData(brandsres);
            })
            .catch((error) => {
                console.error("Error fetching cruise categories:", error);
            });
        setLoading(true);
        catProduct({ body: {} })
            .then((catprodres) => {
            })
            .catch((error) => {
                console.error("Error fetching cruise categories:", error);
            })
            .finally(() => {
                setLoading(false);
            });

        featureProduct({ body: {} })
            .then((featprodres) => {
                console.log("feat", featprodres)
                setFeatProductData(featprodres);
            })
            .catch((error) => {
                console.error("Error fetching cruise categories:", error);
            });
        axios.get("https://cablecommunity.com/wp-json/wp/v2/posts?_embed")
            .then((blogres) => {
                console.log("Fetched posts:", blogres.data);
                setBlogData(blogres.data);
            })
            .catch((err) => {
                console.error("Error fetching posts:", err);
                setError("Failed to load posts");
            });
        getheadline({ body: {} })
            .then((headlineres) => {
                console.log("headline", headlineres)
                setHeadline(headlineres);
            })
            .catch((error) => {
                console.error("Error fetching cruise categories:", error);
            });
    }, []);



    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get('https://cablecommunity.com/wp-json/wp/v2/posts/21534?_embed');
                setPost(res.data);

                const media = res.data?._embedded?.['wp:featuredmedia']?.[0];
                if (media) {
                    setThumbnail(media.source_url);
                }
            } catch (error) {
                console.error('Failed to fetch blog post:', error);
            }
        };
        fetchPost();
    }, []);

    useEffect(() => {
        if (categoryData?.data?.length > 0 && !selectedCategoryId) {
            setSelectedCategoryId(categoryData.data[0].id);
        }
    }, [categoryData]);


    useEffect(() => {
        if (selectedCategoryId) {
            catProduct({ category_id: selectedCategoryId, take: "4", body: {} })
                .then((res) => setCatProductData(res))
                .catch((err) => console.error("Error fetching products:", err));
        }
    }, [selectedCategoryId]);

    console.log("secData", sectionData)
    console.log("catpro", catProductData);
    console.log("feat", featProductData);

    const clients = [
        { src: "https://cords.tranktechnologies.com/front/images/client/SPA-Instruments-Logo.png", alt: "Image 1" },
        { src: "https://cords.tranktechnologies.com/front/images/client/BOMS-Logo.png", alt: "Image 2" },
        { src: "https://cords.tranktechnologies.com/front/images/client/Enpro-Industries-Logo-.png", alt: "Image 3" },
        { src: "https://cords.tranktechnologies.com/front/images/client/Pressure-&-Process-Boiler-Logo.png", alt: "Image 3" },
        { src: "https://cords.tranktechnologies.com/front/images/client/Spirare-Logo.png", alt: "Image 3" },
        { src: "https://cords.tranktechnologies.com/front/images/client/Green-Power-Logo.png", alt: "Image 3" },
    ];


    return (
        <div >
            <Header categoryData={categoryData} tagsData={tagsData} />
            <Marquee headline={headline} seamless />
            <CategoryMenu categoryData={categoryData} bannerData={bannerData} subbanner={subbannerData} section={sectionData} headline={headline} />
            <ProductCategories
                categoryData={categoryData}
                onSelectCategory={(id) => setSelectedCategoryId(id)}
            />
            {loading ? (
                <FullScreenLoader />
            ) : (
                <ProductList catProductData={catProductData} />
            )}
            <Tags tagsData={tagsData} enableShowMore={true} />
            <h1 className='featuredprod'>Featured Products</h1>
            <ProductList featProductData={featProductData} />
            <h1 className='ourbrand'>Our Brands</h1>
            <Marquee brandsData={brandsData} seamless />
            <h1 className='ourbrand'>Our Blogs</h1>
            <CardSlider
                items={blogData}
                renderItem={(item) => <BlogCard blog={item} />}
            />
            <h1 className='ourbrand'>Our Clients</h1>
            <p className='ourbrand'>Presently, we accomplish this through customized design and development, quality manufacturing and
                reliable delivery of all types of LT range cables and household wires.</p>
            <Marquee clients={clients} seamless />
            <Footer />
        </div>
    )
}

export default Home