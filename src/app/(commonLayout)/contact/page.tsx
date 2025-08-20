"use client";

import { Mail } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    async function onSubmit(e: any) {
        e.preventDefault();
        setLoading(true);
        setErr("");

        const form = new FormData(e.currentTarget);
        const payload = Object.fromEntries(form.entries());

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.error || "Failed to send message.");
            }
            setSent(true);
            e.currentTarget.reset();
        } catch (error: any) {
            setErr(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <main className="max-w-7xl mx-auto px-4 pt-16 pb-24">
                <h1 className="text-4xl font-extrabold">Contact Us</h1>
                <p className="mt-3 text-gray-700">
                    Tell us a bit about you and we’ll reach out to schedule a demo.
                </p>

                {!sent ? (
                    <form onSubmit={onSubmit} className="mt-8 grid gap-4 max-w-3xl">
                        <div className="grid md:grid-cols-2 gap-4">
                            <input name="name" required placeholder="Full name"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input name="email" type="email" required placeholder="Email"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <input name="organization" placeholder="Organization"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input name="location" placeholder="Location"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <input name="whatsapp" placeholder="WhatsApp (Optional)"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />

                        <textarea name="message" rows={6} required placeholder="What would you like to achieve with AI English?"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

                        {err && <div className="p-3 text-sm rounded-xl border border-red-200 bg-red-50 text-red-700">{err}</div>}

                        <button type="submit" disabled={loading}
                            className="inline-flex items-center gap-2 justify-center px-6 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
                            <Mail className="h-4 w-4" /> {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                ) : (
                    <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl max-w-3xl">
                        Thanks! Your message has been sent.
                    </div>
                )}
            </main>
        </>
    );
}
