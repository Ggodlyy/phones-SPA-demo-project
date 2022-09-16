import { createContext, useState } from "react";

export const PhoneContext = createContext();

export const PhoneProvider = ({children}) => {
    const [phones, setPhones] = useState([]);
  

    const addPhonesState = (phoneData) => {
      setPhones(phoneData);
    };


    return <PhoneContext.Provider value={{ phones, addPhonesState }}>{children}</PhoneContext.Provider>
}