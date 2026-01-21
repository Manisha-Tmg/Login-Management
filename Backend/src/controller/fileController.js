import expressAsyncHandler from "express-async-handler";

const handleSingleFileController = expressAsyncHandler(
  async (req, res, next) => {
    let link = `http://localhost:8000/${req.file.filename}`;

    res.status(200).json({
      sucess: true,
      message: "File Uploaded sucessfully",
      result: link,
    });
  },
);

export default handleSingleFileController;
