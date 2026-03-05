import express from "express";
import prisma from "../src/prismaClient";
import {
  getResource,
  getResources,
  addResource,
  updateResource,
  deleteResource,
} from "../controllers/resources";

import parseQuery from "../middleware/queryParser";
import {
  validateCreateResource,
  validateUpdateResource,
  validateResourceId,
} from "../validation/resources";

import validateRequest from "../middleware/requestValidator";


const router = express.Router();


export default router;
