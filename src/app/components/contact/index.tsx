'use client';
import { LangKey } from '@/app/(commonLayout)/home/page';
import { Mail } from 'lucide-react';
import { useState } from 'react';

interface ViewProps {
    T: any;
    lang: LangKey;
}


export const Contact = ({
    T,
    lang
}: ViewProps) => {
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');

    async function onSubmit(e: any) {
        e.preventDefault();
        setLoading(true);
        setErr('');

        const form = new FormData(e.currentTarget);
        const payload = Object.fromEntries(form.entries());

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.error || 'Failed to send message.');
            }
            setSent(true);
            e.currentTarget.reset();
        } catch (error: any) {
            setErr(error.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    }
    return (
        <main className="mx-auto max-w-7xl px-4 py-12">
            <h2 className="text-2xl md:text-3xl font-extrabold">{T.nav.contact}</h2>
            <div className="mt-4 grid md:grid-cols-2 gap-6">
                <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
                    <dl className="space-y-2 text-slate-700">
                        <div>
                            <dt className="font-semibold">Email</dt>
                            <dd>aimun@moimun.org</dd>
                        </div>
                        <div>
                            <dt className="font-semibold">WhatsApp</dt>
                            <dd>+852 4410 6234</dd>
                        </div>
                        <div>
                            <dt className="font-semibold">Phone</dt>
                            <dd>+853 6687 0988</dd>
                        </div>
                    </dl>
                </div>
                <div className="overflow-hidden rounded-2xl bg-white border p-4 border-slate-200 shadow-sm">
                    <h1 className="text-2xl font-extrabold">Contact Us</h1>
                    {/* <p className="mt-2 text-gray-700">
                        Tell us a bit about you and we’ll reach out to schedule a demo.
                    </p> */}
                    {!sent ? (
                        <form onSubmit={onSubmit} className="mt-8 grid gap-4 max-w-3xl">
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
                                placeholder="Content"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>

                            {err && (
                                <div className="p-3 text-sm rounded-xl border border-red-200 bg-red-50 text-red-700">
                                    {err}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center gap-2 justify-center px-6 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                <Mail className="h-4 w-4" />{' '}
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    ) : (
                        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl max-w-3xl">
                            Thanks! Your message has been sent.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
