import Category from "../models/category"
import Joi from "joi"
import Product from "../models/products";
const categorySchema = Joi.object({
    name: Joi.string().required(),
});
export const create = async (req, res) => {
    const body = req.body
    // const error = categorySchema.validate(body)
    // if (error) {
    //     const errors = error.details.map((err => err.message))
    //     return res.status(400).json({
    //         message: errors
    //     })
    // }
    try {
        const category = await Category.create(body)
        return res.status(200).json({
            message: "Thêm thành công",
            category,
        })
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const category = await Category.find()
        if (!category) {
            return res.status(400).json({
                message: "Không có danh mục"
            })
        }

        return res.json(category)
    } catch (error) {
        return res.json({
            message: error.message,
        })
    }
}
export const get = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate("products")
        if (!category) {
            return res.json({ message: "Không có sản phẩm" })
        }
        const product = await Product.find({ categoryId: req.params.id })
        return res.status(200).json({ ...category.toObject(), product })
    } catch (error) {
        return res.json({
            message: error.message,
        })
    }
}

export const remove = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        return res.json({
            message: "Xóa thành công",
            category,
        })
    } catch (error) {
        return res.json({
            message: error.message,
        })
    }
}
export const update = async (req, res) => {
    // const error = categorySchema.validate(req.body)
    // if (error) {
    //     const errors = error.details.map(items => items.message)
    //     return res.status(400).json({
    //         message: errors
    //     })
    // }
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json({
            message: "Cập nhật  thành công",
            category,
        })
    } catch (error) {
        return res.json({
            message: error.message,
        })
    }
}