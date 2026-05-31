import Header          from '@/components/Header'
import GalleryMosaic   from '@/components/GalleryMosaic'
import PropertyMain    from '@/components/PropertyMain'
import PropertySidebar from '@/components/PropertySidebar'
import PartnersStrip   from '@/components/PartnersStrip'
import Footer          from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import ScrollReveal    from '@/components/ScrollReveal'

export default function Home() {
  return (
    <>
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

            {/* Sticky sidebar */}
            <div className="lg:w-[380px] flex-shrink-0">
              <ScrollReveal delay={0.2} direction="left">
                <PropertySidebar />
              </ScrollReveal>
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
    </>
  )
}
