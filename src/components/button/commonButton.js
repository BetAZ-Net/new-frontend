import React from "react";
import { Button } from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";

function CommonButton(props) {
  const {
    type,
    text,
    onClick,
    isLoading,
    isDisabled,
    ...rest
  } = props;

  return (
    <Button
      {...rest}
      type={type}
      onClick={onClick}
      isDisabled={isDisabled}
      isLoading={!isDisabled && isLoading ? true : false}
      spinner={<ClipLoader color="#7ae7ff" size={14} loading />}
    >
      {text}
    </Button>
  );
}

export default CommonButton;
