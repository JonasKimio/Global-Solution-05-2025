"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-[#32997f] dark:bg-[#110e24] text-white pt-[100px]">
    <header className="bg-[#278069] text-[#9afcff] fixed top-0 w-full h-24 flex items-center justify-evenly">
        <Image
          src="/public/images/Logo.png"
          alt="Logo (Projeto)"
          width={100}
          height={100}
          className="w-[100px] h-[100px] object-contain"
          style={{ width: '90px', height: '90px' }}
        />
      <h1 className="text-4xl font-bold">(Projeto)</h1>
      <nav>
        <ul className="flex space-x-8">
          <li>
            <Link href="/" className="hover:text-white font-bold">
            Home
            </Link>
          </li>
            <li>
            <Link href="/projeto" className="hover:text-white font-bold">
            Projeto
            </Link>
          </li>
          <li>
            <Link href="/Listacontato" className="hover:text-white font-bold">
            Participantes
            </Link>
          </li>
        </ul>
      </nav>
    </header>
    </div>
  );
}
