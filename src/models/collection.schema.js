import mongoose from 'mongoose';

const collectionSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide name field"],
            trim: true,
            maxlength: [120, "Kindly do not provide more than 120 characters"]
        }
    },
    {
        timestamps: true
    }

);

export default mongoose.model("Collection",collectionSchema);