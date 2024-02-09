import { Box, BoxProps, Container } from "@mui/material";
import React from "react";

interface IAppBlockProps extends BoxProps {
  bgColor?: string,
}

export const AppBlock: React.FC<IAppBlockProps> = ({children, bgColor, ...rest}) => {
  return (
    <Box bgcolor={bgColor} pt={25} pb={25} {...rest}>
      <Container>
        {children}
      </Container>
    </Box>
  );
};
