// src/components/MinimalHeader.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MinimalHeader() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* -------------------------------------------------------
       初回フェード（PCは少しゆったり・上質さを演出）
    ------------------------------------------------------- */
    gsap.fromTo(
      el,
      { opacity: 0, y: -18, filter: "blur(14px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.35,
        ease: "power2.out",
        delay: 0.28,
      }
    );

    /* -------------------------------------------------------
       スクロール膜（PC = SPより薄く長く伸びる）
       “静かな透明膜 → ほんのり光膜”
       bg-active クラスで切り替え
    ------------------------------------------------------- */
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("bg-active");
        } else {
          el.classList.add("bg-active");
        }
      },
      { threshold: 0.1 }
    );

    const hero = document.querySelector(".hero-section");
    io.observe(hero || document.body);

    return () => io.disconnect();
  }, []);

  return (
    <header
      ref={ref}
      className="
        fixed top-0 left-0 right-0 z-[99]
        h-[60px]
        px-10 flex items-center
        transition-all duration-500

        /* 初期は透明 */
        backdrop-blur-[1px]
      "
    >
      {/* -------------------------------------------
          背景膜（PC版は“静かに光る黒ベール”）
      ------------------------------------------- */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 pointer-events-none
          opacity-0 bg-white/0
          transition-all duration-500

          /* Heroを離れたら淡い光膜に */
         bg-active:bg-white/3
          bg-active:backdrop-blur-[4px]
        "
      />

      {/* -------------------------------------------
          LOGO（PCは大きめ・静かな存在感）
      ------------------------------------------- */}
   <a
  href="#hero"
  className="flex items-end gap-[6px] cursor-pointer group select-none"
>
  {/* Rose Veil 筆記体ロゴ（主役） */}
  <img
    src="/roseveil-logo1.png"
    alt="ROSE VEIL"
    className="
      h-[42px]
      opacity-85
      translate-y-[3.5px]
      transition-all duration-700
      group-hover:opacity-100
    "
  />

  {/* Rose Veil アイコン（従） */}
  <img
    src="/roseveil-logo2.png"
    alt="ROSE VEIL ICON"
    className="
      h-[36px]
      opacity-85
      translate-y-[3px]
      transition-all duration-700
      group-hover:opacity-100
    "
  />
</a>

    </header>
  );
}
