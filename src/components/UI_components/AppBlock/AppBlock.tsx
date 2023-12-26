import { Box, Container } from "@mui/material";
import React from "react";

interface IAppBlockProps {
  children: React.JSX.Element | React.JSX.Element[]
  bgColor?: string,
}
export const AppBlock: React.FC<IAppBlockProps> = ({children, bgColor}) => {
  return (
    <Box bgcolor={bgColor} pt={25} pb={25}>
      <Container>
        {children}
      </Container>
    </Box>
  );
};
