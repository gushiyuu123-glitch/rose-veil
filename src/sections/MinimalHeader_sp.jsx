// src/components/MinimalHeader_sp.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MinimalHeader_sp() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* --------------------------------------------
       初回フェード（SP向けに最も自然な“浮上”）
    -------------------------------------------- */
    gsap.fromTo(
      el,
      { opacity: 0, y: -12, filter: "blur(14px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.0,
        ease: "power2.out",
        delay: 0.18,
      }
    );

    /* --------------------------------------------
       SCROLL：背景膜（極薄 → ほんのり発光）
       - bg-active-sp が付くと光膜が出る
       - Rose Veil の静かな“膜”を再現
    -------------------------------------------- */
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

        /* ★ ほぼ透明のまま空気だけ残す */
        backdrop-blur-[1px]
      "
    >
      {/* --------------------------------------------
          背景「極薄光膜」— Rose Veil の静けさ
          発火は .bg-active-sp に紐づく
      -------------------------------------------- */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 pointer-events-none
          opacity-0 bg-white/0
          transition-all duration-500

          /* ★ Scroll 発火版（膜の濃度最小に統一） */
          bg-active-sp:bg-white/4
          bg-active-sp:backdrop-blur-[3px]
        "
      />

      {/* --------------------------------------------
          LOGO — 余白の中で“静かに光る”
      -------------------------------------------- */}
      <a
        href="#hero"
        className="group block cursor-pointer transition-opacity"
      >
        <img
          src="/roseveil-logo.png"
          alt="ROSE VEIL"
          className="
            h-[52px]
            opacity-80
            group-hover:opacity-100
            transition-all duration-500
            select-none
          "
        />
      </a>
    </header>
  );
}
