import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [stakingPoolModalVisible, setStakingPoolModalVisible] = useState(false);
  const [unstakeStakingPoolModalVisible, setUnstakeStakingPoolModalVisible] =
    useState(false);
  const [unstakeModalVisible, setUnstakeModalVisible] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        stakingPoolModalVisible,
        setStakingPoolModalVisible,
        unstakeModalVisible,
        setUnstakeModalVisible,
        unstakeStakingPoolModalVisible,
        setUnstakeStakingPoolModalVisible,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
