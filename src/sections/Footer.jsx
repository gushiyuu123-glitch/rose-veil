// src/sections/Footer.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Footer() {
  const rootRef = useRef(null);
  const mistRef = useRef(null);
  const grainRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    gsap.set(el.querySelectorAll(".ft-fade"), {
      opacity: 0,
      y: 18,
      filter: "blur(14px)",
    });

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      gsap.to(el.querySelectorAll(".ft-fade"), {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.45,
        ease: "power3.out",
        stagger: 0.14,
      });

      /* 呼吸 — mist */
      gsap.to(mistRef.current, {
        scale: 1.06,
        opacity: 0.34,
        duration: 9.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      /* 浮遊粒子（気配のみ） */
      gsap.to(grainRef.current, {
        x: 5,
        y: -6,
        duration: 14,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".ft-breath", {
        y: -1.2,
        duration: 5.8,
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

      {/* === BASE BLACK === */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 pointer-events-none
          bg-[radial-gradient(circle_at_40%_55%,rgba(0,0,0,0.38),rgba(0,0,0,0.68))]
          opacity-[0.32] mix-blend-multiply
        "
      />

      {/* === MIST（呼吸） === */}
      <div
        ref={mistRef}
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
            opacity-[0.30]
            blur-[9px]
            mix-blend-screen
          "
        />
      </div>

      {/* === LAYER 1：Rose Crimson Veil（深紅膜） === */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 pointer-events-none
          mix-blend-screen
          opacity-[0.22]
          blur-[80px]
        "
        style={{
          background: `
            radial-gradient(760px 520px at 46% 66%, rgba(255,65,120,0.26), transparent 70%),
            radial-gradient(840px 560px at 70% 58%, rgba(255,180,210,0.18), transparent 70%)
          `,
        }}
      />

      {/* === LAYER 2：White Mist Film（白膜） === */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 pointer-events-none
          mix-blend-screen
          opacity-[0.18]
          blur-[90px]
        "
        style={{
          background: `
            radial-gradient(820px 600px at 50% 38%, rgba(255,255,255,0.20), transparent 60%)
          `,
        }}
      />

      {/* === LAYER 3：Blue Whisper（青い気配） === */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 pointer-events-none
          mix-blend-screen
          opacity-[0.14]
          blur-[110px]
        "
        style={{
          background: `
            radial-gradient(900px 680px at 60% 72%, rgba(170,200,255,0.20), transparent 70%)
          `,
        }}
      />

      {/* === GRAIN（気配のみ） === */}
      <div
        ref={grainRef}
        aria-hidden="true"
        className="
          absolute inset-0
          bg-[url('/grain.png')] bg-repeat
          mix-blend-screen
          opacity-[0.10]
        "
        style={{
          backgroundColor: "rgba(255,110,150,0.009)", // ← 限界の薄さ
        }}
      />


      {/* === BRAND STATEMENT === */}
      <div className="relative z-10 text-center px-4 max-w-[720px] mx-auto">
        <h2 className="ft-fade text-[1.22rem] tracking-[0.28em] text-white/82">
          ROSE&nbsp;VEIL&nbsp;FRAGRANCE
        </h2>

        <p className="ft-fade mt-6 text-[0.96rem] text-white/52 leading-[1.95]">
          香りは “強さ” ではなく、距離で伝わる。
          <br className="hidden md:block" />
          動いた瞬間にだけ、そっとひらく静かな余韻。
          <br className="hidden md:block" />
          そのすべてが、あなたの生活の“輪郭”をやわらかく整える。
        </p>

        <div className="ft-fade w-[64px] h-[1px] bg-white/12 mx-auto mt-10" />
      </div>

      {/* === LINKS === */}
      <div
        className="
          ft-fade
          mt-[12vh]
          w-[92%] max-w-[980px] mx-auto
          grid grid-cols-1 md:grid-cols-3
          gap-12
          text-center
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

      {/* === COPYRIGHT === */}
      <div className="relative z-10 mt-[14vh] text-center">
        <p className="ft-fade text-[0.75rem] text-white/36 tracking-[0.18em]">
          © {new Date().getFullYear()} GUSHIKEN DESIGN — ROSE SERIES
        </p>

        <p className="ft-breath mt-3 text-[0.72rem] text-white/26 tracking-[0.22em]">
          Designed with silence, margin, and breath.
        </p>

        <a
          href="https://www.instagram.com/gushikendesign/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            ft-fade block mt-8
            text-[0.78rem]
            text-white/32 hover:text-white/70
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
