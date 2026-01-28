// src/sections/ConceptSection_sp.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const breathCopy = `
髪が揺れた一瞬に漂う “清潔感のある香り” は、
どんな装いよりも美しさを引き立てます。

洗い上がりの柔らかさが続き、
近づいた人だけが気づくほのかな余韻。

つけすぎないのに印象が良くなる、
“上品な香り方” だけを追求した設計です。

ROSE VEIL は、
香りと手触りで雰囲気をそっと底上げします。

WHITE ーー 軽さと清潔感。
VEIL   ーー 深紅の甘さと艶。
BLUE   ーー 透明感の潤い。

ただ髪を洗うだけで、
“なりたい印象” へ自然と近づく一本を。
`;

export default function ConceptSection_sp() {
  const sectionRef = useRef(null);

  /* ===============================
      背景モデル（にじみ浮上）
  =============================== */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelector(".model-bg-sp"),
      { opacity: 0, scale: 1.08, filter: "blur(40px)" },
      {
        opacity: 0.55,
        scale: 1,
        filter: "blur(14px)",
        duration: 2.2,
        ease: "sine.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      }
    );
  }, []);

  /* ===============================
      Main Copy（中央フェード）
  =============================== */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelector(".breath-copy-sp"),
      { opacity: 0, y: 26, filter: "blur(16px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.25,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 78%" },
      }
    );
  }, []);

  return (
    <section
      id="purchase-guide-sp"
      ref={sectionRef}
      className="
        relative w-full
        py-[16vh]
        bg-[#fdfbfa]
        overflow-hidden
      "
    >
      {/* ===============================
          背景（圧縮SP版）
      =============================== */}
      <div
        className="
          model-bg-sp absolute inset-0
          bg-[url('/model-hair-flow2.png')]
          bg-cover bg-center
          opacity-[0.55]
          blur-[14px]
        "
      />

      {/* 上層：淡紅ミスト（SP圧縮） */}
      <div
        className="
          absolute inset-x-0 top-0 h-[28vh]
          opacity-[0.18]
          blur-[90px]
          bg-[radial-gradient(
            700px_480px_at_50%_0%,
            rgba(255,150,170,0.40),
            rgba(255,255,255,0)
          )]
        "
      />

      {/* 白膜：SPは強すぎないレベルへ */}
      <div className="absolute inset-0 bg-white/45 backdrop-blur-[1px]" />

      {/* 淡い桜ピンク膜 */}
      <div
        className="
          absolute inset-0
          opacity-[0.22]
          blur-[70px]
          bg-[radial-gradient(
            circle_at_58%_32%,
            rgba(255,170,190,0.18),
            rgba(255,255,255,0)
          )]
        "
      />

      {/* ホワイトライト膜 */}
      <div
        className="
          absolute inset-0
          opacity-[0.20]
          blur-[62px]
          bg-[radial-gradient(
            circle_at_50%_22%,
            rgba(255,240,245,0.32),
            rgba(255,255,255,0)
          )]
        "
      />

      {/* ===============================
          TITLE
      =============================== */}
      <div className="relative z-10 text-center mb-[10vh] mt-[4vh] px-6">
        <h2
          className="
            text-[0.75rem]
            tracking-[0.32em]
            text-[rgba(60,50,55,0.45)]
          "
        >
          A SCENT FOR YOUR HAIR
        </h2>

        <p
          className="
            mt-3 text-[1.85rem]
            font-light tracking-[0.015em]
            text-[rgba(60,50,55,0.82)]
          "
        >
          髪の“香り”は、美しさの第一印象になる。
        </p>

        <p
          className="
            mt-3 text-[0.92rem]
            leading-relaxed tracking-wide
            text-[rgba(60,50,55,0.55)]
          "
        >
          “洗うだけで、美しい余韻が続く。”
        </p>
      </div>

      {/* ===============================
          COPY（本文）
      =============================== */}
      <div
        className="
          breath-copy-sp relative z-10
          mx-auto
          w-[90%] max-w-[900px]
          text-center px-6
        "
      >
        {/* 内膜（SP仕様：淡め） */}
        <div
          className="
            absolute inset-0
            opacity-[0.35]
            blur-[70px]
            bg-[radial-gradient(
              circle,
              rgba(255,215,230,0.22),
              rgba(255,255,255,0)
            )]
          "
        />

        <p
          className="
            relative
            text-[0.96rem]
            text-black/65
            leading-[1.85]
            whitespace-pre-line
            tracking-wide
          "
        >
          {breathCopy}
        </p>
      </div>

      {/* ===============================
          下層（選択誘導）
      =============================== */}
      <div
        className="
          relative w-full mt-[16vh]
          flex flex-col items-center text-center px-6
        "
      >
        <div
          className="
            absolute top-[-10vh] left-0 right-0 h-[26vh]
            opacity-[0.50]
            blur-[70px]
            bg-[radial-gradient(
              ellipse_at_center,
              rgba(230,200,210,0.20),
              rgba(255,255,255,0)
            )]
          "
        />

        <div className="w-[70%] max-w-[760px] h-[1px] bg-[rgba(60,50,55,0.18)]" />

        <p
          className="
            mt-6 text-[0.72rem]
            tracking-[0.34em]
            text-[rgba(60,50,55,0.40)]
          "
        >
          CHOOSE YOUR SHAMPOO
        </p>

        <h2
          className="
            mt-3 text-[1.95rem]
            font-light tracking-[0.02em]
            text-[rgba(60,50,55,0.85)]
          "
        >
          あなたの髪には、どの“香りの余韻”が合う？
        </h2>

        <p
          className="
            mt-3 text-[0.92rem]
            leading-relaxed tracking-wide
            text-[rgba(60,50,55,0.55)]
          "
        >
          軽さ・しっとり・透明感。<br />
          3つの違いから選べます。
        </p>

        <div className="mt-8 w-[1px] h-[34px] bg-[rgba(60,50,55,0.25)] rounded-full" />

        <a
          href="#products"
          className="
            mt-9
            text-[0.90rem]
            tracking-[0.20em]
            text-[rgba(90,80,90,0.60)]
            hover:text-[rgba(90,80,90,0.85)]
            transition-all
            relative pb-2
          "
        >
          WHITE・VEIL・BLUE を選びなおす
          <span
            className="
              absolute left-1/2 -bottom-[1px]
              w-[70px] h-[1px]
              bg-[rgba(90,80,90,0.28)]
              transform -translate-x-1/2
            "
          />
        </a>
      </div>
    </section>
  );
}
