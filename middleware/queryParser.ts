import { Request, Response, NextFunction } from "express";

const parseQuery = (table: any) => async (req: Request, res: Response, next: NextFunction) => {
   // Create an empty obj to build a custom query
  let parsedQuery: any = {};

  // Make a copy of the req query
  const filteredQuery = { ...req.query };

  const removeFields = ["select", "sort", "limit", "page"];

  // Filter key attributes from the query
  removeFields.forEach((param) => delete filteredQuery[param]);

  // // Apply remaining filters to the where clause
  // // - does not account for advanced filter operators
  // parsedQuery.where = filteredQuery;

  // Apply custom where clause assignment with parsng and cast types
  if(Object.keys(filteredQuery).length > 0) {
    const where: any = {};
    for(const [k, v] of Object.entries(filteredQuery)) {
      if(typeof v === 'object') {
        const result: any = {};
        const stringOperators = ['contains', 'startsWith', 'endsWith']

        for(const [op, val] of Object.entries(v)) {
          if (stringOperators.includes(op)) {
            result[op] = val;
            result.mode = 'insensitive';
          } else {
            result[op] = Number(val);
          }
        }
        where[k] = result;
      } else if(isNaN(Number(v as string))) {
        where[k] = {contains: v as string, mode: 'insensitive'};
      } else {
        where[k] = Number(v);
      }
    }
    parsedQuery.where = where;
  }

  // Handle Select
  if (req.query.select) {
    const selectFields = (req.query.select as string).split(",");
    parsedQuery.select = Object.fromEntries(
      selectFields.map((field) => [field, true]),
    );
  }

  // Handle Sort
  if (req.query.sort) {
    const sortFields = (req.query.sort as string).split(",");
    parsedQuery.orderBy = sortFields.map((field) =>
      field[0] === "-" ? { [field.substring(1)]: "desc" } : { [field]: "asc" },
    );
  }

  // Handle Pagination
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 25;
  parsedQuery.skip = (page - 1) * limit;
  parsedQuery.take = limit;

  const [data, total] = await Promise.all([
    table.findMany(parsedQuery),
    table.count({where: parsedQuery.where})
  ])

  const totalPages = Math.ceil(total / limit);

  // Define filtered response
  res.locals.queryResults = {
    success: true,
    count: data.length,
    total,
    pagination: {
      page,
      limit,
      totalPages,
      prevPage: page > 1 ? page - 1: null,
      nextPage: page < totalPages ? page + 1 : null,
    },
    data
  };

  next();
};

export default parseQuery;
