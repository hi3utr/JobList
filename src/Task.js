import React from "react";
import TableList from "./TableList";
import { NavBar } from "./NavBar";
export const Task = () => {
  return (
    <div
      className="App h-[100vh]"
      style={{
        background:
          "url('https://img.freepik.com/free-vector/white-abstract-background-design_23-2148825582.jpg?w=996&t=st=1664858906~exp=1664859506~hmac=e6c35fd5426cac94358be6f2e4012e85beed75932850fc744190441d1695387d')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <NavBar />
      <TableList />
    </div>
  );
};
