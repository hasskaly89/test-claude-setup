export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <span className="text-xl font-bold text-gray-900">MyApp</span>
        <div className="flex gap-6 text-sm text-gray-600">
          <a href="#features" className="hover:text-gray-900">Features</a>
          <a href="#pricing" className="hover:text-gray-900">Pricing</a>
          <a href="#" className="hover:text-gray-900">About</a>
        </div>
        <a
          href="#"
          className="bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          Get Started
        </a>
      </nav>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6 py-24">
        <h1 className="text-5xl font-bold text-gray-900 max-w-2xl leading-tight">
          Build something great, faster than ever
        </h1>
        <p className="mt-6 text-lg text-gray-500 max-w-xl">
          MyApp helps teams ship products faster with powerful tools, seamless collaboration, and a developer-first experience.
        </p>
        <div className="mt-10 flex gap-4">
          <a
            href="#"
            className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Start for free
          </a>
          <a
            href="#features"
            className="border border-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
          >
            Learn more
          </a>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="px-8 py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why MyApp?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { title: "Fast", desc: "Optimized for performance from day one." },
            { title: "Simple", desc: "Clean API and intuitive developer experience." },
            { title: "Scalable", desc: "Grows with your team and your product." },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 py-8 border-t border-gray-100">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  );
}
