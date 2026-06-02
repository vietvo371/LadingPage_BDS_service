import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 pt-[120px] pb-[60px] text-center">
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 text-xs font-semibold text-[#e06f46] bg-[#e06f46]/10 rounded-full tracking-wider uppercase">
            Lỗi đường dẫn
          </div>
          <h1 className="text-8xl md:text-9xl font-bold text-[#e06f46] tracking-tighter">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] tracking-tight">
            Không Tìm Thấy Trang
          </h2>
          <p className="text-base text-gray-500 max-w-md mx-auto leading-relaxed">
            Trang bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc đã được di chuyển sang một địa chỉ khác.
          </p>
        </div>
        
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#e06f46] hover:bg-[#d05e36] transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            Quay lại Trang Chủ
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
