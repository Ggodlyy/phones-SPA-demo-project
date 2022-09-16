import { useState } from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import * as phoneService from "../../services/phoneService";
import * as authService from "../../services/authService";
import PhoneCard from "../PhoneCard/PhoneCard";
import "./ProfilePage.scss";
import { isAuth } from "../../hoc/isAuth";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [myPhones, setMyPhones] = useState();
  const [boughtPhones, setBoughtPhones] = useState();

  useEffect(() => {
    const bought = [];

    phoneService.getAll().then((res) => {
      authService.getUser(user._id).then((userRes) => {
        console.log(userRes);
        userRes.myPhones.forEach((myPhoneId) => {
          const boughtPhone = res.find((phone) => phone._id === myPhoneId);

          if (boughtPhone) {
            bought.push(boughtPhone);
          }
        });

        const phones = res.filter((phone) => phone.owner === user._id);

        setMyPhones(phones);
        setBoughtPhones(bought);
      });
    });
  }, [user._id]);

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
      <h1 className="profile-titles ">My phones</h1>
      <section className="my-phones">
        {myPhones?.length > 0 ? phonesDisplay : <h4>No phones</h4>}
      </section>

      <h1 className="profile-titles">Bought phones</h1>
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
