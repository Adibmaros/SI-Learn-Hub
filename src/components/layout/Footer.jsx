import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 lg:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SI</span>
                </div>
                <span className="text-xl font-bold text-white">Learn Hub</span>
              </div>
              <p className="text-gray-400 mb-6 text-sm sm:text-base max-w-md">
                Platform pembelajaran terbaik untuk mengembangkan kemampuan Sistem Informasi. 
                Belajar dengan mudah melalui video tutorial, materi PDF, dan konten berkualitas tinggi.
              </p>
              <div className="text-gray-400 text-sm">
                <p className="mb-2 flex items-center">
                  <span className="mr-2">📧</span>
                  <span>Email: support@silearn.hub</span>
                </p>
                <p className="flex items-center">
                  <span className="mr-2">📱</span>
                  <span>WhatsApp: +62 812-3456-7890</span>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="sm:col-span-1">
              <h3 className="text-white font-semibold mb-4 text-base">Navigasi</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/dashboard" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm block"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/dashboard/categories" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm block"
                  >
                    Kategori
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/dashboard/materials" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm block"
                  >
                    Materi
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/dashboard/series" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm block"
                  >
                    Series
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support & Help */}
            <div className="sm:col-span-1">
              <h3 className="text-white font-semibold mb-4 text-base">Bantuan</h3>
              <ul className="space-y-3">
                <li>
                  <span className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer text-sm block">
                    FAQ
                  </span>
                </li>
                <li>
                  <span className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer text-sm block">
                    Panduan Belajar
                  </span>
                </li>
                <li>
                  <span className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer text-sm block">
                    Kontak Support
                  </span>
                </li>
                <li>
                  <span className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer text-sm block">
                    Syarat & Ketentuan
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-800 py-6 lg:py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 text-center">
            <div className="p-2">
              <div className="text-xl lg:text-2xl font-bold text-blue-400 mb-1">50+</div>
              <div className="text-xs lg:text-sm text-gray-400">Video Tutorial</div>
            </div>
            <div className="p-2">
              <div className="text-xl lg:text-2xl font-bold text-green-400 mb-1">20+</div>
              <div className="text-xs lg:text-sm text-gray-400">Kategori</div>
            </div>
            <div className="p-2">
              <div className="text-xl lg:text-2xl font-bold text-purple-400 mb-1">100+</div>
              <div className="text-xs lg:text-sm text-gray-400">Materi PDF</div>
            </div>
            <div className="p-2">
              <div className="text-xl lg:text-2xl font-bold text-orange-400 mb-1">1000+</div>
              <div className="text-xs lg:text-sm text-gray-400">Siswa Aktif</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-4 lg:py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-xs lg:text-sm text-center lg:text-left">
              © {currentYear} SI Learn Hub. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end space-x-4 lg:space-x-6 text-xs lg:text-sm">
              <span className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">
                Terms of Service
              </span>
              <span className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">
                Cookie Policy
              </span>
            </div>
          </div>
        </div>

        {/* Made with Love */}
        <div className="border-t border-gray-800 py-3 lg:py-4">
          <div className="text-center text-gray-400 text-xs lg:text-sm">
            Made with ❤️ for Sistem Informasi Students
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;