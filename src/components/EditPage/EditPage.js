import "./EditPage.scss";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import * as phoneService from "../../services/phoneService";
import { useNavigate, useParams } from "react-router-dom";
import { isAuth } from "../../hoc/isAuth";
import { useForm } from "react-hook-form";

const EditPage = () => {
  const navigate = useNavigate();
  const [currentPhone, setCurrentPhone] = useState(null);
  const { phoneId } = useParams();

  useEffect(() => {
    phoneService.getOne(phoneId).then((res) => {
      setCurrentPhone(res);
    });
  }, [phoneId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const editFormHandler = (data) => {
    phoneService.edit(currentPhone._id, data).then((res) => {
      console.log(res);
      navigate(`/catalog/details/${currentPhone._id}`);
    });
  };

  if (!currentPhone) {
    return (
      <section className="phone-details">
        <h1>Loading...</h1>
      </section>
    );
  }

  return (
    <section className="edit-phone">
      <form
        className="edit-phone-form"
        onSubmit={handleSubmit(editFormHandler)}
      >
        <div className="edit-phone">
          <h2>Edit Phone</h2>

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
            defaultValue={currentPhone?.brand}
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
            defaultValue={currentPhone?.model}
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
            defaultValue={currentPhone?.img}
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
            defaultValue={currentPhone?.price}
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
              defaultValue={currentPhone?.description}
            ></textarea>
          </fieldset>

          <Button
            type="submit"
            variant="contained"
            className="add-btn"
            size="large"
          >
            Edit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default isAuth(EditPage);
