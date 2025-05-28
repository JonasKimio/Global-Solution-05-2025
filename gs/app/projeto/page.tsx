export default function Page() {
  return (
        <section className="min-h-screen bg-cover bg-center h-[400px] flex flex-col items-center justify-center text-white"
                 style={{ backgroundImage: "public/image/Banner.jpg" }}>
          <h1 className="text-5xl text-[#9afcff] drop-shadow-md">(Projeto)</h1>
          <p className="text-xl my-4 drop-shadow-md">(Descrição do Projeto)</p>
        </section>
  );
}