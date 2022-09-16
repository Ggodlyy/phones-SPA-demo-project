import './PhoneCard.scss';
import { NavLink } from 'react-router-dom';

export default function PhoneCard({
  brand,
  model,
  img,
  _id
}) {

  return (
    <div className="phone-card">
      <h3 className='phone-card-h3'>{brand}</h3>
      <p>Model: {model}</p>
      <img className="phone-card-img" src={img} alt="" />      
      <NavLink to={`/catalog/details/${_id}`} variant="contained" className={'details-btn'}>Details</NavLink>

    </div>
  );
}
