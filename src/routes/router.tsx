import { createBrowserRouter } from "react-router-dom";
import Welcome from "@/pages/Welcome";
import WordGame from "@/pages/WordGame";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/word-game/:sessionId",
    element: <WordGame />,
  },
]);

export default router;
