'use client';
import { ArrowRight, BookOpen, GraduationCap, Mic } from "lucide-react";
import Image from "next/image";

function Strengths() {
    return (
        <section className="py-16">
            <div className="route-container">
                <h2 className="text-3xl font-bold text-center">
                    Why Schools Choose <span className="text-blue-600">AI English</span>
                </h2>
                <p className="mt-3 text-center text-gray-600 max-w-3xl mx-auto">
                    Designed with educators—AI English reduces admin load, amplifies feedback quality, and builds student confidence.
                </p>
                <div className="mt-10 grid md:grid-cols-3 gap-6">
                    <div className="card">
                        <GraduationCap className="h-9 w-9 text-blue-600" />
                        <h3 className="mt-4 font-semibold text-lg">Teacher Empowerment</h3>
                        <p className="text-gray-600 mt-2">
                            Automate evaluations and export to XLSX—so teachers focus on coaching, not clerical work.
                        </p>
                    </div>
                    <div className="card">
                        <BookOpen className="h-9 w-9 text-blue-600" />
                        <h3 className="mt-4 font-semibold text-lg">Personalized Mastery</h3>
                        <p className="text-gray-600 mt-2">
                            AI turns common mistakes into targeted practice so every learner gets what they need next.
                        </p>
                    </div>
                    <div className="card">
                        <Mic className="h-9 w-9 text-blue-600" />
                        <h3 className="mt-4 font-semibold text-lg">Confident Speaking</h3>
                        <p className="text-gray-600 mt-2">
                            Speech intelligence evaluates fluency, coherence, and pronunciation for real-world skills.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

const Home = () => {
    return (
        <>
            <main>
                <section className="route-container pt-24 pb-16 grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                            Unlock the Future of English Learning with{" "}
                            <span className="text-blue-600">AI English</span>
                        </h1>
                        <p className="mt-5 text-lg text-gray-600 max-w-xl">
                            A next-generation platform that streamlines teaching and supercharges learning—combining AI grading, adaptive reading, and speech intelligence.
                        </p>
                        <div className="mt-8 flex gap-3">
                            <a href="https://aienglish.docai.net" className="btn btn-primary">
                                Get Started <ArrowRight className="h-4 w-4" />
                            </a>
                            <a href="/platform" className="btn btn-ghost">Explore Platform</a>
                        </div>
                        <div className="mt-8 grid grid-cols-3 gap-6 text-sm">
                            <div className="card">
                                <div className="font-semibold">Teacher-first</div>
                                <div className="text-gray-600">Automated evaluation, exportable reports</div>
                            </div>
                            <div className="card">
                                <div className="font-semibold">Learner-centric</div>
                                <div className="text-gray-600">Personalized practice & instant feedback</div>
                            </div>
                            <div className="card">
                                <div className="font-semibold">All-in-one</div>
                                <div className="text-gray-600">Writing • Reading • Speaking</div>
                            </div>
                        </div>
                    </div>

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

                <Strengths />

                <section className="route-container pb-24">
                    <div className="rounded-3xl overflow-hidden border border-gray-200 shadow">
                        <Image
                            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop"
                            alt="Modern classroom"
                            width={1600}
                            height={1000}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <a href="/contact" className="btn btn-primary">Book a Demo <ArrowRight className="h-4 w-4" /></a>
                        <span className="text-gray-500 text-sm">Trusted by educators and learners</span>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Home;
