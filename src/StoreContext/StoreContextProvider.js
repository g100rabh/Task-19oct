import React, { useState } from "react";
import StoreContext from "./store-context";

const StoreContextProvider = (props) => {
  const [token, setToken] = useState();
  const [mobNum, setMobNum] = useState();
  const [list, setList] = useState();
  const [itemOpen, setItemOpen] = useState(null);

  const setTokenHandler = (t) => {
    setToken(t);
    localStorage.setItem("token", token);
  };

  const setMobNumHandler = (mob) => {
    setMobNum(mob);
    localStorage.setItem("mob", mob);
  };

  const setRestListHandler = async (rList) => {
      console.log(rList);
    setList(rList);
  };
 
  const setItemHandler = (j) => {
      setItemOpen(j)
  }


  const storeContext = {
    mobNum: mobNum,
    token: token,
    restList: list,
    item: itemOpen,
    setToken: setTokenHandler,
    setMobNum: setMobNumHandler,
    setRestList: setRestListHandler,
    setItem: setItemHandler,
  };

  return (
    <StoreContext.Provider value={storeContext}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
