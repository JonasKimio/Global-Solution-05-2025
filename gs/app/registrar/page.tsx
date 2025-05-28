import Link from "next/link";
function Page() {
    return (
        <div className="flex items-center justify-center">
            <div className="bg-white border-4 border-gray-300 rounded-lg p-6 w-full max-w-2xl text-center mt-6 mb-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-900">Registrar</h1>
                <div className="justify-center space-x-4 mb-6">
                    <nav className="flex justify-center space-x-6 mb-6">
                        <ul>
                            <li className="flex justify-center space-x-4 mb-6">
                                <label className="justify-left">Nome:</label>
                            </li>
                            <li className="flex justify-center space-x-4 mb-6">
                                <label className="justify-left">Email:</label>
                            </li>
                            <li className="flex justify-center space-x-4 mb-6">
                                <label className="justify-left">Senha:</label>
                            </li>
                            <li className="flex justify-center space-x-4 mb-6">
                                <label className="justify-left">Confirme Senha:</label>
                            </li>
                        </ul>
                        <ul>
                            <li className="flex justify-center space-x-4 mb-4">
                                <input className="bg-white border-4 border-gray-300 rounded-lg" type="text" placeholder="" name="" /></li>
                            <li className="flex justify-center space-x-4 mb-4">
                                <input className="bg-white border-4 border-gray-300 rounded-lg" type="text" placeholder="" name="" /></li>
                            <li className="flex justify-center space-x-4 mb-4">
                                <input className="bg-white border-4 border-gray-300 rounded-lg" type="password" placeholder="" name="" /></li>
                            <li className="flex justify-center space-x-4 mb-4">
                                <input className="bg-white border-4 border-gray-300 rounded-lg" type="password" placeholder="" name="" /></li>
                        </ul>
                    </nav>
                </div>
                <div className="flex justify-center space-x-4 mb-6">
                    <Link href="/" className="inline-block py-2 px-4 bg-blue-600 text-white text-sm border-2 border-blue-600 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300">Voltar</Link>
                    <Link href="/login" className="inline-block py-2 px-4 bg-blue-600 text-white text-sm border-2 border-blue-600 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300">Realizar Login</Link>
                    <button className="inline-block py-2 px-4 bg-blue-600 text-white text-sm border-2 border-blue-600 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300" type="submit">Registrar</button>
                </div>
            </div>
        </div>
    );
}

export default Page;
