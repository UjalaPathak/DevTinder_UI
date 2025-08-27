import "./App.css";
import { Body } from "./Components/Body";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Components/Login";
import { Profile } from "./Components/Profile";

import { Provider } from "react-redux";
import { store } from "./utils/store";
import Feed from "./Components/Feed";
import Connection from "./Components/Connection";
import Request from "./Components/Request";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connection" element={<Connection />} />
            <Route path="/request" element={<Request />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
