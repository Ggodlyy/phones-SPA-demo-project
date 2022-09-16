import "./Comment.scss";
import { Avatar, Stack } from "@mui/material";
import { orange } from "@mui/material/colors";

const Comment = ({ commentText, createdAt, owner }) => {

  return (
    <div className="comment-dipslay-info">
      <Avatar sx={{ bgcolor: orange[500] }}>{owner.username[0]}</Avatar>
      <h3>
        {owner.username} <span className="comment-date">{createdAt}</span>
      </h3>
      <p>{commentText}</p>
    </div>
  );
};

export default Comment;
