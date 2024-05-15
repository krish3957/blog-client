import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import NewBlog from "./pages/newBlog";
import Login from "./pages/login";
import Register from "./pages/register";
import { useSelector } from "react-redux";
import Home from "./pages/home";
import Blog from "./pages/blog";
import Profile from "./pages/profile";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div className="p-0">
      <Navbar />
      <Router>
        <Routes>
          <Route element={user ? <NewBlog /> : <Login />} path="/new" />
          <Route element={user ? <Home /> : <Login />} path="/login" />
          <Route element={user ? <Home /> : <Register />} path="/register" />
          <Route element={<Blog />} path="/blog/:id" />
          <Route element={<Home />} path="/" />
          <Route element={user ? <Profile /> : <Login />} path="/profile/:id" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
