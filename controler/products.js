
import Product from "../models/products"
import Joi from "joi"
import Category from "../models/category"
const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string().required(),
    desc: Joi.string().required(),
    categoryId: Joi.string().required()
})

export const create = async (req, res) => {
    const body = req.body
    const { error } = productSchema.validate(body)
    if (error) {
        const errors = error.details.map((items) => items.message);
        return res.status(400).json({
            message: errors
        })

    }
    try {
        const product = await Product.create(body);
        await Category.findByIdAndUpdate(product.categoryId, {
            $addToSet: {
                products: product._id
            },
        })
        return res.status(200).json({
            message: "Thêm thành công",
            product,
        })
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}

export const getAll = async (req, res) => {
    const { _sort = "creatAt", _limit = 10, _order = "asc", _page = 1 } = req.query;

    const option = {
        limit: _limit,
        page: _page,
        [_sort]: _order == "desc" ? -1 : 1
    }
    try {
        const { docs, totalDocs, totalPages } = await Product.paginate({}, option);
        return res.json({ data: docs, totalDocs, totalPages })
    } catch (error) {
        return res.json({
            message: error,
        })
    }
}
export const get = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("categoryId", "-__v");
        if (!product) {
            return res.json({ message: "Không có sản phẩm" })
        }
        return res.status(200).json(product)
    } catch (error) {
        return res.json({
            message: error,
        })
    }
}

export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        return res.json({
            message: "Xóa thành công",
            product,
        })
    } catch (error) {
        return res.json({
            message: error,
        })
    }
}

export const update = async (req, res) => {
    // const error = productSchema.validate(req.body)
    // // if (error) {
    // //     const errors = error.details.map(items => items.message)
    // //     return res.status(400).json({
    // //         message: errors
    // //     })
    // // }
    try {
        const products = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json({
            message: "Cập nhật thành công",
            products,
        })
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}