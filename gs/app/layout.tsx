import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <title>Saving Foods</title>
      </head>
      <body className="bg-blue-500 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
