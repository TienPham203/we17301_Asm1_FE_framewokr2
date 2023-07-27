import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const productSchema = mongoose.Schema({
    name: String,
    sale: Number,
    price: Number,
    image: String,
    desc: String,
    star: Number,
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    }
},
    { timestamps: true, versionKey: false });

productSchema.plugin(mongoosePaginate);
export default mongoose.model("Product", productSchema)