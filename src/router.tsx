import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./screens/Home";
import About from "./screens/About";
import AuthorDetail from "./screens/users/AuthorDetail";
import BookChapters from "./screens/users/BookChapters";
import BookCharacters from "./screens/users/BookCharacters";
import BookDetail from "./screens/users/BookDetail";

const router = createBrowserRouter([
  {
    // 실행 시 Root가 처음 render되어 화면에 표시 됨
    path: "/",
    element: <Root />,
    children: [
      {
        // Home. 기본적인 링크이므로 path가 비어있다
        // Display a list of all authors.
        path: "",
        element: <Home />,
      },
      {
        // 기본 링크에 /about을 하여 About 컴포넌트로 이동
        // Show an about page.
        path: "about",
        element: <About />,
      },
      {
        // 여기까지 기본 화면에 보이는 컴포넌트
        // Display a list of the books written by the author.
        path: "author/:name",
        element: <AuthorDetail />,
        children: [
          {
            // AuthorDetail의 자식 컴포넌트로, Outlet으로 render됨
            // Display the book detail.
            path: "/author/:name/:book",
            element: <BookDetail />,
            children: [
              // BookDetail의 자식 컴포넌트로, Outlet으로 render됨
              {
                // Display a list of chapters of the book.
                path: "chapters",
                element: <BookChapters />,
              },
              {
                // Display a list of characters of the book.
                path: "characters",
                element: <BookCharacters />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
