import { Route } from "react-router-dom";
import { useWallet } from "contexts/useWallet";
import { React } from "react";
import AdminPage from "pages/admin";
import Predict from "pages/predict";

const PrivateRouter = () => {
  const { currentAccount } = useWallet();

  if (currentAccount?.address) {
    return <AdminPage />;
  } else return <Predict />;
};

export default PrivateRouter;
