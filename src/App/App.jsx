import { Routes, Route } from "react-router-dom";
import pagesObject from "../Pages/pagesObject";
import "./App.scss";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<pagesObject.Home />} />
        <Route path="auth" element={<pagesObject.Auth />} />
        <Route path="/registration" element={<pagesObject.Register />} />
        <Route path="/login" element={<pagesObject.Login />} />
        <Route path="/profile" element={<pagesObject.Profile />} />
        <Route path="/profile/settings" element={<pagesObject.Settings />} />
        <Route path="/profile/favorite" element={<pagesObject.Favorite />} />
        <Route path="*" element={<pagesObject.Error />} />
        <Route path="/:token" element={<pagesObject.Tour />} />
      </Routes>
    </>
  );
}
