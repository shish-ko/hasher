var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router-dom/server.mjs";
import { useSelector, useDispatch, Provider } from "react-redux";
import jwtDecode from "jwt-decode";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { createAsyncThunk, createSlice, configureStore } from "@reduxjs/toolkit";
import { styled, Typography, createTheme, lighten, Box, Container, Stack, Link, ListItem, Avatar, ListItemText, Menu, MenuItem, ListItemIcon, useTheme, List, Snackbar, Alert, Grid, Button, darken, TextField, keyframes, Paper, InputAdornment, SvgIcon, Card, CardHeader, CardActionArea, CardMedia, CardActions, Collapse, IconButton, Dialog, DialogTitle, FormControl, FormHelperText, InputLabel, Input, Slider, CardContent, Accordion, AccordionSummary, AccordionDetails, Divider, Backdrop, Skeleton, SpeedDial, SpeedDialIcon, SpeedDialAction, Tooltip, FormControlLabel, Checkbox, Slide, Grow, ThemeProvider, CssBaseline } from "@mui/material";
import { grey } from "@mui/material/node/colors/index.js";
import Countdown, { zeroPad } from "react-countdown";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import createEmotionServer from "@emotion/server/create-instance";
import { Link as Link$1, useNavigate, Outlet, useLocation, Form, Navigate, useParams, useLoaderData, createRoutesFromElements, Route } from "react-router-dom";
import { Twitter, YouTube, Facebook, AccountCircleOutlined, BallotOutlined, AssignmentIndOutlined, LogoutOutlined, ArrowDropUp, ArrowDropDown, Share, Instagram, UploadFile, Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import * as React from "react";
import { useState, useEffect, useRef, createElement } from "react";
import CountUp from "react-countup";
import { useForm, Controller } from "react-hook-form";
import CircularProgress from "@mui/material/node/CircularProgress/index.js";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import * as datePicker from "@mui/x-date-pickers/node/AdapterDayjs/index.js";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add.js";
import AudioMotionAnalyzer from "audiomotion-analyzer";
import DownloadIcon from "@mui/icons-material/Download.js";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward.js";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown.js";
import DownIcon from "@mui/icons-material/South.js";
import UpIcon from "@mui/icons-material/North.js";
import { Helmet } from "react-helmet";
import Today from "@mui/icons-material/Today.js";
import CommentOutlined from "@mui/icons-material/CommentOutlined.js";
import EventAvailable from "@mui/icons-material/EventAvailable.js";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder.js";
import Title from "@mui/icons-material/Title.js";
import Favorite from "@mui/icons-material/Favorite.js";
import Remove from "@mui/icons-material/Remove.js";
import Facebook$1 from "@mui/icons-material/Facebook.js";
import Share$1 from "@mui/icons-material/Share.js";
import Twitter$1 from "@mui/icons-material/Twitter.js";
import Instagram$1 from "@mui/icons-material/Instagram.js";
const isProdMode = process.env.NODE_ENV === "production";
const SERVER_URL = isProdMode ? "https://secret-server-srv.onrender.com/" : "http://localhost:3000/";
const APP_URL_ORIGIN = isProdMode ? "https://secret-server.onrender.com" : "http://localhost:5173";
const SECOND = 1e3;
const TEST_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MDcxNjg5MDQsImV4cCI6MTczODcwNDkwNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImlkIjoiMyIsIm5hbWUiOiJRd2VyIn0.R-PYGtD5IWrRVr_nwjtIUyb0aEcaM6yUkIa6-H9dmRI";
const ONE_MINUTE = 6e4;
const ONE_HOUR = 36e5;
const TWENTY_FIFE_MB = 25e6;
const ONE_MB = 1e6;
var SERVER = /* @__PURE__ */ ((SERVER2) => {
  SERVER2["USER"] = "user/";
  SERVER2["SECRET"] = "secret/";
  SERVER2["SECRET_LIKE"] = "secret/like/";
  SERVER2["SECRET_SUBSCRIPTION"] = "secret/subs/";
  SERVER2["ACCOUNT_INFO"] = "account/info/";
  SERVER2["ACCOUNT_USERPIC"] = "account/userpic";
  SERVER2["ACCOUNT_PASSWORD"] = "account/password/";
  return SERVER2;
})(SERVER || {});
var ESecretType = /* @__PURE__ */ ((ESecretType2) => {
  ESecretType2["AUDIO"] = "AUDIO";
  ESecretType2["VIDEO"] = "VIDEO";
  ESecretType2["DOC"] = "DOC";
  ESecretType2["PHOTO"] = "PHOTO";
  return ESecretType2;
})(ESecretType || {});
const serverAPI = axios.create({ baseURL: SERVER_URL });
serverAPI.interceptors.request.use(async (config) => {
  var _a, _b;
  const controller = new AbortController();
  if (((_a = config.url) == null ? void 0 : _a.includes("auth/")) || ((_b = config.url) == null ? void 0 : _b.includes("secret/scraper/"))) {
    config.withCredentials = true;
  } else {
    const token = await loader$1(controller);
    if (token) {
      config.headers.setAuthorization(token);
    }
  }
  return { ...config, signal: controller.signal };
});
serverAPI.interceptors.response.use((response) => {
  const { url, method } = response.config;
  if ((url == null ? void 0 : url.includes(SERVER.SECRET_SUBSCRIPTION)) || (url == null ? void 0 : url.includes("secret")) && method === "post") {
    popUpSecretHandler.setPopUpTimers();
  }
  return response;
});
serverAPI.interceptors.response.use((response) => response, (error) => {
  if (error.code === "ERR_CANCELED") {
    return Promise.resolve({ status: 499 });
  }
  return Promise.reject(error);
});
const initialState$1 = {
  id: 0,
  isLogged: false,
  name: "",
  secrets: { availableSecrets: [], futureSecrets: [] },
  newSecrets: 0,
  userPic: null,
  emailSubs: false
};
const updateAccountInfo = createAsyncThunk(
  "user/updateAccountInfo",
  async (accountInfo) => {
    const response = await serverAPI.put(SERVER.ACCOUNT_INFO, accountInfo);
    return response.data;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: initialState$1,
  reducers: {
    setUserSecrets: (state, { payload }) => {
      state.secrets = payload;
    },
    addNewSecret: (store2) => {
      store2.newSecrets += 1;
    },
    setAuthToken: (state, { payload }) => {
      state.authToken = payload;
    },
    setUserData: (state, { payload }) => {
      if (payload.token) {
        state.authToken = payload.token;
      }
      state.id = payload.id;
      state.name = payload.name;
      state.isLogged = true;
      state.emailSubs = payload.emailSubs;
      state.userPic = payload.userPic;
    },
    removeUserData: (state) => {
      state.authToken = void 0;
      state.id = 0;
      state.name = "";
      state.isLogged = false;
    }
  },
  extraReducers(builder) {
    builder.addCase(updateAccountInfo.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  }
});
const { setUserData, setUserSecrets, removeUserData, setAuthToken, addNewSecret } = userSlice.actions;
const initialState = {
  message: "",
  type: "info",
  isActive: false
};
const popUpSlice = createSlice({
  name: "popUp",
  initialState,
  reducers: {
    setPopupMessage: (state, { payload }) => {
      state.type = payload.type;
      state.message = payload.message;
      state.isActive = true;
    },
    hidePopUp: (state) => {
      state.isActive = false;
    }
  }
});
const { setPopupMessage, hidePopUp } = popUpSlice.actions;
const StatTypography = styled(Typography)(() => ({
  fontSize: "1rem",
  color: grey[500]
}));
const TypographyCountdown = styled(Typography, { shouldForwardProp: (prop) => prop !== "milliseconds" })(({ theme, milliseconds }) => {
  const res = {
    fontFamily: "AlarmClock",
    textAlign: "center",
    display: "block"
  };
  if (milliseconds) {
    return {
      color: theme.palette.error.main,
      ...res
    };
  } else {
    return {
      color: theme.palette.warning.main,
      ...res
    };
  }
});
var define_import_meta_env_default$4 = { VITE_FB_APP_ID: "889879815995119", BASE_URL: "/", MODE: "production", DEV: false, PROD: true, SSR: true };
let store$1;
const injectStore = (_store) => {
  store$1 = _store;
};
async function loader$1(controller) {
  var _a;
  if (define_import_meta_env_default$4.VITE_AUTH_FREE)
    return TEST_TOKEN;
  const oldToken = store$1 == null ? void 0 : store$1.getState().user.authToken;
  if (!oldToken) {
    try {
      return await refreshToken();
    } catch {
      controller == null ? void 0 : controller.abort();
      return;
    }
  } else {
    const { exp } = jwtDecode(oldToken);
    if (exp * 1e3 - SECOND < Date.now()) {
      try {
        return await refreshToken();
      } catch (e) {
        if (e instanceof AxiosError && ((_a = e.response) == null ? void 0 : _a.status) === HttpStatusCode.Unauthorized) {
          controller == null ? void 0 : controller.abort();
          store$1 == null ? void 0 : store$1.dispatch(setPopupMessage({ type: "error", message: "Session expired. Log in again" }));
          store$1 == null ? void 0 : store$1.dispatch(removeUserData());
        }
        return;
      }
    } else {
      return oldToken;
    }
  }
  async function refreshToken() {
    const res = await serverAPI.get("auth/refresh-tokens");
    const { token: newToken } = res.data;
    store$1 == null ? void 0 : store$1.dispatch(setAuthToken(newToken));
    return newToken;
  }
}
function loginValidator(login) {
  if (!login)
    return "Provide e-mail";
  return new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(login) || "Invalid e-mail";
}
function passwordValidator(password) {
  if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/))
    return "Minimum eight characters, at least one letter and one number";
  return true;
}
const get_MOCK_USER_SECRETS = () => {
  const res = { availableSecrets: [], futureSecrets: [] };
  for (const type of Object.keys(ESecretType)) {
    res.availableSecrets.push({
      id: Math.random().toString(),
      availableAt: (/* @__PURE__ */ new Date()).toISOString(),
      type,
      title: Math.random().toString(),
      createdAt: new Date(Date.now() - 1e6).toISOString(),
      url: Math.random().toString(),
      userId: 1,
      views: 123,
      description: Math.random().toString()
    });
  }
  for (const type of Object.keys(ESecretType)) {
    res.futureSecrets.push({
      id: Math.random().toString(),
      availableAt: new Date(Date.now() + 1e6).toISOString(),
      type,
      title: Math.random().toString(),
      createdAt: new Date(Date.now() - 1e6).toISOString(),
      userId: 1,
      views: 123,
      url: null,
      description: null
    });
  }
  return res;
};
const countdownRenderer = (typographyProps) => ({ days, hours, minutes, seconds, milliseconds, completed, total }) => {
  if (completed)
    return /* @__PURE__ */ jsx(TypographyCountdown, { ...typographyProps, milliseconds: true, children: "--:--:---" });
  if (total > ONE_HOUR) {
    return /* @__PURE__ */ jsxs(TypographyCountdown, { ...typographyProps, children: [
      days,
      "d:",
      zeroPad(hours),
      ":",
      zeroPad(minutes),
      ":",
      zeroPad(seconds)
    ] });
  }
  return /* @__PURE__ */ jsxs(TypographyCountdown, { ...typographyProps, milliseconds: true, children: [
    " ",
    zeroPad(minutes),
    ":",
    zeroPad(seconds),
    ":",
    zeroPad(milliseconds, 3)
  ] });
};
const fileValidator = (files) => {
  if (files[0].size > TWENTY_FIFE_MB) {
    return "File size should be less than 25Mb";
  }
  return true;
};
class SecretAvailabilityHandler {
  constructor() {
    __publicField(this, "userSecretsTimeouts");
    __publicField(this, "subscribedSecretsTimeouts");
    this.userSecretsTimeouts = [], this.subscribedSecretsTimeouts = [];
  }
  async setPopUpTimers() {
    var _a;
    const userID = store$1 == null ? void 0 : store$1.getState().user.id;
    if (userID) {
      const { data } = await serverAPI.get(SERVER.USER + userID);
      this.removePopUpTimers();
      data.futureSecrets.forEach((secret) => {
        const timeout = new Date(secret.availableAt).getTime() - Date.now();
        const timeoutID = setTimeout(() => {
          store$1 == null ? void 0 : store$1.dispatch(setPopupMessage({ type: "info", message: "Secret is available now" }));
        }, timeout);
        this.userSecretsTimeouts.push(timeoutID);
      });
      (_a = data.subscribedTo) == null ? void 0 : _a.futureSecrets.forEach((secret) => {
        const timeout = new Date(secret.availableAt).getTime() - Date.now();
        const timeoutID = setTimeout(() => {
          store$1 == null ? void 0 : store$1.dispatch(setPopupMessage({ type: "info", message: "Secret is available now" }));
        }, timeout);
        this.subscribedSecretsTimeouts.push(timeoutID);
      });
    }
  }
  removePopUpTimers() {
    this.userSecretsTimeouts.forEach((timeout) => clearTimeout(timeout));
    this.subscribedSecretsTimeouts.forEach((timeout) => clearTimeout(timeout));
  }
}
const popUpSecretHandler = new SecretAvailabilityHandler();
const getSecretTypeImageURL = (type) => {
  return `${APP_URL_ORIGIN}/icons/${type.toLowerCase()}.png`;
};
function createFetchRequest(req, res) {
  const origin = `${req.protocol}://${req.get("host")}`;
  const url = new URL(req.originalUrl || req.url, origin);
  const controller = new AbortController();
  res.on("close", () => controller.abort());
  const headers = new Headers();
  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }
  const init = {
    method: req.method,
    headers,
    signal: controller.signal
  };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }
  return new Request(url.href, init);
}
const COLORS = {
  appNav: "#444444",
  inputBG_dark: "#46504C",
  inputBG_light: "#E6E6E6",
  lightBG: "#F7F7F2",
  darkBG: "#222725",
  lightText: "#E4E6C3"
};
const appTheme = createTheme({
  spacing: 4,
  palette: {
    text: {
      secondary: "#E4E6C3"
    },
    background: {
      default: COLORS.darkBG
    },
    secondary: {
      main: "#1b5a5e"
    },
    shareBlock: {
      main: "none",
      dark: "none"
    }
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: "Archivo, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontFamily: "Inter",
      fontWeight: 800,
      letterSpacing: "-0.15px",
      color: "black"
    },
    h3: {
      fontFamily: "Bowlby One",
      fontSize: "48px",
      marginBottom: "40px"
    },
    h4: {
      fontFamily: "Bowlby One",
      fontSize: "32px",
      lineHeight: "38.4px",
      marginBottom: "20px"
    },
    appNav: {
      fontFamily: "Inter, sans-serif",
      fontWeight: 500,
      fontSize: "1.5rem",
      letterSpacing: "-0.15px",
      lineHeight: "2rem",
      color: COLORS.appNav
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      // small
      sm: 600,
      // medium
      md: 900,
      // large
      lg: 1200,
      // extra-large
      xl: 1200
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: lighten(COLORS.darkBG, 0.1)
        }
      }
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "black"
        }
      }
    },
    MuiMultiSectionDigitalClockSection: {
      styleOverrides: {
        root: {
          color: "black"
        }
      }
    }
  }
});
function createEmotionCache() {
  return createCache({ key: "css" });
}
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    popUp: popUpSlice.reducer
  }
});
const AppBlock = ({ children, bgColor, ...rest }) => {
  return /* @__PURE__ */ jsx(Box, { bgcolor: bgColor, pt: 25, pb: 25, ...rest, children: /* @__PURE__ */ jsx(Container, { children }) });
};
const Footer = () => {
  return /* @__PURE__ */ jsx(AppBlock, { children: /* @__PURE__ */ jsxs(Box, { sx: { margin: "0 auto", width: "fit-content" }, component: "footer", children: [
    /* @__PURE__ */ jsxs(Stack, { direction: "row", gap: 5, sx: { margin: "0 auto", width: "fit-content" }, children: [
      /* @__PURE__ */ jsx(Link, { component: Link$1, to: "#", children: /* @__PURE__ */ jsx(Twitter, { fontSize: "large", htmlColor: "white" }) }),
      /* @__PURE__ */ jsx(Link, { component: Link$1, to: "#", children: /* @__PURE__ */ jsx(YouTube, { fontSize: "large", htmlColor: "white" }) }),
      /* @__PURE__ */ jsx(Link, { component: Link$1, to: "#", children: /* @__PURE__ */ jsx(Facebook, { fontSize: "large", htmlColor: "white" }) })
    ] }),
    /* @__PURE__ */ jsx(Typography, { mt: 7, color: "text.secondary", children: "©SecretService 2023" })
  ] }) });
};
var define_import_meta_env_default$3 = { VITE_FB_APP_ID: "889879815995119", BASE_URL: "/", MODE: "production", DEV: false, PROD: true, SSR: true };
const useAppSelector = useSelector;
const useAppDispatch = useDispatch;
const usePopUp = () => {
  const dispatch = useAppDispatch();
  function active(message, type = "info") {
    dispatch(setPopupMessage({ message, type }));
    setTimeout(() => {
      dispatch(hidePopUp());
    }, 2500);
  }
  return active;
};
const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function setUser(payload) {
    dispatch(setUserData(payload));
    popUpSecretHandler.setPopUpTimers();
  }
  async function logOutUser() {
    dispatch(removeUserData());
    await serverAPI.get("auth/logout");
    popUpSecretHandler.removePopUpTimers();
    navigate("/");
  }
  return { setUser, logOutUser };
};
const useServerFetch = (url, { redirectOnError, errorMsg } = {}) => {
  const [searchParams, setSearchParams] = useState();
  const [res, setRes] = useState();
  const [fetch, setFetch] = useState(false);
  const showPopUp = usePopUp();
  const navigate = useNavigate();
  const isDevMode = define_import_meta_env_default$3.VITE_AUTH_FREE;
  const refetch = (newSearchParams) => {
    if (newSearchParams) {
      setSearchParams(newSearchParams);
    } else {
      setFetch(!fetch);
    }
  };
  useEffect(() => {
    async function fetcher() {
      var _a;
      try {
        setRes(void 0);
        const { data } = await serverAPI.get(url, { params: searchParams });
        setRes(data);
      } catch (e) {
        if (e instanceof AxiosError) {
          showPopUp(errorMsg || ((_a = e.response) == null ? void 0 : _a.data.message) || e.message, "error");
          if (redirectOnError && !isDevMode) {
            setTimeout(() => {
              navigate(redirectOnError);
            }, 0);
          }
        }
      }
    }
    fetcher();
  }, [fetch, searchParams]);
  return { res, refetch, setRes };
};
const Auth = () => {
  const { isLogged, name, id, userPic } = useAppSelector((store2) => store2.user);
  const { logOutUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return isLogged ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      ListItem,
      {
        disablePadding: true,
        sx: { width: "fit-content", cursor: "pointer" },
        onMouseEnter: handleOpenMenu,
        children: [
          userPic ? /* @__PURE__ */ jsx(Avatar, { sx: { mr: 1 }, src: SERVER_URL + userPic }) : /* @__PURE__ */ jsx(AccountCircleOutlined, { sx: { mr: 1 } }),
          /* @__PURE__ */ jsx(ListItemText, { primaryTypographyProps: { variant: "appNav" }, children: name })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(Menu, { anchorEl, open: !!anchorEl, onClose: handleCloseMenu, autoFocus: false, children: [
      /* @__PURE__ */ jsxs(MenuItem, { component: Link$1, to: `user/${id}`, onClick: handleCloseMenu, children: [
        /* @__PURE__ */ jsx(ListItemIcon, { children: /* @__PURE__ */ jsx(BallotOutlined, {}) }),
        /* @__PURE__ */ jsx(ListItemText, { children: "User page" })
      ] }),
      /* @__PURE__ */ jsxs(MenuItem, { component: Link$1, to: "/profile", onClick: handleCloseMenu, children: [
        /* @__PURE__ */ jsx(ListItemIcon, { children: /* @__PURE__ */ jsx(AssignmentIndOutlined, {}) }),
        /* @__PURE__ */ jsx(ListItemText, { children: "Profile" })
      ] }),
      /* @__PURE__ */ jsxs(MenuItem, { onClick: logOutUser, children: [
        /* @__PURE__ */ jsx(ListItemIcon, { children: /* @__PURE__ */ jsx(LogoutOutlined, {}) }),
        /* @__PURE__ */ jsx(ListItemText, { children: "Log out" })
      ] })
    ] })
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(ListItem, { disablePadding: true, sx: { width: "fit-content", cursor: "pointer" }, onClick: handleOpenMenu, children: [
      /* @__PURE__ */ jsx(ListItemText, { primary: "Authorization", primaryTypographyProps: { variant: "appNav" } }),
      /* @__PURE__ */ jsx(ListItemIcon, { sx: { minWidth: "fit-content" }, children: anchorEl ? /* @__PURE__ */ jsx(ArrowDropUp, {}) : /* @__PURE__ */ jsx(ArrowDropDown, {}) })
    ] }),
    /* @__PURE__ */ jsxs(Menu, { open: !!anchorEl, anchorEl, onClose: handleCloseMenu, anchorOrigin: { horizontal: "right", vertical: "bottom" }, children: [
      /* @__PURE__ */ jsx(MenuItem, { onClick: handleCloseMenu, children: /* @__PURE__ */ jsx(Link$1, { to: "/login", children: /* @__PURE__ */ jsx(Typography, { variant: "appNav", children: "Log in" }) }) }),
      /* @__PURE__ */ jsx(MenuItem, { onClick: handleCloseMenu, children: /* @__PURE__ */ jsx(Link$1, { to: "/signup", children: /* @__PURE__ */ jsx(Typography, { variant: "appNav", children: "Sign up" }) }) })
    ] })
  ] });
};
const logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADNSURBVHgBtZWNDcIgEEavhwM4giM4gk6Co3QER9BN2EBHuA10A7xETAjh58qdL/lSONIXWkoB+BMrJ1rEJWHgLJwTKHFZO1hIXdEPWqmr1IJG6hr1MCt1nbEARgtVcoVtn46Im1S4pBsuAqnnEAiRPo63FoqlW/fsUDrzI/DWwq50VvjiHC2FTWm0lkYr6S4Jn613kXGH7xYUsec8BjNYJSJM1zfnnGaqArP2T0qgAIu+WoqVGmmk2KjTrBQ7YzQjxcE4gcFC1TiA7JiAD1poyXEH5R0sAAAAAElFTkSuQmCC";
const Header = () => {
  const theme = useTheme();
  return /* @__PURE__ */ jsxs(Stack, { component: "header", direction: "row", padding: theme.spacing(4, 5), height: "64px", borderBottom: "1px solid rgba(0,0,0, 0.07)", bgcolor: "white", children: [
    /* @__PURE__ */ jsxs(Stack, { direction: "row", alignItems: "center", spacing: 5, children: [
      /* @__PURE__ */ jsx("img", { src: logo, alt: "app logo", className: "header__logo" }),
      /* @__PURE__ */ jsx(Typography, { variant: "h1", children: "SecretService" })
    ] }),
    /* @__PURE__ */ jsxs(List, { disablePadding: true, sx: { display: "flex", gap: theme.spacing(5), justifyContent: "flex-end", flex: "1 0 0" }, children: [
      /* @__PURE__ */ jsx(ListItem, { disablePadding: true, sx: { width: "fit-content" }, children: /* @__PURE__ */ jsx(Link, { component: Link$1, to: "#", underline: "hover", variant: "appNav", color: theme.typography.appNav.color, children: "Terms and conditions" }) }),
      /* @__PURE__ */ jsx(ListItem, { disablePadding: true, sx: { width: "fit-content" }, children: /* @__PURE__ */ jsx(Link, { component: Link$1, to: "#", underline: "hover", variant: "appNav", color: theme.typography.appNav.color, children: "About us" }) }),
      /* @__PURE__ */ jsx(Auth, {})
    ] })
  ] });
};
const PopUp = () => {
  const { isActive, message, type } = useAppSelector((store2) => store2.popUp);
  const dispatch = useAppDispatch();
  return /* @__PURE__ */ jsx(Snackbar, { open: isActive, onClose: () => dispatch(hidePopUp()), autoHideDuration: 2500, children: /* @__PURE__ */ jsx(Alert, { severity: type, children: message }) });
};
const DefaultUI = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(PopUp, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const AppStats = () => {
  const theme = useTheme();
  return /* @__PURE__ */ jsx(AppBlock, { bgColor: "white", children: /* @__PURE__ */ jsxs(Stack, { justifyContent: "space-evenly", direction: "row", children: [
    /* @__PURE__ */ jsxs(Stack, { alignItems: "center", children: [
      /* @__PURE__ */ jsx(CountUp, { end: 30, style: { ...theme.typography.h3, color: "black", marginBottom: theme.spacing(2) } }),
      /* @__PURE__ */ jsx(Typography, { variant: "h3", color: "black", m: 0, children: "users" })
    ] }),
    /* @__PURE__ */ jsxs(Stack, { alignItems: "center", children: [
      /* @__PURE__ */ jsx(CountUp, { end: 20, style: { ...theme.typography.h3, color: "black", marginBottom: theme.spacing(2) } }),
      /* @__PURE__ */ jsx(Typography, { variant: "h3", color: "black", m: 0, children: "secrets" })
    ] })
  ] }) });
};
const Description = () => {
  return /* @__PURE__ */ jsxs(AppBlock, { children: [
    /* @__PURE__ */ jsx(Typography, { variant: "h3", color: "white", children: "Why Choose SecretService?" }),
    /* @__PURE__ */ jsx(Typography, { sx: { display: "inline-block", width: "49%" }, color: "text.secondary", children: "Have you ever wished for a place on the web where your secret files could take a nap until called upon? That’s Us! We’re like that trustworthy friend who’d never spill your beans. Go ahead, make use of our exclusive timed-release feature; your files won’t budge till the clock ticks zero." }),
    /* @__PURE__ */ jsx(Typography, { sx: { display: "inline-block", width: "49%", marginLeft: "2%" }, color: "text.secondary", children: "With a sophisticated, password-protected authentication system and eagle-eyed 24/7 surveillance, we’ve got your back. You’ll be entrusting your files to our top-secret, impenetrable cloud fortress. All this comes wrapped in a sleek, easy-to- use interface, bathed in a soothing dark palette." })
  ] });
};
const bgImage = "/assets/indexBG-NBNfN8ro.png";
const index1 = "/assets/index1-CG-8WEnc.png";
const index2 = "/assets/index2-Bzhroi7_.png";
const Description2 = () => {
  return /* @__PURE__ */ jsx(AppBlock, { children: /* @__PURE__ */ jsxs(Grid, { container: true, justifyContent: "space-between", alignItems: "center", gap: 15, children: [
    /* @__PURE__ */ jsxs(Grid, { item: true, xs: 5, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h4", sx: { color: "#899878" }, children: "State of the art file care, Ready when you aren’t" }),
      /* @__PURE__ */ jsx(Typography, { color: "text.secondary", children: "Imagine having storage reservoir with futuristic technology for your sensitive documents. Where time stands till you want it to move. SecureVault provides next generation file security at your command." })
    ] }),
    /* @__PURE__ */ jsx(Grid, { item: true, xs: 5, borderRadius: 7.5, sx: { background: `center / cover url(${index1})`, height: "480px" } }),
    /* @__PURE__ */ jsx(Grid, { item: true, xs: 5, borderRadius: 7.5, sx: { background: `center / cover url(${index2})`, height: "480px" } }),
    /* @__PURE__ */ jsxs(Grid, { item: true, xs: 5, children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h4", sx: { color: "#899878" }, children: "Never again lose your important files in the crowd" }),
      /* @__PURE__ */ jsx(Typography, { color: "text.secondary", children: "Our File tagging and search feature is like the Saint Bernard of files, rescuing your important document from the chaotic whirlpool of files." })
    ] })
  ] }) });
};
const AppButton = styled(Button)(({ theme, dark, disabled }) => {
  let bgColor = theme.palette.success.main;
  let textColor = "white";
  if (dark) {
    bgColor = COLORS.lightBG;
    textColor = "black";
  }
  if (disabled) {
    bgColor = COLORS.inputBG_light;
  }
  return {
    fontSize: theme.spacing(4),
    lineHeight: theme.spacing(4),
    borderRadius: "10px",
    textTransform: "none",
    padding: "15px",
    backgroundColor: bgColor,
    color: textColor,
    "&:hover": {
      backgroundColor: darken(bgColor, 0.2)
    }
  };
});
const AppToggleBtn = ({ inactiveIcon, activeIcon, isActive, onClick, ...rest }) => {
  const [pointerEvents, setPointerEvents] = useState("auto");
  const [children, setChildren] = useState(inactiveIcon);
  useEffect(() => {
    setPointerEvents("auto");
    if (isActive) {
      setChildren(activeIcon);
    } else {
      setChildren(inactiveIcon);
    }
  }, [isActive]);
  const clickHandler = (e) => {
    setChildren(/* @__PURE__ */ jsx(CircularProgress, { sx: { width: "24px" }, size: "small", color: "inherit" }));
    setPointerEvents("none");
    onClick && onClick(e);
  };
  return /* @__PURE__ */ jsx(
    Button,
    {
      sx: { borderColor: grey[500], pointerEvents },
      onClick: clickHandler,
      variant: isActive ? "contained" : "outlined",
      ...rest,
      children
    }
  );
};
const AppInput = styled(TextField)(({ theme, dark, error }) => {
  let bgColor = COLORS.inputBG_light;
  let textColor = COLORS.appNav;
  let labelColor = COLORS.appNav;
  let activeBorderColor = COLORS.appNav;
  if (dark) {
    bgColor = COLORS.inputBG_dark;
    textColor = theme.palette.text.primary;
    labelColor = COLORS.lightBG;
    activeBorderColor = COLORS.lightBG;
  }
  if (error) {
    activeBorderColor = theme.palette.error.main;
  }
  const inputAnimation = keyframes`
    100%{
      box-shadow: 0 0 70px 25px ${activeBorderColor};
      opacity: 0;
    }
  `;
  return {
    backgroundColor: bgColor,
    color: textColor,
    fontSize: theme.spacing(4),
    borderRadius: "10px",
    marginBottom: "10px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      "&.Mui-focused": {
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: activeBorderColor,
          animation: `${inputAnimation} .2s linear`
        },
        ".MuiInputAdornment-root": {
          transition: "transform .2s ease-in-out",
          color: activeBorderColor,
          transform: "translateX(-4px)"
        }
      }
    },
    "& .MuiOutlinedInput-input": {
      color: textColor
    },
    "& label, label.Mui-focused": {
      color: labelColor
    }
  };
});
const Subscription = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  return /* @__PURE__ */ jsxs(AppBlock, { children: [
    /* @__PURE__ */ jsx(Typography, { variant: "h3", textAlign: "center", color: "white", children: "Join the Secret Service’s  Club for insider tips and top-secret promotions. Trust us, you don’t want to miss this!" }),
    /* @__PURE__ */ jsx(Stack, { alignItems: "center", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit((val) => void 0), className: "subscriptionForm", children: [
      /* @__PURE__ */ jsx(
        AppInput,
        {
          ...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid e-mail"
            },
            required: true
          }),
          fullWidth: true,
          label: "e-mail",
          error: !!errors.email,
          dark: "true"
        }
      ),
      /* @__PURE__ */ jsx(AppButton, { fullWidth: true, dark: "true", variant: "contained", type: "submit", children: "Subscribe " })
    ] }) })
  ] });
};
const Index = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(AppStats, {}),
    /* @__PURE__ */ jsx(Description, {}),
    /* @__PURE__ */ jsx(Box, { sx: { backgroundImage: `url(${bgImage})`, height: "600px", backgroundPosition: "center" }, children: /* @__PURE__ */ jsx(Container, { sx: { display: "flex", height: "100%", alignItems: "center" }, children: /* @__PURE__ */ jsx(Typography, { variant: "h3", color: "white", textAlign: "center", children: "In SecureVault, privacy isn't a choice, it's a Promise!" }) }) }),
    /* @__PURE__ */ jsx(Description2, {}),
    /* @__PURE__ */ jsx(Subscription, {})
  ] });
};
const loginSrc = "data:image/webp;base64,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";
const SvgEnvelopeSolid = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", fill: "#ffffff", ...props }, /* @__PURE__ */ React.createElement("path", { d: "M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" }));
const SvgLockSolid = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", fill: "none", ...props }, /* @__PURE__ */ React.createElement("path", { d: "M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" }));
const LogIn = () => {
  const { register, handleSubmit, formState: { errors, isValid, isSubmitted } } = useForm();
  const navigate = useNavigate();
  const showPopUp = usePopUp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser } = useAuth();
  const onSubmit = async (data) => {
    var _a;
    setIsSubmitting(true);
    try {
      const res = await serverAPI.post(SERVER_URL + "auth/login", data);
      setUser(res.data);
      showPopUp("Login successfully");
      navigate(`/user/${res.data.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showPopUp((_a = error.response) == null ? void 0 : _a.data.message, "error");
      }
    }
    setIsSubmitting(false);
  };
  return /* @__PURE__ */ jsx(AppBlock, { bgColor: "white", children: /* @__PURE__ */ jsx(Paper, { elevation: 8, sx: { padding: "130px 20px 20px" }, children: /* @__PURE__ */ jsxs(Grid, { container: true, justifyContent: "space-around", gap: 10, children: [
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx("img", { src: loginSrc }) }),
    /* @__PURE__ */ jsxs(Grid, { item: true, xs: 4, component: "form", onSubmit: handleSubmit(onSubmit), children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h4", textAlign: "center", children: "Member login" }),
      /* @__PURE__ */ jsxs(Box, { mb: 3, children: [
        /* @__PURE__ */ jsx(
          AppInput,
          {
            sx: { marginBottom: 0 },
            error: !!errors.email,
            placeholder: "E-mail",
            fullWidth: true,
            ...register("email", { validate: loginValidator }),
            InputProps: { startAdornment: /* @__PURE__ */ jsx(InputAdornment, { position: "start", children: /* @__PURE__ */ jsx(SvgIcon, { component: SvgEnvelopeSolid, fontSize: "small", inheritViewBox: true }) }) }
          }
        ),
        errors.email && /* @__PURE__ */ jsx(Typography, { color: "error", fontSize: 12, children: errors.email.message })
      ] }),
      /* @__PURE__ */ jsxs(Box, { mb: 3, children: [
        /* @__PURE__ */ jsx(
          AppInput,
          {
            sx: { marginBottom: 0 },
            error: !!errors.password,
            placeholder: "Password",
            type: "password",
            fullWidth: true,
            ...register("password", { validate: passwordValidator }),
            InputProps: { startAdornment: /* @__PURE__ */ jsx(InputAdornment, { position: "start", children: /* @__PURE__ */ jsx(SvgIcon, { component: SvgLockSolid, fontSize: "small", inheritViewBox: true }) }) }
          }
        ),
        errors.password && /* @__PURE__ */ jsx(Typography, { color: "error", fontSize: 12, children: errors.password.message })
      ] }),
      /* @__PURE__ */ jsx(
        AppButton,
        {
          fullWidth: true,
          sx: { marginTop: ({ spacing }) => spacing(10) },
          disabled: isSubmitting || isSubmitted && !isValid,
          type: "submit",
          children: "Submit"
        }
      ),
      /* @__PURE__ */ jsxs(Typography, { color: grey[500], mt: 3, textAlign: "center", children: [
        "Forgot  ",
        /* @__PURE__ */ jsx(Typography, { component: "span", color: "text.primary", children: "Username / Password?" })
      ] }),
      /* @__PURE__ */ jsx(Typography, { mt: 40, textAlign: "center", children: /* @__PURE__ */ jsx(Link, { component: Link$1, to: "/signup", variant: "appNav", color: "text.primary", underline: "hover", children: "Create your account »" }) })
    ] })
  ] }) }) });
};
const SignUp = () => {
  const { register, handleSubmit, reset, formState: { errors, isValid, isSubmitted, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const showPopUp = usePopUp();
  const onSubmit = async (data) => {
    var _a;
    try {
      await serverAPI.post(SERVER_URL + "auth/reg", data);
      showPopUp("Profile is successfully created");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showPopUp((_a = error.response) == null ? void 0 : _a.data.message, "error");
        reset();
      }
    }
  };
  return /* @__PURE__ */ jsx(AppBlock, { bgColor: "white", children: /* @__PURE__ */ jsx(Paper, { elevation: 8, sx: { padding: "130px 20px 20px" }, children: /* @__PURE__ */ jsxs(Grid, { container: true, justifyContent: "space-around", gap: 10, children: [
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx("img", { src: loginSrc }) }),
    /* @__PURE__ */ jsxs(Grid, { item: true, xs: 4, component: "form", onSubmit: handleSubmit(onSubmit), children: [
      /* @__PURE__ */ jsx(Typography, { variant: "h4", textAlign: "center", children: "Member signUp" }),
      /* @__PURE__ */ jsxs(Box, { mb: 3, children: [
        /* @__PURE__ */ jsx(
          AppInput,
          {
            sx: { marginBottom: 0 },
            error: !!errors.email,
            placeholder: "E-mail",
            fullWidth: true,
            ...register("email", { validate: loginValidator }),
            InputProps: { startAdornment: /* @__PURE__ */ jsx(InputAdornment, { position: "start", children: /* @__PURE__ */ jsx(SvgIcon, { component: SvgEnvelopeSolid, fontSize: "small", inheritViewBox: true }) }) }
          }
        ),
        errors.email && /* @__PURE__ */ jsx(Typography, { color: "error", fontSize: 12, children: errors.email.message })
      ] }),
      /* @__PURE__ */ jsxs(Box, { mb: 3, children: [
        /* @__PURE__ */ jsx(
          AppInput,
          {
            sx: { marginBottom: 0 },
            error: !!errors.password,
            placeholder: "Password",
            type: "password",
            fullWidth: true,
            ...register("password", { validate: passwordValidator }),
            InputProps: { startAdornment: /* @__PURE__ */ jsx(InputAdornment, { position: "start", children: /* @__PURE__ */ jsx(SvgIcon, { component: SvgLockSolid, fontSize: "small", inheritViewBox: true }) }) }
          }
        ),
        errors.password && /* @__PURE__ */ jsx(Typography, { color: "error", fontSize: 12, children: errors.password.message })
      ] }),
      /* @__PURE__ */ jsx(
        AppButton,
        {
          fullWidth: true,
          sx: { marginTop: ({ spacing }) => spacing(10) },
          disabled: isSubmitting || isSubmitted && !isValid,
          type: "submit",
          children: "Submit"
        }
      ),
      /* @__PURE__ */ jsxs(Typography, { color: grey[500], mt: 3, textAlign: "center", children: [
        "Forgot  ",
        /* @__PURE__ */ jsx(Typography, { component: "span", color: "text.primary", children: "Username / Password?" })
      ] }),
      /* @__PURE__ */ jsx(Typography, { mt: 40, textAlign: "center", children: /* @__PURE__ */ jsx(Link, { component: Link$1, to: "/login", color: "text.primary", underline: "hover", children: "Log into your account »" }) })
    ] })
  ] }) }) });
};
const Secret_future = styled(Card)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
}));
const FutureSecret = ({ id, type, userId, availableAt, createdAt, title, countdownHandler, user: { userPic, name }, ...rest }) => {
  const [isShown, setIsShown] = useState(false);
  return /* @__PURE__ */ jsxs(Secret_future, { elevation: 4, ...rest, children: [
    /* @__PURE__ */ jsx(
      CardHeader,
      {
        title,
        subheader: `Created at: ${new Date(createdAt).toLocaleDateString()}`,
        titleTypographyProps: { color: "text.secondary" },
        subheaderTypographyProps: { color: "text.primary" },
        avatar: /* @__PURE__ */ jsx(Avatar, { component: Link$1, to: `../user/${userId}`, src: SERVER_URL + userPic, children: name })
      }
    ),
    /* @__PURE__ */ jsx(CardActionArea, { component: Link$1, to: `../secret/${id}`, children: /* @__PURE__ */ jsxs(CardMedia, { sx: { height: "200px", backgroundColor: "black", padding: "30px 0" }, children: [
      /* @__PURE__ */ jsxs(Typography, { textAlign: "center", mb: 5, color: COLORS.lightText, children: [
        /* @__PURE__ */ jsxs(Typography, { component: "span", textTransform: "capitalize", children: [
          type,
          " "
        ] }),
        "will be available in:"
      ] }),
      /* @__PURE__ */ jsx(Countdown, { zeroPadTime: 2, intervalDelay: 80, precision: 3, date: availableAt, onComplete: countdownHandler, renderer: countdownRenderer({ fontSize: "4rem" }) })
    ] }) }),
    /* @__PURE__ */ jsx(CardActions, { children: /* @__PURE__ */ jsx(Collapse, { orientation: "horizontal", in: isShown, timeout: 100, collapsedSize: 40, onMouseOver: () => setIsShown(true), onMouseOut: () => setIsShown(false), children: /* @__PURE__ */ jsxs(Box, { height: 40, children: [
      /* @__PURE__ */ jsx(IconButton, { children: /* @__PURE__ */ jsx(Share, {}) }),
      /* @__PURE__ */ jsx(IconButton, { onClick: () => {
        FB.ui({
          method: "share",
          href: "https://youtube.com/"
        }, function(response) {
        });
      }, children: /* @__PURE__ */ jsx(Facebook, {}) }),
      /* @__PURE__ */ jsx(IconButton, { children: /* @__PURE__ */ jsx(Twitter, {}) }),
      /* @__PURE__ */ jsx(IconButton, { children: /* @__PURE__ */ jsx(Instagram, {}) })
    ] }) }) })
  ] });
};
const { AdapterDayjs } = datePicker;
const formStyles = {
  margin: "0 auto",
  border: "1px solid black",
  borderRadius: "5px",
  padding: "10px",
  gap: "10px",
  width: "380px"
};
const SecretForm = ({ formCloseHandler, isSecretFormActive }) => {
  const { register, handleSubmit, control, watch, formState: { errors, isValid }, trigger, reset, getValues } = useForm();
  const [fileName, setFileName] = useState(" ");
  const [preview, setPreview] = useState();
  const titleText = watch("title", "");
  const { id, name, userPic } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const showPopUp = usePopUp();
  const url = useLocation();
  const maxTitleLength = 70;
  const minDate = dayjs().add(2, "minute");
  const maxDate = dayjs().add(5, "years");
  const submitHandler = async ({ date, file, title, description }) => {
    try {
      const availableAt = new Date(date.$d).toISOString();
      const formData = new FormData();
      formData.append("availableAt", availableAt);
      formData.append("file", file[0]);
      formData.append("title", title);
      formData.append("description", description);
      await serverAPI.post("secret", formData);
      reset();
      formCloseHandler();
      showPopUp("Secret has been added", "info");
      if (url.pathname === `/user/${id}`) {
        dispatch(addNewSecret());
      }
    } catch {
      showPopUp("Something went wrong", "error");
    }
  };
  const previewHandler = () => {
    if (isValid) {
      setPreview(getValues());
    } else {
      trigger();
    }
  };
  return /* @__PURE__ */ jsxs(Dialog, { open: isSecretFormActive, PaperProps: { sx: { color: "black", padding: "10px" } }, onClose: formCloseHandler, children: [
    /* @__PURE__ */ jsx(DialogTitle, { component: Typography, variant: "h4", textAlign: "center", children: "Add new secret" }),
    /* @__PURE__ */ jsxs(Stack, { gap: 4, children: [
      /* @__PURE__ */ jsxs(Stack, { component: Form, onSubmit: handleSubmit(submitHandler), encType: "multipart/form-data", method: "post", sx: formStyles, children: [
        /* @__PURE__ */ jsxs(FormControl, { children: [
          /* @__PURE__ */ jsx(LocalizationProvider, { dateAdapter: AdapterDayjs, children: /* @__PURE__ */ jsx(
            Controller,
            {
              name: "date",
              control,
              rules: {
                required: "provide expired date",
                validate: (date) => new Date(date.$d).getTime() - Date.now() > 2 * ONE_MINUTE || "date must be at least 2 minutes later from submit time"
              },
              render: ({ field }) => {
                return /* @__PURE__ */ jsx(
                  DateTimePicker,
                  {
                    views: ["year", "month", "day", "hours", "minutes", "seconds"],
                    sx: { "& .MuiOutlinedInput-input": { color: "black" } },
                    minDate,
                    maxDate,
                    ampm: false,
                    label: "Choose expired date:",
                    ...field
                  }
                );
              }
            }
          ) }),
          errors.date && /* @__PURE__ */ jsx(FormHelperText, { sx: { color: "error.main" }, children: errors.date.message })
        ] }),
        /* @__PURE__ */ jsxs(FormControl, { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "title", sx: { color: "black" }, children: "Secret's title" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              sx: { color: "black" },
              ...register("title", {
                maxLength: { value: maxTitleLength, message: "max size exceeded" },
                required: "fill the title",
                onChange: () => {
                  trigger("title");
                }
              }),
              error: !!errors.title,
              multiline: true
            }
          ),
          /* @__PURE__ */ jsx(FormHelperText, { error: !!errors.title, children: errors.title ? errors.title.message : `${maxTitleLength - titleText.length} chars left` })
        ] }),
        /* @__PURE__ */ jsxs(FormControl, { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "title", sx: { color: "black" }, children: "Secret's description" }),
          /* @__PURE__ */ jsx(Input, { sx: { color: "black" }, ...register("description"), multiline: true })
        ] }),
        /* @__PURE__ */ jsxs(FormControl, { children: [
          /* @__PURE__ */ jsxs(Button, { component: "label", startIcon: /* @__PURE__ */ jsx(UploadFile, {}), variant: "contained", children: [
            "Attach file",
            /* @__PURE__ */ jsx("input", { type: "file", hidden: true, ...register("file", { onChange: (e) => {
              var _a;
              trigger();
              setFileName((_a = e.target) == null ? void 0 : _a.value);
            }, required: { value: true, message: "Attach the file" }, validate: fileValidator }) })
          ] }),
          /* @__PURE__ */ jsx(FormHelperText, { error: !!errors.file, children: errors.file ? errors.file.message : fileName })
        ] }),
        /* @__PURE__ */ jsx(Button, { color: "warning", variant: "outlined", onClick: previewHandler, children: "Get preview" }),
        /* @__PURE__ */ jsx(AppButton, { type: "submit", children: "Submit" })
      ] }),
      preview && /* @__PURE__ */ jsx(
        FutureSecret,
        {
          sx: { maxWidth: formStyles.width },
          userId: id,
          id: "1",
          title: preview.title,
          availableAt: preview.date.$d,
          createdAt: (/* @__PURE__ */ new Date()).toDateString(),
          type: ESecretType.DOC,
          countdownHandler: () => {
          },
          user: { id, name, userPic },
          views: 0,
          url: null,
          description: null
        }
      )
    ] })
  ] });
};
const AddButton = styled(IconButton)(({ theme }) => {
  return {
    position: "fixed",
    right: theme.spacing(20),
    bottom: theme.spacing(20),
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.light
    }
  };
});
const ProtectedRoutes = () => {
  const showPopUp = usePopUp();
  const [isSecretFormActive, setIsSecretFormActive] = useState(false);
  const { isLogged } = useAppSelector((store2) => store2.user);
  useEffect(() => {
    if (!isLogged) {
      showPopUp("Session has expired. Please log in again", "error");
    }
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.defer = true;
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
    script.addEventListener("load", () => {
      window.fbAsyncInit = function() {
        FB.init({
          appId: "889879815995119",
          xfbml: true,
          version: "v18.0"
        });
      };
    });
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return isLogged ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(AddButton, { size: "large", onClick: () => setIsSecretFormActive(!isSecretFormActive), children: /* @__PURE__ */ jsx(AddIcon, { htmlColor: "white" }) }),
    /* @__PURE__ */ jsx(SecretForm, { formCloseHandler: () => setIsSecretFormActive(false), isSecretFormActive })
  ] }) : /* @__PURE__ */ jsx(Navigate, { to: "/login" });
};
const AppAudioPlayer = ({ url }) => {
  var _a;
  const audioRef = useRef(null);
  const renderRef = useRef(null);
  const [audioNode, setAudioNode] = useState();
  const [isPLaying, setIsPlaying] = useState(false);
  const [isVolumeShown, setIsVolumeShown] = useState(false);
  const playHandler = () => {
    var _a2;
    setIsPlaying(true);
    (_a2 = audioRef.current) == null ? void 0 : _a2.play();
  };
  const pauseHandler = () => {
    var _a2;
    setIsPlaying(false);
    (_a2 = audioRef.current) == null ? void 0 : _a2.pause();
  };
  (_a = audioRef.current) == null ? void 0 : _a.addEventListener("ended", () => {
    setIsPlaying(false);
  });
  useEffect(() => {
    let audioMotion;
    if (renderRef.current && audioRef.current) {
      if (!audioNode) {
        const context = new AudioContext();
        const audioNode2 = context.createMediaElementSource(audioRef.current);
        setAudioNode(audioNode2);
      }
      audioMotion = new AudioMotionAnalyzer(
        renderRef.current,
        {
          source: audioNode,
          height: 200,
          mode: 3,
          barSpace: 0.6,
          lumiBars: true,
          showScaleX: false
        }
      );
    }
    return () => {
      audioMotion == null ? void 0 : audioMotion.destroy();
    };
  }, [audioRef, renderRef, audioNode]);
  return /* @__PURE__ */ jsxs(Box, { ref: renderRef, position: "relative", children: [
    /* @__PURE__ */ jsx("audio", { ref: audioRef, src: SERVER_URL + url, crossOrigin: "anonymous" }),
    /* @__PURE__ */ jsxs(Stack, { direction: "row", justifyContent: "space-between", sx: { position: "absolute", bottom: "7px", left: 0, width: "100%" }, children: [
      isPLaying ? /* @__PURE__ */ jsx(IconButton, { sx: { "&:hover": { backgroundColor: "rgba(225,225,225, .2)" } }, onClick: pauseHandler, children: /* @__PURE__ */ jsx(Pause, { htmlColor: "white" }) }) : /* @__PURE__ */ jsx(IconButton, { sx: { "&:hover": { backgroundColor: "rgba(225,225,225, .2)" } }, onClick: playHandler, children: /* @__PURE__ */ jsx(PlayArrow, { htmlColor: "white" }) }),
      /* @__PURE__ */ jsxs(Stack, { direction: "row", alignItems: "baseline", gap: 2, onMouseOver: () => setIsVolumeShown(true), onMouseLeave: () => setIsVolumeShown(false), children: [
        /* @__PURE__ */ jsx(Collapse, { orientation: "horizontal", in: isVolumeShown, children: /* @__PURE__ */ jsx(
          Slider,
          {
            defaultValue: 100,
            size: "small",
            sx: { width: "100px", transform: "translateY(2px)" },
            onChange: (_, val) => {
              if (audioRef.current && typeof val === "number") {
                audioRef.current.volume = val / 100;
              }
            }
          }
        ) }),
        /* @__PURE__ */ jsx(IconButton, { children: /* @__PURE__ */ jsx(VolumeUp, { htmlColor: "white" }) })
      ] })
    ] })
  ] });
};
const VideoSecret = ({ url }) => {
  return /* @__PURE__ */ jsx("video", { src: SERVER_URL + url, controls: true, style: { height: "200px" } });
};
const PhotoSecret = ({ url }) => {
  const img = new Image();
  img.src = SERVER_URL + url;
  const isImageOversize = img.height > 200;
  return /* @__PURE__ */ jsx(Box, { sx: { position: "relative", background: `center no-repeat url(${SERVER_URL + url})`, backgroundSize: `${isImageOversize ? "contain" : "auto"}`, minHeight: "200px" } });
};
const DocSecret = ({ url }) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Typography, { sx: { textAlign: "justify", color: "black", backgroundColor: "white", maxHeight: "200px", overflow: "hidden" }, children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et mollis sem. Etiam laoreet gravida ante. Pellentesque finibus nisl id nibh posuere, consequat feugiat mauris viverra. Pellentesque euismod sem a felis vehicula auctor. Donec at dui est. Fusce sit amet nibh aliquam, dictum magna vitae, varius lorem. Nulla facilisi.".repeat(2) }),
    /* @__PURE__ */ jsx(Box, { sx: { position: "absolute", top: 0, left: 0, bottom: 0, right: 0, backdropFilter: "blur(2px)" }, children: /* @__PURE__ */ jsx(Button, { LinkComponent: "a", download: true, href: SERVER_URL + url, variant: "contained", startIcon: /* @__PURE__ */ jsx(DownloadIcon, {}), sx: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }, children: "Download" }) })
  ] });
};
const AvailableSecret = ({ id, title, type, availableAt, url, createdAt, userId, description, user: { userPic, name } }) => {
  const [isShown, setIsShown] = useState(false);
  const mediaRef = useRef(null);
  const availableAtUserTZ = new Date(availableAt).toLocaleString();
  return /* @__PURE__ */ jsxs(Card, { sx: { flexBasis: "30%", display: "flex", flexDirection: "column", justifyContent: "space-between" }, elevation: 4, children: [
    /* @__PURE__ */ jsx(
      CardHeader,
      {
        title,
        titleTypographyProps: { color: "text.secondary" },
        subheaderTypographyProps: { color: "text.primary" },
        subheader: `Created at: ${new Date(createdAt).toLocaleDateString()}`,
        avatar: /* @__PURE__ */ jsx(Avatar, { component: Link$1, to: `../user/${userId}`, src: SERVER_URL + userPic, children: name })
      }
    ),
    /* @__PURE__ */ jsx(CardMedia, { ref: mediaRef, component: "div", sx: { position: "relative" }, children: function() {
      switch (type) {
        case "AUDIO":
          return /* @__PURE__ */ jsx(AppAudioPlayer, { url });
        case "VIDEO":
          return /* @__PURE__ */ jsx(VideoSecret, { url });
        case "PHOTO":
          return /* @__PURE__ */ jsx(PhotoSecret, { url });
        default:
          return /* @__PURE__ */ jsx(DocSecret, { url });
      }
    }() }),
    /* @__PURE__ */ jsx(CardActionArea, { component: Link$1, to: `../secret/${id}`, children: /* @__PURE__ */ jsxs(CardContent, { sx: { display: "flex", flexDirection: "column", gap: 4 }, children: [
      /* @__PURE__ */ jsx(Typography, { sx: { color: "text.secondary", textAlign: "justify", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }, children: description }),
      /* @__PURE__ */ jsxs(Typography, { children: [
        "Available at: ",
        availableAtUserTZ
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(CardActions, { children: /* @__PURE__ */ jsx(Collapse, { orientation: "horizontal", in: isShown, timeout: 100, collapsedSize: 40, onMouseOver: () => setIsShown(true), onMouseOut: () => setIsShown(false), children: /* @__PURE__ */ jsxs(Box, { height: 40, children: [
      /* @__PURE__ */ jsx(IconButton, { children: /* @__PURE__ */ jsx(Share, {}) }),
      /* @__PURE__ */ jsx(IconButton, { onClick: () => {
        FB.ui({
          method: "share",
          href: `https://secret-service.onrender.com/secret/${id}`
        }, function(response) {
        });
      }, children: /* @__PURE__ */ jsx(Facebook, {}) }),
      /* @__PURE__ */ jsx(IconButton, { children: /* @__PURE__ */ jsx(Twitter, {}) }),
      /* @__PURE__ */ jsx(IconButton, { children: /* @__PURE__ */ jsx(Instagram, {}) })
    ] }) }) })
  ] });
};
const SortMenuItem = styled((props) => /* @__PURE__ */ jsx(MenuItem, { ...props, disableGutters: true }))({ fontSize: "1.2rem", p: "3px 10px" });
const SecretsList = ({ secrets: { availableSecrets, futureSecrets, subscribedTo }, refetch }) => {
  const [anchor, setAnchor] = useState(null);
  const sortParams = new URLSearchParams();
  const createdASC = () => {
    sortParams.append("sort", "createdASC");
    refetch(sortParams);
  };
  const createdDESC = () => {
    sortParams.append("sort", "createdDESC");
    refetch(sortParams);
  };
  const availableASC = () => {
    sortParams.append("sort", "availableASC");
    refetch(sortParams);
  };
  const availableDESC = () => {
    sortParams.append("sort", "availableDESC");
    refetch(sortParams);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    availableSecrets.length ? /* @__PURE__ */ jsxs(Accordion, { sx: { backgroundColor: "background.default" }, defaultExpanded: true, children: [
      /* @__PURE__ */ jsx(AccordionSummary, { expandIcon: /* @__PURE__ */ jsx(ArrowDownwardIcon, { htmlColor: "white", fontSize: "large" }), children: /* @__PURE__ */ jsx(Typography, { variant: "h3", color: "white", mb: 0, children: "Available secrets:" }) }),
      /* @__PURE__ */ jsxs(AccordionDetails, { children: [
        /* @__PURE__ */ jsx(Button, { onClick: (e) => {
          setAnchor(e.currentTarget);
        }, endIcon: /* @__PURE__ */ jsx(KeyboardDoubleArrowDownIcon, {}), sx: { position: "absolute", right: 0, mb: 1 }, children: "Sort by" }),
        /* @__PURE__ */ jsxs(Menu, { open: !!anchor, anchorEl: anchor, onClose: () => {
          setAnchor(null);
        }, transformOrigin: { vertical: "top", horizontal: "right" }, anchorOrigin: { vertical: "bottom", horizontal: "right" }, children: [
          /* @__PURE__ */ jsxs(SortMenuItem, { onClick: createdASC, children: [
            /* @__PURE__ */ jsx(UpIcon, { fontSize: "small" }),
            " Created ASC"
          ] }),
          /* @__PURE__ */ jsxs(SortMenuItem, { onClick: createdDESC, children: [
            /* @__PURE__ */ jsx(DownIcon, { fontSize: "small" }),
            " Created DESC"
          ] }),
          /* @__PURE__ */ jsx(Divider, {}),
          /* @__PURE__ */ jsxs(SortMenuItem, { onClick: availableASC, children: [
            /* @__PURE__ */ jsx(UpIcon, { fontSize: "small" }),
            "Available ASC"
          ] }),
          /* @__PURE__ */ jsxs(SortMenuItem, { onClick: availableDESC, children: [
            /* @__PURE__ */ jsx(DownIcon, { fontSize: "small" }),
            " Available DESC"
          ] })
        ] }),
        /* @__PURE__ */ jsx(Stack, { direction: "row", gap: "5%", flexWrap: "wrap", rowGap: 10, mt: 20, children: availableSecrets.map((secret) => /* @__PURE__ */ createElement(AvailableSecret, { ...secret, key: secret.id })) })
      ] })
    ] }) : /* @__PURE__ */ jsx(Accordion, { disabled: true, children: /* @__PURE__ */ jsx(AccordionSummary, { children: /* @__PURE__ */ jsx(Typography, { variant: "h3", color: "white", mb: 0, children: "There is no available secrets" }) }) }),
    futureSecrets.length ? /* @__PURE__ */ jsxs(Accordion, { sx: { backgroundColor: "background.default" }, children: [
      /* @__PURE__ */ jsx(AccordionSummary, { expandIcon: /* @__PURE__ */ jsx(ArrowDownwardIcon, { htmlColor: "white", fontSize: "large" }), children: /* @__PURE__ */ jsx(Typography, { variant: "h3", color: "white", mb: 0, children: "Future secrets:" }) }),
      /* @__PURE__ */ jsx(AccordionDetails, { children: /* @__PURE__ */ jsx(Stack, { direction: "row", gap: "5%", flexWrap: "wrap", rowGap: 10, children: futureSecrets.map((secret) => /* @__PURE__ */ createElement(FutureSecret, { ...secret, countdownHandler: refetch, sx: { flexBasis: "30%" }, key: secret.id })) }) })
    ] }) : /* @__PURE__ */ jsx(Accordion, { disabled: true, children: /* @__PURE__ */ jsx(AccordionSummary, { children: /* @__PURE__ */ jsx(Typography, { variant: "h3", color: "white", mb: 0, children: "There is no future secrets" }) }) }),
    !!(subscribedTo == null ? void 0 : subscribedTo.availableSecrets.length) && /* @__PURE__ */ jsxs(Accordion, { sx: { backgroundColor: "background.default" }, children: [
      /* @__PURE__ */ jsx(AccordionSummary, { expandIcon: /* @__PURE__ */ jsx(ArrowDownwardIcon, { htmlColor: "white", fontSize: "large" }), children: /* @__PURE__ */ jsx(Typography, { variant: "h3", color: "white", mb: 0, children: "Subscribed available secrets:" }) }),
      /* @__PURE__ */ jsx(AccordionDetails, { children: /* @__PURE__ */ jsx(Stack, { direction: "row", gap: "5%", flexWrap: "wrap", rowGap: 10, mt: 20, children: subscribedTo.availableSecrets.map((secret) => /* @__PURE__ */ createElement(AvailableSecret, { ...secret, key: secret.id })) }) })
    ] }),
    !!(subscribedTo == null ? void 0 : subscribedTo.futureSecrets.length) && /* @__PURE__ */ jsxs(Accordion, { sx: { backgroundColor: "background.default" }, children: [
      /* @__PURE__ */ jsx(AccordionSummary, { expandIcon: /* @__PURE__ */ jsx(ArrowDownwardIcon, { htmlColor: "white", fontSize: "large" }), children: /* @__PURE__ */ jsx(Typography, { variant: "h3", color: "white", mb: 0, children: "Subscribed future secrets:" }) }),
      /* @__PURE__ */ jsx(AccordionDetails, { children: /* @__PURE__ */ jsx(Stack, { direction: "row", gap: "5%", flexWrap: "wrap", rowGap: 10, mt: 20, children: subscribedTo.futureSecrets.map((secret) => /* @__PURE__ */ createElement(FutureSecret, { ...secret, countdownHandler: refetch, sx: { flexBasis: "30%" }, key: secret.id })) }) })
    ] })
  ] });
};
var define_import_meta_env_default$2 = { VITE_FB_APP_ID: "889879815995119", BASE_URL: "/", MODE: "production", DEV: false, PROD: true, SSR: true };
const User = () => {
  const { userId } = useParams();
  const { newSecrets } = useAppSelector((state) => state.user);
  const hasPageBeenRendered = useRef(false);
  let { res: secrets, refetch } = useServerFetch(`user/${userId}`, { redirectOnError: "/" });
  if (define_import_meta_env_default$2.VITE_AUTH_FREE) {
    secrets = get_MOCK_USER_SECRETS();
  }
  useEffect(() => {
    if (hasPageBeenRendered.current) {
      refetch();
      return;
    }
    hasPageBeenRendered.current = true;
  }, [newSecrets]);
  return /* @__PURE__ */ jsx(AppBlock, { component: "section", children: secrets ? /* @__PURE__ */ jsx(SecretsList, { secrets, refetch }) : /* @__PURE__ */ jsx("div", { children: "loading..." }) });
};
const spinner = "/assets/spinner-BFdlZ5un.png";
const FAKE_USER_DATA = {
  id: 1,
  userPic: null,
  name: "Qwer",
  emailSubs: false
};
var define_import_meta_env_default$1 = { VITE_FB_APP_ID: "889879815995119", BASE_URL: "/", MODE: "production", DEV: false, PROD: true, SSR: true };
const titleStyle = {
  fontFamily: "Bowlby One",
  fontSize: "52px",
  textTransform: "uppercase",
  lineHeight: "52px",
  color: "black"
};
const subTitleStyle = {
  fontSize: "24px",
  textTransform: "uppercase",
  lineHeight: "24px",
  color: "black",
  letterSpacing: "19px"
};
const AuthCheckingRoutes = () => {
  const { setUser } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function authChecker() {
      const token = await loader$1();
      if (token) {
        if (define_import_meta_env_default$1.VITE_AUTH_FREE) {
          setUser({ token, ...FAKE_USER_DATA });
        } else {
          dispatch(setAuthToken(token));
          const { data } = await serverAPI.get(SERVER.ACCOUNT_INFO);
          setUser(data);
        }
      }
      setIsChecking(false);
    }
    authChecker();
  }, []);
  return isChecking ? /* @__PURE__ */ jsx(Backdrop, { open: true, sx: { backgroundColor: "white" }, appear: false, children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Stack, { direction: "row", alignItems: "center", justifyContent: "space-around", children: [
    /* @__PURE__ */ jsxs(Stack, { gap: 5, children: [
      /* @__PURE__ */ jsx(Typography, { sx: titleStyle, children: "Secret Service" }),
      /* @__PURE__ */ jsx(Typography, { sx: subTitleStyle, children: "confidentiality" })
    ] }),
    /* @__PURE__ */ jsx(Stack, { alignItems: "center", children: /* @__PURE__ */ jsx("img", { src: spinner, className: "authSpinner" }) })
  ] }) }) }) : /* @__PURE__ */ jsx(Outlet, {});
};
const FB_Secret = () => {
  const secret = useLoaderData();
  const { secretId } = useParams();
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: `${APP_URL_ORIGIN}/secret/${secretId}` }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: secret.title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: `Hidden ${secret.type.toLowerCase()} will be available at ${new Date(secret.availableAt).toLocaleString()}` }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: getSecretTypeImageURL(secret.type) })
  ] });
};
const loader = async ({ params }) => {
  const { data } = await serverAPI.get(`secret/scraper/${params.secretId}`);
  return data;
};
const SecretSkeleton = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", children: /* @__PURE__ */ jsxs(Stack, { direction: "row", alignItems: "center", gap: 2, children: [
      /* @__PURE__ */ jsx(Skeleton, { variant: "circular", children: /* @__PURE__ */ jsx(Avatar, {}) }),
      /* @__PURE__ */ jsx(Skeleton, { width: 100 })
    ] }) }),
    /* @__PURE__ */ jsx(Skeleton, { variant: "rectangular", height: 400 }),
    /* @__PURE__ */ jsx(Grid, { container: true, children: /* @__PURE__ */ jsx(Grid, { item: true, xs: 8, children: /* @__PURE__ */ jsxs(List, { children: [
      /* @__PURE__ */ jsx(Skeleton, {}),
      /* @__PURE__ */ jsx(Divider, { variant: "middle" }),
      /* @__PURE__ */ jsx(Skeleton, {}),
      /* @__PURE__ */ jsx(Divider, { variant: "middle" }),
      /* @__PURE__ */ jsx(Skeleton, {}),
      /* @__PURE__ */ jsx(Divider, { variant: "middle" }),
      /* @__PURE__ */ jsx(Skeleton, {}),
      /* @__PURE__ */ jsx(Divider, { variant: "middle" })
    ] }) }) })
  ] });
};
const ShareBlock = (props) => {
  return /* @__PURE__ */ jsxs(SpeedDial, { ...props, ariaLabel: "social_share", FabProps: { size: "small", color: "shareBlock", sx: { backgroundColor: "white", boxShadow: "none", "&:hover": { backgroundColor: "white" } } }, icon: /* @__PURE__ */ jsx(SpeedDialIcon, { icon: /* @__PURE__ */ jsx(Share$1, {}), sx: { "& .MuiSpeedDialIcon-iconOpen": { transform: "none" } } }), children: [
    /* @__PURE__ */ jsx(SpeedDialAction, { icon: /* @__PURE__ */ jsx(Instagram$1, {}) }),
    /* @__PURE__ */ jsx(SpeedDialAction, { icon: /* @__PURE__ */ jsx(Twitter$1, {}) }),
    /* @__PURE__ */ jsx(SpeedDialAction, { icon: /* @__PURE__ */ jsx(Facebook$1, {}) })
  ] });
};
const PhotoSecret_L = ({ url }) => {
  const img = new Image();
  img.src = SERVER_URL + url;
  const isHorizontal = img.naturalWidth >= img.naturalHeight;
  return /* @__PURE__ */ jsx("img", { className: isHorizontal ? "photoSecret__L_horiz" : "photoSecret__L_vertical", src: SERVER_URL + url });
};
const SecretMedia = ({ type, url, availableAt, countdownHandler }) => {
  if (url) {
    return /* @__PURE__ */ jsx(Box, { sx: { position: "relative" }, children: function() {
      switch (type) {
        case "AUDIO":
          return /* @__PURE__ */ jsx(AppAudioPlayer, { url });
        case "VIDEO":
          return /* @__PURE__ */ jsx(VideoSecret, { url });
        case "PHOTO":
          return /* @__PURE__ */ jsx(PhotoSecret_L, { url });
        default:
          return /* @__PURE__ */ jsx(DocSecret, { url });
      }
    }() });
  } else {
    return /* @__PURE__ */ jsxs(Box, { sx: { backgroundColor: "black", padding: "40px  0" }, children: [
      /* @__PURE__ */ jsxs(Typography, { textAlign: "center", mb: 5, color: COLORS.lightText, children: [
        /* @__PURE__ */ jsxs(Typography, { component: "span", textTransform: "capitalize", children: [
          type,
          " "
        ] }),
        "will be available in:"
      ] }),
      /* @__PURE__ */ jsx(Countdown, { zeroPadTime: 2, intervalDelay: 80, precision: 2, date: availableAt, onComplete: countdownHandler, renderer: countdownRenderer({ fontSize: "10rem" }) })
    ] });
  }
};
var define_import_meta_env_default = { VITE_FB_APP_ID: "889879815995119", BASE_URL: "/", MODE: "production", DEV: false, PROD: true, SSR: true };
const SecretListItem = styled(ListItem)({
  alignItems: "center",
  width: "100%"
});
const secretDataStyles = {
  marginLeft: 50,
  wordWrap: "break-word",
  textAlign: "right",
  flexGrow: 1
};
const Secret = () => {
  const { secretId } = useParams();
  let { res, refetch, setRes } = useServerFetch(SERVER.SECRET + secretId, { redirectOnError: "/" });
  if (define_import_meta_env_default.VITE_AUTH_FREE) {
    res = { ...get_MOCK_USER_SECRETS().availableSecrets[0], stats: { isLiked: true, isSubscribed: false, likesNum: 122, subscribersNum: 11 }, user: { id: 1, userPic: null, name: "Anonymous" } };
  }
  if (res) {
    const {
      id,
      type,
      title,
      description,
      createdAt,
      availableAt,
      userId,
      views,
      url,
      stats: { isLiked, isSubscribed, likesNum, subscribersNum },
      user: { userPic, name }
    } = res;
    const likeHandler = async () => {
      if (isLiked) {
        const { data } = await serverAPI.delete(SERVER.SECRET_LIKE + id);
        setRes(data);
      } else {
        const { data } = await serverAPI.post(SERVER.SECRET_LIKE + id);
        setRes(data);
      }
    };
    const subscriptionHandler = async () => {
      if (isSubscribed) {
        const { data } = await serverAPI.delete(SERVER.SECRET_SUBSCRIPTION + id);
        setRes(data);
      } else {
        const { data } = await serverAPI.post(SERVER.SECRET_SUBSCRIPTION + id);
        setRes(data);
      }
    };
    return /* @__PURE__ */ jsx(AppBlock, { children: /* @__PURE__ */ jsxs(Paper, { elevation: 14, component: Stack, gap: 4, p: 5, children: [
      /* @__PURE__ */ jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", children: [
        /* @__PURE__ */ jsxs(Stack, { direction: "row", alignItems: "center", gap: 2, component: Link$1, to: `/user/${userId}`, children: [
          /* @__PURE__ */ jsx(Avatar, { src: SERVER_URL + userPic, children: name.slice(0, 2) }),
          /* @__PURE__ */ jsx(Typography, { children: name })
        ] }),
        /* @__PURE__ */ jsxs(Stack, { direction: "row", gap: 2, sx: { height: "fit-content" }, children: [
          /* @__PURE__ */ jsx(Tooltip, { title: isSubscribed ? "unsubscribe" : "subscribe", children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(AppToggleBtn, { isActive: isSubscribed, inactiveIcon: /* @__PURE__ */ jsx(AddIcon, {}), activeIcon: /* @__PURE__ */ jsx(Remove, {}), color: "secondary", size: "small", onClick: subscriptionHandler }) }) }),
          /* @__PURE__ */ jsx(Tooltip, { title: isLiked ? "remove like" : "like", children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(AppToggleBtn, { isActive: isLiked, inactiveIcon: /* @__PURE__ */ jsx(FavoriteBorder, {}), activeIcon: /* @__PURE__ */ jsx(Favorite, {}), color: "secondary", size: "small", onClick: likeHandler }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(SecretMedia, { url, type, availableAt, countdownHandler: refetch }),
      /* @__PURE__ */ jsxs(Stack, { alignItems: "center", direction: "row", justifyContent: "space-between", px: 4, children: [
        /* @__PURE__ */ jsxs(List, { component: Stack, direction: "row", disablePadding: true, children: [
          /* @__PURE__ */ jsxs(ListItem, { sx: { flexDirection: "column", alignItems: "center" }, disablePadding: true, children: [
            /* @__PURE__ */ jsx(StatTypography, { children: "Views" }),
            /* @__PURE__ */ jsx(StatTypography, { children: views })
          ] }),
          /* @__PURE__ */ jsx(Divider, { orientation: "vertical", flexItem: true, sx: { margin: "0 20px" } }),
          /* @__PURE__ */ jsxs(ListItem, { sx: { flexDirection: "column", alignItems: "center" }, disablePadding: true, children: [
            /* @__PURE__ */ jsx(StatTypography, { children: "Likes" }),
            /* @__PURE__ */ jsx(StatTypography, { children: likesNum })
          ] }),
          /* @__PURE__ */ jsx(Divider, { orientation: "vertical", flexItem: true, sx: { margin: "0 20px" } }),
          /* @__PURE__ */ jsxs(ListItem, { sx: { flexDirection: "column", alignItems: "center" }, disablePadding: true, children: [
            /* @__PURE__ */ jsx(StatTypography, { children: "Subscribers" }),
            /* @__PURE__ */ jsx(StatTypography, { children: subscribersNum })
          ] })
        ] }),
        /* @__PURE__ */ jsx(ShareBlock, { direction: "left" })
      ] }),
      /* @__PURE__ */ jsx(Grid, { container: true, children: /* @__PURE__ */ jsx(Grid, { item: true, xs: 8, children: /* @__PURE__ */ jsxs(List, { children: [
        /* @__PURE__ */ jsxs(SecretListItem, { children: [
          /* @__PURE__ */ jsx(Title, { fontSize: "small", htmlColor: "grey" }),
          /* @__PURE__ */ jsx(Typography, { ml: 3, children: "Title" }),
          /* @__PURE__ */ jsx(Typography, { sx: secretDataStyles, children: title })
        ] }),
        /* @__PURE__ */ jsx(Divider, { variant: "middle" }),
        /* @__PURE__ */ jsxs(SecretListItem, { children: [
          /* @__PURE__ */ jsx(Today, { fontSize: "small", htmlColor: "grey" }),
          /* @__PURE__ */ jsx(Typography, { ml: 3, children: "Created at" }),
          /* @__PURE__ */ jsx(Typography, { sx: secretDataStyles, children: new Date(createdAt).toLocaleString() })
        ] }),
        /* @__PURE__ */ jsx(Divider, { variant: "middle" }),
        description && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(SecretListItem, { children: [
            /* @__PURE__ */ jsx(EventAvailable, { fontSize: "small", htmlColor: "grey" }),
            /* @__PURE__ */ jsx(Typography, { ml: 3, children: "Expired at" }),
            /* @__PURE__ */ jsx(Typography, { sx: secretDataStyles, children: new Date(availableAt).toLocaleString() })
          ] }),
          /* @__PURE__ */ jsx(Divider, { variant: "middle" }),
          /* @__PURE__ */ jsxs(SecretListItem, { children: [
            /* @__PURE__ */ jsx(CommentOutlined, { fontSize: "small", htmlColor: "grey" }),
            /* @__PURE__ */ jsx(Typography, { ml: 3, children: "Description" }),
            /* @__PURE__ */ jsx(Typography, { sx: secretDataStyles, children: description })
          ] }),
          /* @__PURE__ */ jsx(Divider, { variant: "middle" })
        ] })
      ] }) }) })
    ] }) });
  }
  return /* @__PURE__ */ jsx(AppBlock, { children: /* @__PURE__ */ jsx(Paper, { elevation: 14, component: Stack, gap: 4, p: 5, children: /* @__PURE__ */ jsx(SecretSkeleton, {}) }) });
};
const Profile = () => {
  var _a, _b;
  const { name, userPic, emailSubs } = useAppSelector((store2) => store2.user);
  const { setUser } = useAuth();
  const [displayedUserName, setDisplayedUserName] = useState(name);
  const [displayedUserPic, setDisplayedUserPic] = useState(userPic ? SERVER_URL + userPic : void 0);
  const showPopUp = usePopUp();
  const [pickedFile, setPickedFile] = useState();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isPasswordFormActive, setIsPasswordFormActive] = useState(false);
  const slideContainer = useRef(null);
  const userPicHandler = (e) => {
    var _a2;
    const reader = new FileReader();
    reader.onload = function(e2) {
      var _a3;
      setDisplayedUserPic((_a3 = e2.target) == null ? void 0 : _a3.result);
    };
    const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
    if (file) {
      if (file.type !== "image/jpeg") {
        showPopUp("File type is not supported.", "error");
      } else if (file.size > 5 * ONE_MB) {
        showPopUp("File size exceed 5mB.", "error");
      } else {
        reader.readAsDataURL(file);
        setPickedFile(file);
      }
    }
  };
  const changeUserName = async () => {
    await dispatch(updateAccountInfo({ name: displayedUserName }));
    showPopUp("User name successfully changed");
  };
  const toggleEmailSubs = async (_, emailSubs2) => {
    await dispatch(updateAccountInfo({ emailSubs: emailSubs2 }));
    if (emailSubs2) {
      showPopUp("You will receive e-mail notifications when secrets, you subscribed to, become available");
    } else {
      showPopUp("You will NOT receive e-mail notifications when secrets, you subscribed to, become available");
    }
  };
  const cancelUserPicChange = () => {
    setDisplayedUserPic(userPic ? SERVER_URL + userPic : void 0);
  };
  const submitUserPicChange = async () => {
    const formData = new FormData();
    formData.append("userPic", pickedFile);
    const { data } = await serverAPI.put(SERVER.ACCOUNT_USERPIC, formData);
    setUser(data);
    setDisplayedUserPic(data.userPic ? SERVER_URL + data.userPic : void 0);
    showPopUp("UserPic successfully updated");
  };
  const deleteUserPic = async () => {
    const { data } = await serverAPI.delete(SERVER.ACCOUNT_USERPIC);
    setUser(data);
    setDisplayedUserPic(void 0);
    showPopUp("User picture has been reset");
  };
  const passwordChangeHandler = async (data) => {
    var _a2;
    try {
      await serverAPI.put(SERVER.ACCOUNT_PASSWORD, data);
      reset();
      setIsPasswordFormActive(false);
      showPopUp("Password successfully updated");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showPopUp((_a2 = error.response) == null ? void 0 : _a2.data.message, "error");
      }
    }
  };
  return /* @__PURE__ */ jsxs(AppBlock, { bgColor: "white", children: [
    /* @__PURE__ */ jsx(Typography, { variant: "h3", textAlign: "center", children: "Profile settings" }),
    /* @__PURE__ */ jsxs(Grid, { container: true, alignItems: "flex-start", children: [
      /* @__PURE__ */ jsxs(Grid, { item: true, container: true, sm: 6, direction: "row", gap: 5, alignItems: "flex-end", display: "flex", children: [
        /* @__PURE__ */ jsx(Avatar, { sx: { height: 250, width: 250 }, src: displayedUserPic, children: /* @__PURE__ */ jsx(AccountCircleOutlined, { sx: { height: 200, width: 200 } }) }),
        /* @__PURE__ */ jsxs(Stack, { gap: 2, children: [
          /* @__PURE__ */ jsx(Tooltip, { title: "File type: jpg, max-size: 5mb", placement: "top-end", children: /* @__PURE__ */ jsxs(Button, { component: "label", variant: "contained", color: "success", children: [
            /* @__PURE__ */ jsx("input", { type: "file", hidden: true, onChange: userPicHandler }),
            displayedUserPic ? "Change profile photo" : "Add profile photo"
          ] }) }),
          userPic == (displayedUserPic == null ? void 0 : displayedUserPic.replace(SERVER_URL, "")) ? /* @__PURE__ */ jsx(Button, { disabled: !userPic, color: "error", onClick: deleteUserPic, children: "Delete profile photo" }) : /* @__PURE__ */ jsxs(Stack, { direction: "row", justifyContent: "space-around", children: [
            /* @__PURE__ */ jsx(Button, { onClick: submitUserPicChange, children: "submit" }),
            /* @__PURE__ */ jsx(Button, { onClick: cancelUserPicChange, color: "error", children: "cancel" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Grid, { item: true, sm: 4, component: List, gap: 4, display: "flex", flexDirection: "column", disablePadding: true, children: [
        /* @__PURE__ */ jsxs(ListItem, { disableGutters: true, children: [
          /* @__PURE__ */ jsx(
            TextField,
            {
              value: displayedUserName,
              onChange: (e) => setDisplayedUserName(e.target.value),
              variant: "standard",
              label: "User name",
              sx: { mr: 4 }
            }
          ),
          /* @__PURE__ */ jsx(
            AppButton,
            {
              sx: { p: 3 },
              disabled: displayedUserName === name,
              onClick: changeUserName,
              children: "Change user name"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(ListItem, { disableGutters: true, children: /* @__PURE__ */ jsx(
          FormControlLabel,
          {
            control: /* @__PURE__ */ jsx(Checkbox, { defaultChecked: emailSubs, onChange: toggleEmailSubs }),
            label: "Receive email notifications when secrets you subscribed to becomes available"
          }
        ) }),
        /* @__PURE__ */ jsxs(ListItem, { disableGutters: true, ref: slideContainer, sx: { display: "block", overflow: "hidden" }, children: [
          /* @__PURE__ */ jsx(Slide, { direction: "down", appear: false, in: !isPasswordFormActive, container: slideContainer.current, children: /* @__PURE__ */ jsx(AppButton, { fullWidth: true, onClick: () => setIsPasswordFormActive(true), children: "Change account password" }) }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(passwordChangeHandler), children: [
            /* @__PURE__ */ jsx(Grow, { in: isPasswordFormActive, timeout: { exit: 2e3 }, children: /* @__PURE__ */ jsxs(FormControl, { fullWidth: true, children: [
              /* @__PURE__ */ jsx(
                TextField,
                {
                  variant: "standard",
                  label: "New password",
                  sx: { mr: 4 },
                  type: "password",
                  ...register("newPassword", { validate: passwordValidator })
                }
              ),
              /* @__PURE__ */ jsx(FormHelperText, { error: !!errors.newPassword, children: (_a = errors.newPassword) == null ? void 0 : _a.message })
            ] }) }),
            /* @__PURE__ */ jsx(Grow, { in: isPasswordFormActive, timeout: { enter: 1e3, exit: 1e3 }, children: /* @__PURE__ */ jsxs(FormControl, { fullWidth: true, children: [
              /* @__PURE__ */ jsx(
                TextField,
                {
                  variant: "standard",
                  label: "Old password",
                  sx: { mr: 4 },
                  type: "password",
                  ...register("oldPassword", { validate: passwordValidator })
                }
              ),
              /* @__PURE__ */ jsx(FormHelperText, { error: !!errors.oldPassword, children: (_b = errors.oldPassword) == null ? void 0 : _b.message })
            ] }) }),
            /* @__PURE__ */ jsx(Grow, { in: isPasswordFormActive, timeout: { enter: 2e3 }, children: /* @__PURE__ */ jsxs(Box, { mt: 2, children: [
              /* @__PURE__ */ jsx(Button, { type: "submit", children: "Change password" }),
              /* @__PURE__ */ jsx(Button, { color: "error", onClick: () => {
                reset();
                setIsPasswordFormActive(false);
              }, children: "Cancel" })
            ] }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Stack, { direction: "row", gap: 5, alignItems: "flex-end" })
  ] });
};
const routeObj = createRoutesFromElements(
  /* @__PURE__ */ jsxs(Route, { element: /* @__PURE__ */ jsx(DefaultUI, {}), path: "/", children: [
    /* @__PURE__ */ jsxs(Route, { element: /* @__PURE__ */ jsx(AuthCheckingRoutes, {}), children: [
      /* @__PURE__ */ jsx(Route, { element: /* @__PURE__ */ jsx(Index, {}), index: true }),
      /* @__PURE__ */ jsx(Route, { element: /* @__PURE__ */ jsx(LogIn, {}), path: "/login" }),
      /* @__PURE__ */ jsx(Route, { element: /* @__PURE__ */ jsx(SignUp, {}), path: "/signup" }),
      /* @__PURE__ */ jsxs(Route, { element: /* @__PURE__ */ jsx(ProtectedRoutes, {}), children: [
        /* @__PURE__ */ jsx(Route, { element: /* @__PURE__ */ jsx(Profile, {}), path: "/profile" }),
        /* @__PURE__ */ jsx(Route, { element: /* @__PURE__ */ jsx(User, {}), path: "/user/:userId" }),
        /* @__PURE__ */ jsx(Route, { element: /* @__PURE__ */ jsx(Secret, {}), path: "/secret/:secretId" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Route, { path: "/fb_scraper/secret/:secretId", element: /* @__PURE__ */ jsx(FB_Secret, {}), loader })
  ] })
);
injectStore(store);
async function render(req, res) {
  const { query, dataRoutes } = createStaticHandler(routeObj);
  const fetchRequest = createFetchRequest(req, res);
  const context = await query(fetchRequest);
  if (context instanceof Response) {
    throw context;
  }
  const router = createStaticRouter(dataRoutes, context);
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
  const appHtml = renderToString(
    /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsx(CacheProvider, { value: cache, children: /* @__PURE__ */ jsxs(ThemeProvider, { theme: appTheme, children: [
      /* @__PURE__ */ jsx(CssBaseline, {}),
      /* @__PURE__ */ jsx(
        StaticRouterProvider,
        {
          router,
          context
        }
      )
    ] }) }) })
  );
  const emotionChunks = extractCriticalToChunks(appHtml);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);
  return { appHtml, emotionCss };
}
export {
  render
};
