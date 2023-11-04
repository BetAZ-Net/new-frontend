import React from "react";
import { Button } from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";

function CommonButton(props) {
  const {
    type,
    text,
    onClick,
    isLoading,
    isDisabled,
    backgroundColor,
    color,
    sx,
    ...rest
  } = props;

  const { currentAccount } = useSelector((s) => s.substrate);

  if (currentAccount?.address)
    return (
      <Button
        {...rest}
        type={type}
        sx={sx}
        backgroundColor={backgroundColor}
        color={color}
        onClick={onClick}
        isDisabled={isDisabled}
        isLoading={!isDisabled && isLoading ? true : false}
        w={{ base: "100%", sm: "unset" }}
        spinner={<ClipLoader color="#7ae7ff" size={14} loading />}
      >
        {text}
      </Button>
    );
  else
    return (
      <Button
        bg="#FFA000"
        py="10px"
        boxShadow="4px 4px 6px 0px rgba(255, 255, 255, 0.20) inset"
        _hover={{ color: "#000", bg: "#E2E8F0" }}
        onClick={() => {
          document
            .getElementById("connect-box")
            .scrollIntoView({ behavior: "smooth" });
        }}
      >
        Connect wallet now
      </Button>
    );
}

export default CommonButton;
