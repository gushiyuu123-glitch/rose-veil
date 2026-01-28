// src/sections/ConceptSection.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   一押しコピー（100点版／世界観30：購買70）
============================================================ */
const breathCopy = `
髪がふわりと揺れた瞬間に漂う “清潔感のある香り” は、
どんな装いよりもあなたの美しさを引き立てます。

洗い上がりの柔らかさが続き、
近づいた人だけが感じ取れるほのかな余韻。
それは、つけすぎないのに印象が良くなる、
“上品な香り方” だけを追求した設計です。

ROSE VEIL シャンプーは、
香りと手触りの質感であなたの雰囲気をそっと底上げします。

WHITE ーー 透ける軽さと、さらりとした清潔感。
VEIL   ーー 体温で開く深紅の甘さと、まとまりある艶。
BLUE   ーー すっきりとした透明感が続く、凛とした潤い。

ただ髪を洗うだけで、
“なりたい印象” に自然と近づける一本を選んでください。
`;

export default function ConceptSection() {
  const sectionRef = useRef(null);

  /* ============================================================
      背景モデル（にじみ浮上フェード）
  ============================================================ */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelector(".model-bg"),
      { opacity: 0, scale: 1.08, filter: "blur(28px)" },
      {
        opacity: 0.82,
        scale: 1,
        filter: "blur(5px)",
        duration: 3.2,
        ease: "sine.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      }
    );
  }, []);

  /* ============================================================
      メインコピー（中央浮上）
  ============================================================ */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelector(".breath-copy"),
      { opacity: 0, y: 26, filter: "blur(18px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 70%" },
      }
    );
  }, []);

  return (
    <section
      id="purchase-guide" // ← 最終判断セクションID
      ref={sectionRef}
      className="
        relative w-full py-[26vh]
        bg-[#fdfbfa]
        overflow-hidden
      "
    >
      {/* ============================================================
          背景モデル
      ============================================================ */}
      <div
        className="
          model-bg absolute inset-0
          bg-[url('/model-hair-flow2.png')]
          bg-cover bg-center
        "
      />

      {/* ============================================================
          レビュー → コンセプトを滑らかに繋ぐ淡紅ミスト（最上層）
      ============================================================ */}
      <div
        className="
          absolute inset-x-0 top-0 h-[38vh]
          opacity-[0.18]
          bg-[radial-gradient(
            900px_620px_at_50%_0%,
            rgba(255,150,170,0.45),
            rgba(255,255,255,0)
          )]
          blur-[110px]
          pointer-events-none
        "
      />

      {/* ============================================================
          白膜（基底の空気）
      ============================================================ */}
      <div className="absolute inset-0 bg-white/55 backdrop-blur-[1px]" />

      {/* 淡い桜ピンク膜 */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(
            circle_at_60%_30%,
            rgba(255,170,190,0.22),
            rgba(255,255,255,0)
          )]
          blur-[95px]
        "
      />

      {/* ホワイトライト膜 */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(
            circle_at_50%_20%,
            rgba(255,240,245,0.38),
            rgba(255,255,255,0)
          )]
          blur-[70px]
        "
      />

      {/* ============================================================
          TITLE
      ============================================================ */}
      <div className="relative z-10 text-center mb-[14vh] mt-[5vh] px-6">
        <h2
          className="
            text-[0.82rem]
            tracking-[0.34em]
            text-[rgba(60,50,55,0.45)]
          "
        >
          A SCENT FOR YOUR HAIR
        </h2>

        <p
          className="
            mt-3 text-[2.25rem]
            font-light tracking-[0.015em]
            text-[rgba(60,50,55,0.82)]
          "
        >
          髪の“香り”は、美しさの第一印象になる。
        </p>

        <p
          className="
            mt-3 text-[1rem]
            leading-relaxed tracking-wide
            text-[rgba(60,50,55,0.55)]
          "
        >
          “洗うだけで、美しい余韻が続く。”
        </p>
      </div>

      {/* ============================================================
          本文
      ============================================================ */}
      <div
        className="
          breath-copy relative z-10 mx-auto
          w-[90%] max-w-[900px]
          text-center
           px-6
        "
      >
        {/* 内部淡膜 */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(
              circle,
              rgba(255,215,230,0.24),
              rgba(255,255,255,0)
            )]
            blur-[80px]
            opacity-[0.42]
          "
        />

        <p
          className="
            relative
            text-[1.02rem]
            text-black/65
            leading-[1.95]
            whitespace-pre-line
            tracking-wide
          "
        >
          {breathCopy}
        </p>
      </div>

      {/* ============================================================
          下層（選択誘導）
      ============================================================ */}
      <div
        className="
          relative w-full mt-[22vh]
          flex flex-col items-center text-center px-6
        "
      >
        {/* 区切りの淡膜 */}
        <div
          className="
            absolute top-[-14vh] left-0 right-0 h-[32vh]
            bg-[radial-gradient(
              ellipse_at_center,
              rgba(230,200,210,0.22),
              rgba(255,255,255,0)
            )]
            blur-[90px] opacity-[0.55]
          "
        />

        {/* 上の区切りライン */}
        <div className="w-[62%] max-w-[900px] h-[1px] bg-[rgba(60,50,55,0.18)]" />

        <p
          className="
            mt-6 text-[0.78rem]
            tracking-[0.34em]
            text-[rgba(60,50,55,0.40)]
          "
        >
          CHOOSE YOUR SHAMPOO
        </p>

        <h2
          className="
            mt-3 text-[2.35rem]
            font-light tracking-[0.02em]
            text-[rgba(60,50,55,0.85)]
          "
        >
          あなたの髪には、どの“香りの余韻”が合う？
        </h2>

        <p
          className="
            mt-3 text-[0.98rem]
            leading-relaxed tracking-wide
            text-[rgba(60,50,55,0.55)]
          "
        >
          3つの香りは仕上がりも異なります。
          <br />
          軽さ・しっとり・透明感。あなたに合う一本を。
        </p>

        <div className="mt-10 w-[1px] h-[40px] bg-[rgba(60,50,55,0.25)] rounded-full" />

        {/* ============================================================
            ★ “選びなおす” リンク（視認性最適化版）
        ============================================================ */}
        <a
          href="#products"
          className="
            mt-10
            text-[0.92rem]
            tracking-[0.20em]
            text-[rgba(90,80,90,0.60)]     /* ← 灰桜で視認性UP */
            hover:text-[rgba(90,80,90,0.85)]
            transition-all
            relative
            pb-2
          "
          style={{ cursor: 'pointer' }}
        >
          WHITE・VEIL・BLUE を選びなおす

          <span
            className="
              absolute left-1/2 -bottom-[1px]
              w-[84px] h-[1px]
              bg-[rgba(90,80,90,0.28)]
              transform -translate-x-1/2
            "
          />
        </a>
      </div>
    </section>
  );
}
