import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./PhoneDetails.scss";
import * as phoneService from "../../services/phoneService";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, Typography, Rating } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Comment from "../CommentCard/Comment";
import { Delete } from "@mui/icons-material";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import { positions } from "@mui/system";

export default function PhoneDetailsPage() {
  const navigate = useNavigate();
  const { phoneId } = useParams();
  const [currentPhone, setCurrentPhone] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const { user } = useContext(AuthContext);
  const [commentState, setCommentState] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    phoneService.getOne(phoneId).then((res) => {
      const avgRating =
        res.rating.reduce((acc, curr) => (acc += curr), 0) / res.rating.length;

      setCommentState(false);
      setCurrentPhone(res);
      setRating(avgRating);

      if (res._ownerId === user._id) {
        setIsOwner(true);
      }
    });
  }, [commentState, user._id, phoneId]);

  const deleteHandler = (e) => {
    e.preventDefault();

    const confirmation = window.confirm(
      "Are you sure you want to delete this phone?"
    );

    if (confirmation && isOwner) {
      phoneService.remove(phoneId).then(() => {
        navigate("/catalog");
      });
    }
  };

  const buyHandler = (e) => {
    e.preventDefault();

    const confirmation = window.confirm(
      "Are you sure you want to buy this phone?"
    );

    if (confirmation) {
      phoneService.buy(phoneId).then((res) => {
        if (res?.message) {
          window.alert(res.message);
        }

        navigate("/profile");
      });
    }
  };

  const commentHandler = (e) => {
    e.preventDefault();

    if (!user.email) {
      navigate("/login");
      return null;
    }

    const textArea = e.target.previousElementSibling;
    const comment = textArea.value;

    if (comment.length === 0) {
      window.alert("You can't send a blank comment");
      return null;
    }

    phoneService.comment(currentPhone._id, { comment });
    textArea.value = "";

    setCommentState(true);
  };

  if (!currentPhone) {
    return (
      <section className="phone-details">
        <h1>Loading...</h1>
      </section>
    );
  }

  const btns = (
    <div className="edit-delete-btns">
      <NavLink to={`/catalog/edit/${currentPhone._id}`} className="edit-btn">
        Edit
      </NavLink>
      <Button
        onClick={deleteHandler}
        variant="contained"
        startIcon={<Delete />}
      >
        Delete
      </Button>
    </div>
  );

  const userBtns = (
    <div className="edit">
      <NavLink to={`#`} onClick={buyHandler} className="edit-btn">
        Buy
      </NavLink>
    </div>
  );

  return (
    <section className="phone-details">
      <article className="phone-details-info">
        <div className="phone-info">
          <h1>Brand: {currentPhone.brand}</h1>
          <h2>Model: {currentPhone.model}</h2>
          <p>
            Price: {currentPhone.price}{" "}
            <CurrencyPoundIcon style={{ position: "absolute" }} />
          </p>
          <div className="container">
            <p className="line-clamp">
              Description: {currentPhone.description}
            </p>
          </div>

          {isOwner ? btns : null}
          {!isOwner && user.email ? userBtns : null}

          <div className="rating">
            <Typography component="legend">Rating</Typography>
            <Rating
              name="simple-controlled"
              size="large"
              value={rating}
              onChange={(event, ratingValue) => {
                phoneService.rate({ phoneId, ratingValue }).then((res) => {
                  const avgRating =
                    res.reduce((acc, curr) => (acc += curr), 0) / res.length;
                  setRating(avgRating);
                });
              }}
            />
          </div>
        </div>
        <div className="phone-img">
          <img className="phone-img" src={currentPhone.img} alt="" />
        </div>
      </article>

      <article className="comments">
        <div className="all-comments">
          {currentPhone.comments?.length > 0
            ? currentPhone.comments?.map((commentObj) => (
                <Comment
                  key={commentObj.commentId}
                  {...commentObj}
                  phoneId={currentPhone._id}
                  phone={currentPhone}
                  setCommentState={setCommentState}
                />
              ))
            : "No comments"}
        </div>

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
            onClick={commentHandler}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Comment
          </Button>
        </div>
      </article>
    </section>
  );
}
