import "./Comment.scss";
import { Avatar } from "@mui/material";
import { orange } from "@mui/material/colors";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Comment = ({ commentText, createdAt, owner }) => {
  const { user } = useContext(AuthContext);
  const commentOwner = Boolean(user._id === owner._id);
  console.log(commentOwner)

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

      <div className="remove-comment">
        
      </div>
    </article>
  );
};

export default Comment;
