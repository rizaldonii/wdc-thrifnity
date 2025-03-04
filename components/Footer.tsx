export default function Footer() {
  return (
    <footer className="bg-white shadow-lg mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Thrifnity</h3>
            <p className="text-gray-600">
              Platform sustainable fashion terbaik di Indonesia untuk belanja,
              repair, dan trade pakaian second-hand.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/shop" className="text-gray-600 hover:text-blue-600">
                  Shop
                </a>
              </li>
              <li>
                <a href="/repair" className="text-gray-600 hover:text-blue-600">
                  Repair
                </a>
              </li>
              <li>
                <a href="/trade" className="text-gray-600 hover:text-blue-600">
                  Trade
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Email: hello@thrifnity.com</li>
              <li>Phone: (021) 1234-5678</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Add your social media icons here */}
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Thrifnity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
