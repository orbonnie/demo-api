import { Request, Response, NextFunction } from "express";

const filteredReq = (table: any) => async (req: Request, res: Response, next: NextFunction) => {
   // Create an empty obj to build a custom query
  const finalQuery = {};


  // Make a copy of the req query
  const filteredQuery = {...req.query};


  // Filter key attributes from the query
  const controlFields = ["select", "sort", "limit", "page"];


  // // Apply remaining filters to the where clause
  // // - does not account for advanced filter operators

    // input -> {firstName: 'John', lastName: 'Smith', age: '25'}
    // output -> {firstName: 'John', lastName: 'Smith', age: '25'}

  // Apply advanced filters with parsing and cast types
    // input ->
    // {
    //   firstName: 'John',
    //   age: { gte: '25', lte: '50' },
    //   lastName: { contains: 'smi' },
    // }

    // output ->
    // {
    //   firstName: { equals: 'John', mode: 'insensitive' },
    //   age: { gte: 25, lte: 50 },  // cast to numbers
    //   lastName: { contains: 'smi', mode: 'insensitive' }
    // },


    // Create obj to hold custom filters

    // Loop over filters and check if there are any value objects

      // Add 'insensitve' key to string operators

      // Cast numeric values

      // Add each filter to the obj

    // Add filter obj to the where clause on the final query


  // Handle Select
    // input: req.query.select -> "name,email,age"
    // output: {name: true, email: true, age: true}


  // Handle Sort
    // input: req.query.sort -> "name,-createdAt"
    // output: [{name: "asc"}, {createdAt, desc}]

  // Handle Pagination
    // set skip -> page (calculate hom many to skip)
    // set take -> limit

  // Get return data
    // data = Run finalQuery
    // total = count for filtered records
    // count = records returned with pagination

    // pagination :{
    //   page,
    //   limit,
    //   totalPages,
    //   prevPage,
    //   nextPage
    // }

  // Create res and assign to res.locals

  // return next

}

export default filteredReq;
