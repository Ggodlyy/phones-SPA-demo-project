import "./Comment.scss";
import { Avatar } from "@mui/material";
import { orange } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

const Comment = ({ commentText, createdAt, owner }) => {
  return (
    <div className="comment-dipslay-info">
      <NavLink to={`/profiles/${owner.username}`} className={'avatar-link'}>
        <Avatar sx={{ bgcolor: orange[500] }}>{owner.username[0]}</Avatar>
      </NavLink>
      <h3>
        {owner.username} <span className="comment-date">{createdAt}</span>
      </h3>
      <p>{commentText}</p>
    </div>
  );
};

export default Comment;
