import mongoose from 'mongoose';
import status from '../utils/status';

const orderSchema = mongoose.Schema(
    {
        product: {
            type: [
                {
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product"
                    },
                    count: Number,
                    price: Number
                }
            ],
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        coupon: String,
        transactionId: String,
        status: {
            type: String,
            enum: Object.values(status),
            default: status.ordered
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Order", orderSchema);