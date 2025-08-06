import { getProducts } from "../../Services/AllApi/index.tsx";
import { defaults } from "../default.tsx";

export const allApi = {
  categories: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/categories",
    },
  },
  mostUsedTags: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/most-used-tags",
    },
  },
  cateproduct: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/cate-product",
    },
  },
  featureproduct: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/feature-product",
    },
  },
  getbrands: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/brands",
    },
  },
  fetchdatabytable: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/fetch-data",
    },
  },
  headline: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/headline",
    },
  },
  getProducts: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/product",
    },
  },
  productDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/product-details",
    },
  },
  similarProducts: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/similar-product",
    },
  },
  breadcrumb: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/product-breadcrumb",
    },
  },
  specificationDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/specification-details",
    },
  },
  productReviews: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/product-reviews",
    },
  },
  deliveryDays: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/delivery-days",
    },
  },
  customerLogin: {
    v1: {
      uri: "/customer-login",
      method: "POST",
      version: "",
    },
  },
  customerRegister: {
    v1: {
      uri: "/customer-register",
      method: "POST",
      version: "",
      headerProps: {
        "X-Register-Key": "super-secret-register-key",
      },
    },
  },
  otherVendorsDiscount: {
    v1: {
      uri: "/api/other-vendors-discount",
      method: "GET",
      version: "",
      headerProps: {},
    },
  },
  userAddress: {
    v1: {
      uri: "/user-address",
      method: "GET",
      version: "",
      headerProps: {},
    },
    v2: {
      uri: "/add-address",
      method: "POST",
      version: "",
      headerProps: {
        "Content-Type": "application/json",
      },
    },
    v3: {
      uri: "/edit-address",
      method: "GET",
      version: "",
      headerProps: {
        "Content-Type": "application/json",
      },
    },
    v4: {
      uri: "/update-address",
      method: "POST",
      version: "",
      headerProps: {
        "Content-Type": "application/json",
      },
    },
  },
};
