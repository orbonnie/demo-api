import "express-serve-static-core";

type Pagination = {
  next?: { page: number; limit: number };
  prev?: { page: number; limit: number };
}

declare module "express-serve-static-core" {
  interface Response {
    advancedResults?: {
      success: boolean;
      count: number;
      pagination: Pagination;
      data: any[];
    };
  }
}