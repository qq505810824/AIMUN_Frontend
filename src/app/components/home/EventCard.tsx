export default function EventCard({
    img,
    tag,
    title,
    desc,
    onClick
}: {
    img: string;
    tag: string;
    title: string;
    desc: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="text-left group overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm"
        >
            <div className="relative">
                <img
                    src={img}
                    alt={title}
                    className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-slate-900/90 text-white px-3 py-1 text-xs">
                    {tag}
                </div>
            </div>
            <div className="p-5">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-slate-600 text-sm">{desc}</p>
                <span className="mt-3 inline-block text-blue-700 text-sm">Learn more →</span>
            </div>
        </button>
    );
}
