import { useState } from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import * as phoneService from "../../services/phoneService";
import * as authService from "../../services/authService";
import PhoneCard from "../PhoneCard/PhoneCard";
import "./ProfilePage.scss";
import { isAuth } from "../../hoc/isAuth";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
// import { orange } from "@mui/material/colors";
// import { Avatar, Button } from "@mui/material";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [myPhones, setMyPhones] = useState();
  const [boughtPhones, setBoughtPhones] = useState();

  useEffect(() => {
    phoneService.getAll().then((res) => {
      authService.getProfile(user._id).then((userRes) => {
        const phones = res.filter((phone) => phone.owner === userRes._id);

        setMyPhones(phones);
        setBoughtPhones(userRes.boughtPhones);
      });
    });
  }, [user._id]);

  // const submitAvatar = (e) => {
  //   e.preventDefault();
  //   console.log("clicked");
  // };

  const phonesDisplay = (
    <div className="phones">
      <section className="phone-card-info">
        {myPhones?.map((phone) => (
          <PhoneCard key={phone._id} {...phone} />
        ))}
      </section>
    </div>
  );

  const boughtPhoneDisplay = (
    <div className="phones">
      <section className="phone-card-info">
        {boughtPhones?.map((phone) => (
          <PhoneCard key={phone._id} {...phone} />
        ))}
      </section>
    </div>
  );

  return (
    <div className="profile-page">
      <h1>Hello {user.username}</h1>
      {/* <div className="avatar">
        <form onSubmit={submitAvatar} className="avatar-form">
          <Avatar style={{height: '150px', width: '150px'}} sx={{ bgcolor: orange[500] }}>
            {user.username[0].toUpperCase()}
          </Avatar>
          <input className="file-input" type="file" />
          <Button variant="contained" size="small">Change Avatar</Button>
        </form>
      </div> */}
      <h1 className="profile-titles ">My phones</h1>
      <section className="my-phones">
        {myPhones?.length > 0 ? phonesDisplay : <h4>No phones</h4>}
      </section>

      <h1 className="profile-titles">Bought Phones</h1>
      <IconButton aria-label="cart">
        <Badge
          style={{ color: "white" }}
          badgeContent={boughtPhones?.length}
          color="secondary"
        >
          <ShoppingCartIcon style={{ fontSize: "50px" }} />
        </Badge>
      </IconButton>
      <div className="bought-phones-display">
        <section className="bought-phones">
          {boughtPhones?.length > 0 ? (
            boughtPhoneDisplay
          ) : (
            <h4>No bought phones yet.</h4>
          )}
        </section>
      </div>
    </div>
  );
};

export default isAuth(ProfilePage);
