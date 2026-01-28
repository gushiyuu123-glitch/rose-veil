// src/components/MinimalHeader.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MinimalHeader() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ===== 初回ふわっと出現 =====
    gsap.fromTo(
      el,
      { opacity: 0, y: -16, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "power2.out",
        delay: 0.4,
      }
    );

    // ===== スクロールでうっすら背景をつける =====
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Hero 付近 → 完全透明
          el.classList.remove("bg-active");
        } else {
          // Hero を離れた → 薄膜を付与
          el.classList.add("bg-active");
        }
      },
      { threshold: 0.1 }
    );

    // hero セクション監視
    const hero = document.querySelector(".hero-section");
    if (hero) io.observe(hero);

    return () => io.disconnect();
  }, []);

  return (
    <header
      ref={ref}
      className="
        fixed top-0 left-0 right-0 z-[99]
        h-[70px]
        px-8 flex items-center
        backdrop-blur-[2px]
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
      h-[80px]
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
