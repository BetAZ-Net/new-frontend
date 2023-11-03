import { Box } from "@chakra-ui/react";

export const SectionContainer = ({ title, right, children, sx, ...rest }) => {
  return (
    <Box
      {...rest}
      sx={sx}
      paddingLeft={{ md: "70px" }}
      paddingRight={{ md: "70px" }}
    >
      <Box w="100%" mx="auto">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Box style={{ fontWeight: "620", fontSize: "40px" }}>{title}</Box>
          {right}
        </Box>
        {children}
      </Box>
    </Box>
  );
};
