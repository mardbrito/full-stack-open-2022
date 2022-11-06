import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlog, likeBlog } from "../reducers/blogs/blogSlice";
import { createNotification } from "../reducers/notification/notificationSlice";

import Comments from "./Comments";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  const user = useSelector((state) => state.user);

  const handleLike = (blog) => {
    const { id } = blog;
    try {
      const blogToUpdate = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      };
      dispatch(likeBlog(id, blogToUpdate));
      dispatch(
        createNotification(`you liked '${blog.title}' by ${blog.author}`)
      );
    } catch (error) {
      dispatch(createNotification("error" + error));
    }
  };

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog));
        dispatch(createNotification("blog was succesfully removed"));
        navigate("/");
      } catch (error) {
        dispatch(createNotification(error));
        navigate("/");
      }
    }
  };

  if (!blog) {
    return null;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mt-4">
          <h2>
            {blog.title} &nbsp;
            {blog.user.username === user.username && (
              <button
                className="btn btn-outline-danger btn-sm"
                id="delete-btn"
                aria-label="delete"
                onClick={() => handleDelete(blog)}
              >
                delete
              </button>
            )}
          </h2>
          <div className="small">
            Added by <b>{blog.user.name}</b>
          </div>
          <div className="mt-3">
            url: <a href={blog.url}>{blog.url}</a>
          </div>
          <div className="mt-2">
            {blog.likes} likes{" "}
            <button
              className="btn btn-outline-success btn-sm"
              id="like-btn"
              onClick={() => handleLike(blog)}
            >
              Add like
            </button>
          </div>

          <Comments blog={blog} />
        </div>
      </div>
    </div>
  );
};
export default BlogDetails;
