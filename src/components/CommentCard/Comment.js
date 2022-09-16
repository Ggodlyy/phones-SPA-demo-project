import "./Comment.scss";
import { Avatar } from "@mui/material";
import { orange } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

const Comment = ({ commentText, createdAt, owner }) => {
  return (
    <article className="comment">
      <div className="comment-display">
        <NavLink to={`/profiles/${owner.username}`} className={"avatar-link"}>
          <Avatar sx={{ bgcolor: orange[500] }}>
            {owner.username[0].toUpperCase()}
          </Avatar>
        </NavLink>
      </div>

      <div className="comment-dipslay-info">
        <h3>
          {owner.username} <span className="comment-date">{createdAt}</span>
        </h3>
        <p>{commentText}</p>
      </div>
    </article>
  );
};

export default Comment;
