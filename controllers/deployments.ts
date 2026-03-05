import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import ErrorResponse from "../utils/errorResponse";
import prisma from "../src/prismaClient";
import { randomUUID } from 'crypto';
import { parse } from "path";


// @desc     Get all {resources}
// @route    GET /api/v1/{resources}
export const getResources = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

});

// @desc     Get single {resource}
// @route    GET /api/v1/{resources}/:deploy_id
export const getResource = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const deploy_id = req.params.deploy_id as string;

  const data = await prisma.deploy.findUnique({where: {id: deploy_id}});

  if (!data) {
    return next(new ErrorResponse("Deployment not found", 404))
  }

  res.status(200).json({
    success: true,
    data
  });
});

// @desc     Create a {resource}
// @route    POST /api/v1/{resources}
export const addDeployment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const {service_name, environment, status, deployed_at, version, deployer} = req.body;
  const data = await prisma.deploy.create({data: {service_name, environment, status, deployed_at, version, deployer} });


  res.status(201).json({
    id: data.id
  })
});

// Deploy {
// id: string (auto-generated UUID)
// service_name: string (required: kebab-case)
// environment: string (required: "development" | "staging" | "production")
// status: string (required: "success" | "failure" | "pending")
// deployed_at: timestamp (ISO 8601)
// version: string (required: semver)
// deployer: string
// created_at: timestamp (auto-generated)
// }

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


