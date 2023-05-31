import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

// 헤더가 항상 위에 표시되도록 Header 아래에 Outlet컴포넌트를 넣음
// Outlet컴포넌트는 그 화면의 자식들을 render 함

function Root() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Root;
