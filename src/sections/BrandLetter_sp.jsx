// src/sections/BrandLetter_sp.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BrandLetter_sp() {
  const rootRef = useRef(null);

  /* ============================
     呼吸フェード（SP短縮版）
  ============================ */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const targets = el.querySelectorAll(".bl-fade-sp");

    gsap.set(targets, {
      opacity: 0,
      y: 18,
      filter: "blur(10px)",
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        gsap.to(targets, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.14,
        });

        io.disconnect();
      },
      { threshold: 0.12 }
    );

    io.observe(el);
  }, []);

  return (
    <section
      ref={rootRef}
      className="
        relative w-full
        py-[18vh]
        bg-[#fcfbfa]
        text-black
        overflow-hidden
      "
    >
      {/* ============================
          1) 紙ベース（SP向け薄膜）
      ============================ */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-[url('/letter/paper-base.png')]
          bg-cover bg-center
          opacity-[0.26]      /* ← 0.34 → 0.26 に軽量化 */
        "
      />

      {/* 白膜（基底空気） */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-white/25
          backdrop-blur-[1px]
        "
      />

      {/* ============================
          2) Rose Veil の夕紅膜（SP仕様）
      ============================ */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          opacity-[0.14]      /* ← PCより弱く */
          blur-[70px]
          bg-[radial-gradient(
            circle_at_58%_22%,
            rgba(255,180,195,0.12),
            rgba(255,255,255,0)
          )]
        "
      />

      {/* 金黒の香り影（奥行きを弱める） */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          opacity-[0.12]
          blur-[100px]
          bg-[radial-gradient(
            circle_at_48%_72%,
            rgba(60,40,45,0.07),
            rgba(255,255,255,0)
          )]
        "
      />

      {/* 微粒子（grain） */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-[url('/grain.png')]
          opacity-[0.15]
          mix-blend-soft-light
        "
      />

      {/* ============================
          HEADER
      ============================ */}
      <div className="relative z-10 text-center mb-[8vh] px-6">
        <h2
          className="
            bl-fade-sp
            text-[0.72rem]
            tracking-[0.32em]
            text-[rgba(60,50,55,0.48)]
          "
        >
          A LETTER FROM ROSE VEIL
        </h2>

        <div className="bl-fade-sp w-[70px] h-[1px] bg-black/15 mx-auto mt-4" />

        <p
          className="
            bl-fade-sp
            mt-6
            text-[1.85rem]
            font-light
            tracking-[0.02em]
            text-[rgba(40,30,35,0.85)]
            leading-[1.35]
          "
        >
          静かに、美しさの輪郭を整える手紙。
        </p>
      </div>

      {/* ============================
          BODY
      ============================ */}
      <div
        className="
          relative z-10 mx-auto
          w-[90%] max-w-[900px]
          text-center
        "
      >
        {/* 奥行き膜（SP軽量） */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0
            opacity-[0.24]
            blur-[70px]
            bg-[radial-gradient(
              circle,
              rgba(255,230,240,0.20),
              rgba(255,255,255,0)
            )]
          "
        />

        <p
          className="
            bl-fade-sp relative
            text-[0.95rem]
            text-[rgba(40,35,40,0.78)]
            leading-[1.85]
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

        <div className="bl-fade-sp w-[94px] h-[1px] bg-black/15 mx-auto mt-10" />

        <p
          className="
            bl-fade-sp mt-6
            text-[0.82rem]
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
