import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [stakingPoolModalVisible, setStakingPoolModalVisible] = useState(false);
  const [unstakeModalVisible, setUnstakeModalVisible] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        stakingPoolModalVisible,
        setStakingPoolModalVisible,
        unstakeModalVisible,
        setUnstakeModalVisible
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
