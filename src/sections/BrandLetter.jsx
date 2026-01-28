// src/sections/BrandLetter.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BrandLetter() {
  const rootRef = useRef(null);

  /* ==============================================
     FADE-IN（呼吸系の静かなフェード）
  ============================================== */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    gsap.set(el.querySelectorAll(".bl-fade"), {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    });

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;

        gsap.to(el.querySelectorAll(".bl-fade"), {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power2.out",
          stagger: 0.16,
        });

        io.disconnect();
      },
      { threshold: 0.14 }
    );

    io.observe(el);
  }, []);

  return (
    <section
      ref={rootRef}
      className="
        relative w-full
        py-[26vh]
        text-black
        overflow-hidden

        /* ★ 最背面の“にじむ薄背景” */
        bg-[url('/letter/soft-back-roseveil.png')]
        bg-cover bg-center
        bg-no-repeat bg-fixed
      "
    >
      {/* =====================================================
          1) 紙ベース（紙テクスチャ）
      ===================================================== */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          z-[1]
          bg-[url('/letter/paper-base.png')]
          bg-cover bg-center
          opacity-[0.2]
        "
      />

      {/* =====================================================
          2) にじませ層（Rose Veil の世界観の基底）
      ===================================================== */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          z-[2]
          bg-[url('/letter/soft-back-roseveil.png')]
          bg-cover bg-[center_top_16%]
          opacity-[0.22]
          blur-[18px]
          scale-[1.08]
          brightness-[1.06]
          pointer-events-none
        "
      />

      {/* =====================================================
          3) 香り膜（薄赤）
      ===================================================== */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          z-[3]
          bg-[radial-gradient(circle_at_62%_18%,rgba(255,180,195,0.12),transparent)]
          blur-[90px]
          opacity-[0.18]
        "
      />

      {/* =====================================================
          4) 金黒の影（夕方の香りの温度）
      ===================================================== */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          z-[3]
          bg-[radial-gradient(circle_at_48%_72%,rgba(60,40,45,0.08),transparent)]
          blur-[120px]
          opacity-[0.16]
        "
      />

      {/* =====================================================
          5) 微粒子
      ===================================================== */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          z-[3]
          bg-[url('/grain.png')] bg-repeat
          opacity-[0.18]
          mix-blend-soft-light
        "
      />

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="relative z-[10] text-center mb-[10vh] px-6">
        <h2
          className="
            bl-fade
            text-[0.82rem]
            tracking-[0.34em]
            text-[rgba(60,50,55,0.48)]
          "
        >
          A LETTER FROM ROSE VEIL
        </h2>

        <div className="bl-fade w-[84px] h-[1px] bg-black/15 mx-auto mt-5" />

        <p
          className="
            bl-fade mt-6
            text-[2.15rem] md:text-[2.35rem]
            font-light tracking-[0.02em]
            text-[rgba(40,30,35,0.85)]
          "
        >
          静かに、美しさの輪郭を整える手紙。
        </p>
      </div>

      {/* =====================================================
          BODY
      ===================================================== */}
      <div
        className="
          relative z-[10]
          mx-auto w-[88%] max-w-[900px]
          text-center
        "
      >
        {/* 奥行きの光膜 */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0
            z-[3]
            bg-[radial-gradient(circle,rgba(255,230,240,0.22),transparent)]
            blur-[90px]
            opacity-[0.28]
          "
        />

        <p
          className="
            bl-fade relative
            text-[1.02rem]
            text-[rgba(40,35,40,0.78)]
            leading-[2.05]
            whitespace-pre-line
            tracking-wide
            font-light
          "
        >
{`髪が揺れた瞬間にだけふわりと漂う、静かで上品な香り。

Rose Veil は、生活の“輪郭”をほんの少しだけ美しくするための処方です。

香りは強さではなく、距離で伝わる。
触れた瞬間の質感、乾いたあとの余韻。

忙しい朝も、ふとした瞬間も、
あなたの背中をそっと押すように。

Rose Veil が、あなたを静かに包みます。`}
        </p>

        <div className="bl-fade w-[110px] h-[1px] bg-black/15 mx-auto mt-10" />

        <p
          className="
            bl-fade mt-6
            text-[0.92rem]
            tracking-[0.22em]
            text-[rgba(40,40,45,0.55)]
          "
        >
          ROSE VEIL FRAGRANCE SHAMPOO
        </p>
      </div>
    </section>
  );
}
