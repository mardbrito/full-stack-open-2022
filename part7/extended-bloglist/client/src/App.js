import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import loginService from "./services/login";
import blogService from "./services/blogs";

import { createNotification } from "./reducers/notification/notificationSlice";
import { initializeUser, loginUser, setUser } from "./reducers/users/userSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  const notification = useSelector(({ notification }) => {
    return notification;
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const login = async (username, password) => {
    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        dispatch(loginUser(user));
        dispatch(createNotification(`${user.name} logged in!`));
      })
      .catch(() => {
        dispatch(createNotification("wrong username/password"));
      });
  };

  const loginView = () => {
    return (
      <div>
        <LoginForm handleLogin={login} />
      </div>
    );
  };

  const blogView = () => {
    return (
      <div>
        <Dashboard />
      </div>
    );
  };

  return (
    <div className="container">
      <Notification notification={notification} />
      {user === null ? loginView() : blogView()}
    </div>
  );
};

export default App;
