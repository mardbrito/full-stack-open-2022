import { useState } from "react";
import { useDispatch } from "react-redux";

import { createBlog } from "../reducers/blogs/blogSlice";
import { createNotification } from "../reducers/notification/notificationSlice";

const BlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    onCreate.current.toggleVisibility();

    const newBlog = {
      title,
      author,
      url,
    };
    try {
      dispatch(createBlog(newBlog));
      dispatch(createNotification(`A new blog ${title} by ${author} added`));
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      dispatch(createNotification("error" + exception.response.data.error));
    }
  };

  return (
    <form className="row g-3 mb-4" onSubmit={handleCreateBlog}>
      <div className="col-md-12">
        <label htmlFor="title">Title</label>
        <input
          className="form-control"
          required
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="author">Author</label>
        <input
          className="form-control"
          required
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="url">URL</label>
        <input
          className="form-control"
          required
          id="url"
          type="url"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <div>
        <button
          className="btn btn-outline-success btn-sm btn-block"
          id="create-blog-btn"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
