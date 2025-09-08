'use client'

import { Card, PhotoGrid, Section } from "@/app/components/common/Views/Blocks"
import { useLang } from "@/context/lang-context"

const GALLERY = [
    'https://source.unsplash.com/featured/800x500/?macau,skyline',
    'https://source.unsplash.com/featured/800x500/?students,conference',
    'https://source.unsplash.com/featured/800x500/?wynn,hotel',
]

export default function Home() {
    const { L } = useLang()
    return (
        <Section>
            <div className="grid md:grid-cols-3 gap-6 items-start">
                <Card className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-2">{L('Welcome', '歡迎')}</h2>
                    <p className="text-slate-700 mb-4">
                        {L(
                            'Join us for a unique experience of diplomacy, public speaking and collaboration across Asia-Pacific.',
                            '加入我們，體驗橫跨亞太地區的外交、演講與協作。'
                        )}
                    </p>
                    <PhotoGrid images={GALLERY} />
                </Card>
                <Card>
                    <h3 className="text-lg font-semibold mb-2">{L('Key Facts', '關鍵資訊')}</h3>
                    <ul className="text-sm text-slate-700 space-y-1">
                        <li>• {L('Dates: Oct 25–26, 2025', '日期：10月25–26日 2025')}</li>
                        <li>• {L('Optional: Oct 24 AI Education Day', '可選：10月24日 AI 教育日')}</li>
                        <li>• {L('Venue: Macau SAR (Cotai & UNU Macau)', '地點：澳門（路氹與 UNUMacau）')}</li>
                        <li>• {L('Eligibility: Grade 4 to University', '對象：小四至大學')}</li>
                    </ul>
                </Card>
            </div>
        </Section>
    )
}