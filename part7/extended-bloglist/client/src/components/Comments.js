import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../reducers/blogs/blogSlice";
import { createNotification } from "../reducers/notification/notificationSlice";

const Comments = ({ blog }) => {
  const dispatch = useDispatch();

  const { id } = blog;
  const [comment, setComment] = useState("");

  const handleComment = (event) => {
    event.preventDefault();
    if (comment) {
      dispatch(createComment(id, comment));
      dispatch(createNotification("A new comment was added"));
      setComment("");
    } else {
      dispatch(createNotification("Write a comment"));
    }
  };

  return (
    <div className="row">
      <div className="col-md-10 mt-4">
        <h3>Comments</h3>
        <form className="mb-4" onSubmit={handleComment}>
          <div className="row">
            <div className="col-8">
              <input
                className="form-control"
                id="comment"
                value={comment}
                placeholder="add your comment"
                onChange={({ target }) => setComment(target.value)}
              />
            </div>
            <div className="col-4">
              <button
                className="btn btn-outline-success"
                id="create-comment"
                type="submit"
              >
                Add comment
              </button>
            </div>
          </div>
        </form>
        <h5>Blog comments:</h5>
        {blog.comments.length === 0 ? (
          " no comments added yet"
        ) : (
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment}>{comment}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default Comments;
