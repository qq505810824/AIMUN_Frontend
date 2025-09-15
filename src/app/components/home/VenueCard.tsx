export default function VenueCard({
    title,
    subtitle,
    img
}: {
    title: string;
    subtitle: string;
    img: string;
}) {
    return (
        <div className="overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm">
            <img src={img} alt={title} className="h-48 w-full object-cover" />
            <div className="p-5">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-slate-600">{subtitle}</p>
            </div>
        </div>
    );
}
