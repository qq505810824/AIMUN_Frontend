'use client';
import Image from "next/image";

const imgs = [
    "https://images.unsplash.com/photo-1555421689-43cad7100751?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop",
];

export default function GalleryPage() {
    return (
        <>
            <main className="route-container pt-16 pb-24">
                <h1 className="text-4xl font-extrabold">Gallery</h1>
                <p className="mt-3 text-gray-700">A glimpse of learning moments with AI English.</p>

                <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {imgs.map((src, i) => (
                        <div key={i} className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                            <Image src={src} alt={`Gallery ${i + 1}`} width={1200} height={800} className="w-full h-60 object-cover" />
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}