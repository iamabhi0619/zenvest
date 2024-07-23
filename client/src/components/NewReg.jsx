import React, { useEffect } from "react";
import { messaging } from "../firebase";
import { getToken } from "firebase/messaging"

function NewReg() {
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      //genrate token
      const token = await getToken(messaging, { vapidKey: 'BBhZ_o_yPqVnoCefjmYpSoBBoK6I_TK3ZoSN1XaEZRiLTyEHbymydoNkjyCbDZ2TghyDgaezER2NznYO9hj0lzU' })
      console.log("Token genrated:- ",token);
      await fetch(`https://zenvestapi.onrender.com/gettoken?token=${token}`, {
        method: 'GET',
      });
    } else if (permission === "denied") {
      //denied permission
      alert("Notoficaion denied");
    }
  }
  useEffect(() => {
    //reques user for notification permission
    requestPermission();
  }, []);
  return <div>NewReg</div>;
}

export default NewReg;
