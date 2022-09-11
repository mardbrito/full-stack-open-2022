const Notification = ({ message, success }) => {
  if (message === null) {
    return null;
  }

  return <div className={success}>{message}</div>;
};

export default Notification;
