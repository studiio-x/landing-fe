export const PATHS = {
  // Landing pages
  HOME: "/",
  GUIDE: "/guide",
  PRICE: "/price",

  // Auth pages
  LOGIN: "/login",
  SIGNUP: "/signup",

  // Dashboard pages
  DASHBOARD: "/dashboard",
  DASHBOARD_CREATE: "/dashboard/create",
  DASHBOARD_CONTINUE: "/dashboard/continue",
  DASHBOARD_WORKBENCH: "/dashboard/workbench",
  DASHBOARD_PROJECT: "/dashboard/project",

  // User pages
  MYPAGE: "/mypage",
} as const;

export const LANDING_SECTION_HASH = {
  GALLERY: "#gallery",
  REVIEWS: "#reviews",
  CONTACT: "#contact",
} as const;

export const QUERY_KEYS = {
  WORKBENCH_MODE: "mode",
  PORTFOLIO_CATEGORY: "category",
} as const;

export const PORTFOLIO_CATEGORY = {
  ALL: "all",
  STUDIO: "studio",
  MODEL: "model",
  IMAGE: "image",
} as const;
