import express from "express";
import prisma from "../src/prismaClient";
import {
  getResource,
  getResources,
  addDeployment,
  updateResource,
  deleteResource,
} from "../controllers/deployments";

import parseQuery from "../middleware/queryParser";
import {
  validateCreateDeployment,
  validateUpdateResource,
  validateResourceId,
} from "../validation/delpoyments";

import validateRequest from "../middleware/requestValidator";


const router = express.Router();

router.route("/").post(validateCreateDeployment, validateRequest, addDeployment)
router.route("/:deploy_id").get(validateResourceId, validateRequest, getResource)

export default router;
