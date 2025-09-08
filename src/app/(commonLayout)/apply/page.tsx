'use client'
import { Card, Section } from '@/app/components/common/Views/Blocks'
import { useLang } from '@/context/lang-context'

export default function Apply() {
    const { L } = useLang()
    return (
        <Section>
            <Card>
                <h2 className="text-2xl font-bold mb-3">{L('Apply Now', '立即報名')}</h2>
                <p className="text-slate-700 mb-4">
                    {L(
                        'Applications are open. Please register through the official forms below.',
                        '現已接受報名，請透過以下官方表單登記。'
                    )}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                    <a
                        href="https://forms.gle/JSg7mzH68ikrXoLcA"
                        target="_blank"
                        className="rounded-md bg-slate-900 text-white px-4 py-2 text-center"
                    >
                        {L('Google Form (Non-Mainland)', 'Google 表單（非中國內地）')}
                    </a>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            alert(L('Replace with Tencent Form link.', '請替換為騰訊問卷連結。'))
                        }}
                        className="rounded-md border px-4 py-2 text-center"
                    >
                        {L('Tencent Form (Mainland)', '騰訊問卷（中國內地）')}
                    </a>
                </div>
            </Card>
        </Section>
    )
}