import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { Dashboard } from "./Dashboard";

export function Homepage() {

  (function(){
    localStorage.setItem('active_index',JSON.stringify(1));
  })();

  return (
    <div>
      <Header />
      <div className="d-flex">
        <Menu />

        <Dashboard />
      </div>
    </div>
  );
}
