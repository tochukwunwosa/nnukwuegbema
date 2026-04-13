import React from 'react'

const Navbar = () => {
  return (
    <nav
      className="sticky top-0 z-50 bg-[#1b4332] px-6 py-5 safe-top header-sticky"
    >
      <div className="max-w-3xl mx-auto font-display">
        <h1 className="text-xl font-semibold text-white tracking-tight">
          Nnukwuegbema family history
        </h1>
        <p className="text-sm text-white/50 mt-1">
          Preserve our village heritage for generations to come
        </p>
      </div>
    </nav>
  )
}

export default Navbar