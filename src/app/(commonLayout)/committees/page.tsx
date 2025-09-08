'use client'
import { Card, Section } from '@/app/components/common/Views/Blocks'
import { useLang } from '@/context/lang-context'

export default function Committees() {
    const { L } = useLang()
    return (
        <Section>
            <Card>
                <h2 className="text-2xl font-bold mb-2">{L('Committees (Preview)', '委員會（預覽）')}</h2>
                <div className="grid md:grid-cols-3 gap-3 text-sm text-slate-700">
                    {['ILO', 'WTO', 'GA1 (DISEC)', 'UNEP', 'WHO'].map((c) => (
                        <div key={c} className="rounded-xl border p-4">• {c}</div>
                    ))}
                </div>
            </Card>
        </Section>
    )
}