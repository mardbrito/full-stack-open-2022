import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Route, Routes } from "react-router-dom";

import { logoutUser } from "../reducers/users/userSlice";
import { initializeUsers } from "../reducers/users/usersSlice";
import { initializeBlogs } from "../reducers/blogs/blogSlice";

import BlogView from "./BlogView";
import BlogDetails from "./BlogDetails";
import Userslist from "./UsersList";
import User from "./User";

const Blog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const user = useSelector(({ user }) => {
    return user;
  });

  const users = useSelector(({ users }) => {
    return users;
  });

  const blogs = useSelector(({ blogs }) => {
    return blogs;
  });

  const logout = () => {
    dispatch(logoutUser());
  };

  const showLoggedUser = () => (
    <div>
      <span className="small">
        Logged in as &nbsp;
        {user.name}{" "}
      </span>
      &nbsp;
      <button className="btn btn-sm btn-outline-danger" onClick={logout}>
        logout
      </button>
    </div>
  );

  return (
    <div>
      <nav
        className="navbar navbar-expand-md navbar-light bg-light"
        aria-label="navbarBlogApp"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Blog Application
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarBlogApp"
            aria-controls="navbarBlogApp"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarBlogApp">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link className="nav-item nav-link" to="/">
                Blogs
              </Link>
              <Link className="nav-item nav-link" to="/users">
                Users
              </Link>
            </ul>
            <div className="nav-link">{showLoggedUser()}</div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<BlogView blogs={blogs} />} />
        <Route path="/blogs/" element={<Navigate to="/" replace />} />
        <Route
          path="/blogs/:id"
          element={<BlogDetails blogs={blogs} user={user} />}
        />
        <Route path="/users/" element={<Userslist users={users} />} />
        <Route path="/users/:id" element={<User users={users} />} />
      </Routes>
    </div>
  );
};

export default Blog;
