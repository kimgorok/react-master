import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import ComingSoon from "./Routes/ComingSoon";
import Popular from "./Routes/Popular";
import NowPlaying from "./Routes/NowPlaying";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Popular />,
      },
      {
        path: "coming-soon",
        element: <ComingSoon />,
      },
      {
        path: "now-playing",
        element: <NowPlaying />,
      },
    ],
  },
]);
