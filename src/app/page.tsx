import Header         from '@/components/Header'
import GalleryMosaic  from '@/components/GalleryMosaic'
import PropertyMain   from '@/components/PropertyMain'
import PropertySidebar from '@/components/PropertySidebar'
import PartnersStrip  from '@/components/PartnersStrip'
import Footer         from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-[60px]">
        {/* Gallery mosaic full width */}
        <GalleryMosaic />

        {/* 2-column layout: main content + sticky sidebar */}
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main content — 65% */}
            <div className="flex-1 min-w-0">
              <PropertyMain />
            </div>
            {/* Sticky sidebar — 35% */}
            <div className="lg:w-[380px] flex-shrink-0">
              <PropertySidebar />
            </div>
          </div>
        </div>

        <PartnersStrip />
      </main>
      <Footer />
    </>
  )
}
