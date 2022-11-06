import { useState } from "react";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div>
      <h1>Blogs</h1>
      <h2>Log in to application</h2>

      <div className="row">
        <div className="col-md-5">
          <form onSubmit={handleSubmit}>
            <div>
              username
              <input
                className="form-control"
                id="username"
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                className="form-control"
                id="password"
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button
              className="btn btn-success btn-sm mt-3"
              type="submit"
              id="login-btn"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
