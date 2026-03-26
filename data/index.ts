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
      { name: "Plain White Tee", price: 12.99, image: IMAGES.whiteTee },
      { name: "Black Bag", price: 12.99, image: IMAGES.blackBag },
      { name: "Plain Black Tee", price: 12.99, image: IMAGES.blackTee },
      { name: "Sneakers", price: 12.99, image: IMAGES.sneakers },
    ],
  },
  {
    category: { slug: "clothes", name: "Clothes" },
    products: [
      { name: "Plain White Tee", price: 12.99, image: IMAGES.whiteTee },
      { name: "Black Bag", price: 12.99, image: IMAGES.blackBag },
      { name: "Plain Black Tee", price: 12.99, image: IMAGES.blackTee },
      { name: "Sneakers", price: 12.99, image: IMAGES.sneakers },
    ],
  },
  {
    category: { slug: "men_essentials", name: "Men Essentials" },
    products: [
      { name: "Plain White Tee", price: 12.99, image: IMAGES.whiteTee },
      { name: "Black Bag", price: 12.99, image: IMAGES.blackBag },
      { name: "Plain Black Tee", price: 12.99, image: IMAGES.blackTee },
      { name: "Sneakers", price: 12.99, image: IMAGES.sneakers },
    ],
  },
];

export const PRODUCTS_DATA = [
  { name: "Plain White Tee", price: 12.99, image: IMAGES.whiteTee },
  { name: "Black Bag", price: 12.99, image: IMAGES.blackBag },
  { name: "Plain Black Tee", price: 12.99, image: IMAGES.blackTee },
  { name: "Sneakers", price: 12.99, image: IMAGES.sneakers },
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
