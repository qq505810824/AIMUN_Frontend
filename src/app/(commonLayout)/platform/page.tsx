


export default function PlatformPage() {
    return (
        <>
            <main className="route-container pt-16 pb-24">
                <h1 className="text-4xl font-extrabold">Platform Overview</h1>
                <p className="mt-3 text-gray-700 max-w-3xl">
                    Create assignments, share a code, and let AI do the heavy lifting—grading, generating leveled
                    comprehension, and evaluating spoken responses. Students receive tailored feedback and practice.
                </p>

                <div className="mt-10 grid lg:grid-cols-3 gap-6">
                    <div className="card">
                        <h3 className="font-semibold text-lg">Writing</h3>
                        <p className="text-gray-600 mt-2">
                            AI-assisted essay evaluation with clear error labels & downloadable reports. OCR handles PDF/Image to text.
                        </p>
                        <ul className="mt-4 text-sm text-gray-700 list-disc list-inside space-y-1">
                            <li>Rubric-aligned tasks</li>
                            <li>Error categories & concise explanations</li>
                            <li>Personalized practice after submission</li>
                        </ul>
                    </div>

                    <div className="card">
                        <h3 className="font-semibold text-lg">Reading</h3>
                        <p className="text-gray-600 mt-2">
                            Adaptive comprehension built from current articles or your uploads—3 levels × 5 MCQs each.
                        </p>
                        <ul className="mt-4 text-sm text-gray-700 list-disc list-inside space-y-1">
                            <li>Beginner / Intermediate / Advanced</li>
                            <li>Use latest news or upload passages</li>
                            <li>Instant or teacher-released results</li>
                        </ul>
                    </div>

                    <div className="card">
                        <h3 className="font-semibold text-lg">Speaking</h3>
                        <p className="text-gray-600 mt-2">
                            Speech intelligence measures fluency, coherence, and pronunciation—via speaking essays,
                            guided conversations, and drills.
                        </p>
                        <ul className="mt-4 text-sm text-gray-700 list-disc list-inside space-y-1">
                            <li>Record responses in-app</li>
                            <li>Teacher prompts or AI-generated topics</li>
                            <li>Pronunciation accuracy thresholds</li>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    );
}