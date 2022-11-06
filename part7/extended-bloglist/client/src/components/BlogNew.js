import { useRef } from "react";

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

const NewBlog = () => {
  const blogFormRef = useRef();

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm onCreate={blogFormRef} />
      </Togglable>
    </div>
  );
};

export default NewBlog;
