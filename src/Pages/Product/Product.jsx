import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Marquee from '../../Components/Marquee/Marquee';
import { useSearchParams } from 'react-router-dom';
import bannerBg from '../../assets/product-banner.png';
import bannerRight from '../../assets/product-banner-right.png';
import './Product.css';
import CardSlider from '../../Components/CardSlider/CardSlider';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { useLocation } from 'react-router-dom';
import NoProduct from '../../assets/noproduct.png'
import { getheadline } from '../../store/Services/AllApi';
import FullScreenLoader from '../../Components/FullScreenLoader/FullScreenLoader';
import Breadcrumb from '../../Components/BreadCrumb/BreadCrumb';
import { cordsCategory } from '../../store/Services/AllApi';
import { getProducts } from '../../store/Services/AllApi';
import { getBreadcrumb } from '../../store/Services/AllApi';
import { useLoader } from '../../Context/LoaderContext';



const Product = () => {
  const location = useLocation();
  const { loading, setLoading } = useLoader();
  const [headline, setHeadline] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [breadcrumbData, setBreadcrumbData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 12,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get('category_id');
  const subCategoryId = searchParams.get("sub_category_id");
  const childCategoryId = searchParams.get("child_category_id");



  const perPage = searchParams.get('per_page') || 12;


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pagination.currentPage]);
  useEffect(() => {
    cordsCategory({ body: {} })
      .then((response) => {
        setCategoryData(response)
      })
      .catch((error) => {
        console.error("Error fetching cruise categories:", error);
      });
    getheadline({ body: {} })
      .then((headlineres) => {
        console.log("headline", headlineres)
        setHeadline(headlineres);
      })
      .catch((error) => {
        console.error("Error fetching cruise categories:", error);
      })
  }, []);

  // Fetch products whenever categoryId or perPage changes
  const fetchProducts = async (page = 1) => {
    setLoading(true);

    // Update the search params to reflect current page
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("page", page);
      return newParams;
    });

    try {
      const search = searchParams.get("search");
      const brand_id = searchParams.get("brand_id");
      const tag = searchParams.get("tag");

      const response = await getProducts({
        page, // ✅ use this directly
        per_page: perPage,
        category_id: categoryId,
        sub_category_id: subCategoryId,
        child_category_id: childCategoryId,
        search: searchParams.get("search"),
        brand_id: searchParams.get("brand_id"),
        tag: searchParams.get("tag"),
      });


      const data = response.data;

      setProducts(data.data);
      setBrands(response.filter_brand);
      setTagsData(response.filter_tags);
      setPagination({
        currentPage: data.current_page,
        lastPage: data.last_page,
        total: data.total,
        perPage: parseInt(data.per_page),
      });
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    fetchProducts(page);
  }, [categoryId, subCategoryId, childCategoryId, perPage, searchParams]);


  useEffect(() => {
    const fetchBreadcrumb = async () => {
      try {
        const product_id = searchParams.get("product_id");
        const category_id = searchParams.get("category_id");
        const sub_category_id = searchParams.get("sub_category_id");
        const child_category_id = searchParams.get("child_category_id");

        if (!product_id && !category_id && !sub_category_id && !child_category_id) {
          console.log("⛔ Breadcrumb: Missing all query params");
          return;
        }

        const res = await getBreadcrumb({
          product_id,
          category_id,
          sub_category_id,
          child_category_id,
        });

        console.log("🟢 Breadcrumb API Res:", res);

        if (res?.status && Array.isArray(res?.breadcrumb)) {
          setBreadcrumbData(res?.breadcrumb);
        } else {
          console.warn("⚠️ Breadcrumb missing in response");
        }
      } catch (error) {
        console.error("❌ Failed to fetch breadcrumb:", error);
      }
    };

    fetchBreadcrumb();
  }, [location.search]);


  useEffect(() => {
    console.log("Current URL Params:");
    console.log("category_id:", categoryId);
    console.log("sub_category_id:", subCategoryId);
    console.log("child_category_id:", childCategoryId);
  }, [searchParams]);

  useEffect(() => {
    const brandParam = searchParams.get("brand_id");
    if (brandParam) {
      const brandIds = brandParam.split(",").map(Number);
      setSelectedBrands(brandIds);
    } else {
      setSelectedBrands([]);
    }
  }, [searchParams]);

 
  console.log("Taggg", tagsData)

  console.log("dog", categoryData)

  return (
    <div className="product-page">
      <Header tagsData={tagsData} categoryData={categoryData} />
      <Marquee headline={headline} />

      {/* Banner */}
      <div className="product-banner-bg" style={{ backgroundImage: `url(${bannerBg})` }}>
        <div className="product-banner-wrapper">
          <div className="product-banner-container">
            <div className="product-banner-content">
              <div className="product-text-content">
                <h1>Superior-quality wire and cables.</h1>
                <p>Industry delivery times.</p>
              </div>
              <div className="product-image-content">
                <img src={bannerRight} alt="Cable Image" />
              </div>
            </div>
          </div>
        </div>

        {/* Category section */}
        <div className="product-category-section">
          <h2 className="product-category-title">Source by categories</h2>

          {/* Desktop Grid */}
          <div className="product-category-grid desktop-only">
            {categoryData?.data?.length > 0 ? (
              categoryData.data.map((cat) => (
                <a
                  href="#"
                  className="product-category-item"
                  key={cat.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setSearchParams({
                      category_id: cat.id,
                      per_page: perPage,
                    });
                  }}
                >
                  <figure
                    className={String(cat.id) === categoryId ? 'active-category' : ''}
                  >
                    <img
                      src={cat.image_url || "/images/placeholder.png"}
                      alt={cat.title}
                      loading="lazy"
                    />
                  </figure>
                  <p className="catname">{cat.title}</p>
                </a>
              ))
            ) : (
              <p>Loading categories...</p>
            )}
          </div>


          {/* Mobile Slider */}
          <div className="mobile-only">
            {categoryData?.data?.length > 0 ? (
              <CardSlider
                key={categoryId || 'initial-load'}
                items={categoryData.data}
                slidesToShow={3}
                customResponsive={[
                  { breakpoint: 1024, settings: { slidesToShow: 3 } },
                  { breakpoint: 600, settings: { slidesToShow: 3 } },
                  { breakpoint: 480, settings: { slidesToShow: 3 } }
                ]}
                renderItem={(cat) => (
                  <a
                    href="#"
                    className={`product-category-item ${String(cat.id) === categoryId ? 'active-category' : ''}`}
                    key={cat.id}
                    onClick={(e) => {
                      e.preventDefault();
                      setSearchParams({
                        category_id: cat.id,
                        per_page: perPage
                      });
                    }}
                  >
                    <figure>
                      <img
                        src={cat.image_url || "/images/placeholder.png"}
                        alt={cat.title}
                        loading="lazy"
                      />
                    </figure>
                    <p className="catname">{cat.title}</p>
                  </a>
                )}
              />
            ) : (
              <p>Loading categories...</p>
            )}
          </div>
        </div>
      </div>

      {breadcrumbData.length > 0 && <Breadcrumb breadcrumbData={breadcrumbData} />}

      <div className="product-main">
        <aside className="sidebar">
          <div className="filter-box">
            <h4>Filter by brand</h4>

            {brands.map((brand) => (
              <label key={brand.id}>
                <input
                  type="checkbox"
                  value={brand.id}
                  checked={selectedBrands.includes(brand.id)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const value = parseInt(e.target.value);

                    const updatedBrands = checked
                      ? [...selectedBrands, value]
                      : selectedBrands.filter((id) => id !== value);

                    setSelectedBrands(updatedBrands);

                    // Update URL search params with brand IDs
                    setSearchParams((prev) => {
                      const newParams = new URLSearchParams(prev);
                      newParams.set("category_id", categoryId);
                      newParams.set("per_page", perPage);
                      if (updatedBrands.length > 0) {
                        newParams.set("brand_id", updatedBrands.join(","));
                      } else {
                        newParams.delete("brand_id");
                      }
                      return newParams;
                    });
                  }}
                />
                {brand.name}
              </label>
            ))}


            <a href="#" className="remove-all">Remove all</a>
          </div>


          {/* <Tags tagsData={tagsData} />*/}

        </aside>

        <div className="product-grid">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div class="no-product-card">
              <img src={NoProduct} alt="No Product Found" />
              <h2>No Products Found</h2>
              <p>We couldn’t find any products matching your search.</p>
            </div>
          )}
        </div>
      </div>

      <p className="result-summary">
        Showing {(pagination.currentPage - 1) * pagination.perPage + 1} to{" "}
        {Math.min(pagination.currentPage * pagination.perPage, pagination.total)} of{" "}
        {pagination.total} results
      </p>

      <div className="pagination">
        {/* Prev */}
        <button
          onClick={() => fetchProducts(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
        >
          &lt;
        </button>

        {/* Always show Page 1 */}
        <button
          onClick={() => fetchProducts(1)}
          className={pagination.currentPage === 1 ? "active" : ""}
        >
          1
        </button>

        {/* Main range (no left dots!) */}
        {(() => {
          const pages = [];
          const { currentPage, lastPage } = pagination;

          let start = 2;
          let end = 8;

          if (currentPage > 8 && currentPage < lastPage - 5) {
            start = currentPage - 2;
            end = currentPage + 2;
          } else if (currentPage >= lastPage - 5) {
            start = lastPage - 6;
            end = lastPage - 1;
          }

          // Just prevent left dots entirely
          start = Math.max(2, start);

          for (let i = start; i <= end && i < lastPage; i++) {
            pages.push(
              <button
                key={i}
                onClick={() => fetchProducts(i)}
                className={pagination.currentPage === i ? "active" : ""}
              >
                {i}
              </button>
            );
          }

          return pages;
        })()}

        {/* Only show right dots if not near the end */}
        {pagination.currentPage < pagination.lastPage - 5 && <span>...</span>}

        {/* Always show last page if it's not 1 */}
        {pagination.lastPage > 1 && (
          <button
            onClick={() => fetchProducts(pagination.lastPage)}
            className={pagination.currentPage === pagination.lastPage ? "active" : ""}
          >
            {pagination.lastPage}
          </button>
        )}

        {/* Next */}
        <button
          onClick={() => fetchProducts(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.lastPage}
        >
          &gt;
        </button>
      </div>


      <Footer />
    </div>
  );
};

export default Product;
