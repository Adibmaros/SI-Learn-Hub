import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
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

          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-4 lg:py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-xs lg:text-sm text-center lg:text-left">
              © {currentYear} SI Learn Hub. All rights reserved.
            </div>
          </div>
        </div>

        {/* Made with Love */}
        <div className="border-t border-gray-800 py-3 lg:py-4">
          <div className="text-center text-gray-400 text-xs lg:text-sm">
            Made with <Link href="/login"><span className="text-gray-300">love</span></Link>
            <span className="text-gray-500">❤️</span>
             for Sistem Informasi Students
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;