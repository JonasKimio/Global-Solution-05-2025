import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <header className="w-full bg-white text-black flex items-center justify-evenly p-4">
      <Link href="/">
        <Image
          src="/public/images/Logo1.png"
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
            <Link href="/" className="text-black font-extrabold transition duration-300 hover:text-gray-400">Home</Link>
          </li>
          <li>
            <Link href="/Listacontato" className="text-black font-extrabold transition duration-300 hover:text-gray-400">Integrantes</Link>
          </li>
        </ul>
      </nav>
      <nav>
        <ul className="flex space-x-6 list-none">
          <li><Link href="/login" className="text-black font-extrabold transition duration-300 hover:text-gray-400">Login</Link></li>
            <p> / </p>
          <li><Link href="/cadastrar" className="text-black font-extrabold transition duration-300 hover:text-gray-400">Registrar</Link></li>
        </ul>
      </nav >
    </header >
  );
}
