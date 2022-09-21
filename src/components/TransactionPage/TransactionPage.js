import { Button } from "@mui/material";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";
import "./TransactionPage.scss";

const TransactionPage = () => {
  const { user } = useContext(AuthContext);
  const [boughtPhones, setBoughtPhones] = useState();
  const [priceSum, setPriceSum] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    authService.getProfile(user._id).then((userRes) => {
      let sum = 0;

      userRes.boughtPhones.forEach((p) => {
        sum += p.price;
      });

      setPriceSum(sum);
      setBoughtPhones(userRes.boughtPhones);
    });
  }, [user._id]);

  const transactionFormHandler = (e) => {
    e.preventDefault();

    if (boughtPhones.length === 0) {
      window.alert("No phones to buy");
      navigate('/profile');
      return null;
    }

    authService.transact(user._id).then((res) => {
      navigate("/profile");
    });
  };

  const boughtPhoneInfoView = (
    <article>
      <ul className="bought-phones-ul">
        {boughtPhones?.length > 0
          ? boughtPhones.map((p) => <li key={p._id}>{p.brand}</li>)
          : "No phones"}
      </ul>
      <h3>{priceSum !== 0 ? `Final price: ${priceSum}` : null}</h3>
    </article>
  );

  const transactionForm = (
    <form onSubmit={transactionFormHandler} className="transaction-form">
      <h3>Payment</h3>
      <label htmlFor="cname">Name on Card</label>
      <input
        type="text"
        id="cname"
        name="cardname"
        placeholder="John More Doe"
      />
      <label htmlFor="ccnum">Credit card number</label>
      <input
        type="text"
        id="ccnum"
        name="cardnumber"
        placeholder="1111-2222-3333-4444"
      />
      <label htmlFor="expmonth">Exp Month</label>
      <input
        type="text"
        id="expmonth"
        name="expmonth"
        placeholder="September"
      />

      <label htmlFor="expyear">Exp Year</label>
      <input type="text" id="expyear" name="expyear" placeholder="2018" />

      <label htmlFor="cvv">CVV</label>
      <input type="text" id="cvv" name="cvv" placeholder="352" />

      <Button type="submit" variant="contained">
        Checkout
      </Button>
    </form>
  );

  return (
    <div className="transaction-page">
      <section className="transaction-form-view">{transactionForm}</section>
      <section className="bought-phone-view">{boughtPhoneInfoView}</section>
    </div>
  );
};

export default TransactionPage;
