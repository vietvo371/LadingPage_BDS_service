import Header          from '@/components/Header'
import GalleryMosaic   from '@/components/GalleryMosaic'
import PropertyMain    from '@/components/PropertyMain'
import PropertySidebar from '@/components/PropertySidebar'
import PartnersStrip   from '@/components/PartnersStrip'
import Footer          from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import ScrollReveal    from '@/components/ScrollReveal'
import { prisma }      from '@/lib/prisma'
import { SettingsProvider } from '@/components/SettingsProvider'

export default async function Home() {
  const brokerId = Number(process.env.BROKER_ID ?? 1)
  const settingsList = await prisma.setting.findMany({ where: { brokerId } }).catch(() => [])
  const settings = settingsList.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {} as Record<string, string>)

  return (
    <SettingsProvider settings={settings}>
      <Header />
      <main className="pt-[60px]">

        {/* Gallery mosaic — no animation, load ngay */}
        <GalleryMosaic />

        {/* 2-column layout */}
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <PropertyMain />
            </div>

            {/* Sticky sidebar — sticky phải trực tiếp trên flex child */}
            <div className="lg:w-[380px] flex-shrink-0 lg:sticky lg:top-[72px] lg:self-start lg:max-h-[calc(100vh-80px)] lg:overflow-y-auto no-scrollbar">
              <PropertySidebar />
            </div>
          </div>
        </div>

        {/* Partners */}
        <ScrollReveal>
          <PartnersStrip />
        </ScrollReveal>

      </main>
      <Footer />

      {/* Floating CTA + Back to top */}
      <FloatingActions />
    </SettingsProvider>
  )
}
