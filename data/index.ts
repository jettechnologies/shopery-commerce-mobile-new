export const SLIDES = [
  {
    image: require("@/assets/images/onboarding-one.jpg"),
    title: "Various Collections Of The Latest Products",
    description:
      "Urna amet, suspendisse ullamcorper ac elit diam facilisis cursus vestibulum.",
  },
  {
    image: require("@/assets/images/onboarding-two.jpg"),
    title: "Complete Collection Of Colors And Sizes",
    description:
      "Urna amet, suspendisse ullamcorper ac elit diam facilisis cursus vestibulum.",
  },
  {
    image: require("@/assets/images/onboarding-three.jpg"),
    title: "Find The Most Suitable Outfit For You",
    description:
      "Urna amet, suspendisse ullamcorper ac elit diam facilisis cursus vestibulum.",
  },
];

export const IMAGES = {
  whiteTee: require("@/assets/images/plain-white-tee.png"),
  blackBag: require("@/assets/images/black-bag.png"),
  blackTee: require("@/assets/images/plain-black-tee.png"),
  sneakers: require("@/assets/images/sneakers.png"),
};

export const CATEGORY_PRODUCTS_DATA = [
  {
    category: { slug: "new_arrivals", name: "New Arrivals" },
    products: [
      {
        id: "sug-1234",
        name: "Plain White Tee",
        price: 12.99,
        image: IMAGES.whiteTee,
      },
      {
        id: "sug-3456",
        name: "Black Bag",
        price: 12.99,
        image: IMAGES.blackBag,
      },
      {
        id: "sug-5678",
        name: "Plain Black Tee",
        price: 12.99,
        image: IMAGES.blackTee,
      },
      {
        id: "sug-0987",
        name: "Sneakers",
        price: 12.99,
        image: IMAGES.sneakers,
      },
    ],
  },
  {
    category: { slug: "clothes", name: "Clothes" },
    products: [
      {
        id: "sug-1234",
        name: "Plain White Tee",
        price: 12.99,
        image: IMAGES.whiteTee,
      },
      {
        id: "sug-3456",
        name: "Black Bag",
        price: 12.99,
        image: IMAGES.blackBag,
      },
      {
        id: "sug-5678",
        name: "Plain Black Tee",
        price: 12.99,
        image: IMAGES.blackTee,
      },
      {
        id: "sug-0987",
        name: "Sneakers",
        price: 12.99,
        image: IMAGES.sneakers,
      },
    ],
  },
  {
    category: { slug: "men_essentials", name: "Men Essentials" },
    products: [
      {
        id: "sug-1234",
        name: "Plain White Tee",
        price: 12.99,
        image: IMAGES.whiteTee,
      },
      {
        id: "sug-3456",
        name: "Black Bag",
        price: 12.99,
        image: IMAGES.blackBag,
      },
      {
        id: "sug-5678",
        name: "Plain Black Tee",
        price: 12.99,
        image: IMAGES.blackTee,
      },
      {
        id: "sug-0987",
        name: "Sneakers",
        price: 12.99,
        image: IMAGES.sneakers,
      },
    ],
  },
];

export const PRODUCTS_DATA = [
  {
    id: "sug-1234",
    name: "Plain White Tee",
    price: 12.99,
    image: IMAGES.whiteTee,
  },
  {
    id: "sug-3456",
    name: "Black Bag",
    price: 12.99,
    image: IMAGES.blackBag,
  },
  {
    id: "sug-5678",
    name: "Plain Black Tee",
    price: 12.99,
    image: IMAGES.blackTee,
  },
  {
    id: "sug-0987",
    name: "Sneakers",
    price: 12.99,
    image: IMAGES.sneakers,
  },
];

export const CATEGORY_DATA = [
  {
    title: "New Arrivals",
    productCount: 208,
    image: IMAGES.blackTee,
    slug: "new_arrivals",
    variant: "left",
    bgFrom: "bg-gray-200",
    bgTo: "bg-gray-100",
  },
  {
    title: "Clothes",
    productCount: 358,
    image: IMAGES.whiteTee,
    slug: "clothes",
    variant: "right",
    bgFrom: "bg-green-200",
    bgTo: "bg-green-100",
  },
  {
    title: "Men Essentials",
    productCount: 208,
    image: IMAGES.blackBag,
    slug: "men_essentials",
    variant: "left",
    bgFrom: "bg-plush-200",
    bgTo: "bg-plush-100",
  },
  {
    title: "New Arrivals",
    productCount: 208,
    image: IMAGES.blackTee,
    slug: "new_arrivals_new",
    variant: "left",
    bgFrom: "bg-gray-200",
    bgTo: "bg-gray-100",
  },
  {
    title: "Clothes",
    productCount: 358,
    image: IMAGES.whiteTee,
    slug: "clothes_new",
    variant: "right",
    bgFrom: "bg-green-200",
    bgTo: "bg-green-100",
  },
  {
    title: "Men Essentials",
    productCount: 208,
    image: IMAGES.blackBag,
    slug: "men_essentials_new",
    variant: "left",
    bgFrom: "bg-plush-200",
    bgTo: "bg-plush-100",
  },
];

export const PRODUCT_COLORS = [
  "#8B5CF6",
  "#000",
  "#22C55E",
  "#06B6D4",
  "#F59E0B",
  "#EF4444",
];

export const PRODUCT_REVIEWS = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  name: "Alex Morgan",
  text: "Great quality product, really impressed with the material.",
  rating: Math.floor(Math.random() * 5) + 1,
  createdAt: new Date().toISOString(),
}));

export const MOCK_ADDRESSES = [
  {
    id: 1,
    title: "Home",
    street: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    isDefault: true,
  },
  {
    id: 2,
    title: "Office",
    street: "456 Market St, Suite 100",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    isDefault: false,
  },
  {
    id: 3,
    title: "Vacation Home",
    street: "789 Ocean Drive",
    city: "Miami",
    state: "FL",
    zipCode: "33139",
    isDefault: false,
  },
];
