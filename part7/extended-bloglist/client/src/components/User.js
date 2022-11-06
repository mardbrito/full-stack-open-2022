import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
  const id = useParams().id;
  const user = useSelector((state) => state.users.find((u) => u.id === id));

  if (!user) {
    return null;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 mt-4">
          <h2>{user.name}</h2>
          <h5>Added blogs:</h5>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default User;
