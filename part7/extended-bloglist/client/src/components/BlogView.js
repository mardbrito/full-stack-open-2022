import BlogList from "./BlogList";
import BlogNew from "./BlogNew";

const BlogView = ({ blogs }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mt-4">
          <div className="mb-3">
            <h2>Blogs</h2>
            <BlogNew />
          </div>
          <div className="mb-3">
            <BlogList blogs={blogs} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogView;
