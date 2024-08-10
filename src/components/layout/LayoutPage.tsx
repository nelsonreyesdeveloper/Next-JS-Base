import React from "react";

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return <div className={`w-screen px-4`}>{children}</div>;
};

export default LayoutPage;
