// src/sections/ConceptSection_sp.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const breathCopy = `
香りは “強さ” ではなく距離で
伝わる。

洗い上がりの柔らかさと、
近づいた瞬間だけ漂う余韻。

WHITE —— 軽さと清潔感
VEIL —— 深紅の甘さと艶
BLUE —— 透明感の潤い

ただ髪を洗うだけで、
“なりたい印象”へ
自然と近づく一本。
`;

export default function ConceptSection_sp() {
  const sectionRef = useRef(null);

  /* ===============================
      背景フェード
  =============================== */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelector(".model-bg-sp"),
      { opacity: 0, scale: 1.06, filter: "blur(36px)" },
      {
        opacity: 0.52,
        scale: 1,
        filter: "blur(12px)",
        duration: 1.8,
        ease: "sine.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      }
    );
  }, []);

  /* ===============================
      COPY フェード
  =============================== */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelector(".breath-copy-sp"),
      { opacity: 0, y: 28, filter: "blur(16px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 82%" },
      }
    );
  }, []);

  return (
    <section
      id="concept-sp"
      ref={sectionRef}
      className="
        relative w-full
        py-[12vh]
        bg-[#fdfbfa]
        overflow-hidden
      "
    >
{/* ===============================
    縦画像（SP差し替え）
=============================== */}
<div
  className="
    model-bg-sp absolute inset-0
    bg-[url('/model-hair-flow-vertical3.png')]
    bg-cover bg-center
    opacity-[0.76]              /* ← 大幅に可視化 */
    blur-[4px]                  /* ← ぼかしを弱め、存在を出す */
  "
/>

{/* ピンク光膜（存在を強めて“香りの温度”を可視化） */}
<div
  className="
    absolute inset-x-0 top-0 h-[32vh]
    opacity-[0.28]              /* ← 0.22 → 0.38 */
    blur-[60px]                 /* ← 40px → 70px */
    bg-[radial-gradient(
      780px_540px_at_50%_0%,
      rgba(255,150,170,0.55),
      transparent
    )]
  "
/>

{/* 白膜（世界観の柔光を全体に広げる） */}
<div className="absolute inset-0 bg-white/72 backdrop-blur-[2px]" />

{/* 桜膜（光の赤みを強調・香りの余韻の層） */}
<div
  className="
    absolute inset-0
    opacity-[0.32]               /* ← 0.30 → 0.42 */
    blur-[100px]                 /* ← 80px → 120px */
    bg-[radial-gradient(
      circle_at_58%_32%,
      rgba(255,170,190,0.32),
      transparent
    )]
  "
/>


      {/* ===============================
          TITLE
      =============================== */}
      <div className="relative z-10 text-center mb-[8vh] mt-[3vh] px-6">
        <h2 className="text-[0.72rem] tracking-[0.30em] text-[rgba(60,50,55,0.45)]">
          A SCENT FOR YOUR HAIR
        </h2>

        <p className="mt-3 text-[1.72rem] font-light tracking-[0.01em] text-[rgba(60,50,55,0.82)]">
          髪の“香り”は、第一印象を変える。
        </p>

        <p className="mt-3 text-[0.88rem] leading-relaxed tracking-wide text-[rgba(60,50,55,0.55)]">
          “洗うだけで、美しい余韻が続く。”
        </p>
      </div>

      {/* ===============================
          COPY（本文：短縮）
      =============================== */}
      <div
        className="
          breath-copy-sp relative z-10
          mx-auto w-[88%] max-w-[900px]
          text-center px-6
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute inset-0 opacity-[0.30]
            blur-[58px]
            bg-[radial-gradient(
              circle,
              rgba(255,215,230,0.20),
              transparent
            )]
          "
        />

        <p
          className="
            relative
            text-[0.94rem]
            text-black/70
            leading-[1.85]
            whitespace-pre-line
            tracking-wide
          "
        >
          {breathCopy}
        </p>
      </div>

      {/* ===============================
          CTA 誘導（短く）
      =============================== */}
      <div className="relative w-full mt-[14vh] flex flex-col items-center text-center px-6">
        <div className="w-[70%] max-w-[740px] h-[1px] bg-[rgba(60,50,55,0.18)]" />

        <p className="mt-6 text-[0.72rem] tracking-[0.32em] text-[rgba(60,50,55,0.45)]">
          CHOOSE YOUR SHAMPOO
        </p>

        <h2 className="mt-3 text-[1.85rem] font-light tracking-[0.02em] text-[rgba(60,50,55,0.85)]">
          どの“余韻”が、<br></br>あなたらしい？
        </h2>

        <a
          href="#products-sp"
          className="
            mt-7 text-[0.90rem] tracking-[0.20em]
            text-[rgba(90,80,90,0.60)]
            hover:text-[rgba(90,80,90,0.85)]
            transition-all relative pb-1
          "
        >
          WHITE・VEIL・BLUE を見直す
          <span
            className="
              absolute left-1/2 -bottom-[1px]
              w-[64px] h-[1px]
              bg-[rgba(90,80,90,0.26)]
              transform -translate-x-1/2
            "
          />
        </a>
      </div>
    </section>
  );
}
