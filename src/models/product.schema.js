import mongoose, { STATES } from 'mongoose';

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide this field"],
            trim: true,
            maxLength: [120, "Please provide name less than 120 characters"]
        },
        price: {
            type: Number,
            required: [true, "Please provide this field"],
            trim: true,
            maxLength: [5, "Please provide name less than 120 characters"]
        },
        description: {
            type: String,
            maxLength: [200, "Please provide description less than 200 characters"]
        },
        // For storing multiple photos in mongodb if user wants to upload only one photo then we can use string for it
        // user is providing url where photos are uploaded from frontend
        photos: [
            {
                secureUrl: {
                    type: String,
                    required: true
                }
            }
        ],
        stock: {
            type: Number,
            default: 0
        },
        sold: {
            type: Number,
            default: 0
        },
        // product belongs to particular category in collection schema so productSchema is refering to collectionSchema.
        collectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Product",productSchema);