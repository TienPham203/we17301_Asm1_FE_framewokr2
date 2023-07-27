import User from "../models/auth"
import { signupSchema } from "../schema/auth"
import { signinSchema } from "../schema/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";




export const signup = async (req, res) => {
    try {
        //Validate
        const { error } = signupSchema.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((err => err.message))
            return res.status(400).json({
                message: errors
            })
        }

        const emailExit = await User.findOne({ email: req.body.email })
        if (emailExit) {
            return res.status(400).json({
                message: "Email đã tồn tại"
            })
        }
        // Mã hóa Pass

        const hashPassword = await bcrypt.hash(req.body.password, 10)

        // Tạo user mới 
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            role: req.body.role
        })
        //tạo token
        const accessToken = jwt.sign({ _id: user._id }, "banThayDat", { expiresIn: "1d" });
        //trả về user
        return res.status(200).json({
            message: "Đăng kí thành công",
            accessToken,
            user,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.meaasge
        })
    }
}


// B1: Validate object từ client gửi lên(email, password)
// B2: Kiểm tra email đã tồn tại chưa (Nếu không có thì trả về lỗi: Bạn chưa đăng ký tài khoản)
// B3: So sánh giá trị(password) từ client nó giống với password ở db không?
// B4: Tạo token
// B5: Trả về token và user





export const signin = async (req, res) => {

    //validate req gửi lên 
    try {
        const { email, password } = req.body;
        const { error } = signinSchema.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((err => err.message))
            return res.status(400).json({
                message: errors
            })
        }

        //check có tài khoản chưa

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Bạn chưa đăng kí email này"
            })
        }
        // check mật khẩu

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không đúng"
            })
        }

        // tạo token
        const accessToken = await jwt.sign({ _id: user._id }, "banThayDat", { expiresIn: "1d" })
        return res.status(200).json({
            message: "Đăng nhập thành công",
            accessToken,
            user,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.messages
        })
    }
}