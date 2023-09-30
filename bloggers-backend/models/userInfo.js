const mongoose = require("mongoose");
const CONFIG =require("../utils/config");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: String
    }
});

const userInfoSchema = new mongoose.Schema({
    id: {
        type: String
    },
    blogs: [
        blogSchema
    ]
});

module.exports = mongoose.model(CONFIG.USERINFO, userInfoSchema);