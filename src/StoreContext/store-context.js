import React from "react";

const StoreContext = React.createContext({
    mobNum: '',
    token: '',
    restList: null,
    item: null,
    setMobNum: ()=> {},
    setToken: () => {},
    setRestList: () => {},
    setItem: () => {}
})

export default StoreContext;