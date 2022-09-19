import "./Comment.scss";
import { Avatar } from "@mui/material";
import { orange } from "@mui/material/colors";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { IconButton, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import * as phoneService from "../../services/phoneService";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useEffect } from "react";

const Comment = ({
  commentText,
  createdAt,
  commentId,
  owner,
  phoneId,
  setCommentState,
  replies,
}) => {
  const { user } = useContext(AuthContext);
  const commentOwner = Boolean(user._id === owner._id);
  const [replySection, setReplySection] = useState(false);

  const removeCommentHandler = (e) => {
    e.preventDefault();

    const confirmation = window.confirm(
      "Are you sure you want to remove this comment?"
    );

    if (confirmation) {
      phoneService.destroyComment({ phoneId, commentId });

      setCommentState(true);
    }
  };

  const replySectionView = (e) => {
    e.preventDefault();

    replySection ? setReplySection(false) : setReplySection(true);
  };

  const replyCommentHandler = (e) => {
    e.preventDefault();

    const replyDiv = document.querySelector(".replyDiv");
  };

  const removeBtn = (
    <div className="remove-comment">
      <IconButton onClick={removeCommentHandler} color="primary">
        <Delete></Delete>
      </IconButton>
    </div>
  );

  const replyDiv = (
    <div className="replyInfo">
      <div className="add-comment">
        <textarea
          className="comment-section"
          name="comment"
          placeholder="comment..."
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <Button
          onClick={replyCommentHandler}
          variant="contained"
          endIcon={<SendIcon />}
        >
          replys
        </Button>
      </div>
    </div>
  );

  return (
    <>
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

        <div className="replyBtnView">
          <Button onClick={replySectionView} variant="text">
            Reply
          </Button>
        </div>
      </article>

      <div className={replySection ? "toggleViewOn" : "toggleViewOff"}>
        <textarea
          className="reply-section"
          name="reply"
          placeholder="reply..."
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <div className="replyBtnSend">
          <Button
            size="small"
            className="reply-btn"
            onClick={replyCommentHandler}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Reply
          </Button>
        </div>
      </div>

      <article className="replies">
        {replies?.length > 0 ? replyDiv : `Replies: ${replies?.length}`}
      </article>
    </>
  );
};

export default Comment;
