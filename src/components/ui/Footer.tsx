export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.08)]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-display text-sm font-bold text-white">
          Pandxy
        </div>
        <p className="text-xs text-neutral-500">
          &copy; {new Date().getFullYear()} Pandxy. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
