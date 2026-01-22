import { WebUser } from "../schema/model.js";

const isAuthorized = (roles) => {
  return async (req, res, next) => {
    try {
      let id = req.id;
      let result = await WebUser.findById(id);
      console.log(result);
      let tokenRole = result.role;

      if (roles.includes(tokenRole)) {
        next();
      }
    } catch (error) {
      res.status(403).json({
        success: false,
        message: "User not authorized",
      });
    }
  };
};

export default isAuthorized;
