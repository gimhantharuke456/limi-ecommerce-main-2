import React from "react";

export default function Layout({ children }) {
  return (
    <div>
      <div className="max-w-6xl mx-auto py-6 px-8 lg:px-0 ">{children}</div>
    </div>
  );
}
