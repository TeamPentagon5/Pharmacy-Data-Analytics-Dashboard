import express from "express";
import * as TaskController from "../app/controllers/TaskController.js";
import * as UsersController from "../app/controllers/UsersController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";
//import orders from "./orders.js"; // ✅ newly added

const router = express.Router();

// Users
router.post("/Registration", UsersController.Registration);
router.post("/Login", UsersController.Login);
router.get("/ProfileDetails", AuthMiddleware, UsersController.ProfileDetails);
router.post("/ProfileUpdate", AuthMiddleware, UsersController.ProfileUpdate);
router.post("/Added", UsersController.Added);
router.get("/getdate", UsersController.getdate);
router.put("/update/:id", UsersController.updateData);
router.delete("/delete/:id", UsersController.deleteData);

router.get("/EmailVerify/:email", UsersController.EmailVerify);
router.get("/CodeVerify/:email/:code", UsersController.CodeVerify);
router.post("/ResetPassword", UsersController.ResetPassword);

// Tasks
router.post("/CreateTask", AuthMiddleware, TaskController.CreateTask);
router.get(
  "/UpdateTaskStatus/:id/:status",
  AuthMiddleware,
  TaskController.UpdateTaskStatus,
);
router.get(
  "/TaskListByStatus/:status",
  AuthMiddleware,
  TaskController.TaskListByStatus,
);
router.get("/DeleteTask/:id", AuthMiddleware, TaskController.DeleteTask);
router.get("/CountTask", AuthMiddleware, TaskController.CountTask);

// ✅ Orders Route (newly added)
//router.use("/orders", orders); // e.g., /api/orders, /api/orders/search

export default router;
