import { Layers, LineChart, Lock, SlidersHorizontal, Workflow } from "lucide-react";
import Image from "next/image";

export default function PlatformPage() {
    return (
        <>
            <main className="max-w-7xl mx-auto px-4 pt-16 pb-24">
                <header className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-4xl font-extrabold">The Platform</h1>
                        <p className="mt-4 text-gray-700 leading-relaxed">
                            AI English is an <strong>end-to-end learning and assessment engine</strong> for modern
                            classrooms. Instead of isolating skills, it orchestrates tasks, feedback, and review
                            loops into a single, coherent flow—so learners build competence efficiently and schools
                            keep full control of rigor and standards.
                        </p>
                    </div>
                    <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200">
                        <Image
                            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop"
                            alt="Platform overview"
                            width={1600}
                            height={900}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </header>

                {/* Functional pillars (abstract, “functions-looking”) */}
                <section className="mt-14 grid lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <Layers className="h-7 w-7 text-blue-600" />
                        <div className="mt-3 font-semibold text-lg">Assignment Orchestration</div>
                        <p className="mt-2 text-gray-700">
                            Create structured tasks with consistent criteria and outcomes. Configure join codes, timing,
                            and release rules. Learners engage through a unified task flow that minimizes friction.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <SlidersHorizontal className="h-7 w-7 text-blue-600" />
                        <div className="mt-3 font-semibold text-lg">Adaptive Guidance</div>
                        <p className="mt-2 text-gray-700">
                            AI calibrates challenge dynamically and surfaces next-best actions—remediation,
                            extension, and exam-aligned drills—so effort constantly maps to meaningful gains.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <LineChart className="h-7 w-7 text-blue-600" />
                        <div className="mt-3 font-semibold text-lg">Assessment Intelligence</div>
                        <p className="mt-2 text-gray-700">
                            Consistent, explainable evaluation with teacher oversight. Export results,
                            monitor trends, and align with institution rubrics and public exam standards.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <Workflow className="h-7 w-7 text-blue-600" />
                        <div className="mt-3 font-semibold text-lg">Feedback & Review Loops</div>
                        <p className="mt-2 text-gray-700">
                            Learners receive targeted, actionable guidance and exemplars. Iteration is built-in,
                            encouraging refinement rather than one-off submissions.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm lg:col-span-2">
                        <Lock className="h-7 w-7 text-blue-600" />
                        <div className="mt-3 font-semibold text-lg">School-Grade Controls</div>
                        <p className="mt-2 text-gray-700">
                            Admin-friendly guardrails: manual score release, data export, and auditability—privacy-first
                            by design. Integrates cleanly with existing classroom workflows and reporting.
                        </p>
                    </div>
                </section>

                {/* Extended narrative to make the page longer & more “enterprise” */}
                <section className="mt-14 grid md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                        <div className="font-semibold">Exam-Ready by Design</div>
                        <p className="mt-2 text-sm text-blue-900">
                            Tasks and feedback map to public exam constructs (e.g., IELTS) without reducing learning to shortcuts.
                        </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                        <div className="font-semibold">Evidence-Based Progress</div>
                        <p className="mt-2 text-sm text-blue-900">
                            Cohort and individual insights show where learning moves—and where to intervene.
                        </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                        <div className="font-semibold">Human-in-the-Loop</div>
                        <p className="mt-2 text-sm text-blue-900">
                            Teachers retain control. AI accelerates the workflow; pedagogy remains human.
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}
