import { Globe2, Mail, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-gray-100 bg-white">
            <div className="max-w-7xl route-container py-10 grid md:grid-cols-3 gap-8 text-sm text-gray-600">
                <div>
                    <div className="flex items-center gap-2 font-semibold">
                        <Globe2 className="h-5 w-5 text-blue-600" />
                        AI English
                    </div>
                    <p className="mt-3">
                        Elevating English learning with cutting-edge AI for classrooms and self-study.
                    </p>
                </div>
                <div>
                    <div className="font-semibold">Quick Links</div>
                    <div className="mt-3 flex flex-col">
                        <a className="hover:text-blue-600" href="/platform">Platform</a>
                        <a className="hover:text-blue-600" href="/technology">Technology</a>
                        <a className="hover:text-blue-600" href="/gallery">Gallery</a>
                        <a className="hover:text-blue-600" href="/contact">Contact</a>
                    </div>
                </div>
                <div>
                    <div className="font-semibold">Contact</div>
                    <p className="mt-3 flex items-center gap-2">
                        <Mail className="h-4 w-4" /> info@hospidocai.com
                    </p>
                    <p className="mt-1 flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> AVENIDA DR MÁRIO SOARES NO 25 EDIF MONTEPIO 5 PISO 47, Macau
                    </p>
                </div>
            </div>
            <div className="text-center text-xs text-gray-500 pb-8">
                © {new Date().getFullYear()} HOSPIDOC Artificial Intelligence Technology Limited
            </div>
        </footer>
    );
}