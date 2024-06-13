import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { switchModal, Modal } from "./modalSwitchSlice";
import { selectModalSwitch } from "./modalSwitchSelector";

export const useOpenModal = (): [Modal, () => void] => {
   const dispatch = useDispatch();
   const modalStatus = useSelector(selectModalSwitch);

   const toggleStatus = () => {
      dispatch(switchModal(true));
   }

   //useEffect(() => {

   //}, [])

   return [modalStatus, toggleStatus]
}

export const useCloseModal = (): [Modal, () => void] => {
   const dispatch = useDispatch();
   const modalStatus = useSelector(selectModalSwitch);

   const toggleStatus = () => {
      dispatch(switchModal(false));
   }

   //useEffect(() => {

   //}, [])

   return [modalStatus, toggleStatus]
}