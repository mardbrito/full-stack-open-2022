import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Userslist = () => {
  const users = useSelector((state) => state.users);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 mt-4">
          <h2>Users</h2>

          <div className="list-group">
            {users.map((user) => (
              <div key={user.id}>
                <Link
                  className="list-group-item d-flex justify-content-between align-items-center"
                  to={`/users/${user.id}`}
                >
                  {user.name}
                  <span className="badge bg-light text-dark rounded-pill">
                    Blogs created &nbsp; {user.blogs.length}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userslist;
