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
        bg-[#fcfbfa]
        text-black
        overflow-hidden
      "
    >
      {/* ============================================
          ★ 1) 紙ベース
      ============================================ */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-[url('/letter/paper-base.png')]
          bg-cover bg-center
          opacity-[0.34]
        "
      />

      {/* ホワイト膜 */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-white/30
          backdrop-blur-[1px]
        "
      />

      {/* ============================================
          ★ 2) Rose Veil の夕方の“香り膜”
         （薄赤 × 薄金 × 薄黒の3層）
      ============================================ */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_62%_18%,rgba(255,180,195,0.12),rgba(255,255,255,0))]
          blur-[90px]
          opacity-[0.18]
        "
      />

      {/* 金黒の香り影（evening → 白への橋渡し） */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-[radial-gradient(circle_at_48%_72%,rgba(60,40,45,0.08),rgba(255,255,255,0))]
          blur-[120px]
          opacity-[0.16]
        "
      />

      {/* 微粒子（grain） */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-[url('/grain.png')]
          opacity-[0.18]
          mix-blend-soft-light
        "
      />

      {/* ============================================
          HEADER
      ============================================ */}
      <div className="relative z-10 text-center mb-[10vh] px-6">
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
            bl-fade
            mt-6
            text-[2.15rem] md:text-[2.35rem]
            font-light
            tracking-[0.02em]
            text-[rgba(40,30,35,0.85)]
          "
        >
          静かに、美しさの輪郭を整える手紙。
        </p>
      </div>

      {/* ============================================
          BODY
      ============================================ */}
      <div
        className="
          relative z-10 mx-auto
          w-[88%] max-w-[900px]
          text-center
        "
      >
        {/* 奥行きの光膜（締めの余韻） */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0
            bg-[radial-gradient(circle,rgba(255,230,240,0.22),rgba(255,255,255,0))]
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
その細かなすべてに、あなたの日常の景色が重なります。

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
