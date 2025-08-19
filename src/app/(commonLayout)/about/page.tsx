'use client';
import { Shield, Sparkles } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    return (
        <>
            <main className="route-container pt-16 pb-24">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h1 className="text-4xl font-extrabold">About AI English</h1>
                        <p className="mt-4 text-gray-700">
                            AI English unifies writing, reading, and speaking development under one intelligent system.
                            Built for scalability—from a single class to an entire district.
                        </p>
                        <div className="mt-8 grid sm:grid-cols-2 gap-4">
                            <div className="card">
                                <Sparkles className="h-6 w-6 text-blue-600" />
                                <div className="mt-2 font-semibold">Cutting-Edge AI</div>
                                <div className="text-gray-600 text-sm">
                                    Modern language models & speech analysis deliver instant, explainable feedback.
                                </div>
                            </div>
                            <div className="card">
                                <Shield className="h-6 w-6 text-blue-600" />
                                <div className="mt-2 font-semibold">Built for Schools</div>
                                <div className="text-gray-600 text-sm">
                                    Join codes, exportable reports, teacher-controlled scoring—fits your workflow.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200">
                        <Image
                            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop"
                            alt="Classroom using AI English"
                            width={1200}
                            height={900}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </main>
        </>
    );
}