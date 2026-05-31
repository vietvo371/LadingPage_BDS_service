import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const beVietnam = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-be',
  display: 'swap',
})

const BASE_URL = 'https://coastal-quangngai.vn'

export const viewport: Viewport = {
  themeColor: '#e06f46',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'Coastal Quảng Ngãi — Khu Đô Thị Nghỉ Dưỡng Cao Cấp Ven Biển',
    template: '%s | Coastal Quảng Ngãi',
  },

  description:
    'Coastal Quảng Ngãi — Khu đô thị tích hợp nghỉ dưỡng ven biển đẳng cấp tại Xã Tư Nghĩa, Quảng Ngãi. ' +
    'Giá từ 4.8 Tỷ – 30 Tỷ. 8 phân khu · 93.9 ha · Thiết kế bởi SWECO · GioForma · 100architects.',

  keywords: [
    'Coastal Quảng Ngãi',
    'Haus Coastal Quảng Ngãi',
    'bất động sản Quảng Ngãi',
    'khu đô thị ven biển Quảng Ngãi',
    'biệt thự biển Quảng Ngãi',
    'mua nhà Quảng Ngãi',
    'đầu tư bất động sản miền Trung',
    'nghỉ dưỡng Tư Nghĩa Quảng Ngãi',
    'resort living Quảng Ngãi',
    'nhà ven sông Quảng Ngãi',
    'dinh thự trị liệu Quảng Ngãi',
  ],

  authors:   [{ name: 'Coastal Quảng Ngãi', url: BASE_URL }],
  creator:   'Trung Digital Media',
  publisher: 'Haus Coastal Quảng Ngãi',

  // Open Graph
  openGraph: {
    type:        'website',
    locale:      'vi_VN',
    url:         BASE_URL,
    siteName:    'Coastal Quảng Ngãi',
    title:       'Coastal Quảng Ngãi — Khu Đô Thị Nghỉ Dưỡng Cao Cấp Ven Biển',
    description:
      'Khu đô thị tích hợp nghỉ dưỡng ven biển đẳng cấp. 8 phân khu · 93.9 ha · Giá từ 4.8 – 30 Tỷ. ' +
      'Vị trí vàng Xã Tư Nghĩa, Quảng Ngãi — tiếp giáp biển Mỹ Khê.',
    images: [
      {
        url:    '/og-image.jpg',
        width:  1200,
        height: 630,
        alt:    'Coastal Quảng Ngãi — Phối cảnh tổng thể khu đô thị nghỉ dưỡng ven biển',
        type:   'image/jpeg',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card:        'summary_large_image',
    title:       'Coastal Quảng Ngãi — Khu Đô Thị Nghỉ Dưỡng Cao Cấp',
    description: 'Khu đô thị ven biển đẳng cấp · 4.8 – 30 Tỷ · Xã Tư Nghĩa, Quảng Ngãi',
    images:      ['/og-image.jpg'],
  },

  // Icons / Favicon
  icons: {
    icon: [
      { url: '/favicon.ico',    sizes: 'any' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple:  [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other:  [{ rel: 'mask-icon', url: '/favicon-32.png', color: '#e06f46' }],
  },

  manifest: '/site.webmanifest',

  alternates: {
    canonical: BASE_URL,
    languages: { 'vi-VN': BASE_URL },
  },

  robots: {
    index:     true,
    follow:    true,
    googleBot: {
      index:              true,
      follow:             true,
      'max-image-preview':'large',
      'max-snippet':      -1,
    },
  },

  category: 'real estate',
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'RealEstateListing',
      '@id':   `${BASE_URL}/#listing`,
      name:    'Coastal Quảng Ngãi',
      description:
        'Khu đô thị tích hợp nghỉ dưỡng cao cấp ven biển. 8 phân khu · 93.9 ha · Vốn đầu tư 7.100 tỷ.',
      url:   BASE_URL,
      image: `${BASE_URL}/og-image.jpg`,
      address: {
        '@type':           'PostalAddress',
        streetAddress:     'Ven biển Nghĩa An',
        addressLocality:   'Xã Tư Nghĩa',
        addressRegion:     'Quảng Ngãi',
        addressCountry:    'VN',
      },
      geo: {
        '@type':    'GeoCoordinates',
        latitude:    15.1,
        longitude:  108.8,
      },
      offers: {
        '@type':        'AggregateOffer',
        priceCurrency:  'VND',
        lowPrice:        4800000000,
        highPrice:      30000000000,
        offerCount:     1111,
      },
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Hồ bơi riêng',          value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Resort 5 sao',           value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Trung tâm trị liệu',     value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Công viên ven biển',     value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Gym · Yoga · Tennis',    value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Trường liên cấp QT',     value: true },
        { '@type': 'LocationFeatureSpecification', name: 'An ninh camera 24/7',    value: true },
      ],
    },
    {
      '@type':  'Organization',
      '@id':    `${BASE_URL}/#organization`,
      name:     'Coastal Quảng Ngãi',
      url:      BASE_URL,
      logo:     `${BASE_URL}/icon-512.png`,
      contactPoint: {
        '@type':            'ContactPoint',
        telephone:          '+84-365-285-863',
        contactType:        'sales',
        availableLanguage:  'Vietnamese',
      },
    },
    {
      '@type':     'WebSite',
      '@id':       `${BASE_URL}/#website`,
      url:         BASE_URL,
      name:        'Coastal Quảng Ngãi',
      inLanguage:  'vi-VN',
      publisher:   { '@id': `${BASE_URL}/#organization` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={beVietnam.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.google.com" />
      </head>
      <body className="bg-white text-[#1a1a1a] font-[family-name:var(--font-be)] overflow-x-hidden">
        {children}

        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
