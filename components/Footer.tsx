import React from "react";
import { Github, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full  text-gray-400 py-6 border-t border-gray-800 flex flex-col items-center justify-center space-y-3 mt-6">
      <p className="text-sm md:text-base">
        Developed by{" "}
        <span className="text-white font-semibold">Gyanaranjan Patra</span>
      </p>
      <div className="flex space-x-5">
        <a
          href="https://github.com/gyannnnn"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#ff4655] transition-colors"
        >
          <Github size={22} />
        </a>
        <a
          href="https://linkedin.com/in/higyan"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#ff4655] transition-colors"
        >
          <Linkedin size={22} />
        </a>
        <a
          href="https://instagram.com/gyanpatra.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#ff4655] transition-colors"
        >
          <Instagram size={22} />
        </a>
      </div>
    </footer>
  );
}
