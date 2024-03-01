import { useAppDispatch, useAuth } from "~utils/hooks";
import { useState, useEffect, CSSProperties } from 'react';
import { loader } from '~utils/helpers';
import { Outlet } from "react-router-dom";
import { Backdrop, Container, Stack, Typography } from "@mui/material";
import spinner from '../../assets/spinner.png';
import { setAuthToken } from "store/userSlice";
import { serverAPI } from "~utils/axios";
import { IAccountInfo, SERVER } from "~interfaces/index";
import { FAKE_USER_DATA } from "~utils/mock_data";

const titleStyle: CSSProperties = {
  fontFamily: 'Bowlby One',
  fontSize: '52px',
  textTransform: 'uppercase',
  lineHeight: '52px',
  color: 'black',
};
const subTitleStyle: CSSProperties = {
  fontSize: '24px',
  textTransform: 'uppercase',
  lineHeight: '24px',
  color: 'black',
  letterSpacing: '19px',
};

export const AuthCheckingRoutes: React.FC = () => {
  const { setUser } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function authChecker() {
      const token = await loader();
      if (token) {
        if(import.meta.env.VITE_AUTH_FREE) {
          setUser({token, ...FAKE_USER_DATA});
        } else {
          dispatch(setAuthToken(token));
          const {data} = await serverAPI.get<IAccountInfo>(SERVER.ACCOUNT_INFO);
          setUser(data);
        }
      }
      setIsChecking(false);
    }
    authChecker();
  }, []);

  return (
    isChecking ?
      <Backdrop open sx={{ backgroundColor: 'white' }} appear={false} >
        <Container >
          <Stack direction='row' alignItems='center' justifyContent='space-around' >
            <Stack gap={5} >
              <Typography sx={titleStyle}>Secret Service</Typography>
              <Typography sx={subTitleStyle}>confidentiality</Typography>
            </Stack>
            <Stack alignItems='center' >
              <img src={spinner} className="authSpinner"></img>
            </Stack>
          </Stack>
        </Container>
      </Backdrop>
      :
      <Outlet />
  );

};
