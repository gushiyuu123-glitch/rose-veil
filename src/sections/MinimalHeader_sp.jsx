// src/components/MinimalHeader_sp.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MinimalHeader_sp() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* ============================================
       初回フェード（SP：軽く速く）
    ============================================ */
    gsap.fromTo(
      el,
      { opacity: 0, y: -14, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.05,
        ease: "power2.out",
        delay: 0.25,
      }
    );

    /* ============================================
       スクロールで“ごく薄い膜”をオン
    ============================================ */
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
        h-[64px]
        px-5 flex items-center
        transition-all duration-500
        backdrop-blur-[2px]      /* ← SPは弱めのblur */
      "
    >
      {/* 薄光膜：class付与でオンオフ */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          opacity-0
          transition-all duration-500
          bg-white/0
          bg-active-sp:bg-white/8          /* ← スクロール時の柔光膜 */
          bg-active-sp:backdrop-blur-[3px] /* ← 最小限の滲み */
        "
      />

      {/* ロゴ（静かな透明感） */}
      <a
        href="#hero"
        className="
          group block cursor-pointer transition-all
        "
      >
        <img
          src="/roseveil-logo.png"
          alt="ROSE VEIL"
          className="
            h-[56px]              /* ← SP黄金比サイズ */
            opacity-90
            group-hover:opacity-100
            transition-all duration-500
            select-none
          "
        />
      </a>
    </header>
  );
}
