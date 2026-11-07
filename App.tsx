import { useState, useEffect, useRef, type ReactNode } from 'react'
import logo from './imports/image.png'
import eyeImg from './imports/hero-eye.jpg'
// machines
import cncImg from './imports/cnc-router.jpg'
import dtfImg from './imports/dtf-machine.jpg'
import offsetImg from './imports/offset-press.jpg'
// products: every file lives in src/imports. File names must have NO spaces.
import rollupImg from './imports/p-rollup.jpg'
import bannerImg from './imports/p-banner.jpg'
import signageImg from './imports/p-3d-signage.jpg'
import tshirtImg from './imports/p-tshirt.jpg'
import tshirt2Img from './imports/p-tshirt2.jpg'
import hoodieImg from './imports/p-hoodie.jpg'
import hoodie2Img from './imports/p-hoodie2.jpg'
import hoodie3Img from './imports/p-hoodie3.jpg'
import reflectorImg from './imports/p-reflector.jpg'
import labcoatImg from './imports/p-labcoat.jpg'
import labcoat2Img from './imports/p-labcoat2.jpg'
import businessCardImg from './imports/p-business-card.jpg'
import brochureImg from './imports/p-bronchure.jpg'
import mugImg from './imports/p-mug.jpg'
import mug2Img from './imports/p-mug2.jpg'
import mug3Img from './imports/p-mug3.jpg'
import mug4Img from './imports/p-mug4.jpg'
import diaryImg from './imports/p-diary.jpg'
import diary2Img from './imports/p-diary2.jpg'
import pensImg from './imports/p-pens.jpg'
import receiptImg from './imports/p-receipt.jpg'
import rubberbandImg from './imports/p-rubberband.jpg'

const C = '#00AEEF'
const M = '#FF2E93'
const Y = '#FFF200'
const BLUE = '#0A47C8'
const WA = '254707699240'
const F = "font-['Barlow_Condensed']"
const NAV = [['Services', '#services'], ['Products', '#products'], ['Machines', '#machines'], ['Contact', '#contact']]

// Wave-style background. To use your own image instead: import bgImg from './imports/bg.jpg'
// and set BG = `linear-gradient(rgba(5,5,20,0.55), rgba(5,5,20,0.8)), url(${bgImg}) center / cover`
const BG =
  'radial-gradient(circle at 8% 0%, rgba(255,20,100,0.40), transparent 42%), radial-gradient(circle at 100% 55%, rgba(255,30,90,0.32), transparent 38%), radial-gradient(circle at 0% 100%, rgba(30,60,255,0.45), transparent 45%), #0a0620'

// The machines behind the products (shown when you hover a product card)
const MACHINES = {
  large: { title: 'Large Format Printer', color: C, img: 'https://images.unsplash.com/photo-1693031630369-bd429a57f115?w=1000&h=1250&fit=crop&auto=format' },
  offset: { title: 'Offset Press', color: '#FF4DB8', img: offsetImg },
  dtf: { title: 'DTF Machine', color: '#FF9A3C', img: dtfImg },
  cnc: { title: 'CNC Router', color: '#B39CFF', img: cncImg },
  laser: { title: 'Laser Engraver', color: Y, img: 'https://images.unsplash.com/photo-1615378809998-afc205e73bad?w=1000&h=1250&fit=crop&auto=format' },
}

const MACHINE_INFO: { key: keyof typeof MACHINES; blurb: string; uses: string[] }[] = [
  { key: 'large', blurb: 'Print up to 3.2m wide with razor-sharp resolution, weather-resistant and vivid.', uses: ['Banners & roll-up banners', 'Stickers & vinyl', 'Posters', 'Branding for shops & events', 'Billboards & signage'] },
  { key: 'dtf', blurb: 'Full-colour, photo-quality prints on any fabric. No minimum order.', uses: ['T-shirts', 'Hoodies', 'Reflector vests', 'Caps & aprons', 'Team & school uniforms'] },
  { key: 'offset', blurb: 'High-volume commercial printing with consistent colour at the lowest cost per piece.', uses: ['Receipt, invoice & delivery books', 'Business cards', 'Letterheads', 'Brochures & flyers', 'Bulk posters'] },
  { key: 'cnc', blurb: 'Cut and carve signage from wood, acrylic, MDF and PVC with precision.', uses: ['2D shop signs', '3D letters', 'Acrylic cutting', 'Wood cutting & carving', 'Custom displays'] },
  { key: 'laser', blurb: 'Personalised gifts and branding with micron-level accuracy.', uses: ['Mugs & tumblers', 'Diaries', 'Plaques & awards', 'Wooden gifts', 'Metal & glass'] },
]

type Product = { name: string; cat: string; imgs: string[]; price: string; note: string; machine: keyof typeof MACHINES; cover?: boolean }

// Edit names, prices and notes here. Add a new product by copying one line.
const PRODUCTS: Product[] = [
  { name: 'Round-neck T-shirt', cat: 'Apparel', imgs: [tshirtImg, tshirt2Img], price: 'KES 800', note: 'Logo or full-colour print', machine: 'dtf' },
  { name: 'Custom hoodie', cat: 'Apparel', imgs: [hoodieImg, hoodie2Img, hoodie3Img], price: 'Ask for price', note: 'Teams, schools, brands', machine: 'dtf' },
  { name: 'Reflector vest', cat: 'Apparel', imgs: [reflectorImg], price: 'KES 400', note: 'Branded safety wear', machine: 'dtf' },
  { name: 'Lab coat', cat: 'Apparel', imgs: [labcoatImg, labcoat2Img], price: 'Ask for price', note: 'Branded with your logo', machine: 'dtf' },
  { name: 'Roll-up banner', cat: 'Banners & Signs', imgs: [rollupImg], price: 'KES 8,500', note: 'Narrow base, with stand', machine: 'large' },
  { name: 'Banner', cat: 'Banners & Signs', imgs: [bannerImg], price: 'Ask for price', note: 'Indoor and outdoor', machine: 'large' },
  { name: '3D signage', cat: 'Banners & Signs', imgs: [signageImg], price: 'Ask for price', note: 'Shop signs, 3D letters', machine: 'cnc', cover: true },
  { name: 'Business cards', cat: 'Stationery', imgs: [businessCardImg], price: 'Ask for price', note: 'Printed to your design', machine: 'offset' },
  { name: 'Brochures', cat: 'Stationery', imgs: [brochureImg], price: 'Ask for price', note: 'Printed to your design', machine: 'offset' },
  { name: 'Receipt books', cat: 'Stationery', imgs: [receiptImg], price: 'Ask for price', note: 'Invoice, cash sale, delivery', machine: 'offset' },
  { name: 'Thermal mug', cat: 'Gifts', imgs: [mugImg, mug2Img, mug3Img, mug4Img], price: 'KES 1,200', note: 'Branded with your logo', machine: 'laser' },
  { name: 'Custom diary A5', cat: 'Gifts', imgs: [diaryImg, diary2Img], price: 'KES 1,200', note: 'Corporate gifting', machine: 'laser' },
  { name: 'Branded pens', cat: 'Gifts', imgs: [pensImg], price: 'Ask for price', note: 'Corporate gifting', machine: 'laser' },
  { name: 'Rubber bands', cat: 'Gifts', imgs: [rubberbandImg], price: 'Ask for price', note: 'Branded with your logo', machine: 'laser' },
]

const STATS = [
  { value: '500+', label: 'Happy Clients', color: '#6C8CFF' },
  { value: '12K+', label: 'Projects Done', color: M },
  { value: '5', label: 'Machines', color: C },
  { value: '24h', label: 'Turnaround', color: Y },
]

const WaIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

function ProductCard({ p, dup }: { p: Product; dup?: boolean }) {
  const ti = dup ? -1 : undefined
  const [k, setK] = useState(0)
  const mc = MACHINES[p.machine]
  const many = p.imgs.length > 1
  const go = (d: number) => setK((v) => (v + d + p.imgs.length) % p.imgs.length)
  const arrow = 'absolute top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 text-white text-xl hover:bg-black/80 transition-colors'
  return (
    <article className="flex flex-col w-full border border-white/10 bg-[#0a0620]/80 transition-colors hover:border-white/30">
      <div className="relative aspect-[4/5] overflow-hidden bg-white">
        {p.cover && <img src={p.imgs[k]} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl opacity-70" />}
        <img src={p.imgs[k]} alt={many ? `${p.name}, photo ${k + 1} of ${p.imgs.length}` : p.name} className="absolute inset-0 w-full h-full object-contain p-3" />
        {many && (
          <>
            <button onClick={() => go(-1)} tabIndex={ti} className={`${arrow} left-1`} aria-label="Previous photo">‹</button>
            <button onClick={() => go(1)} tabIndex={ti} className={`${arrow} right-1`} aria-label="Next photo">›</button>
            <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5" aria-hidden="true">
              {p.imgs.map((_, i) => (
                <span key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: i === k ? M : 'rgba(0,0,0,0.3)' }} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <h3 className={`${F} font-800 uppercase text-xl leading-tight`}>{p.name}</h3>
        <p className="text-white/55 font-['Barlow'] text-sm">{p.note}</p>
        <a href={`#machine-${p.machine}`} tabIndex={ti} className={`${F} text-xs font-700 tracking-widest uppercase hover:underline`} style={{ color: mc.color }}>
          Made on our {mc.title} →
        </a>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className={`${F} font-700 tracking-wider uppercase text-sm`}>{p.price}</span>
          <a href="#contact" tabIndex={ti} className={`${F} text-xs font-700 tracking-widest uppercase text-white/70 hover:text-white`}>Get a quote →</a>
        </div>
      </div>
    </article>
  )
}

// A fixed grid. The cards stay where they are; only the products fade out and the next ones fade in.
const ROTATE_MS = 7000 // time each set stays on screen
const FADE_MS = 1050 // fade-out time before the products swap (do not go below 600)

function ProductShowcase() {
  const n = PRODUCTS.length
  const [slots, setSlots] = useState(8)
  const [page, setPage] = useState(0)
  const [show, setShow] = useState(true)
  const [paused, setPaused] = useState(false)
  const busy = useRef(false)
  const timer = useRef<number | undefined>(undefined)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // 8 cards on desktop (4 x 2), 4 cards on tablets and phones (2 x 2)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const set = () => setSlots(Math.min(mq.matches ? 8 : 4, n))
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [n])
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const pages = Math.ceil(n / slots)
  const cur = page % pages
  const items = Array.from({ length: slots }, (_, i) => PRODUCTS[(cur * slots + i) % n])

  const change = (next: number) => {
    if (next === cur || busy.current) return
    if (reduce) { setPage(next); return }
    busy.current = true
    setShow(false)
    timer.current = window.setTimeout(() => {
      setPage(next)
      setShow(true)
      busy.current = false
    }, FADE_MS)
  }

  useEffect(() => {
    if (paused || reduce || pages < 2) return
    const t = window.setInterval(() => change((cur + 1) % pages), ROTATE_MS)
    return () => window.clearInterval(t)
  })

  const arrow = `${F} w-11 h-11 border border-white/25 text-white/80 hover:border-white/60 hover:text-white transition-colors text-lg`

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => window.setTimeout(() => setPaused(false), 10000)}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((p, i) => (
          <div
            key={i}
            className={`flex transition-all duration-500 ease-out ${reduce ? 'transition-none' : ''} ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: reduce ? undefined : `${i * 70}ms` }}
          >
            <ProductCard key={p.name} p={p} />
          </div>
        ))}
      </div>

      {pages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-6">
          <button onClick={() => change((cur - 1 + pages) % pages)} className={arrow} aria-label="Previous products">←</button>
          <div className="flex gap-2">
            {Array.from({ length: pages }, (_, k) => (
              <button
                key={k}
                onClick={() => change(k)}
                aria-label={`Show products set ${k + 1}`}
                aria-current={k === cur}
                className="w-2.5 h-2.5 rounded-full transition-colors"
                style={{ backgroundColor: k === cur ? M : 'rgba(255,255,255,0.3)' }}
              />
            ))}
          </div>
          <button onClick={() => change((cur + 1) % pages)} className={arrow} aria-label="Next products">→</button>
        </div>
      )}
    </div>
  )
}

function MachineSection() {
  return (
    <section id="machines" className="py-24 px-6 md:px-12 bg-black/30">
      <div className="max-w-7xl mx-auto">
        <h2 className={`${F} font-900 uppercase leading-none mb-4`} style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
          <span>OUR MACHINES.</span>
          <br />
          <span style={{ WebkitTextStroke: `1.5px ${M}`, color: 'transparent' }}>ENDLESS POSSIBILITIES.</span>
        </h2>
        <p className="text-white/60 font-['Barlow'] max-w-xl mb-14">Every job is made in-house on professional equipment. Here is what each machine can do for you.</p>
        <div className="space-y-6">
          {MACHINE_INFO.map((info, idx) => {
            const m = MACHINES[info.key]
            const flip = idx % 2 === 1
            return (
              <article key={info.key} id={`machine-${info.key}`} className="scroll-mt-24 grid md:grid-cols-2 overflow-hidden border border-white/10 bg-[#0a0620]/80">
                <div className={`p-10 md:p-14 flex flex-col justify-center ${flip ? 'md:order-2' : ''}`}>
                  <h3 className={`${F} font-900 uppercase leading-none mb-4`} style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', color: m.color }}>{m.title}</h3>
                  <p className="text-white/70 font-['Barlow'] leading-relaxed max-w-md mb-6">{info.blurb}</p>
                  <p className={`${F} font-700 tracking-[0.25em] uppercase text-xs text-white/50 mb-3`}>What we do with it</p>
                  <ul className="space-y-2 mb-8">
                    {info.uses.map((u) => (
                      <li key={u} className="flex gap-3 font-['Barlow'] text-white/90">
                        <span style={{ color: m.color }} aria-hidden="true">✓</span>
                        {u}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className={`self-start px-8 py-4 ${F} font-800 tracking-widest uppercase text-sm text-[#0a0620] hover:brightness-110 transition`} style={{ backgroundColor: m.color }}>
                    Request this service
                  </a>
                </div>
                <div className={`relative min-h-[320px] md:min-h-[440px] ${flip ? 'md:order-1' : ''}`}>
                  <img
                    src={m.img} loading="lazy" decoding="async"
                    alt={m.title}
                    className={`absolute inset-0 w-full h-full object-cover ${flip ? 'md:[clip-path:polygon(0_0,86%_0,100%_100%,0_100%)]' : 'md:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]'}`}
                  />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Replace these placeholders with REAL customer feedback (ask permission first, e.g. from WhatsApp messages).
// Delete the whole list ([]) and the section hides itself.
const TESTIMONIALS = [
  { quote: 'Paste a real customer message here.', name: 'Customer name', role: 'Business, school or church', stars: 5 },
  { quote: 'Paste a second real customer message here.', name: 'Customer name', role: 'Business, school or church', stars: 5 },
  { quote: 'Paste a third real customer message here.', name: 'Customer name', role: 'Business, school or church', stars: 5 },
]

function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = TESTIMONIALS.length

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (paused || n < 2 || reduce) return
    const t = setInterval(() => setI((v) => (v + 1) % n), 6000)
    return () => clearInterval(t)
  }, [paused, n])

  if (n === 0) return null
  const go = (d: number) => setI((v) => (v + d + n) % n)
  const arrow = `${F} w-11 h-11 border border-white/25 text-white/80 hover:border-white/60 hover:text-white transition-colors text-lg`

  return (
    <section
      id="feedback"
      className="py-24 px-6 md:px-12 bg-black/30"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`${F} font-900 uppercase leading-none mb-12`} style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
          WHAT OUR <span style={{ color: M }}>CUSTOMERS SAY</span>
        </h2>

        <div className="grid" aria-live="polite">
          {TESTIMONIALS.map((t, k) => (
            <figure
              key={k}
              aria-hidden={k !== i}
              className={`col-start-1 row-start-1 transition-opacity duration-700 ${k === i ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <div className="text-2xl mb-6" style={{ color: Y }} aria-label={`${t.stars} out of 5 stars`}>{'★'.repeat(t.stars)}</div>
              <blockquote className="text-white/90 font-['Barlow'] text-xl md:text-2xl leading-relaxed mb-8">“{t.quote}”</blockquote>
              <figcaption>
                <span className={`${F} font-700 uppercase tracking-widest text-lg`} style={{ color: C }}>{t.name}</span>
                <span className="block text-white/50 font-['Barlow'] text-sm mt-1">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {n > 1 && (
          <div className="mt-10 flex items-center justify-center gap-6">
            <button onClick={() => go(-1)} className={arrow} aria-label="Previous feedback">←</button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Show feedback ${k + 1}`}
                  aria-current={k === i}
                  className="w-2.5 h-2.5 rounded-full transition-colors"
                  style={{ backgroundColor: k === i ? M : 'rgba(255,255,255,0.3)' }}
                />
              ))}
            </div>
            <button onClick={() => go(1)} className={arrow} aria-label="Next feedback">→</button>
          </div>
        )}
      </div>
    </section>
  )
}

const Row = ({ label, color, children }: { label: string; color: string; children: ReactNode }) => (
  <div className="flex items-center gap-4">
    <span className={`${F} text-xs tracking-widest uppercase w-20 shrink-0`} style={{ color }}>{label}</span>
    <span className="w-px h-4 bg-white/10" />
    <span className="text-white/75 font-['Barlow'] text-sm">{children}</span>
  </div>
)

const INPUT =
  "w-full bg-white/5 border border-white/10 text-white placeholder-white/30 px-5 py-4 font-['Barlow'] text-sm focus:outline-none focus:border-[#00AEEF] transition-colors"

export default function App() {
  const [menu, setMenu] = useState(false)

  return (
    <div className="min-h-full text-white overflow-x-hidden" style={{ background: BG, backgroundAttachment: 'fixed' }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-3 bg-[#0a0620]/85 backdrop-blur-md border-b border-white/10">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo} alt="Benykyms Printers logo" className="h-12 w-12 rounded-full object-cover" />
          <span className={`${F} font-900 uppercase text-white text-2xl sm:text-3xl md:text-4xl leading-none`} style={{ letterSpacing: '0.1em' }}>
            BENYKYMS
            <span className="hidden sm:inline ml-2 text-base md:text-xl font-900">PRINTERS</span>
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {NAV.map(([label, href]) => (
            <li key={label}>
              <a href={href} className={`text-sm ${F} font-600 tracking-widest uppercase text-white/70 hover:text-[#00AEEF] transition-colors`}>{label}</a>
            </li>
          ))}
          <li>
            <a href="#contact" className={`px-5 py-2 text-white ${F} font-700 tracking-widest uppercase text-sm hover:brightness-110 transition`} style={{ backgroundColor: M }}>Get a Quote</a>
          </li>
        </ul>
        <button className="md:hidden text-white/80" onClick={() => setMenu(!menu)} aria-label="Toggle menu">
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-current transition-transform ${menu ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current ${menu ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-transform ${menu ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
        {menu && (
          <div className="absolute top-full left-0 right-0 bg-[#0a0620] border-b border-white/10 px-6 py-6 flex flex-col gap-4 md:hidden">
            {NAV.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenu(false)} className={`${F} font-600 tracking-widest uppercase text-white/80`}>{label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO: the eye stands alone */}
      <section id="top" className="relative min-h-screen flex items-center pt-20 px-6 md:px-12 overflow-hidden">
        <img src={eyeImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25 md:hidden" />
        {/* Desktop: artwork floats on the right and melts into the background (no box, no cropping).
            Make it smaller or bigger by changing w-[52%]. */}
        <img
          src={eyeImg}
          alt="Colourful artwork: we print your vision"
          className="hidden md:block absolute top-20 right-0 w-[52%] h-[calc(100%-5rem)] object-contain mix-blend-screen"
          style={{
            WebkitMaskImage: 'radial-gradient(closest-side, #000 50%, transparent 100%)',
            maskImage: 'radial-gradient(closest-side, #000 50%, transparent 100%)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border" style={{ borderColor: `${BLUE}90`, color: C }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: C }} />
              <span className={`${F} text-xs font-600 tracking-[0.2em] uppercase`}>Home of Quality Printing</span>
            </div>
            <h1 className={`${F} font-900 uppercase leading-none mb-6`} style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', letterSpacing: '-0.02em' }}>
              <span className="block">WE PRINT</span>
              <span className="block" style={{ WebkitTextStroke: '2px #5B84FF', color: 'transparent' }}>YOUR VISION</span>
              <span className="block" style={{ color: M }}>IN COLOR.</span>
            </h1>
            <p className="text-white/70 text-lg font-['Barlow'] leading-relaxed mb-8 max-w-md">
              From giant banners and 3D signage to business cards, branded apparel and laser-engraved gifts, Benykyms Printers brings your ideas to life in sharp, vivid color. Fast turnaround, every time.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#products" className={`px-8 py-4 text-white ${F} font-700 tracking-widest uppercase text-sm hover:brightness-110 transition`} style={{ backgroundColor: BLUE }}>See Our Work</a>
              <a href="#contact" className={`px-8 py-4 border border-white/30 text-white ${F} font-700 tracking-widest uppercase text-sm hover:border-white/60 transition-colors`}>Get a Quote</a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-white/10 bg-black/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center py-10 px-6 border-r border-white/10 last:border-r-0">
              <span className={`${F} font-900 text-5xl leading-none`} style={{ color: s.color }}>{s.value}</span>
              <span className={`text-white/50 ${F} text-sm tracking-widest uppercase mt-2`}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className={`${F} font-900 uppercase leading-none mb-4`} style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            <span>OUR PRODUCTS.</span>
            <br />
            <span style={{ WebkitTextStroke: `1.5px ${M}`, color: 'transparent' }}>MADE TO ORDER.</span>
          </h2>
          <p className="text-white/60 font-['Barlow'] max-w-xl mb-10">Popular items with prices. The selection changes every few seconds; hover to pause. Don't see yours? We print on almost anything, just ask.</p>
          <ProductShowcase />
        </div>
      </section>

      <MachineSection />

      {/* WHY US */}
      <section id="services" className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className={`${F} font-900 uppercase text-center mb-14`} style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>PRINT THAT SPEAKS FOR ITSELF</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {[
              { icon: '◈', color: C, title: 'Vivid Color Output', body: 'Calibrated to true CMYK standards. Every print is rich, accurate and consistent, batch after batch.' },
              { icon: '◉', color: M, title: 'Fast Turnaround', body: 'Same-day and 24-hour options available. We know deadlines are real and we respect yours.' },
              { icon: '◆', color: Y, title: 'All Materials', body: 'Vinyl, fabric, wood, metal, acrylic, glass. If it can be printed, cut or engraved, we handle it.' },
            ].map((f) => (
              <div key={f.title} className="bg-[#0a0620]/90 p-10 flex flex-col gap-5">
                <span className="text-4xl" style={{ color: f.color }}>{f.icon}</span>
                <h3 className={`${F} font-700 uppercase text-xl tracking-wide`} style={{ color: f.color }}>{f.title}</h3>
                <p className="text-white/60 font-['Barlow'] leading-relaxed text-sm">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA */}
      <section className="relative overflow-hidden py-24 px-6 md:px-12">
        <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${BLUE}, ${M}, ${C})` }} />
        <div className="absolute inset-0 bg-[#0a0620]/80" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <img src={logo} alt="Benykyms Printers" className="w-20 h-20 rounded-full mx-auto mb-6 border-2 border-white/30" />
          <h2 className={`${F} font-900 uppercase leading-none mb-6`} style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            READY TO PRINT SOMETHING <span style={{ color: M }}>GREAT?</span>
          </h2>
          <p className="text-white/70 text-lg mb-10 font-['Barlow']">Tell us what you need and we'll quote you fast.</p>
          <a href="#contact" className={`inline-block px-12 py-5 ${F} font-800 tracking-widest uppercase text-base hover:brightness-110 transition`} style={{ backgroundColor: Y, color: '#0a0620' }}>Start Your Project</a>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className={`${F} font-900 uppercase leading-none mb-6`} style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}>
              LET'S BUILD <span style={{ color: M }}>YOUR PRINT.</span>
            </h2>
            <p className="text-white/60 font-['Barlow'] leading-relaxed mb-10">
              Welcome to Benykyms Printers, the home of quality printing. Send us a message and let's make something amazing together.
            </p>
            <div className="space-y-4">
              <Row label="Phone" color={M}>
                <a href="tel:+254728445451" className="hover:text-white transition-colors">0728 445 451</a>
              </Row>
              <Row label="WhatsApp" color="#25D366">
                <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#25D366] transition-colors">
                  <WaIcon /> 0707699240
                </a>
              </Row>
              <Row label="Visit" color={C}>
                Mentor House, 1st Floor, Murang'a Town
                <a href="https://www.google.com/maps/search/?api=1&query=Mentor+House+Murang%27a+Town" target="_blank" rel="noopener noreferrer" className="ml-3 underline hover:text-white" style={{ color: C }}>
                  Get directions
                </a>
              </Row>
              <Row label="Visit" color={C}>
                Stage View Plaza, 2nd Floor, Thika Town
                <a href="https://www.google.com/maps/search/?api=1&query=Stage+View+Plaza+Thika+Town" target="_blank" rel="noopener noreferrer" className="ml-3 underline hover:text-white" style={{ color: C }}>
                  Get directions
                </a>
              </Row>
              <Row label="TikTok" color={C}>
                <a href="https://www.tiktok.com/@benykyms" target="_blank" rel="noopener noreferrer" className="hover:text-[#00AEEF] transition-colors">@Benykyms printers</a>
              </Row>
              <Row label="Instagram" color={Y}>
                <a href="https://www.instagram.com/benykyms" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFF200] transition-colors">@Benykyms printers</a>
              </Row>
              <Row label="Hours" color="#ffffff99">Mon – Sat, 8am – 6pm</Row>
            </div>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              const d = new FormData(e.currentTarget)
              const msg = `Hi Benykyms Printers!\n\n*Name:* ${d.get('name')}\n*Email:* ${d.get('email') || '-'}\n*Service:* ${d.get('service') || 'Not specified'}\n*Project details:* ${d.get('details') || '-'}`
              window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank')
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <input name="name" type="text" placeholder="Your name" required className={INPUT} />
              <input name="email" type="email" placeholder="Email address (optional)" className={INPUT} />
            </div>
            <select name="service" className={`${INPUT} text-white/70 appearance-none`} defaultValue="">
              <option value="" className="text-black">Select a service</option>
              {['Large Format Printing', 'Offset Printing', 'T-shirt / DTF Printing', 'CNC Signage (2D/3D)', 'Laser Engraving', 'Other'].map((s) => (
                <option key={s} value={s} className="text-black">{s}</option>
              ))}
            </select>
            <textarea name="details" rows={5} placeholder="Describe your project: size, material, quantity, deadline..." className={`${INPUT} resize-none`} />
            <button type="submit" className={`w-full py-5 text-white ${F} font-800 tracking-widest uppercase text-sm flex items-center justify-center gap-3 hover:brightness-110 transition`} style={{ backgroundColor: '#25D366' }}>
              <WaIcon /> Send via WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 px-6 md:px-12 bg-black/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="w-9 h-9 rounded-full object-cover" />
            <span className={`${F} font-700 tracking-widest uppercase text-white/50 text-sm`}>BENYKYMS PRINTERS</span>
          </div>
          <p className="text-white/40 font-['Barlow'] text-xs text-center">© {new Date().getFullYear()} Benykyms Printers. Home of Quality Printing.</p>
          <div className="flex gap-6">
            {NAV.map(([label, href]) => (
              <a key={label} href={href} className={`text-white/40 hover:text-white/70 ${F} text-xs tracking-widest uppercase transition-colors`}>{label}</a>
            ))}
          </div>
        </div>
      </footer>

      <a
        href={`https://wa.me/${WA}?text=${encodeURIComponent('Hi Benykyms Printers, I would like a quote.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:brightness-110 transition"
      >
        <WaIcon size={28} />
      </a>
    </div>
  )
}