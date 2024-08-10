import React from "react";
import Footer from "../components/custom/Footer";
import Header from "../components/custom/Header";
import { Metadata } from "next";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={" leading-normal tracking-normal gradient"}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
