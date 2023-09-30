
module.exports = {
    ROUTES: {
        AUTH: {
            SIGN_UP: "/signup",
            LOGIN: "/login",
            USER: "/user"
        },
        BLOG: {
            GET_BLOGS: "/getblogs/:id",
            CREATE_BLOG: "/createblog/:id",
            UPDATE_BLOG: "/updateblog/:user_id/:blog_id",
            UPDATED_BLOG: "/updatedblog/:user_id/:blog_id",
            DELETE_BLOG: "/deleteblog/:user_id/:blog_id",
        }
    },
    ROUTE_PATH: {
        AUTH: "/",
        BLOG: "/user",
    }
}