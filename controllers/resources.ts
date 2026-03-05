import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import ErrorResponse from "../utils/errorResponse";
import prisma from "../src/prismaClient"


// @desc     Get all {resources}
// @route    GET /api/v1/{resources}
export const getResources = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

});

// @desc     Get single {resource}
// @route    GET /api/v1/{resources}/:id
export const getResource = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {


  const data: any = [];

  res.status(200).json({
    success: true,
    data
  });
});

// @desc     Create a {resource}
// @route    POST /api/v1/{resources}
export const addResource = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  const data: any = [];

  res.status(201).json({
    success: true,
    data
  })
});

// @desc     Update a {resource}
// @route    PUT /api/v1/{resources}/:id
export const updateResource = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  const data: any = [];

  res.status(200).json({
    success: true,
    data
  })
});

// @desc     Delete a {resource}
// @route    DELETE /api/v1/{resources}/:id
export const deleteResource = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {


  res.status(204).send();
});
