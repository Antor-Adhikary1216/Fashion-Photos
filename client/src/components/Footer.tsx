import { Link } from 'react-router-dom'
import { FiInstagram, FiMail, FiMapPin } from 'react-icons/fi'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl text-white">FrameStory</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-stone-400">
            Cinematic photography for weddings, portraits, editorials, events,
            products, and journeys worth remembering.
          </p>
        </div>
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gold-300">
            Explore
          </p>
          <div className="grid gap-2 text-sm text-stone-400">
            <Link to="/gallery">Gallery</Link>
            <Link to="/albums">Albums</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Book a shoot</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gold-300">
            Contact
          </p>
          <div className="grid gap-3 text-sm text-stone-400">
            <span className="flex items-center gap-2">
              <FiMapPin /> Mumbai, India
            </span>
            <span className="flex items-center gap-2">
              <FiMail /> hello@framestory.studio
            </span>
            <span className="flex items-center gap-2">
              <FiInstagram /> @framestory
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
