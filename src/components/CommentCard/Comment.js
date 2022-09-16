import "./Comment.scss";

const Comment = ({ commentText, createdAt, owner }) => {
  return (
    <div className="comment-dipslay-info">
      <h3>{owner.username}  <span className="comment-date">{createdAt}</span></h3>
      <p>{commentText}</p>
    </div>
  );
};

export default Comment;
