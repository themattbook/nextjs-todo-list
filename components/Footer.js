import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="flex flex-col items-center justify-between p-4 sm:flex-row text-white bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700">
        <div className="flex mx-auto">
          <Link href="https://github.com/themattbook" passHref>
          <a href="#" className="mx-2 text-sm sm:text-base" aria-label="Github" target="_blank">
            <i className="fa-brands fa-github sm:mr-1"></i> <span className="font-light tracking-tight">Made with love by Matthew Sweet</span>
          </a>
          </Link>
        </div>
      </footer>
    </>
  );
}
