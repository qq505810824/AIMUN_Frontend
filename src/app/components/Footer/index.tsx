import { Globe2, Mail, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-gray-100 bg-white">
            <div className="hidden max-w-7xl route-container py-10 grid md:grid-cols-3 gap-8 text-sm text-gray-600">
                <div>
                    <div className="flex items-center gap-2 font-semibold">
                        <Globe2 className="h-5 w-5 text-blue-600" />
                        AIAIMUN
                    </div>
                    {/* <p className="mt-3">
                        Elevating English learning with cutting-edge AI for classrooms.
                    </p> */}
                </div>
                <div>
                    <div className="font-semibold">Quick Links</div>
                    <div className="mt-3 flex flex-col">
                        <a className="hover:text-blue-600" href="/">
                            Home
                        </a>
                        <a className="hover:text-blue-600" href="/about">
                            About
                        </a>
                        <a className="hover:text-blue-600" href="/platform">
                            Platform
                        </a>
                        {/* <a className="hover:text-blue-600" href="/technology">Technology</a> */}
                        {/* <a className="hover:text-blue-600" href="/gallery">Gallery</a> */}
                        <a className="hover:text-blue-600" href="/contact">
                            Contact
                        </a>
                    </div>
                </div>
                <div>
                    <div className="font-semibold">Contact</div>
                    <p className="mt-3 flex items-center gap-2">
                        <Mail className="h-4 w-4" />  aimun@moimun.org
                    </p>
                    <p className="mt-1 flex items-center gap-2">
                        <Phone className="h-4 w-4" /> +853 66870988
                    </p>
                    <p className="mt-1 flex items-center gap-2">
                        WhatsApp: +852 44106234
                    </p>
                </div>
            </div>
            <div className="text-center text-xs text-gray-500 py-8">
                © {new Date().getFullYear()} AIMUN
            </div>
        </footer>
    );
}
