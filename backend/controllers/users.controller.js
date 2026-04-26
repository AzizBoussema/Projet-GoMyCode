const User = require("../models/User");

const sendError = (res, status, msg) =>
  res.status(status).json({ errors: [{ msg }] });

// ---------GET ALL USERS--------
exports.getAllUsers = async (req, res) => {
  try {
    const listUsers = await User.find().select("-password");
    return res.status(200).json({
      success: true,
      data: listUsers,
    });
  } catch (error) {
    return sendError(res, 500, "Erreur serveur.");
  }
};

// ---------GET ONE USER--------
exports.getOneUser = async (req, res) => {
  try {
    const userToGet = await User.findById(req.params.id).select("-password");
    if (!userToGet) {
      return sendError(res, 404, "Cet utilisateur n'existe pas.");
    }

    return res.status(200).json({
      success: true,
      data: userToGet,
    });
  } catch (error) {
    return sendError(res, 500, "Erreur serveur.");
  }
};

// ---------DELETE USER--------
exports.deleteUser = async (req, res) => {
  try {
    const userToDelete = await User.findByIdAndDelete(req.params.id);
    if (!userToDelete) {
      return sendError(res, 404, "L'utilisateur n'existe pas.");
    }

    return res.status(200).json({
      success: true,
      data: userToDelete,
    });
  } catch (error) {
    return sendError(res, 500, "Erreur serveur.");
  }
};
