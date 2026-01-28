// src/sections/Footer.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Footer() {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    gsap.set(el.querySelectorAll(".ft-fade"), {
      opacity: 0,
      y: 18,
      filter: "blur(12px)",
    });

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      gsap.to(el.querySelectorAll(".ft-fade"), {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.35,
        ease: "power2.out",
        stagger: 0.12,
      });

      gsap.to(".ft-breath", {
        y: -1.0,
        duration: 4.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      io.disconnect();
    }, { threshold: 0.14 });

    io.observe(el);
  }, []);

  return (
    <footer
      ref={rootRef}
      className="
        relative w-full
        pt-[18vh] pb-[11vh]
        bg-black text-white
        overflow-hidden
      "
    >

      {/* === BACKGROUND（黒 × 深度 × 粒子 × 薄霧） === */}

      <div
        aria-hidden="true"
        className="
          absolute inset-0 pointer-events-none
          bg-[radial-gradient(circle_at_40%_55%,rgba(0,0,0,0.35),rgba(0,0,0,0.65))]
          opacity-[0.32] mix-blend-multiply
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute inset-0 opacity-[0.22] blur-[86px]
          mix-blend-screen pointer-events-none
        "
        style={{
          background: `
            radial-gradient(760px 520px at 36% 40%, rgba(255,90,140,0.18), transparent 68%),
            radial-gradient(840px 600px at 72% 58%, rgba(170,200,255,0.16), transparent 68%),
            radial-gradient(680px 460px at 50% 28%, rgba(255,255,255,0.14), transparent 60%)
          `,
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none flex justify-center"
      >
        <div
          className="
            absolute left-1/2 -translate-x-1/2
            bottom-[-10vh]
            w-[120vw] h-[120vh]
            bg-[url('/mist/roseveil-mist1.png')]
            bg-cover bg-no-repeat
            opacity-[0.28] blur-[8px]
            mix-blend-screen
          "
        />
      </div>

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          opacity-[0.08]
          bg-[url('/grain.png')] bg-repeat
          mix-blend-soft-light
        "
      />

      {/* === BRAND STATEMENT === */}
      <div className="relative z-10 text-center px-4 max-w-[720px] mx-auto">
        <h2 className="ft-fade text-[1.22rem] tracking-[0.28em] text-white/82">
          ROSE&nbsp;VEIL&nbsp;FRAGRANCE
        </h2>

        <p
          className="
            ft-fade mt-6 text-[0.96rem]
            text-white/52 leading-[1.95]
          "
        >
          香りは “強さ” ではなく、距離で伝わる。
          <br className="hidden md:block" />
          動いた瞬間にだけ、そっとひらく静かな余韻。
          <br className="hidden md:block" />
          そのすべてが、あなたの生活の“輪郭”をやわらかく整える。
        </p>

        <div className="ft-fade w-[64px] h-[1px] bg-white/12 mx-auto mt-10" />
      </div>

      {/* === NAVIGATION BLOCK === */}
      <div
        className="
          ft-fade
          mt-[12vh]
          w-[92%] max-w-[980px] mx-auto
          grid grid-cols-1 md:grid-cols-3
          gap-12
          text-center md:text-left
        "
      >
        <div className="space-y-3">
          <div className="text-[0.78rem] tracking-[0.22em] text-white/40">
            PRODUCTS
          </div>
          <a className="text-white/70 hover:text-white transition">WHITE</a>
          <a className="text-white/70 hover:text-white transition">VEIL</a>
          <a className="text-white/70 hover:text-white transition">BLUE</a>
        </div>

        <div className="space-y-3">
          <div className="text-[0.78rem] tracking-[0.22em] text-white/40">
            INFORMATION
          </div>
          <a className="text-white/70 hover:text-white transition">ABOUT</a>
          <a className="text-white/70 hover:text-white transition">INGREDIENTS</a>
          <a className="text-white/70 hover:text-white transition">Q&A</a>
        </div>

        <div className="space-y-3">
          <div className="text-[0.78rem] tracking-[0.22em] text-white/40">
            SOCIAL
          </div>
          <a className="text-white/70 hover:text-white transition">INSTAGRAM</a>
          <a className="text-white/70 hover:text-white transition">NOTE</a>
        </div>
      </div>

      {/* === COPYRIGHT + Instagramリンク薄表示 === */}
      <div className="relative z-10 mt-[14vh] text-center">
        <p className="ft-fade text-[0.75rem] text-white/36 tracking-[0.18em]">
          © {new Date().getFullYear()} GUSHIKEN DESIGN — ROSE SERIES
        </p>

        <p className="mt-3 text-[0.72rem] text-white/26 tracking-[0.22em] ft-breath">
          Designed with silence, margin, and breath.
        </p>

        {/* ============================
            ★ Instagram（存在感ほぼゼロ）
        ============================ */}
        <a
          href="https://www.instagram.com/gushikendesign/" // ← 裕人のURLに差し替え
          target="_blank"
          rel="noopener noreferrer"
          className="
            ft-fade
            block mt-8
            text-[0.78rem]
            text-white/32        /* ← 最薄で溶ける */
            hover:text-white/70  /* ← ホバーでだけ存在 */
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
            text-[0.78rem]
            text-white/40 hover:text-white/70
            tracking-[0.20em]
            transition
          "
        >
          GushikenDesign.com
        </a>
      </div>
    </footer>
  );
}
