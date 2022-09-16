import "./Comment.scss";
import { Avatar } from "@mui/material";
import { orange } from "@mui/material/colors";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import * as phoneService from "../../services/phoneService";

const Comment = ({ commentText, createdAt, commentId, owner, phoneId }) => {
  const { user } = useContext(AuthContext);
  const commentOwner = Boolean(user._id === owner._id);

  const removeCommentHandler = (e) => {
    e.preventDefault();

    phoneService.destroyComment({ phoneId, commentId });
  };

  const removeBtn = (
    <div className="remove-comment">
      <IconButton onClick={removeCommentHandler} color="primary">
        <Delete></Delete>
      </IconButton>
    </div>
  );

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

      {commentOwner && removeBtn}
    </article>
  );
};

export default Comment;
