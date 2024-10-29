import React from "react";
import { Header } from "../Header";
import { Menu } from "../Menu";
import { ClassForm } from "./ClassForm";
export function CreateClass() {
  return (
    <div>
      <Header />
      <div className="d-flex">
        <Menu />
        <ClassForm />
      </div>
    </div>
  );
}
