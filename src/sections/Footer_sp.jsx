// src/sections/Footer_sp.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Footer_sp() {
  const rootRef = useRef(null);

  /* ================================================
     GSAP（SP版：呼吸を弱めて軽く）
  ================================================= */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    gsap.set(el.querySelectorAll(".ft-fade-sp"), {
      opacity: 0,
      y: 16,
      filter: "blur(10px)",
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
          y: -0.8,
          duration: 4.5,
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
        bg-black text-white
        overflow-hidden
      "
    >
      {/* ================================================
          BACKGROUND（SP：黒 × 霧 × 粒子を薄め）
      ================================================= */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 pointer-events-none
          bg-[radial-gradient(circle_at_40%_55%,rgba(0,0,0,0.32),rgba(0,0,0,0.68))]
          opacity-[0.28]
          mix-blend-multiply
        "
      />

      {/* カラーミスト（SP版薄め） */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 opacity-[0.18] blur-[70px]
          mix-blend-screen pointer-events-none
        "
        style={{
          background: `
            radial-gradient(680px 480px at 38% 38%, rgba(255,90,140,0.16), transparent 68%),
            radial-gradient(720px 520px at 70% 56%, rgba(170,200,255,0.14), transparent 68%),
            radial-gradient(620px 440px at 50% 26%, rgba(255,255,255,0.12), transparent 60%)
          `,
        }}
      />

      {/* 霧レイヤー（SP縮小） */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 pointer-events-none flex justify-center
        "
      >
        <div
          className="
            absolute left-1/2 -translate-x-1/2
            bottom-[-8vh]
            w-[130vw] h-[110vh]
            bg-[url('/mist/roseveil-mist1.png')]
            bg-cover bg-no-repeat
            opacity-[0.22] blur-[6px]
            mix-blend-screen
          "
        />
      </div>

      {/* 粒子 */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          opacity-[0.06]
          bg-[url('/grain.png')] bg-repeat
          mix-blend-soft-light
        "
      />

      {/* ================================================
          BRAND COPY
      ================================================= */}
      <div className="relative z-10 text-center px-6 max-w-[680px] mx-auto">
        <h2 className="ft-fade-sp text-[1.15rem] tracking-[0.26em] text-white/80">
          ROSE&nbsp;VEIL&nbsp;FRAGRANCE
        </h2>

        <p
          className="
            ft-fade-sp mt-6
            text-[0.9rem]
            text-white/52 leading-[1.82]
          "
        >
          香りは “強さ” ではなく、距離で伝わる。  
          揺れた瞬間にふわりとひらく静かな余韻。  
          それがあなたの生活の“輪郭”を整えます。
        </p>

        <div className="ft-fade-sp w-[58px] h-[1px] bg-white/12 mx-auto mt-10" />
      </div>

      {/* ================================================
          NAVIGATION
      ================================================= */}
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

      {/* ================================================
          COPYRIGHT + Instagramリンク（存在感ほぼゼロ）
      ================================================= */}
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
            text-white/26
            hover:text-white/70
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
