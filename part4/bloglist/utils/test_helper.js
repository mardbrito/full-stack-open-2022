const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Saving the first pot",
    author: "Marcelo",
    url: "none",
    likes: 3,
    id: "633383dbf98669fe62e85b2f",
  },
  {
    title: "A new post blog",
    author: "Marcelo Brito",
    url: "none",
    id: "6333870870be8ea9468610be",
    likes: 5,
  },
];

const nonExistingId = async () => {
  const post = new Blog({ title: "willremovethissoon" });
  await post.save();
  await post.remove();

  return post._id.toString();
};

const postsInDb = async () => {
  const posts = await Blog.find({});
  return posts.map((post) => post.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  postsInDb,
  usersInDb,
};
