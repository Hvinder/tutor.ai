import { RouterProvider } from "react-router-dom";
import MessageHistoryContext from "./context/MessageHistory";
import router from "./routes/router";
import React from "react";
import { Message } from "./types/Message";

function reducer(state: Message[], action: { type: string; payload: Message }) {
  switch (action.type) {
    case "addToHistory": {
      return [...state, action.payload];
    }
    default: {
      return [...state];
    }
  }
}

function App() {
  const [messageHistory, dispatch] = React.useReducer(reducer, []);

  return (
    <MessageHistoryContext.Provider value={{ state: messageHistory, dispatch }}>
      <RouterProvider router={router} />
    </MessageHistoryContext.Provider>
  );
}

export default App;
