const express = require("express")
const router = express.Router();

const { GET_BLOGS, CREATE_BLOG, UPDATE_BLOG, UPDATED_BLOG, DELETE_BLOG } = require("../utils/constants").ROUTES.BLOG;

const { getBlogs, createBlog, updateBlog, updatedBlog, deleteBlog } = require("../controllers/blogControllers");

router.route(GET_BLOGS).get(getBlogs);

router.route(CREATE_BLOG).post(createBlog);

router.route(UPDATE_BLOG).get(updateBlog);

router.route(UPDATED_BLOG).put(updatedBlog);

router.route(DELETE_BLOG).delete(deleteBlog);

module.exports = router;