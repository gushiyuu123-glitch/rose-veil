// src/components/MinimalHeader_sp.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MinimalHeader_sp() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* ============================================
       初回フェード（SPは軽く・速く）
    ============================================ */
    gsap.fromTo(
      el,
      { opacity: 0, y: -14, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power2.out",
        delay: 0.3,
      }
    );

    /* ============================================
       スクロールで透明膜付与（PCより弱め）
    ============================================ */
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Hero 付近は完全透明
          el.classList.remove("bg-active-sp");
        } else {
          // 離れるとごく薄膜
          el.classList.add("bg-active-sp");
        }
      },
      { threshold: 0.1 }
    );

    const hero = document.querySelector(".hero-section");
    if (hero) io.observe(hero);

    return () => io.disconnect();
  }, []);

  return (
    <header
      ref={ref}
      className="
        fixed top-0 left-0 right-0 z-[99]
        h-[64px]              /* ← SP最適化 */
        px-5 flex items-center
        backdrop-blur-[3px]   /* ← SPは blur 弱め */
        transition-all duration-500
      "
    >
      {/* ロゴ（Heroへ戻る） */}
      <a
        href="#hero"
        className="
          group
          block
          transition-all
          cursor-pointer
        "
      >
        <img
          src="roseveil-logo.png"
          alt="ROSE VEIL"
          className="
            h-[62px]       /* ← SP版は少し縮小 */
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
