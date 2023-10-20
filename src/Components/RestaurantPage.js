import React, { useContext } from "react";
import StoreContext from "../StoreContext/store-context";
import { AiFillStar } from "react-icons/ai";

import classes from "./RestaurantPage.module.css";
import { useNavigate } from "react-router-dom";

const RestaurantPage = () => {
  const strCtx = useContext(StoreContext);
  const navigate = useNavigate()

  //   console.log(strCtx.restList[0].location.location_address_2);

  const clickHandler = (item) => {
    strCtx.setItem(item);
    navigate("/details")
  }

  return (
    <div>
      <h1>Popular ones</h1>
      <ul>
        {strCtx.restList.map((i) => (
          <li key={i.restaurant_id} className={classes.resCard} onClick={()=>clickHandler(i)}>
            <img src={i.images[0].url} />
            <div className={classes.textCon}>
              <h4>{i.restaurant_name}</h4>
              <section>
                <span>
                  <h6>
                    <AiFillStar />
                    {i.rating.restaurant_avg_rating}
                  </h6>
                  <p>Popularity</p>
                </span>
                <span>
                  <h6>${i.avg_cost_for_two}</h6>
                  <p>Cost for two</p>
                </span>
              </section>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantPage;
