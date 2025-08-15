const router = require("express").Router();

const {
  createStudent,
  getAllStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const { isLoggedIn, requirePermission } = require("../middleware/auth");

// router.use(isLoggedIn);

router.post("/create", isLoggedIn, requirePermission("admin"), createStudent);
router.get("/get", isLoggedIn, requirePermission("admin"), getAllStudent);
router.patch(
  "/:studentId",
  isLoggedIn,
  requirePermission("admin"),
  updateStudent
);
router.delete(
  "/:studentId",
  isLoggedIn,
  requirePermission("admin"),
  deleteStudent
);

module.exports = router;
