import React from 'react';
import './index.scss';
import {Header} from "./components/Header";
import {Home} from "./pages/Home";
import {Routes, Route} from "react-router-dom";
import {Login} from "./pages/Login";
import {Registration} from "./pages/Register";
import {AddPost} from "./pages/AddPost";

function App() {

  return (
      <>
          <Header />
          <div maxWidth="lg">
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Registration />} />
                  <Route path="/posts/create" element={<AddPost />} />
              </Routes>
          </div>
      </>
  );
}

export default App;