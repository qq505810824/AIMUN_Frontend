import { Globe2 } from 'lucide-react';
import Link from 'next/link';

export default function Nav() {
    return (
        <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-gray-100">
            <div className="max-w-7xl route-container flex items-center justify-between py-3">
                <Link href="/" className="flex items-center gap-2">
                    <Globe2 className="h-6 w-6 text-blue-600" />
                    <span className="font-bold">AI English</span>
                </Link>
                <nav className="flex items-center gap-1 text-sm">
                    <Link
                        className="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-gray-100"
                        href="/about"
                    >
                        About
                    </Link>
                    <Link
                        className="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-gray-100"
                        href="/platform"
                    >
                        Platform
                    </Link>
                    <Link
                        className="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-gray-100"
                        href="/technology"
                    >
                        Technology
                    </Link>
                    <Link
                        className="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-gray-100"
                        href="/gallery"
                    >
                        Gallery
                    </Link>
                    <Link
                        className="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-gray-100"
                        href="/contact"
                    >
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
}
