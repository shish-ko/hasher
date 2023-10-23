import React, { useEffect } from "react";
import { hidePopUp } from "store/popUpSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks";

export const PopUp: React.FC = () => {
  const { isActive, message, type } = useAppSelector((store) => store.popUp);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isActive) {
      setTimeout(() => dispatch(hidePopUp()), 2500);
    }
  }, [isActive]);
  return (
    isActive ?
      <section className={`popUp popUp_${type} popUp_active`}>
        <h3 className="popUp__msg">{message}</h3>
      </section> :
      <section className={`popUp popUp_${type}`}>
        <h3 className="popUp__msg">{message}</h3>
      </section>
  );
};

//TODO multi-messages popUp
