'use client';
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [sent, setSent] = useState(false);

    return (
        <>
            <main className="route-container pt-16 pb-24">
                <h1 className="text-4xl font-extrabold">Contact Us</h1>
                <p className="mt-3 text-gray-700">Let’s talk about bringing AI English to your school or organization.</p>

                {!sent ? (
                    <form
                        className="mt-8 grid gap-4 max-w-3xl"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setSent(true);
                        }}
                    >
                        <div className="grid md:grid-cols-2 gap-4">
                            <input placeholder="Full name" className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input placeholder="Email" type="email" className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <input placeholder="Organization" className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <textarea placeholder="How can we help?" rows={6} className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        <button type="submit" className="btn btn-primary">
                            <Mail className="h-4 w-4" /> Send Message
                        </button>
                        <div className="text-sm text-gray-500 mt-2 flex items-center gap-3">
                            <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> +853 •••• ••••</span>
                            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Macau</span>
                        </div>
                    </form>
                ) : (
                    <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl max-w-3xl">
                        Thanks! Your message has been recorded locally for this demo. Connect this form to an API/email service to receive submissions.
                    </div>
                )}
            </main>
        </>
    );
}