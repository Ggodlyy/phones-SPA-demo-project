import { useState } from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import * as phoneService from "../../services/phoneService";
import * as authService from "../../services/authService";
import PhoneCard from "../PhoneCard/PhoneCard";
import "./ProfilePage.scss";
import { isAuth } from "../../hoc/isAuth";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [myPhones, setMyPhones] = useState();
  const [boughtPhones, setBoughtPhones] = useState();
  const userParam = useParams();

  useEffect(() => {
    phoneService.getAll().then((res) => {
      let userInfo = null;

      if (userParam.username) {
        userInfo = authService.getUser(userParam.username);
      } else {
        userInfo = authService.getProfile(user._id);
      }

      userInfo.then((userRes) => {
        const phones = res.filter((phone) => phone.owner === userRes._id);


        console.log(userParam.username)
        setMyPhones(phones);
        setBoughtPhones(userRes.boughtPhones);
      });
    });
  }, [user._id, userParam.username]);

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
      <h1>
        {userParam.username
          ? `${userParam.username}'s Profile`
          : `Hello ${user.username}`}
      </h1>
      <h1 className="profile-titles ">
        {userParam.username ? `${userParam.username}'s phones` : "My Phones"}
      </h1>
      <section className="my-phones">
        {myPhones?.length > 0 ? phonesDisplay : <h4>No phones</h4>}
      </section>

      <h1 className="profile-titles">
        {userParam.username
          ? `${userParam.username}'s bought phones`
          : "Bought Phones"}
      </h1>
      <section className="bought-phones">
        {boughtPhones?.length > 0 ? (
          boughtPhoneDisplay
        ) : (
          <h4>No bought phones yet.</h4>
        )}
      </section>
    </div>
  );
};

export default isAuth(ProfilePage);
