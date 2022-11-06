import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { initializeBlogs } from "../reducers/blogs/blogSlice";
import { Link } from "react-router-dom";

const BlogList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);

  const byLikesAndTitles = (a, b) =>
    b.likes - a.likes || a.title.localeCompare(b.title);

  const sortedBlogs = [...blogs].sort(byLikesAndTitles);

  const renderedBlogs = sortedBlogs.map((blog) => (
    <div key={blog.id}>
      <Link
        className="list-group-item d-flex justify-content-between align-items-center"
        to={`/blogs/${blog.id}`}
      >
        {blog.title}
        <span className="badge bg-light text-dark rounded-pill">
          👍 &nbsp; {blog.likes}
        </span>
      </Link>
    </div>
  ));

  return (
    <div className="list-group">
      {renderedBlogs.sort((a, b) => b.likes - a.likes)}
    </div>
  );
};

export default BlogList;
