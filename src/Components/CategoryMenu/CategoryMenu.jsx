import React from 'react';
import './CategoryMenu.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdWindow } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SubCategoryList = ({
  subcategories,
  parentTitle,
  categoryId,
  parentSubCategoryId,
  onSubCategoryClick
}) => {
  if (!subcategories || subcategories.length === 0) return null;

  return (
    <div className="nested-submenu top-aligned">
      {parentTitle && (
        <div className="nested-heading">
          <strong>{parentTitle}</strong>
        </div>
      )}
      <ul>
        {subcategories.map((child) => (
          <li key={child.slug}>
            <span
              onClick={(e) => {
                e.stopPropagation();
                // When a child category is clicked, we call the callback with all necessary IDs
                if (parentSubCategoryId) {
                  onSubCategoryClick(categoryId, parentSubCategoryId, child.id);
                } else {
                  onSubCategoryClick(categoryId, child.id);
                }
              }}
            >
              {child.title}
            </span>

            {child.subcategories && child.subcategories.length > 0 && (
              <SubCategoryList
                subcategories={child.subcategories}
                parentTitle={child.title}
                categoryId={categoryId}
                parentSubCategoryId={child.id}
                onSubCategoryClick={onSubCategoryClick}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const CategoryMenu = ({ categoryData, bannerData, subbanner, section }) => {
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    const url = `/product?category_id=${item.id}&per_page=12`;
    navigate(url);
  };

  const handleSubCategoryNavigate = (categoryId, subCategoryId) => {
    const url = `/product?per_page=12&category_id=${categoryId}&sub_category_id=${subCategoryId}`;
    navigate(url);
  };

  const handleChildCategoryNavigate = (categoryId, subCategoryId, childCategoryId) => {
    const url = `/product?per_page=12&category_id=${categoryId}&sub_category_id=${subCategoryId}&child_category_id=${childCategoryId}`;
    navigate(url);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
  };


  return (
    <div className="parentdiv">
      <div className="maindiv flex">
        <div className="categorie-box">
          <ul>
            {categoryData?.data?.slice(0, 9).map((item) => (
              <li className="category-item" key={item.slug} onClick={() => handleNavigate(item)}>
                <img src={item.image_url} alt={item.title} />
                <p>{item.title}</p>

                {item.subcategories && item.subcategories.length > 0 && (
                  <div className="sub-categories">
                    <div className="categorie-wrapper">
                      <div className="sub-categories-menu">
                        <h5 className="subheading">
                          <a href="#">{item.title}</a>
                        </h5>

                        <ul>
                          {item.subcategories.map((sub) => (
                            <li key={sub.slug}>
                              <div className="submenu-item-wrapper">
                                {/* This span handles clicks for 2nd-level categories */}
                                <span onClick={(e) => {
                                  e.stopPropagation();
                                  handleSubCategoryNavigate(item.id, sub.id);
                                }}>
                                  {sub.title}
                                </span>

                                {/* This renders the 3rd-level categories */}
                                {sub.subcategories && sub.subcategories.length > 0 && (
                                  <SubCategoryList
                                    subcategories={sub.subcategories}
                                    parentTitle={sub.title}
                                    categoryId={item.id}
                                    parentSubCategoryId={sub.id}
                                    onSubCategoryClick={(categoryId, subCategoryId, childCategoryId) => {
                                      if (childCategoryId) {
                                        handleChildCategoryNavigate(categoryId, subCategoryId, childCategoryId);
                                      } else {
                                        handleSubCategoryNavigate(categoryId, subCategoryId);
                                      }
                                    }}
                                  />
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}

            <li
              className="view-all-item"
              onClick={() => navigate('/product?per_page=12')}
            >
              <button>
                <MdWindow className="viewicon" />
              </button>
              <p>View All Category</p>
            </li>
          </ul>
        </div>

        <div className='categorie-side'>
          <div className='slidersec'>
            <Slider {...settings}>
              {bannerData?.data?.map((item, index) => (
                <div key={index}>
                  <img src={item.image_url} alt={`Slide ${index + 1}`} style={{ width: "100%", height: "auto" }} />
                </div>
              ))}
            </Slider>
          </div>
          <div className="image-grid">
            {subbanner?.data?.map((item, index) => (
              <div key={index} className="grid-item">
                <a href="#">
                  <img src={item.image_url} alt={`Promotional image ${index + 1}`} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="promo">
        <div className="promo-cards-container">
          {section?.data?.map((item, index) => (
            <div
              key={index}
              className="promo-card"
              style={{ backgroundImage: `url(${item.image_url})` }}
            >
              <div className="promo-card-content">
                <span className="promo-card-tag">{item.title}</span>
                <h3 className="promo-card-title">{item.heading}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;