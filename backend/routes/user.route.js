const express = require("express");
const { getAllUsers, getOneUser, deleteUser } = require("../controllers/users.controller");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

router.get("/all", isAdmin, getAllUsers);
//getOne User 
router.get('/:id', isAdmin, getOneUser)
//delete user 
router.delete('/:id', isAdmin, deleteUser)



module.exports = router;
