import mongoose from "mongoose";
import { generateUUID } from "../config/config.js";

const { Schema } = mongoose;

const gameSchema = new Schema(
    {
        id_game: {
            type: String,
            required: true,
            default: generateUUID,
        },
        slug: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        rating: {
            type: Number,
            required: true,
            trim: true,
        },
        background_image: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
        },
        store: {
            slug: {
                type: String,
                required: true,
                trim: true,
            },
            name: {
                type: String,
                required: true,
                trim: true,
            },
        },
        description: {
            type: String,
            default: "No description yet.",
            trim: true,
        },
        requirements: {
            type: String,
            default: "No requirements available yet.",
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Game", gameSchema);
