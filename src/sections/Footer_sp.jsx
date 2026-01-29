// src/sections/Footer_sp.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Footer_sp() {
  const rootRef = useRef(null);

  /* ================================================
     GSAP（SP版：淡く・静かに）
  ================================================= */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    gsap.set(el.querySelectorAll(".ft-fade-sp"), {
      opacity: 0,
      y: 14,
      filter: "blur(12px)",
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        gsap.to(el.querySelectorAll(".ft-fade-sp"), {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.25,
          ease: "power2.out",
          stagger: 0.12,
        });

        gsap.to(".ft-breath-sp", {
          y: -1.2,
          duration: 5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        io.disconnect();
      },
      { threshold: 0.12 }
    );

    io.observe(el);
  }, []);

  return (
<footer
  ref={rootRef}
  className="
    relative w-full
    pt-[14vh] pb-[10vh]
    overflow-hidden
    bg-black text-white
  "
>

  {/* =========================================================
      背景 深度レイヤー（黒の中に"静かな霧"）
     ========================================================= */}
  <div
    aria-hidden="true"
    className="
      absolute inset-0 pointer-events-none
      opacity-[0.20]
      bg-[radial-gradient(
        900px_900px_at_50%_60%,
        rgba(255,140,170,0.12),
        rgba(0,0,0,0.7)
      )]
    "
  />

  {/* 白 × 青 × ピンクのカラーミスト（SP最適化） */}
  <div
    aria-hidden="true"
    className="
      absolute inset-0 pointer-events-none
      opacity-[0.22]
      blur-[65px]
    "
    style={{
      background: `
        radial-gradient(620px 480px at 40% 38%, rgba(255,150,170,0.16), transparent 60%),
        radial-gradient(700px 520px at 76% 62%, rgba(170,200,255,0.14), transparent 65%),
        radial-gradient(680px 500px at 50% 28%, rgba(255,255,255,0.14), transparent 60%)
      `,
    }}
  />

  {/* 霧（vertical） */}
  <div
    aria-hidden="true"
    className="absolute inset-0 pointer-events-none flex justify-center"
  >
    <div
      className="
        absolute left-1/2 -translate-x-1/2
        bottom-[-10vh]
        w-[130vw] h-[115vh]
        bg-[url('/mist/roseveil-mist1.png')]
        bg-cover bg-no-repeat
        opacity-[0.20]
        blur-[7px]
      "
    />
  </div>

  {/* 粒子（world感） */}
  <div
    aria-hidden="true"
    className="
      absolute inset-0
      opacity-[0.08]
      bg-[url('/grain.png')] bg-repeat
      mix-blend-soft-light
    "
  />

  {/* =========================================================
      BRAND COPY
     ========================================================= */}
  <div className="relative z-10 text-center px-6 max-w-[700px] mx-auto">
    <h2 className="ft-fade-sp text-[1.15rem] tracking-[0.26em] text-white/78">
      ROSE&nbsp;VEIL&nbsp;FRAGRANCE
    </h2>

    <p
      className="
        ft-fade-sp mt-6
        text-[0.9rem]
        text-white/52
        leading-[1.82]
      "
    >
      香りは “強さ” ではなく距離で伝わる。  
      揺れた瞬間にふわりとひらく静かな余韻が、<br></br>
      あなたの日常の“輪郭”を静かに整えます。
    </p>

    <div className="ft-fade-sp w-[58px] h-[1px] bg-white/14 mx-auto mt-10" />
  </div>

  {/* =========================================================
      NAVIGATION（整理済み）
     ========================================================= */}
  <div
    className="
      ft-fade-sp
      mt-[10vh]
      w-[92%] max-w-[820px] mx-auto
      grid grid-cols-1 gap-12
      text-center
    "
  >
    <div className="space-y-3">
      <div className="text-[0.72rem] tracking-[0.22em] text-white/40">
        PRODUCTS
      </div>
      <a className="text-white/70 hover:text-white transition">WHITE</a>
      <a className="text-white/70 hover:text-white transition">VEIL</a>
      <a className="text-white/70 hover:text-white transition">BLUE</a>
    </div>

    <div className="space-y-3">
      <div className="text-[0.72rem] tracking-[0.22em] text-white/40">
        INFORMATION
      </div>
      <a className="text-white/70 hover:text-white transition">ABOUT</a>
      <a className="text-white/70 hover:text-white transition">INGREDIENTS</a>
      <a className="text-white/70 hover:text-white transition">Q&A</a>
    </div>

    <div className="space-y-3">
      <div className="text-[0.72rem] tracking-[0.22em] text-white/40">
        SOCIAL
      </div>
      <a className="text-white/70 hover:text-white transition">INSTAGRAM</a>
      <a className="text-white/70 hover:text-white transition">NOTE</a>
    </div>
  </div>

  {/* =========================================================
      COPYRIGHT AREA
     ========================================================= */}
  <div className="relative z-10 mt-[12vh] text-center">
    <p className="ft-fade-sp text-[0.72rem] text-white/36 tracking-[0.18em]">
      © {new Date().getFullYear()} GUSHIKEN DESIGN — ROSE SERIES
    </p>

    <p className="mt-3 text-[0.7rem] text-white/26 tracking-[0.22em] ft-breath-sp">
      Designed with silence, margin, and breath.
    </p>

    <a
      href="https://www.instagram.com/gushikendesign/"
      target="_blank"
      rel="noopener noreferrer"
      className="
        ft-fade-sp block mt-8
        text-[0.74rem]
        text-white/26 hover:text-white/70
        tracking-[0.20em]
        transition-all
      "
    >
      INSTAGRAM
    </a>

    <a
      href="https://gushikendesign.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="
        block mt-4
        text-[0.74rem]
        text-white/36 hover:text-white/70
        tracking-[0.20em]
        transition-all
      "
    >
      GushikenDesign.com
    </a>
  </div>
</footer>
  );
}
