export type Category = "all" | "studio" | "model" | "image";

export type ItemsResponse = {
  status: number;
  message: string;
  data: {
    urls: string[];
    pageInfo: {
      pageNum: number;
      limit: number;
      totalPages: number;
      totalElements: number;
    };
  };
};
