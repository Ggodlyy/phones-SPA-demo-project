import "./Comment.scss";
import { Avatar } from "@mui/material";
import { orange } from "@mui/material/colors";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { IconButton, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import * as phoneService from "../../services/phoneService";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import ReplyCard from "./ReplyCard";

const Comment = ({
  commentText,
  createdAt,
  commentId,
  owner,
  phoneId,
  phone,
  setCommentState,
}) => {
  const { user } = useContext(AuthContext);
  const [replySection, setReplySection] = useState(false);
  const [replyArticle, setReplyArticle] = useState(false);
  const navigate = useNavigate();
  const commentOwner = Boolean(user._id === owner._id);

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

  const showReplyArticle = (e) => {
    e.preventDefault();

    replyArticle ? setReplyArticle(false) : setReplyArticle(true);
  };

  const replyCommentHandler = (e) => {
    e.preventDefault();

    if (!user.email) {
      navigate("/login");
      return null;
    }

    const textArea = e.target.previousElementSibling;
    const reply = textArea.value;

    if (reply.length === 0) {
      window.alert("You can't send a blank reply");
      return null;
    }

    let userId = user._id;
    phoneService.replyToComment({ phoneId, userId, reply });
    textArea.value = "";

    setCommentState(true);
    setReplyArticle(true);
  };

  const removeBtn = (
    <div className="remove-comment">
      <IconButton onClick={removeCommentHandler} color="primary">
        <Delete></Delete>
      </IconButton>
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

      <article className="replies">
        <Button onClick={showReplyArticle} variant="text" size="small">
          Show Replies
        </Button>

        <div className={replyArticle ? "replyArticleOn" : "replyArticleOff"}>
          {phone.replies?.length > 0
            ? phone.replies.map((reply) => (
                <ReplyCard
                  key={reply.replyId}
                  {...reply}
                  phoneId={phoneId}
                  setCommentState={setCommentState}
                />
              ))
            : `No replies!`}
        </div>
      </article>
    </>
  );
};

export default Comment;
