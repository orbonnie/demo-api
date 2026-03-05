import "express-serve-static-core";

type Pagination = {
      page: number;
      limit: number;
      totalPages?: number;
      prevPage?: (number | null);
      nextPage?: (number | null);
};

declare module "express-serve-static-core" {
  interface Response {
    queryResults?: {
      success: boolean;
      total?: number;
      count?: number;
      pagination: Pagination;
      data: any[];
    }
  }
};
