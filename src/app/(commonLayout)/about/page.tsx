import { ShieldCheck, Sparkles, Users2 } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    return (
        <>
            <main className="max-w-7xl mx-auto px-4 pt-16 pb-24">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h1 className="text-4xl font-extrabold">About AI English</h1>
                        <p className="mt-5 text-gray-700 leading-relaxed">
                            AI English was founded by a team of <strong>industry experts</strong> across education,
                            assessment design, and applied AI. Our mission is simple: help learners achieve
                            measurable progress with modern tools that feel effortless to use.
                        </p>
                        <p className="mt-4 text-gray-700 leading-relaxed">
                            The platform is designed to align naturally with <strong>IELTS</strong> and other
                            public examinations. Instead of “test-prep tricks,” we focus on the deeper capabilities
                            that high-stakes exams actually measure—coherence, accuracy, range, and task completion—
                            while keeping teachers fully in control of pedagogy and standards.
                        </p>

                        <div className="mt-8 grid sm:grid-cols-3 gap-4">
                            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                                <Users2 className="h-6 w-6 text-blue-600" />
                                <div className="mt-2 font-semibold">Expert-Built</div>
                                <div className="text-gray-600 text-sm">
                                    Co-created with senior educators, exam raters, and AI practitioners.
                                </div>
                            </div>
                            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                                <Sparkles className="h-6 w-6 text-blue-600" />
                                <div className="mt-2 font-semibold">Outcomes-Focused</div>
                                <div className="text-gray-600 text-sm">
                                    Structured for measurable improvement on real exam criteria.
                                </div>
                            </div>
                            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                                <ShieldCheck className="h-6 w-6 text-blue-600" />
                                <div className="mt-2 font-semibold">School-Ready</div>
                                <div className="text-gray-600 text-sm">
                                    Robust controls, exportable reports, and privacy-first design.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200">
                        <Image
                            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop"
                            alt="Educators collaborating with AI English"
                            width={1200}
                            height={900}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <section className="mt-14 grid md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                        <div className="font-semibold">Aligned with Real-World English</div>
                        <p className="mt-2 text-sm text-blue-900">
                            Emphasizes communicative competence and academic literacy relevant to IELTS and public exams.
                        </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                        <div className="font-semibold">Designed with Educators</div>
                        <p className="mt-2 text-sm text-blue-900">
                            Efficient classroom workflows, transparent evaluation, and flexible oversight.
                        </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                        <div className="font-semibold">Powered by Applied AI</div>
                        <p className="mt-2 text-sm text-blue-900">
                            Feedback that is fast, consistent, and explainable—without dictating pedagogy.
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}
