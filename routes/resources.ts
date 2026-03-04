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
  validateGetResource,
  validateDeleteResource
} from "../validation/resources";

import validateRequest from "../middleware/requestValidator";


const router = express.Router();

router
  .route("/")
  .get(parseQuery(prisma.user), getResources)
  .post(validateCreateResource, validateRequest, addResource);

router
  .route("/:id")
  .get(validateGetResource, validateRequest, getResource)
  .put(validateUpdateResource, validateRequest, updateResource)
  .delete(validateDeleteResource, validateRequest, deleteResource);

export default router;
