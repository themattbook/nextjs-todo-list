import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props) {
  const { children } = props;
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <main className="flex-1 flex flex-col bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
