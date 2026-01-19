import expressAsyncHandler from "express-async-handler";
import { WebUser } from "../schema/model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secretKey } from "../config.js";
import { sendEmail } from "../utils/sendMail.js";

export const createUserController = expressAsyncHandler(
  async (req, res, next) => {
    try {
      let data = req.body;
      let hassedPassword = await bcrypt.hash(data.password, 10);
      let info = {
        ...data,
        password: hassedPassword,
      };
      let result = await WebUser.create(info);

      // generate token
      let details = {
        id: result._id,
      };
      let expiryInfo = {
        expiresIn: "1h",
      };

      let token = jwt.sign(details, secretKey, expiryInfo);

      await sendEmail({
        from: "Verification <uniquekc425@gmail.com>",
        to: data.email,
        subject: "Verify Your Email Address",
        html: `
  <div style="max-width:600px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb;">
    
    <!-- Header -->
    <div style="background:#4f46e5;color:#ffffff;padding:20px;text-align:center;">
      <h1 style="margin:0;font-size:24px;">Email Verification</h1>
    </div>

    <!-- Body -->
    <div style="padding:24px;color:#374151;">
      <p style="font-size:16px;">Hi there 👋</p>

      <p style="font-size:15px;line-height:1.6;">
        Thank you for registering. Please confirm your email address by clicking the button below.
      </p>

      <div style="text-align:center;margin:30px 0;">
        <a 
          href="http://localhost:3000/admin/verify-email?token=${token}"
          style="
            background:#4f46e5;
            color:#ffffff;
            padding:12px 24px;
            text-decoration:none;
            border-radius:6px;
            font-size:16px;
            display:inline-block;
          "
        >
          Verify Email
        </a>
      </div>

      

      <p style="font-size:14px;color:#6b7280;margin-top:20px;">
        If you didn’t create an account, you can safely ignore this email.
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#9ca3af;">
      © ${new Date().getFullYear()}Web-users.com. All rights reserved.
    </div>

  </div>
  `,
      });

      res.status(201).json({
        success: true,
        message: "Verification link send to Email",
        result: result,
        token: token,
      });
    } catch (error) {
      res.status(400).json({
        sucess: false,
        message: error.message,
      });
    }
  },
);

export const verifyEmailController = expressAsyncHandler(
  async (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.status(400).json({
        success: false,
        message: "Verification Failed",
      });
    }

    let verifiedToken = jwt.verify(token, secretKey);
    let userId = verifiedToken.id;
    let result = await WebUser.findByIdAndUpdate(
      userId,
      {
        isEmailVerified: true,
      },
      {
        new: true,
      },
    );
    res.status(200).json({
      success: true,
      message: "Email verified & user saved",
      result: result,
    });
  },
);

export const loginController = expressAsyncHandler(async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  let result = await WebUser.findOne({ email: email });
  if (result === null) {
    res.status(404).json({
      sucess: false,
      message: "User not Found",
    });
  } else {
    let isValidPassword = await bcrypt.compare(password, result.password);
    if (isValidPassword === true) {
      let details = {
        id: result._id,
      };
      let expiryInfo = {
        expiresIn: "1h",
      };
      let token = jwt.sign(details, secretKey, expiryInfo);
      res.status(200).json({
        sucess: true,
        message: "Login Sucessful",
        result: result,
        token: token,
      });
    } else {
      res.status(401).json({
        sucess: false,
        message: "User not Found",
      });
    }
  }
});

export const profileWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let id = req.id;
    let result = await WebUser.findById(id);
    res.status(200).json({
      success: true,
      message: "User found",
      result: result,
    });
    res.status(400).json({
      success: false,
      message: "User not found",
    });
  },
);

export const updateProfileWebUserCOntroller = async (req, res, next) => {
  try {
    let id = req.id;
    let data = req.body;
    delete data.email;
    delete data.password;
    let result = await WebUser.findByIdAndUpdate(id, data, { new: true });
    res.status(201).json({
      success: true,
      message: "Profile updated successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePasswordWebUserController = async (req, res, next) => {
  try {
    let id = req.id;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let confirmPassword = req.body.confirmPassword;
    let data = await WebUser.findById(id);
    let hassedPassword = data.password;

    let isValidPassword = await bcrypt.compare(oldPassword, hassedPassword);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }
    let newhassedpassword = await bcrypt.hash(newPassword, 10);

    let result = await WebUser.findByIdAndUpdate(
      id,
      { password: newhassedpassword },
      { new: true },
    );
    res.status(201).json({
      success: true,
      messsage: "Password Upaded successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPasswordWebuserController = async (req, res, next) => {
  try {
    let email = req.body.email;
    let result = await WebUser.findOne({ email: email });
    if (result) {
      let details = {
        id: result.id,
      };
      let expiryInfo = {
        expiresIn: "1h",
      };
      let token = await jwt.sign(details, secretKey, expiryInfo);
      await sendEmail({
        from: "Unique <uniquekc425@gmail.com>",
        to: email,
        subject: "Reset Your Password - Unique",
        html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 40px 0;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      
      <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
      
      <p style="color: #555; font-size: 16px;">
        Hello,
      </p>
      
      <p style="color: #555; font-size: 16px;">
        We received a request to reset your password. Click the button below to set a new password.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="http://localhost:3000/admin/reset-password?token=${token}" 
           style="background-color: #4CAF50; color: #ffffff; padding: 12px 25px; 
                  text-decoration: none; border-radius: 5px; font-size: 16px; 
                  display: inline-block;">
          Reset Password
        </a>
      </div>


      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

      <p style="color: #999; font-size: 13px; text-align: center;">
        If you did not request a password reset, please ignore this email.
      </p>

    <!-- Footer -->
    <div style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#9ca3af;">
      © ${new Date().getFullYear()}Web-users.com. All rights reserved.
    </div>
      
    </div>
  </div>
  `,
      });
      res.status(200).json({
        success: true,
        message:
          "Verification link Sent to the email.Please check your email to rest password",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      messsage: error.message,
    });
  }
};
export const resetPasswordWebuserController = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];

    let id = req.id;

    if (token) {
      let newPassword = req.body.newPassword;
      let confirmPassword = req.body.confirmPassword;
      if (newPassword === confirmPassword) {
        let newhassedpassword = await bcrypt.hash(newPassword, 10);

        let result = await WebUser.findByIdAndUpdate(
          id,
          { password: newhassedpassword },
          { new: true },
        );
        res.status(201).json({
          success: true,
          messsage: "Password reset successfully",
          result: result,
        });
      } else {
        res.status(400).json({
          success: false,
          messsage: "password didnot match",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      messsage: error.message,
    });
  }
};

export const readAllWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await WebUser.find({});
    res.status(200).json({
      success: true,
      message: "User read sucessfully",
      result: result,
    });
  },
);

export const readSpecificWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await WebUser.findById(req.params.id);

    res.status(200).json({
      sucess: true,
      message: "User Read sucessfully by Id",
      result: result,
    });
  },
);

export const updateWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await WebUser.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({
      sucess: true,
      message: "User updated sucessfully",
      result: result,
    });
  },
);

export const deleteWebUserController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await WebUser.findByIdAndDelete(req.params.id);
    res.status(200).json({
      sucess: true,
      message: "User delated sucessfully",
      result: result,
    });
  },
);
