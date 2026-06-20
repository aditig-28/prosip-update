import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ProsipLogo } from "./Logo";
import { Dumbbell, Zap, Sparkles, Phone, MapPin, Instagram, ArrowRight, Trophy, FlaskConical, Clock, MessageCircle } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600"
    />
  );
}

function MouseGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] hidden md:block"
      style={{
        background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(234,179,8,0.08), transparent 60%)`,
        transition: "background 0.15s ease-out",
      }}
    />
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-white/5 bg-black/60 backdrop-blur-xl py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5">
        <ProsipLogo />
        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <a href="#why" className="transition hover:text-yellow-400">Why</a>
          <a href="#products" className="transition hover:text-yellow-400">Products</a>
          <a href="#story" className="transition hover:text-yellow-400">Story</a>
          <a href="#founders" className="transition hover:text-yellow-400">Founders</a>
          <a href="#contact" className="transition hover:text-yellow-400">Contact</a>
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-black transition hover:bg-yellow-400 hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 hero-radial" />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/20 blur-[120px]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_70%,#000_100%)]" />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/5 px-4 py-1.5 text-xs font-medium text-yellow-400 backdrop-blur"
        >
          <Sparkles className="h-3 w-3" /> India's Premium Protein Nutrition
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex justify-center"
        >
          <div
            className="text-5xl font-extrabold italic leading-none sm:text-7xl md:text-8xl text-white"
            style={{ fontFamily: 'var(--font-brand)', fontStretch: '125%', letterSpacing: '-0.04em' }}
          >
            Pr<span className="gold-text">O</span>sip
          </div>

        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mb-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Train. <span className="gold-text">Tap.</span> Sip.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mx-auto mb-10 max-w-2xl text-base text-white/60 sm:text-lg"
        >
          Premium protein nutrition designed for performance, recovery, and everyday health.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#products"
            className="group inline-flex items-center gap-2 rounded-full bg-yellow-500 px-7 py-3.5 text-sm font-semibold text-black transition-all hover:bg-yellow-400 hover:shadow-[0_0_40px_rgba(234,179,8,0.5)]"
          >
            Explore Products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:border-yellow-500/40 hover:bg-white/10"
          >
            Contact Us
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="h-1.5 w-1 rounded-full bg-yellow-500"
          />
        </div>
      </motion.div>
    </section>
  );
}

function WhyProsip() {
  const cards = [
    { icon: FlaskConical, title: "High Quality Protein", desc: "Lab-tested, clinically formulated protein crafted to the highest international standards for purity and bioavailability." },
    { icon: Trophy, title: "Built By Athletes", desc: "Engineered by athletes who live and breathe performance — every formula tuned for real training, real recovery." },
    { icon: Clock, title: "Convenient Nutrition", desc: "Train. Tap. Sip. Premium nutrition at your fingertips, anywhere, anytime — no compromises." },
  ];
  return (
    <section id="why" className="relative py-32">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="mb-20 text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">Why Prosip</div>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Engineered for the <span className="gold-text">relentless.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass-card group relative h-full overflow-hidden rounded-2xl p-8"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-yellow-500/30 bg-yellow-500/10 text-yellow-400">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">{c.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{c.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Products() {
  const products = [
    { name: "Whey Protein", tag: "Performance", desc: "Ultra-filtered whey isolate. 25g of premium protein per serving for muscle growth and recovery.", icon: Dumbbell },
    { name: "BCAA's", tag: "Recovery", desc: "Clinically dosed 2:1:1 ratio of essential amino acids. Train harder, recover faster.", icon: Zap },
    { name: "Pre Workout", tag: "Energy", desc: "Explosive energy, laser focus, and elite endurance for your most demanding sessions.", icon: Sparkles },
  ];
  return (
    <section id="products" className="relative py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.05),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="mb-20 text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">The Range</div>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Crafted for <span className="gold-text">every rep.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass-card group relative h-full overflow-hidden rounded-3xl"
              >
                <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-gradient-to-b from-yellow-500/5 to-transparent">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.2),transparent_60%)] opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 rounded-3xl bg-yellow-500/30 blur-2xl" />
                      <div className="relative flex h-48 w-32 flex-col items-center justify-center rounded-2xl border border-yellow-500/30 bg-gradient-to-b from-black via-zinc-900 to-black p-4 shadow-2xl">
                        <p.icon className="mb-3 h-10 w-10 text-yellow-500" />
                        <div className="text-center">
                          <div className="text-[10px] font-semibold uppercase tracking-widest text-yellow-500">Prosip</div>
                          <div className="mt-1 text-xs font-bold text-white">{p.name}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div className="p-7">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-yellow-500">{p.tag}</div>
                  <h3 className="mb-3 text-2xl font-bold text-white">{p.name}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{p.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="relative py-32">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal>
          <div className="mb-12 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">Our Story</div>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mb-12 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            We're building the future of <span className="gold-text">Indian protein nutrition.</span>
          </h2>
        </Reveal>
        <div className="space-y-6 text-lg leading-relaxed text-white/70 md:text-xl">
          <Reveal delay={2}>
            <p>
              Prosip was founded with a vision to make quality protein nutrition <span className="text-white">simple, accessible, and effective</span> for every Indian.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <p>
              Built by athletes who understand performance, recovery, discipline, and health, Prosip exists to help people fuel <span className="text-white">stronger and healthier lives</span>.
            </p>
          </Reveal>
          <Reveal delay={4}>
            <p>
              We believe protein is not just for athletes. <span className="gold-text font-semibold">It is essential for everyone.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Founders() {
  const founders = [
    { name: "Yash Patil", role: "Founder", initials: "YP" },
    { name: "Akhilesh Gawale", role: "Co-Founder", initials: "AG" },
  ];
  return (
    <section id="founders" className="relative py-32">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="mb-16 text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">Leadership</div>
            <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              The minds behind <span className="gold-text">Prosip.</span>
            </h2>
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {founders.map((f, i) => (
            <Reveal key={f.name} delay={i}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass-card group relative overflow-hidden rounded-3xl p-10 text-center transition-all hover:border-yellow-500/40 hover:shadow-[0_0_60px_rgba(234,179,8,0.2)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(234,179,8,0.15),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-yellow-500/30 bg-gradient-to-br from-yellow-500/20 to-yellow-700/5 font-display text-3xl font-bold text-yellow-400 shadow-[inset_0_2px_10px_rgba(234,179,8,0.2)]">
                    {f.initials}
                  </div>
                  <h3 className="mb-2 font-display text-2xl font-bold text-white">{f.name}</h3>
                  <div className="text-sm font-medium uppercase tracking-[0.2em] text-yellow-500">{f.role}</div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal>
          <div className="mb-12 text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">Find Us</div>
            <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
              Where to <span className="gold-text">Tap & Sip.</span>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="glass-card relative overflow-hidden rounded-3xl p-10 md:p-14"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-yellow-500/15 blur-3xl" />
            <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-yellow-500/30 bg-yellow-500/10 text-yellow-400">
                <MapPin className="h-7 w-7" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-500">Flagship Location</div>
                <h3 className="mb-2 font-display text-3xl font-bold text-white">Nitrro Wellness and Fitness Hub</h3>
                <p className="text-white/60">Official Prosip Machine Location</p>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="mb-16 text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">Contact</div>
            <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Let's <span className="gold-text">talk.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          <Reveal delay={0}>
            <div className="glass-card h-full rounded-2xl p-8">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-500/30 bg-yellow-500/10 text-yellow-400">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-white">Address</h3>
              <p className="text-sm leading-relaxed text-white/60">
                Shakti Chambers, Shop No. 07,<br />
                Sangamwadi, Pune - 411003
              </p>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="glass-card h-full rounded-2xl p-8">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-500/30 bg-yellow-500/10 text-yellow-400">
                <Phone className="h-5 w-5" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-white">Call Us</h3>
              <div className="space-y-2 text-sm">
                <a href="tel:+917972888578" className="block text-white/80 transition hover:text-yellow-400">+91 79728 88578</a>
                <a href="tel:+917057871341" className="block text-white/80 transition hover:text-yellow-400">+91 70578 71341</a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="glass-card h-full rounded-2xl p-8">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-500/30 bg-yellow-500/10 text-yellow-400">
                <Instagram className="h-5 w-5" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-white">Follow</h3>
              <a
                href="https://www.instagram.com/prosip_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-yellow-400"
              >
                @prosip_ <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-40">
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/25 blur-[140px]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#000,transparent_30%,transparent_70%,#000)]" />

      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <Reveal>
          <h2 className="mb-8 font-display text-5xl font-extrabold leading-[1.05] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            Join India's<br /><span className="gold-text">Protein Revolution.</span>
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <p className="mx-auto mb-10 max-w-xl text-lg text-white/60">
            Fuel stronger. Recover faster. Live healthier. Train. Tap. Sip.
          </p>
        </Reveal>
        <Reveal delay={2}>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-yellow-500 px-9 py-4 text-base font-semibold text-black transition-all hover:bg-yellow-400 hover:shadow-[0_0_60px_rgba(234,179,8,0.6)]"
          >
            Contact Prosip
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 md:flex-row">
        <ProsipLogo />
        <p className="text-xs text-white/40">© {new Date().getFullYear()} Prosip Nutrition. All rights reserved.</p>
        <p className="text-xs text-white/40">Train. Tap. Sip.</p>
      </div>
    </footer>
  );
}

function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <motion.a
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, type: "spring" }}
        href="https://wa.me/917972888578"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.4)] transition hover:bg-green-400"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </motion.a>
      <motion.a
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        href="tel:+917972888578"
        whileHover={{ scale: 1.1 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-black shadow-[0_0_30px_rgba(234,179,8,0.5)] transition hover:bg-yellow-400"
        aria-label="Call"
      >
        <Phone className="h-5 w-5" />
      </motion.a>
    </div>
  );
}

export default function ProsipSite() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <ScrollProgress />
      <MouseGlow />
      <Nav />
      <main>
        <Hero />
        <WhyProsip />
        <Products />
        <Story />
        <Founders />
        <Location />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
