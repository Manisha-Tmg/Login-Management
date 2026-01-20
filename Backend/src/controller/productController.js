import { Product } from "../schema/model.js";
import expressAsyncHandler from "express-async-handler";

export const createProductController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Product.create(req.body);
    res.status(201).json({
      sucess: true,
      message: "Product created sucessfully",
      result: result,
    });
    console.log(result);
  }
);

export const readAllProductController = expressAsyncHandler(
  async (req, res, next) => {
    let { page, sort, limit, select, ...find } = req.query;

    sort = sort ? sort.replaceAll(",", " ") : {};
    select = select ? select.replaceAll(",", " ") : "";
    find = find || {};
    limit = limit || 10;
    page = page || 1;

    let result = await Product.paginate(find, {
      select: select,
      sort: sort,
      limit: limit,
      page: page,
    });

    res.status(200).json({
      sucess: true,
      message: "Product read sucessfully",
      result: result,
    });
    console.log(result);
  }
);


export const readSpecificProductController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Product.findById(req.params.id);
    console.log(req.params.id);

    res.status(200).json({
      sucess: true,
      message: "Product Read sucessfully by Id",
      result: result,
    });
    console.log(result);
  }
);

export const updateProductController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({
      sucess: true,
      message: "Product updated sucessfully",
      result: result,
    });
  }
);

export const deleteProductController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      sucess: true,
      message: "Product delated sucessfully",
      result: result,
    });
  }
);
