import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Book from "./components/getBooks/Book";
import BookAddPage from "./components/addBooks/BookAddPage";
import BookUpdatePage from "./components/updateBooks/BookUpdatePage";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Book />,
    },
    {
      path: "/add",
      element: <BookAddPage />,
    },
    {
      path: "/edit/:id",
      element: <BookUpdatePage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  );
}

export default App;
