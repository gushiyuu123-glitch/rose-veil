// src/sections/ConceptSection.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   一押しコピー（世界観 × 商業バランス最適）
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
      背景モデル（にじみ × 浮上フェード）
  ============================================================ */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelector(".model-bg"),
      { opacity: 0, scale: 1, filter: "blur(28px)" },
      {
        opacity: 0.86,
        scale: 1,
        filter: "blur(6px)",
        duration: 3.0,
        ease: "sine.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      }
    );
  }, []);

  /* ============================================================
      メインコピー（静かに中央浮上）
  ============================================================ */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelector(".breath-copy"),
      { opacity: 0, y: 30, filter: "blur(20px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.75,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 72%" },
      }
    );
  }, []);

  return (
    <section
      id="purchase-guide"
      ref={sectionRef}
      className="
        relative w-full py-[26vh]
        bg-[#fdfbfa]
        overflow-hidden
      "
    >
      {/* ============================================================
          背景モデル（髪 × 余韻）
      ============================================================ */}
      <div
        className="
          model-bg absolute inset-0
          bg-[url('/model-hair-flow1.png')]
          bg-cover bg-center
        "
      />

      {/* ============================================================
          淡紅ミスト（上部の香りの余韻）
      ============================================================ */}
      <div
        className="
          absolute inset-x-0 top-0 h-[38vh]
          opacity-[0.20]
          blur-[110px]
          pointer-events-none
        "
        style={{
          background: `
            radial-gradient(
              900px 620px at 50% 0%,
              rgba(255,150,170,0.48),
              rgba(255,255,255,0)
            )
          `,
        }}
      />

      {/* ============================================================
          白膜（基底の空気）× 桜ピンク膜 × ホワイト光膜
      ============================================================ */}
      <div className="absolute inset-0 bg-white/55 backdrop-blur-[1px]" />

      {/* 桜ピンク膜 */}
      <div
        className="
          absolute inset-0
          blur-[95px]
        "
        style={{
          background: `
            radial-gradient(
              circle_at_60%_30%,
              rgba(255,170,190,0.22),
              rgba(255,255,255,0)
            )
          `,
        }}
      />

      {/* ホワイト光膜 */}
      <div
        className="
          absolute inset-0
          blur-[70px]
        "
        style={{
          background: `
            radial-gradient(
              circle_at_50%_20%,
              rgba(255,240,245,0.38),
              rgba(255,255,255,0)
            )
          `,
        }}
      />

      {/* ============================================================
          TITLE
      ============================================================ */}
      <div className="relative z-10 text-center mb-[14vh] mt-[5vh] px-6">
        <h2
          className="
            text-[0.79rem]
            tracking-[0.34em]
            text-[rgba(60,50,55,0.45)]
          "
        >
          A SCENT FOR YOUR HAIR
        </h2>

        <p
          className="
            mt-3 text-[2.14rem]

            font-light tracking-[0.015em]
            text-[rgba(60,50,55,0.82)]
          "
        >
          髪の“香り”は、美しさの第一印象になる。
        </p>

        <p
          className="
            mt-3 text-[0.96rem]
            leading-relaxed tracking-wide
            text-[rgba(60,50,55,0.55)]
          "
        >
          “洗うだけで、美しい余韻が続く。”
        </p>
      </div>

      {/* ============================================================
          本文（内部に光膜レイヤー）
      ============================================================ */}
      <div
        className="
          breath-copy relative z-10 mx-auto
          w-[90%] max-w-[900px]
          text-center px-6
        "
      >
        {/* 内部淡膜（深度UP） */}
        <div
          className="
            absolute inset-0
            blur-[85px]
            opacity-[0.1]
          "
          style={{
            background: `
              radial-gradient(
                circle,
                rgba(255,215,230,0.26),
                rgba(255,255,255,0)
              )
            `,
          }}
        />

        <p
          className="
            relative
           text-[0.94rem]

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
          下層（誘導・選択）
      ============================================================ */}
      <div
        className="
          relative w-full mt-[22vh]
          flex flex-col items-center text-center px-6
        "
      >
        {/* 区切りの淡い膜 */}
        <div
          className="
            absolute top-[-14vh] left-0 right-0 h-[32vh]
            blur-[90px] opacity-[0.55]
          "
          style={{
            background: `
              radial-gradient(
                ellipse_at_center,
                rgba(230,200,210,0.22),
                rgba(255,255,255,0)
              )
            `,
          }}
        />

        {/* ライン */}
        <div className="w-[62%] max-w-[900px] h-[1px] bg-[rgba(60,50,55,0.18)]" />

        <p
          className="
            mt-6  text-[0.75rem]
            tracking-[0.34em]
            text-[rgba(60,50,55,0.40)]
          "
        >
          CHOOSE YOUR SHAMPOO
        </p>

        <h2
          className="
            mt-3 text-[2.20rem]

            font-light tracking-[0.02em]
            text-[rgba(60,50,55,0.85)]
          "
        >
          あなたの髪には、どの“香りの余韻”が合う？
        </h2>

        <p
          className="
            mt-3 text-[0.94rem]
            leading-relaxed tracking-wide
            text-[rgba(60,50,55,0.55)]
          "
        >
          3つの香りは仕上がりも異なります。
          <br />
          軽さ・しっとり・透明感。あなたに合う一本を。
        </p>

        <div className="mt-10 w-[1px] h-[40px] bg-[rgba(60,50,55,0.25)] rounded-full" />

        {/* CTA（視認性UP版） */}
        <a
          href="#products"
          className="
            mt-10
            text-[0.88rem]
            tracking-[0.20em]
            text-[rgba(90,80,90,0.60)]
            hover:text-[rgba(90,80,90,0.85)]
            transition-all
            relative
            pb-2
          "
        >
          WHITE・VEIL・BLUE を選びなおす
          <span
            className="
              absolute left-1/2 -bottom-[1px]
              w-[84px] h-[1px]
              bg-[rgba(90,80,90,0.28)]
              -translate-x-1/2
            "
          />
        </a>
      </div>
    </section>
  );
}
