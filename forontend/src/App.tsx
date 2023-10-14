import { Routes, Route } from "react-router-dom";
import Album from "./pages/Album";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { PrivateWrapper } from "./utils/protectedRoute";
function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateWrapper>
              <Home />
            </PrivateWrapper>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/album/:id"
          element={
            <PrivateWrapper>
              <Album />
            </PrivateWrapper>
          }
        ></Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
