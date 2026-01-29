// src/components/MinimalHeader_sp.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MinimalHeader_sp() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* ================================
       初回フェード（さらに軽く・薄く）
    ================================ */
    gsap.fromTo(
      el,
      { opacity: 0, y: -10, filter: "blur(12px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power2.out",
        delay: 0.22,
      }
    );

    /* ================================
       スクロール薄膜（極薄）
    ================================ */
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("bg-active-sp");
        } else {
          el.classList.add("bg-active-sp");
        }
      },
      { threshold: 0.1 }
    );

    const hero = document.querySelector(".hero-section") || document.body;
    io.observe(hero);

    return () => io.disconnect();
  }, []);

  return (
    <header
      ref={ref}
      className="
        fixed top-0 left-0 right-0 z-[99]
        h-[62px]
        px-5 flex items-center
        transition-all duration-500
        backdrop-blur-[1px]     /* ← さらに薄い滲み */
      "
    >
      {/* ◆ 極薄光膜：4%  */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          opacity-0
          transition-all duration-500
          bg-white/0
          bg-active-sp:bg-white/4           /* ← 8% → 4% */
          bg-active-sp:backdrop-blur-[2px]  /* ← blur も最小に */
        "
      />

      {/* ロゴ：存在を薄く・hoverで光る */}
      <a
        href="#hero"
        className="group block cursor-pointer transition-opacity"
      >
        <img
          src="/roseveil-logo.png"
          alt="ROSE VEIL"
          className="
            h-[52px]
            opacity-85               /* ← 90 → 80 */
            group-hover:opacity-100
            transition-all duration-500
            select-none
          "
        />
      </a>
    </header>
  );
}
