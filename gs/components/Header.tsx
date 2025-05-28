import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <header className="w-full bg-green-500 text-black flex items-center justify-evenly p-4">
      <Link href="/">
        <Image
          src="/public/imagens/Logo.png"
          alt="Logo da Global Solution"
          width={100}
          height={100}
          className="w-[100px] h-[100px] object-contain"
          style={{ width: '90px', height: '90px' }}
        />
      </Link>
      <nav>
        <ul className="flex space-x-6 list-none">
          <li>
            <Link href="/" className="text-black font-extrabold transition duration-300 hover:text-white">Home</Link>
          </li>
          <li>
            <Link href="/projeto" className="text-black font-extrabold transition duration-300 hover:text-white">Projeto</Link>
          </li>
          <li>
            <Link href="/listacontato" className="text-black font-extrabold transition duration-300 hover:text-white">Integrantes</Link>
          </li>
        </ul>
      </nav>
      <nav>
        <ul className="flex space-x-6 list-none">
          <li><Link href="/login" className="text-black font-extrabold transition duration-300 hover:text-white">Login</Link></li>
        </ul>
      </nav >
    </header >
  );
}
