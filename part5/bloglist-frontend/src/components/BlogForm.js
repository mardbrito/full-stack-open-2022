import { useState } from "react";
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const onSubmitHandleForm = (event) => {
    event.preventDefault();
    createBlog(title, author, url);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={onSubmitHandleForm}>
      <div>
        title
        <input
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          id="url"
          type="url"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="create-blog-btn" type="submit">
        create
      </button>
    </form>
  );
};

export default BlogForm;
