import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import ComingSoon from "./Routes/ComingSoon";
import Popular, { BigMovie } from "./Routes/Popular";
import NowPlaying from "./Routes/NowPlaying";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Popular />,
        children: [
          {
            path: "/popular/:id",
            element: <Popular />,
          },
        ],
      },
      {
        path: "coming-soon",
        element: <ComingSoon />,
        children: [
          {
            path: "/coming-soon/:id",
            element: <ComingSoon />,
          },
        ],
      },
      {
        path: "now-playing",
        element: <NowPlaying />,
        children: [
          {
            path: "/now-playing/:id",
            element: <NowPlaying />,
          },
        ],
      },
    ],
  },
]);
