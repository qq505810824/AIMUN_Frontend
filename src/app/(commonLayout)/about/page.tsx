'use client'
import { Card, PhotoGrid, Section } from '@/app/components/common/Views/Blocks'
import { useLang } from '@/context/lang-context'

const G2 = [
    'https://source.unsplash.com/featured/800x500/?united-nations,flag',
    'https://source.unsplash.com/featured/800x500/?workshop,education',
    'https://source.unsplash.com/featured/800x500/?debate,public-speaking',
]
export default function About() {
    const { L } = useLang()
    return (
        <Section>
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <h2 className="text-2xl font-bold mb-2">{L('About AIMUN', '關於 AIMUN')}</h2>
                    <p className="text-slate-700">
                        {L(
                            'A student-centered Model UN that blends diplomacy with future-focused themes like AI governance and sustainability.',
                            '以學生為本的模擬聯合國，結合外交訓練與 AI 治理、可持續發展等前瞻主題。'
                        )}
                    </p>
                </Card>
                <Card>
                    <PhotoGrid images={G2} />
                </Card>
            </div>
        </Section>
    )
}