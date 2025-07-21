import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SI</span>
              </div>
              <span className="text-xl font-bold text-white">Learn Hub</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Platform pembelajaran terbaik untuk mengembangkan kemampuan Sistem Informasi. 
              Belajar dengan mudah melalui video tutorial, materi PDF, dan konten berkualitas tinggi.
            </p>
            <div className="text-gray-400 text-sm">
              <p className="mb-2">📧 Email: support@silearn.hub</p>
              <p>📱 WhatsApp: +62 812-3456-7890</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/categories" className="text-gray-400 hover:text-white transition-colors">
                  Kategori
                </Link>
              </li>
              <li>
                <Link href="/dashboard/materials" className="text-gray-400 hover:text-white transition-colors">
                  Materi
                </Link>
              </li>
              <li>
                <Link href="/dashboard/series" className="text-gray-400 hover:text-white transition-colors">
                  Series
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Help */}
          <div>
            <h3 className="text-white font-semibold mb-4">Bantuan</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">FAQ</span>
              </li>
              <li>
                <span className="text-gray-400">Panduan Belajar</span>
              </li>
              <li>
                <span className="text-gray-400">Kontak Support</span>
              </li>
              <li>
                <span className="text-gray-400">Syarat & Ketentuan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-1">50+</div>
              <div className="text-sm text-gray-400">Video Tutorial</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400 mb-1">20+</div>
              <div className="text-sm text-gray-400">Kategori</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400 mb-1">100+</div>
              <div className="text-sm text-gray-400">Materi PDF</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400 mb-1">1000+</div>
              <div className="text-sm text-gray-400">Siswa Aktif</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} SI Learn Hub. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <span className="text-gray-400">Privacy Policy</span>
              <span className="text-gray-400">Terms of Service</span>
              <span className="text-gray-400">Cookie Policy</span>
            </div>
          </div>
        </div>

        {/* Made with Love */}
        <div className="border-t border-gray-800 py-4">
          <div className="text-center text-gray-400 text-sm">
            Made with ❤️ for Sistem Informasi Students
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
