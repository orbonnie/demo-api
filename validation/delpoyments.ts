import { body, param } from "express-validator";

export const validateCreateDeployment = [
  body("service_name")
    .isString().withMessage("The service_name must be a string")
    .bail()
    .trim()
    .escape()
    .notEmpty().withMessage("The service_name is required")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).withMessage("The service_name must be kabob case"),

  body("environment")
    .isString().withMessage("The environment must be a string")
    .bail()
    .trim()
    .escape()
    .notEmpty().withMessage("The environment is required"),

  body("status")
    .isString().withMessage("The status must be a string")
    .bail()
    .trim()
    .escape()
    .notEmpty().withMessage("The staus is required"),

  body("deployed_at")
    .isISO8601()
    .exists().withMessage("Deployed_at is required")
]

export const validateUpdateResource = [

]

export const validateResourceId = [
  param("deploy_id")
  .isUUID().withMessage("The deploy_id must be an UUID")

]


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