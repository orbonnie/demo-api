import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import ErrorResponse from "../utils/errorResponse";


// @desc     Get all {resources}
// @route    GET /api/v1/{resources}
// @access   Public
export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data: any[] = [] // await DB call

  res.status(200).json({
    success: true,
    count: data.length,
    data: data
  })
});

// @desc     Get single {resource}
// @route    GET /api/v1/{resources}/:id
// @access   Public
export const getOne = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data: any[] = [] // await DB call

  if(!data) {
    return next(new ErrorResponse(`No resource found with that id`, 404));
  }

  res.status(200).json({
    success: true,
    data: data
  })
});

// @desc     Create a {resource}
// @route    POST /api/v1/{resources}
// @access   Private
export const addOne = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data: any[] = [] // await DB call

  res.status(201).json({
    success: true,
    data: data
  })
});

// @desc     Update a {resource}
// @route    PUT /api/v1/{resources}/:id
// @access   Private
export const updateOne = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data: any[] = [] // await DB call

  if(!data) {
    return next(new ErrorResponse(`No resource found with that id`, 404));
  }

  res.status(200).json({
    success: true,
    data: data
  })
});

// @desc     Delete a {resource}
// @route    DELETE /api/v1/{resources}/:id
// @access   Private
export const deleteOne = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const data: any[] = [] // await DB call

  if(!data) {
    return next(new ErrorResponse(`No resource found with that id`, 404));
  }

  res.status(200).json({
    success: true,
    data: data
  })
});