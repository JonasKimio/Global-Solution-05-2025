"use client";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="fixed top-0 z-10 w-full min-h-[100px] bg-[#278069] text-[#9afcff] flex items-center justify-evenly flex-wrap">
      <a href="#"><img src="img/Logo.png" alt="Logo do EcoCalc" className="w-[50px]" /></a>
      <h1 className="text-4xl">EcoCalc</h1>
      <nav>
        <ul className="flex">
          {/* Mobile */}
          <div className="block md:hidden">
            <li>
              <button onClick={toggleTheme} className="text-[#9afcff] font-bold">Menu</button>
            </li>
          </div>
          {/* Desktop */}
          <div className="hidden md:flex">
            <li className="mx-4"><a href="index.html" className="hover:text-white">Home</a></li>
            <li className="mx-4"><a href="calculadora.html" className="hover:text-white">Calculadora</a></li>
            <li className="mx-4"><a href="integrantes.html" className="hover:text-white">Participantes</a></li>
            <li className="mx-4">
              <button onClick={toggleTheme} className="hover:text-white text-[#9afcff] font-bold">Mudar Tema</button>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
