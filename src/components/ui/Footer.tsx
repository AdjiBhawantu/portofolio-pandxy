export default function Footer() {
  return (
    <footer className="bg-surface py-stack-lg border-t border-white/10 mt-24">
      <div className="flex flex-col md:flex-row justify-between items-center px-gutter max-w-container-max mx-auto">
        <div className="font-headline-md text-headline-md font-bold text-on-surface mb-4 md:mb-0">
          Pandxy
        </div>
        <div className="font-body-md text-body-md text-secondary">
          &copy; {new Date().getFullYear()} Pandxy. All rights reserved.
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="#"
            className="font-body-md text-body-md text-secondary hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="font-body-md text-body-md text-secondary hover:text-primary transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  )
}
