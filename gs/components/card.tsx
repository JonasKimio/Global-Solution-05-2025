"use client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: number;
  imageSrc: string;
  title: string;
  description: string;
};

export default function Card({ id, imageSrc, title, description }: Props) {
  return (
    <Link href={`/info/${id}`} className="w-[30%] bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform">
      <Image
        src={imageSrc}
        alt={title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
        priority
      />
      <div className="p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </Link>
  );
}
