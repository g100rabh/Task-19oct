import React, { useContext } from "react";
import { AiOutlineStar } from "react-icons/ai";
import StoreContext from "../StoreContext/store-context";
import { IoIosArrowBack } from "react-icons/io";

import classes from "./RestaurantDetails.module.css";
import { useNavigate } from "react-router-dom";

const RestaurantDetails = () => {
  const strCtx = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className={classes.detailCon}>
    <span className={classes.back} onClick={() => navigate("/restaurant")}>
        <IoIosArrowBack />
      </span>
      <img src={strCtx.item.images[0].url} />
      <div className={classes.lowerCon}>
        <section>
          <h3>{strCtx.item.restaurant_name}</h3>
          <p><AiOutlineStar />{" "}{strCtx.item.rating.restaurant_avg_rating}</p>
        </section>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
      </div>
    </div>
  );
};

export default RestaurantDetails;
