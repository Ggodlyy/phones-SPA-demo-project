import { Avatar, IconButton } from "@mui/material";
import { orange } from "@mui/material/colors";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Delete } from "@mui/icons-material";
import * as phoneService from '../../services/phoneService';

const ReplyCard = ({ replyId, owner, createdAt, replyText, phoneId, setCommentState }) => {
  const { user } = useContext(AuthContext);
  const replyOwner = Boolean(user._id === owner._id);

  const removeReplyHandler = (e) => {
    e.preventDefault();

    const confirmation = window.confirm(
      "Are you sure you want to remove this reply?"
    );

    if (confirmation) {
      phoneService.destroyReply({ phoneId, replyId });

      setCommentState(true);
    }
  };

  const removeBtn = (
    <div className="remove-comment">
      <IconButton onClick={removeReplyHandler} color="primary">
        <Delete></Delete>
      </IconButton>
    </div>
  );

  return (
    <div className="replyInfo">
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
          <p>{replyText}</p>
        </div>

        {replyOwner && removeBtn}
      </article>
    </div>
  );
};

export default ReplyCard;
