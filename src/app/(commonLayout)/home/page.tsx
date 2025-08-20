"use client";

import { ArrowRight, BookOpen, GraduationCap, Mic } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
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
            setErr(error?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main>

            {/* HERO */}
            <section className="max-w-7xl mx-auto px-4 pt-24 pb-16 grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                        Unlock the Future of Language Learning with{" "}
                        <span className="text-blue-600">AI English</span>
                    </h1>
                    <p className="mt-5 text-lg text-gray-600 max-w-xl">
                        A next-generation platform that streamlines teaching and supercharges
                        learning—combining AI grading, adaptive reading, and speech intelligence.
                    </p>
                    <div className="mt-8 flex gap-3">
                        <a href="https://aienglish.docai.net" className="px-5 py-3 rounded-2xl inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 shadow">
                            Get Started <ArrowRight className="h-4 w-4" />
                        </a>
                        <a href="#demo" className="px-5 py-3 rounded-2xl inline-flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50">
                            Book a Demo
                        </a>
                    </div>

                    {/* 3 value cards */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="h-6 w-6 text-blue-600" />
                                <div className="font-semibold">Teacher-first</div>
                            </div>
                            <div className="text-gray-600 mt-2">
                                Automated evaluation, exportable reports
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow">
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-6 w-6 text-blue-600" />
                                <div className="font-semibold">Learner-centric</div>
                            </div>
                            <div className="text-gray-600 mt-2">
                                Personalized practice & instant feedback
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow">
                            <div className="flex items-center gap-2">
                                <Mic className="h-6 w-6 text-blue-600" />
                                <div className="font-semibold">Future-proof</div>
                            </div>
                            <div className="text-gray-600 mt-2">
                                Unified writing, reading & speaking—built to evolve
                            </div>
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="relative">
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-gray-200">
                        <Image
                            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop"
                            alt="Students learning with technology"
                            width={1200}
                            height={900}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="hidden md:block absolute -bottom-10 -right-6 w-64 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                        <Image
                            src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop"
                            alt="Teacher dashboard preview"
                            width={800}
                            height={600}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* BOOK A DEMO */}
            <section id="demo" className="max-w-7xl mx-auto px-4 pb-24">
                <div className="rounded-3xl overflow-hidden border border-gray-200 shadow">
                    <Image
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop"
                        alt="Modern classroom"
                        width={1600}
                        height={1000}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="mt-10 grid lg:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-3xl font-bold">Book a Demo</h2>
                        <p className="mt-3 text-gray-600">
                            Tell us a bit about you and we’ll reach out to schedule a session.
                        </p>
                    </div>

                    <div>
                        {!sent ? (
                            <form onSubmit={onSubmit} className="grid gap-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input
                                        name="name"
                                        required
                                        placeholder="Full name"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="Email"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <input
                                        name="organization"
                                        placeholder="Organization"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        name="location"
                                        placeholder="Location"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <input
                                    name="whatsapp"
                                    placeholder="WhatsApp (Optional)"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <textarea
                                    name="message"
                                    rows={6}
                                    required
                                    placeholder="How can we help?"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                {err && (
                                    <div className="p-3 text-sm rounded-xl border border-red-200 bg-red-50 text-red-700">
                                        {err}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {loading ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        ) : (
                            <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
                                Thanks! Your message has been sent.
                            </div>
                        )}
                    </div>
                </div>
                {/* Note: Removed address/telephone lines beneath the form as requested */}
            </section>

        </main>
    );
}
