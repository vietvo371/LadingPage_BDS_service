import Header from '@/components/Header'
import HeroCinematic from '@/components/HeroCinematic'
import TemplatesSection from '@/components/TemplatesSection'
import ContactForm from '@/components/ContactForm'
import ReferralBox from '@/components/ReferralBox'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCinematic />
        <TemplatesSection />
        <ContactForm />
        <ReferralBox />
      </main>
      <Footer />
    </>
  )
}
