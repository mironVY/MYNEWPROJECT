import React from 'react';
import './index.scss';
import {Header} from "./components/Header";
import {Home} from "./pages/Home";
import {Routes, Route} from "react-router-dom";
import {Login} from "./pages/Login";
import {Registration} from "./pages/Register";
import {AddPost} from "./pages/AddPost";

function App() {
/*React Router это стандартная библиотека маршрутизации (routing) в React.
Он хранит интерфейс приложения синхронизированным с URL на браузере.
React Router позволяет вам маршрутизировать "поток данных" (data flow) в вашем приложении понятным способом.
Он подобен утверждению, если у вас есть данный URL, он будет подобен этому Route (маршруту), и интерфейс будет таким!*/
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