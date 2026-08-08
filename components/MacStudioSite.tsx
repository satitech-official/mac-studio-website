"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Lenis from "lenis";
import { A11y, Autoplay, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  CalendarDays,
  Camera,
  Check,
  Clock3,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Paintbrush,
  Palette,
  Phone,
  Plus,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import {
  courses,
  faqs,
  gallery,
  processSteps,
  reasons,
  stats,
  testimonials,
} from "../data/content";

const PHONE = "+91 7838116352";
const WHATSAPP_NUMBER = "917838116352";

const registrationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+91[\s-]?)?[6-9]\d{9}$/, "Enter a valid Indian phone number"),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email address")]),
  age: z
    .string()
    .trim()
    .refine((value) => value === "" || (/^\d{1,3}$/.test(value) && Number(value) > 0 && Number(value) <= 110), "Enter a valid age"),
  city: z.string().trim().min(2, "Please enter your city").max(60),
  course: z.string().trim().min(1, "Please select a course"),
  preferredDate: z.string().refine((value) => !value || value >= new Date().toISOString().slice(0, 10), "Choose today or a future date"),
  message: z.string().trim().max(500, "Please keep your message under 500 characters"),
});

type RegistrationData = z.infer<typeof registrationSchema>;

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Courses", "courses"],
  ["Workshops", "workshops"],
  ["Gallery", "gallery"],
  ["Stories", "stories"],
  ["FAQ", "faq"],
  ["Contact", "contact"],
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className={`logo ${light ? "logo-light" : ""}`} aria-label="MAC Studio home">
      <span className="logo-mark">M</span>
      <span className="logo-copy"><b>MAC</b><em>STUDIO</em></span>
    </a>
  );
}

function SectionHeading({ kicker, title, copy, light = false }: { kicker: string; title: string; copy?: string; light?: boolean }) {
  return (
    <div className={`section-heading reveal ${light ? "is-light" : ""}`}>
      <span className="eyebrow"><i />{kicker}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function MagneticLink({ href, children, variant = "dark", onClick }: { href: string; children: React.ReactNode; variant?: "dark" | "light" | "outline"; onClick?: () => void }) {
  return <a className={`button button-${variant}`} href={href} onClick={onClick}>{children}<ArrowUpRight size={17} /></a>;
}

export default function MacStudioSite() {
  const [showLoader, setShowLoader] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [galleryCount, setGalleryCount] = useState(6);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [successLink, setSuccessLink] = useState("");
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100, active: false, label: "" });
  const dialogRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { name: "", phone: "", email: "", age: "", city: "Gurugram", course: "", preferredDate: "", message: "" },
  });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("mac-loader-seen");
    const timer = window.setTimeout(() => {
      setShowLoader(false);
      if (!seen) sessionStorage.setItem("mac-loader-seen", "true");
    }, seen ? 0 : reduced ? 150 : 1350);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const shouldUsePoster = window.matchMedia("(prefers-reduced-motion: reduce)").matches || connection?.saveData;
    if (!video || !shouldUsePoster) return;
    video.pause();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);

  useEffect(() => {
    let cleanup = () => {};
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, scrollModule]) => {
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
          gsap.fromTo(element, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } });
        });
        gsap.to(".hero-content", { yPercent: 10, opacity: .72, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: .8 } });
        gsap.to(".hero-media img, .hero-video", { yPercent: 7, scale: 1.16, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
        gsap.utils.toArray<HTMLElement>(".course-card").forEach((card, index) => {
          gsap.fromTo(card, { y: 42, rotateY: index % 2 ? 2 : -2 }, { y: 0, rotateY: 0, duration: .85, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 90%", once: true } });
        });
      });
      cleanup = () => context.revert();
    });
    return () => cleanup();
  }, []);

  useEffect(() => {
    let previous = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 40);
      setHeaderHidden(current > previous && current > 260 && !menuOpen);
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(available > 0 ? Math.min(current / available, 1) : 0);
      previous = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    const sections = navItems
      .map(([, id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: "-28% 0px -58% 0px", threshold: [0.05, .2, .45] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || modalOpen || lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, modalOpen, lightboxIndex]);

  useEffect(() => {
    if (!modalOpen) return;
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusable?.[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalOpen(false);
      if (event.key === "Tab" && focusable?.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") setLightboxIndex((lightboxIndex + 1) % visibleGallery.length);
      if (event.key === "ArrowLeft") setLightboxIndex((lightboxIndex - 1 + visibleGallery.length) % visibleGallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const move = (event: PointerEvent) => setCursor((old) => ({ ...old, x: event.clientX, y: event.clientY }));
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const categories = useMemo(() => ["All", ...Array.from(new Set(courses.map((course) => course.category)))], []);
  const filteredCourses = courseFilter === "All" ? courses : courses.filter((course) => course.category === courseFilter);
  const galleryCategories = useMemo(() => ["All", ...Array.from(new Set(gallery.map((item) => item.category)))], []);
  const filteredGallery = galleryFilter === "All" ? gallery : gallery.filter((item) => item.category === galleryFilter);
  const visibleGallery = filteredGallery.slice(0, galleryCount);

  function openRegistration(course = "") {
    setSelectedCourse(course);
    setValue("course", course);
    setSuccessLink("");
    setPopupBlocked(false);
    setModalOpen(true);
    setMenuOpen(false);
  }

  function closeRegistration() {
    setModalOpen(false);
    setSuccessLink("");
    setPopupBlocked(false);
    reset({ name: "", phone: "", email: "", age: "", city: "Gurugram", course: "", preferredDate: "", message: "" });
  }

  const onSubmit = handleSubmit(async (data) => {
    const message = `Hello MAC Studio,\n\nI would like to register.\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || "Not provided"}\nAge: ${data.age || "Not provided"}\nCity: ${data.city}\nInterested Course: ${data.course}\nPreferred Date: ${data.preferredDate || "Flexible"}\nMessage: ${data.message || "—"}\n\nThank you.`;
    const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setSuccessLink(link);
    const opened = window.open(link, "_blank", "noopener,noreferrer");
    setPopupBlocked(!opened);
  });

  function moveHeroLight(event: React.PointerEvent<HTMLElement>) {
    if (!heroRef.current || event.pointerType === "touch") return;
    const bounds = heroRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    heroRef.current.style.setProperty("--hero-x", `${x * 100}%`);
    heroRef.current.style.setProperty("--hero-y", `${y * 100}%`);
    heroRef.current.style.setProperty("--hero-shift-x", `${(x - .5) * 18}px`);
    heroRef.current.style.setProperty("--hero-shift-y", `${(y - .5) * 14}px`);
  }

  function resetHeroLight() {
    heroRef.current?.style.setProperty("--hero-shift-x", "0px");
    heroRef.current?.style.setProperty("--hero-shift-y", "0px");
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true"><i style={{ transform: `scaleX(${scrollProgress})` }} /></div>
      <AnimatePresence>{showLoader && (
        <motion.div className="loader" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: .6 } }} aria-hidden="true">
          <div className="loader-brush" />
          <span>MAC</span><small>STUDIO</small>
          <div className="loader-line"><i /></div>
        </motion.div>
      )}</AnimatePresence>

      <div className="cursor-dot" style={{ transform: `translate3d(${cursor.x}px,${cursor.y}px,0)`, width: cursor.active ? 72 : 14, height: cursor.active ? 72 : 14 }}>
        {cursor.active && cursor.label}
      </div>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${headerHidden ? "is-hidden" : ""}`}>
        <Logo light={!scrolled} />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, id]) => <a className={activeSection === id ? "active" : ""} key={id} href={`#${id}`} aria-current={activeSection === id ? "page" : undefined}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <button className="header-register" onClick={() => openRegistration()}>Register <ArrowUpRight size={15} /></button>
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></button>
        </div>
      </header>

      <AnimatePresence>{menuOpen && (
        <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="mobile-menu-top"><Logo light /><button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button></div>
          <nav>{navItems.map(([label, id], index) => <motion.a className={activeSection === id ? "active" : ""} key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * .04 }}>{label}<span>0{index + 1}</span></motion.a>)}</nav>
          <div className="mobile-menu-bottom"><button onClick={() => openRegistration()}>Register now <ArrowUpRight /></button><a href={`tel:${PHONE.replace(/\s/g, "")}`}><Phone size={16} />{PHONE}</a><div><a href="https://www.instagram.com/tasmacstudio/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.facebook.com/tasmacstudio/" target="_blank" rel="noopener noreferrer">Facebook</a></div></div>
        </motion.div>
      )}</AnimatePresence>

      <main id="main">
        <section className="hero" id="home" ref={heroRef} onPointerMove={moveHeroLight} onPointerLeave={resetHeroLight}>
          <div className="hero-media">
            <img src="https://images.pexels.com/photos/31280579/pexels-photo-31280579.jpeg?auto=compress&cs=tinysrgb&w=2200" alt="Artist painting a colourful canvas in a naturally lit studio" />
            <video ref={heroVideoRef} className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="https://images.pexels.com/photos/31280579/pexels-photo-31280579.jpeg?auto=compress&cs=tinysrgb&w=2200" aria-hidden="true">
              <source src="/videos/mac-studio-hero.mp4" type="video/mp4" />
            </video>
            <div className="hero-wash" />
          </div>
          <div className="hero-noise" />
          <div className="hero-cursor-light" />
          <div className="hero-wordmark" aria-hidden="true">CREATE</div>
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <div className="paint-streak paint-streak-one" /><div className="paint-streak paint-streak-two" />
          <div className="paint-drops" aria-hidden="true">{[0,1,2,3,4,5].map((drop) => <i key={drop} />)}</div>
          <div className="hero-content">
            <motion.p className="hero-kicker" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55 }}>Art <i /> Expression <i /> Imagination</motion.p>
            <h1 aria-label="MAC Studio"><motion.span initial={{ y: "110%", rotate: 1.5 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 1.05, delay: .62, ease: [0.16, 1, 0.3, 1] }}>MAC Studio</motion.span></h1>
            <motion.div className="hero-copy" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.55 }}>
              <h2>Ignite Your Creativity<br />Through Art</h2>
              <p>Immersive art classes, inspiring workshops and hands-on experiences for curious minds of every age.</p>
              <div className="hero-buttons"><button className="button button-light" onClick={() => openRegistration()}>Register now <ArrowUpRight size={17} /></button><a className="text-link" href="#workshops">Explore workshops <ArrowDown size={16} /></a></div>
              <div className="hero-mediums"><span><i />Painting</span><span><i />Sketching</span><span><i />Pottery</span></div>
            </motion.div>
          </div>
          <motion.aside className="hero-art-card" initial={{ opacity: 0, x: 40, rotate: 8 }} animate={{ opacity: 1, x: 0, y: [0, -9, 0], rotate: [3, 1.5, 3] }} transition={{ opacity: { delay: 1.4, duration: .9 }, x: { delay: 1.4, duration: .9, ease: [0.16, 1, 0.3, 1] }, y: { delay: 2.1, duration: 5, repeat: Infinity, ease: "easeInOut" }, rotate: { delay: 2.1, duration: 5, repeat: Infinity, ease: "easeInOut" } }}>
            <div><Sparkles size={16} /><span>Creative studio</span></div><strong>Make your<br /><em>mark.</em></strong><p>Sector 57 · Gurugram</p><i className="hero-card-line" />
          </motion.aside>
          <div className="hero-side-note"><span>Sector 57</span><span>Gurugram, India</span></div>
          <a className="hero-scroll" href="#about" aria-label="Scroll to about"><span>Scroll to explore</span><i><ArrowDown size={16} /></i></a>
        </section>

        <div className="marquee" aria-label="MAC Studio creative disciplines"><div>{[0,1].map((set) => <span key={set}>Painting <i>✦</i> Creativity <i>✦</i> Workshops <i>✦</i> Fine Arts <i>✦</i> Sketching <i>✦</i> Acrylic <i>✦</i> Canvas <i>✦</i> Pottery <i>✦</i> Calligraphy <i>✦</i> Creativity Never Stops <i>✦</i></span>)}</div></div>

        <section className="about section" id="about">
          <div className="about-grid">
            <div className="about-visual reveal" onPointerEnter={() => setCursor((c) => ({ ...c, active: true, label: "Create" }))} onPointerLeave={() => setCursor((c) => ({ ...c, active: false, label: "" }))}>
              <div className="about-main"><img src="https://images.pexels.com/photos/8382271/pexels-photo-8382271.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="Young artists focused on their paintings during an art class" /></div>
              <div className="about-small"><img src="https://images.pexels.com/photos/6925021/pexels-photo-6925021.jpeg?auto=compress&cs=tinysrgb&w=700" alt="A colourful artist palette with brushes" /></div>
              <span className="about-stamp">A space<br />to make<br />& become</span>
            </div>
            <div className="about-copy">
              <SectionHeading kicker="Inside MAC Studio" title="Where curiosity is given a canvas." />
              <p className="about-lead reveal">MAC Studio is a welcoming creative space where people can learn, experiment and express themselves—without the pressure to get everything right the first time.</p>
              <p className="reveal">Through encouraging mentorship and hands-on practice, learners build technique alongside something equally valuable: the confidence to trust their own ideas.</p>
              <div className="vision-mission reveal"><div><span>Our vision</span><p>To make art accessible, joyful, expressive and meaningful for learners of every age.</p></div><div><span>Our mission</span><p>To offer warm mentorship, tactile learning and inspiring artistic experiences.</p></div></div>
              <MagneticLink href="#courses" variant="outline">Find your medium</MagneticLink>
            </div>
          </div>
          <div className="stats reveal"><div className="stats-note"><Sparkles size={18} /><span>Owner verification needed</span><p>Values remain intentionally blank until MAC Studio confirms them.</p></div>{stats.map((stat) => <div key={stat.label} className="stat"><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
        </section>

        <section className="reasons-section section">
          <div className="section-split"><SectionHeading kicker="Why MAC" title="Guidance with soul. Practice with purpose." /><p className="reveal">A creative studio should make you feel more like yourself. Every experience is shaped around thoughtful guidance, real making and room to discover.</p></div>
          <div className="reasons-grid">{reasons.map(([number, title, copy]) => <article className="reason-card reveal" key={number}><div><span>{number}</span><Palette size={22} /></div><h3>{title}</h3><p>{copy}</p><i /></article>)}</div>
        </section>

        <section className="courses section" id="courses">
          <div className="section-split"><SectionHeading kicker="Studio programmes" title="Find the medium that moves you." copy="Sample course content is editable; contact the studio to confirm current durations and schedules." /><button className="round-link" onClick={() => openRegistration()}>Register<br />your interest <ArrowUpRight /></button></div>
          <div className="filter-row" role="group" aria-label="Filter courses">{categories.map((category) => <button key={category} className={courseFilter === category ? "active" : ""} onClick={() => setCourseFilter(category)}>{category}</button>)}</div>
          <motion.div layout className="course-grid"><AnimatePresence mode="popLayout">{filteredCourses.map((course) => <motion.article layout initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }} className="course-card" key={course.title}>
            <div className="course-image"><img src={course.image} alt={`${course.title} creative practice`} loading="lazy" /><span>{course.category}</span><button onClick={() => openRegistration(course.title)} aria-label={`Register interest in ${course.title}`}><ArrowUpRight /></button></div>
            <div className="course-body"><div className="course-meta"><span>{course.duration}</span><span>{course.level}</span></div><h3>{course.title}</h3><p>{course.description}</p><div><span>{course.age}</span><button onClick={() => openRegistration(course.title)}>Enquire <ArrowRight size={15} /></button></div></div>
          </motion.article>)}</AnimatePresence></motion.div>
          <p className="sample-note">* Course names, duration formats and age guidance are editable sample content pending studio confirmation.</p>
        </section>

        <section className="workshops section" id="workshops">
          <div className="workshop-shell">
            <div className="workshop-art reveal"><img src="https://images.pexels.com/photos/1107574/pexels-photo-1107574.jpeg?auto=compress&cs=tinysrgb&w=1500" alt="Hands painting an expressive artwork in progress" loading="lazy" /><div><span>weekend</span><span>studio</span><span>sessions</span></div></div>
            <div className="workshop-copy"><SectionHeading light kicker="Workshops" title="A fresh reason to make something." /><p className="reveal">Short-format experiences designed for discovery, connection and the simple pleasure of working with your hands.</p><div className="empty-workshop reveal"><CalendarDays /><div><span>Next workshop drop</span><h3>Dates are being curated.</h3><p>No unverified dates or countdowns here. Register your interest and MAC Studio can share the next confirmed session.</p></div></div><button className="button button-light" onClick={() => openRegistration("Upcoming workshop")}>Join the interest list <ArrowUpRight size={17} /></button></div>
          </div>
        </section>

        <section className="gallery-section section" id="gallery">
          <div className="section-split"><SectionHeading kicker="The art of becoming" title="Made in moments of courage." copy="A curated visual moodboard using royalty-free Pexels and Unsplash imagery; replace with official studio photography when available." /><div className="gallery-count"><strong>{String(filteredGallery.length).padStart(2,"0")}</strong><span>visual stories</span></div></div>
          <div className="filter-row" role="group" aria-label="Filter gallery">{galleryCategories.map((category) => <button key={category} className={galleryFilter === category ? "active" : ""} onClick={() => { setGalleryFilter(category); setGalleryCount(6); }}>{category}</button>)}</div>
          <div className="gallery-grid">{visibleGallery.map((item, index) => <button key={item.src} className={`gallery-item gallery-item-${index % 5}`} onClick={() => setLightboxIndex(index)} aria-label={`View ${item.caption}`} onPointerEnter={() => setCursor((c) => ({ ...c, active: true, label: "View" }))} onPointerLeave={() => setCursor((c) => ({ ...c, active: false, label: "" }))}><img src={item.src} alt={item.alt} loading="lazy" /><span><i>{item.category}</i>{item.caption}</span></button>)}</div>
          {galleryCount < filteredGallery.length && <button className="load-more" onClick={() => setGalleryCount((count) => count + 4)}><Plus /> Load more work</button>}
        </section>

        <section className="process section">
          <div className="section-split"><SectionHeading kicker="The creative process" title="Not a finish line. A way of seeing." /><p className="reveal">Creativity grows by moving through uncertainty—one idea, one mark and one generous attempt at a time.</p></div>
          <ol className="process-list">{processSteps.map((step, index) => <li className="reveal" key={step}><span>{String(index + 1).padStart(2,"0")}</span><i><Paintbrush /></i><h3>{step}</h3>{index < processSteps.length - 1 && <b />}</li>)}</ol>
        </section>

        <section className="stories section" id="stories">
          <div className="story-label"><span>Sample stories</span><p>Replace with verified learner and parent feedback before publishing as testimonials.</p></div>
          <SectionHeading light kicker="Voices from the studio" title="What it feels like to create." />
          <Swiper className="story-slider" modules={[Autoplay, Pagination, Keyboard, A11y]} autoplay={{ delay: 5200, disableOnInteraction: false, pauseOnMouseEnter: true }} pagination={{ clickable: true }} keyboard={{ enabled: true }} spaceBetween={28} slidesPerView={1}>
            {testimonials.map((story, index) => <SwiperSlide key={story.name}><article><span>“</span><blockquote>{story.quote}</blockquote><div><i>0{index + 1}</i><p><strong>{story.name}</strong><small>{story.role}</small></p></div></article></SwiperSlide>)}
          </Swiper>
        </section>

        <section className="events section" id="events">
          <div className="section-split"><SectionHeading kicker="Studio calendar" title="Come for the art. Stay for the energy." /><p className="reveal">Confirmed public dates have not yet been supplied. These clear states keep the page useful without inventing an event calendar.</p></div>
          <div className="events-grid"><article className="event-feature reveal"><span className="event-status">Upcoming · awaiting dates</span><div><h3>Exhibitions & student showcases</h3><p>Celebrate evolving practice, personal milestones and the courage to share creative work.</p><button onClick={() => openRegistration("Exhibitions & showcases")}>Stay informed <ArrowUpRight /></button></div></article><article className="event-small reveal"><Clock3 /><span>Weekend sessions</span><h3>Small-format creative workshops</h3><p>Current topics and timings available directly from the studio.</p><button onClick={() => openRegistration("Weekend workshop")}>Enquire</button></article><article className="event-small event-clay reveal"><Sparkles /><span>Community moments</span><h3>Festival activities & art events</h3><p>Seasonal experiences will appear here as soon as they are confirmed.</p><a href="https://www.instagram.com/tasmacstudio/" target="_blank" rel="noopener noreferrer">Follow updates</a></article></div>
        </section>

        <section className="faq section" id="faq">
          <SectionHeading kicker="Frequently asked" title="Before you begin." />
          <div className="faq-layout"><div className="faq-side reveal"><p>Still deciding?</p><h3>Tell us what you want to explore.</h3><a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello MAC Studio, I have a question about your art classes and workshops.")}`} target="_blank" rel="noopener noreferrer">Ask on WhatsApp <MessageCircle /></a></div><div className="accordion">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}><h3><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`}><span>{String(index + 1).padStart(2,"0")}</span>{question}<i>{openFaq === index ? <Minus /> : <Plus />}</i></button></h3><div id={`faq-answer-${index}`} className="faq-answer" role="region"><p>{answer}</p></div></div>)}</div></div>
        </section>

        <section className="big-cta">
          <div className="cta-canvas"><span /><i /><b /></div>
          <div><span className="eyebrow"><i />Begin somewhere</span><h2>Your creative journey<br /><em>starts here.</em></h2><p>Step into a space where ideas become artworks, confidence grows and creativity has no limits.</p><div><button className="button button-dark" onClick={() => openRegistration()}>Register now <ArrowUpRight size={17} /></button><a href={`tel:${PHONE.replace(/\s/g, "")}`}><Phone size={17} />Call {PHONE}</a></div></div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-copy"><SectionHeading kicker="Visit the studio" title="Make space for your imagination." /><div className="contact-details"><a href={`tel:${PHONE.replace(/\s/g, "")}`}><span><Phone /></span><div><small>Phone & WhatsApp</small><strong>{PHONE}</strong></div></a><div><span><MapPin /></span><div><small>Area</small><strong>Sector 57, Gurugram, Haryana</strong><em>Exact public pin pending studio confirmation</em></div></div><div><span><Clock3 /></span><div><small>Studio hours</small><strong>Available on enquiry</strong><em>Business hours are not yet verified</em></div></div></div><div className="social-row"><a href="https://www.instagram.com/tasmacstudio/" target="_blank" rel="noopener noreferrer"><Camera />Instagram</a><a href="https://www.facebook.com/tasmacstudio/" target="_blank" rel="noopener noreferrer"><Users />Facebook</a></div></div>
          <div className="map-wrap reveal"><iframe title="Map search for Sector 57, Gurugram" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Sector+57,+Gurugram,+Haryana&output=embed" /><a href="https://www.google.com/maps/search/?api=1&query=Sector+57+Gurugram+Haryana" target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight /></a><span>Area map · not an exact studio pin</span></div>
        </section>
      </main>

      <footer>
        <div className="footer-top"><div><Logo light /><p>Ignite your creativity through art.</p></div><form onSubmit={(event) => { event.preventDefault(); setNewsletterDone(true); }}><label htmlFor="newsletter">Studio notes, in your inbox</label><div><input id="newsletter" type="email" required placeholder="Your email address" aria-describedby="newsletter-note" /><button aria-label="Submit newsletter demo"><ArrowRight /></button></div><small id="newsletter-note">{newsletterDone ? "Demo saved locally—email integration is still required." : "Demo only. A mailing service is required before subscriptions can be collected."}</small></form></div>
        <div className="footer-links"><div><span>Explore</span>{navItems.slice(0,4).map(([label,id]) => <a href={`#${id}`} key={id}>{label}</a>)}</div><div><span>Popular mediums</span><a href="#courses">Canvas painting</a><a href="#courses">Sketching</a><a href="#courses">Calligraphy</a><a href="#courses">Kids art</a></div><div><span>Connect</span><a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a><a href="https://www.instagram.com/tasmacstudio/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.facebook.com/tasmacstudio/" target="_blank" rel="noopener noreferrer">Facebook</a></div><button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp /><span>Back to top</span></button></div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} MAC Studio. All rights reserved.</p><div><a href="#home">Privacy</a><a href="#home">Terms</a></div><span>Sector 57 · Gurugram</span></div>
      </footer>

      <div className="floating-actions"><a className="float-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello MAC Studio, I would like to know more about your art classes and workshops.")}`} target="_blank" rel="noopener noreferrer" aria-label="Enquire on WhatsApp"><MessageCircle /><span>WhatsApp</span></a><a href="https://www.facebook.com/tasmacstudio/" target="_blank" rel="noopener noreferrer" aria-label="Visit MAC Studio on Facebook"><Users /></a></div>

      <AnimatePresence>{lightboxIndex !== null && visibleGallery[lightboxIndex] && (
        <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={() => setLightboxIndex(null)}>
          <button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close image viewer"><X /></button><button className="lightbox-prev" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + visibleGallery.length) % visibleGallery.length); }} aria-label="Previous image"><ArrowLeft /></button><motion.figure onClick={(event) => event.stopPropagation()} initial={{ scale: .95 }} animate={{ scale: 1 }}><img src={visibleGallery[lightboxIndex].src} alt={visibleGallery[lightboxIndex].alt} /><figcaption><span>{visibleGallery[lightboxIndex].category}</span>{visibleGallery[lightboxIndex].caption}</figcaption></motion.figure><button className="lightbox-next" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % visibleGallery.length); }} aria-label="Next image"><ArrowRight /></button>
        </motion.div>
      )}</AnimatePresence>

      <AnimatePresence>{modalOpen && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) closeRegistration(); }}>
          <motion.div className="registration-modal" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="registration-title" initial={{ opacity: 0, y: 30, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .98 }}>
            <button className="modal-close" onClick={closeRegistration} aria-label="Close registration"><X /></button>
            {!successLink ? <><div className="modal-heading"><span className="eyebrow"><i />Start a conversation</span><h2 id="registration-title">Let’s make<br /><em>something wonderful.</em></h2><p>Share a few details. We’ll prepare a WhatsApp message for you to review and send.</p></div><form onSubmit={onSubmit} noValidate>
              <div className="field field-wide"><label htmlFor="name">Full name *</label><input id="name" {...register("name")} aria-invalid={!!errors.name} /><small>{errors.name?.message}</small></div>
              <div className="field"><label htmlFor="phone">Phone number *</label><input id="phone" inputMode="tel" placeholder="98765 43210" {...register("phone")} aria-invalid={!!errors.phone} /><small>{errors.phone?.message}</small></div>
              <div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} /><small>{errors.email?.message}</small></div>
              <div className="field"><label htmlFor="age">Age</label><input id="age" inputMode="numeric" {...register("age")} aria-invalid={!!errors.age} /><small>{errors.age?.message}</small></div>
              <div className="field"><label htmlFor="city">City *</label><input id="city" {...register("city")} aria-invalid={!!errors.city} /><small>{errors.city?.message}</small></div>
              <div className="field field-wide"><label htmlFor="course">Interested course *</label><select id="course" {...register("course")} defaultValue={selectedCourse} aria-invalid={!!errors.course}><option value="">Choose an experience</option>{courses.map((course) => <option value={course.title} key={course.title}>{course.title}</option>)}<option value="Upcoming workshop">Upcoming workshop</option><option value="Not sure yet">Help me choose</option></select><small>{errors.course?.message}</small></div>
              <div className="field field-wide"><label htmlFor="date">Preferred date</label><input id="date" type="date" min={new Date().toISOString().slice(0,10)} {...register("preferredDate")} aria-invalid={!!errors.preferredDate} /><small>{errors.preferredDate?.message}</small></div>
              <div className="field field-wide"><label htmlFor="message">Message</label><textarea id="message" rows={3} placeholder="Tell us what you’d love to explore…" {...register("message")} aria-invalid={!!errors.message} /><small>{errors.message?.message}</small></div>
              <button className="button button-dark submit-button" type="submit" disabled={isSubmitting}>{isSubmitting ? "Preparing…" : "Prepare WhatsApp registration"}<MessageCircle size={18} /></button><p className="form-note">Nothing is sent automatically. You’ll review the message in WhatsApp first.</p>
            </form></> : <div className="success-state" aria-live="polite"><div className="success-icon"><Check /></div><span>Registration prepared</span><h2>Your registration has been prepared successfully.</h2><p>{popupBlocked ? "Your browser blocked the new window. Use the button below to continue safely." : "WhatsApp should be opening now. Review your details, then choose Send."}</p><a className="button button-dark" href={successLink} target="_blank" rel="noopener noreferrer">Continue to WhatsApp <MessageCircle /></a><button onClick={closeRegistration}>Done for now</button></div>}
          </motion.div>
        </motion.div>
      )}</AnimatePresence>
    </>
  );
}
