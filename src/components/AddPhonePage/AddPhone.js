import "./AddPhone.scss";
import { Button } from "@mui/material";
import * as phoneService from "../../services/phoneService";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../../hoc/isAuth";
import { useForm } from "react-hook-form";

const AddPhone = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addPhoneHandler = (data) => {
    phoneService.create(data).then((response) => {
      if (response.message) {
        window.alert(response.message);
      } else {
        console.log(data);
        navigate("/catalog");
      }
    });
  };


  return (
    <section className="add-phone">
      <form className="add-phone-form" onSubmit={handleSubmit(addPhoneHandler)}>
        <div className="add-phone">
          <h2>Add Phone</h2>

          <label htmlFor="brand">Brand</label>

          <p className={errors.brand?.message ? "error" : "non-error-state"}>
            {errors.brand?.message}
          </p>

          <input
            {...register("brand", { required: "Brand is required" })}
            type="text"
            name="brand"
            id="brand"
            placeholder="brand"
            className={errors.brand?.message ? "input-error" : ""}
          />

          <label htmlFor="model">Model</label>

          <p className={errors.model?.message ? "error" : "non-error-state"}>
            {errors.model?.message}
          </p>

          <input
            {...register("model", { required: "Model is required" })}
            type="text"
            name="model"
            id="model"
            placeholder="model"
            className={errors.model?.message ? "input-error" : ""}
          />

          <label htmlFor="img">ImageUrl</label>

          <p className={errors.img?.message ? "error" : "non-error-state"}>
            {errors.img?.message}
          </p>

          <input
            {...register("img", { required: "Image is required" })}
            type="text"
            name="img"
            id="img"
            placeholder="img"
            className={errors.img?.message ? "input-error" : ""}
          />

          <label htmlFor="price">Price</label>

          <p className={errors.price?.message ? "error" : "non-error-state"}>
            {errors.price?.message}
          </p>

          <input
            {...register("price", { required: "Price is required" })}
            type="number"
            name="price"
            id="price"
            placeholder="price"
            className={errors.price?.message ? "input-error" : ""}
          />

          <fieldset className="textArea-fieldset">
            <label htmlFor="description">Description</label>

            <p
              className={
                errors.description?.message ? "error" : "non-error-state"
              }
            >
              {errors.description?.message}
            </p>

            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters long",
                },
              })}
              name="description"
              id="description"
              cols="30"
              rows="10"
              className={errors.description?.message ? "input-error" : ""}
            ></textarea>
          </fieldset>

          <Button
            type="submit"
            variant="contained"
            className="add-btn"
            size="large"
          >
            Add
          </Button>
        </div>
      </form>
    </section>
  );
};

export default isAuth(AddPhone);
