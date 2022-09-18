const Notification = ({ message }) => {
  if (message === null) return null;

  if (message.includes("failed")) {
    return <div className="error">{message}</div>;
  }

  return <div className="success">{message}</div>;
};

export default Notification;
