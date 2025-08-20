'use client';
import { Cpu, Mic, Shield } from 'lucide-react';
import Image from 'next/image';

export default function TechnologyPage() {
    return (
        <>
            <main className="route-container pt-16 pb-24">
                <h1 className="text-4xl font-extrabold">Technology that Scales Learning</h1>
                <p className="mt-3 text-gray-700 max-w-3xl">
                    AI English blends state-of-the-art language models, speech analysis, and
                    assessment design into a secure, school-ready platform—delivering reliable,
                    explainable feedback in seconds.
                </p>

                <div className="mt-10 grid md:grid-cols-3 gap-6">
                    <div className="card">
                        <Cpu className="h-8 w-8 text-blue-600" />
                        <div className="mt-3 font-semibold">Advanced Language Intelligence</div>
                        <div className="text-gray-600 text-sm mt-1">
                            Understands learner input and maps it to clear, actionable feedback.
                        </div>
                    </div>
                    <div className="card">
                        <Mic className="h-8 w-8 text-blue-600" />
                        <div className="mt-3 font-semibold">Speech & Pronunciation Analytics</div>
                        <div className="text-gray-600 text-sm mt-1">
                            Evaluates fluency, coherence, and pronunciation with configurable
                            thresholds.
                        </div>
                    </div>
                    <div className="card">
                        <Shield className="h-8 w-8 text-blue-600" />
                        <div className="mt-3 font-semibold">Educator Controls</div>
                        <div className="text-gray-600 text-sm mt-1">
                            Manual score release, join codes, and XLSX export provide oversight
                            without friction.
                        </div>
                    </div>
                </div>

                <div className="mt-12 rounded-3xl overflow-hidden border border-gray-200 shadow">
                    <Image
                        src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop"
                        alt="Cutting edge technology"
                        width={1600}
                        height={900}
                        className="w-full h-full object-cover"
                    />
                </div>
            </main>
        </>
    );
}
