'use client'

export const Section = ({ children }: { children: React.ReactNode }) => (
    <div className="mx-auto max-w-6xl px-4 py-10">{children}</div>
)

export const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`rounded-2xl shadow bg-white p-6 ${className}`}>{children}</div>
)

export const PhotoGrid = ({ images = [] }: { images?: string[] }) => (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
            <img
                key={src + i}
                src={src}
                alt={`AIMUN photo ${i + 1}`}
                className="w-full h-56 object-cover rounded-xl shadow-sm"
                loading={i > 2 ? 'lazy' : undefined}
            />
        ))}
    </div>
)