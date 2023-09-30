const UserInfo = require("../models/userInfo");

module.exports.createBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, content, image, createdAt } = req.body;

    const user = await UserInfo.findOne({ id });

    if (user) {
      const updateUser = await UserInfo.updateOne(
        {
          id,
        },
        {
          $addToSet: {
            blogs: [
              {
                title,
                content,
                image,
                createdAt,
              },
            ],
          },
        }
      );
    } else {
      const newUserInfo = await UserInfo.create({
        id,
        blogs: [
          {
            title,
            content,
            image,
            createdAt,
          },
        ],
      });

      await newUserInfo.save();
    }

    res.send({ message: "true" });
  } catch (err) {
    return res.send({ message: false });
  }
};

module.exports.getBlogs = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserInfo.findOne({ id });

    if (user != null) {
      res.send({ blog: user.blogs, message: "true" });
    } else {
      res.send({ message: "false" });
    }
  } catch (err) {
    return res.send({ message: false });
  }
};

module.exports.deleteBlog = async (req, res) => {
  try {
    const { user_id, blog_id } = req.params;
    const user = await UserInfo.updateOne(
      {
        id: user_id,
      },
      {
        $pull: {
          blogs: {
            _id: blog_id,
          },
        },
      }
    );
    res.send({ message: "true" });
  } catch (err) {
    return res.send({ message: false });
  }
};

module.exports.updateBlog = async (req, res) => {
  try {
    console.log("REACHED")
    const { user_id, blog_id } = req.params;

    const user = await UserInfo.findOne({ id: user_id });

    const data = await user.blogs.id(blog_id);

    res.send(data);
  } catch (err) {
    return res.send({ message: false });
  }
};

module.exports.updatedBlog = async (req, res) => {
  try {
    const { user_id, blog_id } = req.params;

    const user = await UserInfo.findOne({ id: user_id });

    const data = await user.blogs.id(blog_id);

    data.set(req.body);

    await user.save();

    res.send({ blogs: user.blogs });
  } catch (err) {
    return res.send({ message: false });
  }
};
