import { useState } from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import * as phoneService from "../../services/phoneService";
import * as authService from "../../services/authService";
import PhoneCard from "../PhoneCard/PhoneCard";
import "./ProfilePage.scss";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [myPhones, setMyPhones] = useState();
  const [boughtPhones, setBoughtPhones] = useState();
  const userParam = useParams();
  const owner = Boolean(userParam.username === user.username);

  useEffect(() => {
    phoneService.getAll().then((res) => {
      authService.getUser(userParam.username).then((userRes) => {
        const phones = res.filter((phone) => phone.owner === userRes._id);

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
        {!owner ? `${userParam.username}'s Profile` : `Hello ${user.username}`}
      </h1>
      <h1 className="profile-titles ">
        {!owner ? `${userParam.username}'s phones` : "My Phones"}
      </h1>
      <section className="my-phones">
        {myPhones?.length > 0 ? phonesDisplay : <h4>No phones</h4>}
      </section>

      <h1 className="profile-titles">
        {!owner ? `${userParam.username}'s bought phones` : "Bought Phones"}
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

export default ProfilePage;
