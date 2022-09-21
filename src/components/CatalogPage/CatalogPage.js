import { useContext, useEffect, useState } from "react";
import { PhoneContext } from "../../contexts/PhoneContext";
import PhoneCard from "../PhoneCard/PhoneCard";
import * as phoneService from "../../services/phoneService";
import "./CatalogPage.scss";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";

export default function CatalogPage() {
  const { phones, addPhonesState } = useContext(PhoneContext);
  const [isLoading, setIsLoading] = useState(true);
  const [fillteredPhones, setFillteredPhones] = useState();
  const [brand, setBrand] = useState("");

  useEffect(() => {
    phoneService.getAll().then((res) => {
      setIsLoading(false);
      addPhonesState(res);
    });
  }, []);

  const filterHandler = (e) => {
    e.preventDefault();

    const filtered = phones.filter((phone) => phone.brand === e.target.value);

    setFillteredPhones(filtered);
    setBrand(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="no-phones">
        <h1>Loading...</h1>
      </div>
    );
  } else if (phones.length === 0) {
    return (
      <div className="no-phones">
        <h1>No Phones</h1>
      </div>
    );
  }

  const uniquePhones = [];

  phones.forEach((phone) => {
    const hasBrand = uniquePhones.find((p) => p.brand === phone.brand);

    if (!hasBrand) {
      uniquePhones.push(phone);
    }
  });

  return (
    <>
      <section className="filter-section">
        <div className="filter">
          <h1>Filter by:</h1>
          <FormControl size="small" fullWidth style={{width: '200px'}}>
            <InputLabel className="label" id="demo-simple-select-label">
              Brand
            </InputLabel>
            <Select
              className="select"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={brand}
              label="Brand"
              onChange={filterHandler}
            >
              <MenuItem value={10}>All</MenuItem>
              {uniquePhones.map((phone) => (
                <MenuItem key={phone._id} value={phone.brand}>
                  {phone.brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </section>

      <section className="phone-catalog">
        {fillteredPhones?.length > 0
          ? fillteredPhones?.map((phone) => (
              <PhoneCard key={phone._id} {...phone} />
            ))
          : phones.map((phone) => <PhoneCard key={phone._id} {...phone} />)}
      </section>
    </>
  );
}
