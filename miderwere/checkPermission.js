// B1: Kiểm tra trong header.authorization có token không? Nếu không có thì trả về lỗi
// B2: Kiểm tra token có hợp lệ không? Nếu hợp lệ thì decode
// B3: Dựa vào ID ở token sau khi decode để tìm user trong db
// B4: Check quyền (role), nếu user không phải admin thì thông báo lỗi
// B5: Cho đi bước tiếp theo

import jwt from "jsonwebtoken";
import User from "../models/auth"

export const checkPermission = async (req, res, next) => {
    try {

        if (!req.headers.authorization) {
            return res.status(401).json({
                message: "Bạn chưa đăng nhập"
            })
        }
        const accessToken = req.headers.authorization.split(" ")[1]
        jwt.verify(accessToken, "banThayDat", async (err, payload) => {
            if (err) {
                if (err.name == 'TokenExpiredError') {
                    return res.status(400).json({
                        message: "Token hết hạn"
                    })

                }
                if (err.name == 'JsonWebTokenError') {
                    return res.status(400).json({
                        message: "Token không hợp lệ"
                    })
                }
            }
            const user = await User.findById(payload._id)
            if (user.role != "admin") {
                return res.status(401).json({
                    message: "Bạn không có quyền truy cập tài nguyên này"
                })
            }
            next()
        })


    } catch (error) {

    }
}
