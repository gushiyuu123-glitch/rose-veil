/* ============================================================
   SCENT PALETTE — 完全版（呼吸 × 世界観 × 香りレイヤー × 高級EC）
============================================================ */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { titleColor } from "../styles/titleColorTokens";
import { products } from "../data/products";

export default function ScentPalette() {
  const sectionRef = useRef(null);
  const panelRefs = useRef([]);
  const conceptRef = useRef(null);
  const productLineRef = useRef(null);

  /* =========================================================
      GSAP — 呼吸アニメーション
  ========================================================= */
  useEffect(() => {
    if (!sectionRef.current || !conceptRef.current) return;

    gsap.set(conceptRef.current, { opacity: 0, y: 26 });
    gsap.set(productLineRef.current, { opacity: 0, y: 26 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: "sine.out" } });

      const middlePanel = panelRefs.current[1];
      const sidePanels = [panelRefs.current[0], panelRefs.current[2]].filter(Boolean);

      tl
        .from(sectionRef.current, { opacity: 0, y: 24, duration: 1.0 })

        .to(
          conceptRef.current,
          { opacity: 1, y: 0, duration: 1.15 },
          "-=0.35"
        )

        .from(
          middlePanel,
          {
            opacity: 0,
            y: 20,
            scale: 0.94,
            filter: "blur(8px)",
            duration: 1.0,
          },
          "-=0.35"
        )

        .from(
          sidePanels,
          {
            opacity: 0,
            y: 22,
            scale: 0.94,
            filter: "blur(8px)",
            duration: 1.0,
            stagger: 0.18,
          },
          "-=0.55"
        )

        .to(
          productLineRef.current,
          { opacity: 1, y: 0, duration: 1.1 },
          "-=0.55"
        );

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            tl.play();
            io.disconnect();
          }
        },
        { threshold: 0.16 }
      );

      io.observe(sectionRef.current);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
    id="concept"
      ref={sectionRef}
      className="
        relative w-full bg-black text-white
        pt-[18vh] pb-[16vh]
        overflow-hidden
      "
    >



{/* =========================================================
    BACKGROUND — ULTRA THIN VERSION（極薄膜）
========================================================= */}
<div
  aria-hidden="true"
  className="
    absolute inset-0 pointer-events-none select-none
    z-[1]
  "
>
  {/* 下地（黒膜） */}
  <div className="absolute inset-0 bg-black z-[-1]" />

  {/* WHITE VEIL */}
  <img
    src="/bg/rose-vein.png"
    alt=""
    className="
      absolute
      right-[-8%] top-[84%]
      w-[72vw] max-w-[820px]
      opacity-[0.34]        /* ← 0.88 → 0.34 に極薄化 */
      blur-[4.4px]          /* ← 輪郭をさらに溶かす */
      mix-blend-lighten
      scale-[1.02]
      transition-all duration-[1800ms]
    "
    style={{
      transformOrigin: "top right",
      rotate: "18deg",      /* ← 20 → 18、存在感わずかに削る */
    }}
  />

  {/* WHITE FOG */}
  <div
    className="
      absolute
      right-[-1%] top-[81%]
      w-[46vw] max-w-[540px]
      opacity-[0.18]        /* ← 0.28 → 0.18 に薄める */
      blur-[48px]           /* ← 38 → 48、霧を広げる */
      mix-blend-screen
    "
    style={{
      height: "120vh",
      background:
        "radial-gradient(900px 680px at 50% 38%, rgba(255,255,255,0.34), rgba(255,255,255,0.04), transparent)",
    }}
  />

  {/* GRAIN */}
  <div
    className="absolute inset-0 opacity-[0.045] mix-blend-soft-light"
    style={{
      backgroundImage: "url('/textures/grain-soft.png')",
      backgroundSize: "cover",
      filter: "blur(0.55px)",  /* ← 0.35 → 0.55、粒度を柔らかく */
    }}
  />

  {/* RED VEIL */}
  <img
    src="/bg/rose-red.png"
    alt=""
    className="
      absolute
      right-[70%] top-[22%]
      w-[44vw] max-w-[630px]
      opacity-[0.32]        /* ← 0.80 → 0.32、主張を消す */
      blur-[5px]
      mix-blend-lighten
      scale-[1.04]
      transition-all duration-[1800ms]
    "
    style={{
      transformOrigin: "top right",
      rotate: "18deg",
    }}
  />

  {/* RED FOG */}
  <div
    className="
      absolute
      right-[78%] top-[16%]
      w-[46vw] max-w-[540px]
      opacity-[0.14]        /* ← 0.25 → 0.14 に薄化 */
      blur-[46px]
      mix-blend-screen
    "
    style={{
      height: "118vh",
      background:
        "radial-gradient(880px 640px at 50% 36%, rgba(255,60,110,0.22), rgba(40,0,20,0.03), transparent)",
    }}
  />
</div>




{/* =========================================================
    SCENT CONCEPT（世界観 × タイポ × 呼吸）
========================================================= */}
<div
  ref={conceptRef}
  className="
    relative z-10 opacity-0
    pt-[8vh] pb-[14vh]
    mx-auto w-[86%] max-w-[840px]
  "
>
  <div className="text-center mb-10">
    <span className="text-white/35 tracking-[0.28em] text-[0.82rem]">
      SCENT CONCEPT
    </span>
  </div>

  <div
    className="
      leading-[2.08]
      text-[1.18rem]
      tracking-[0.02em]
      text-white/88 font-light
      space-y-10 text-center
      whitespace-pre-line
    "
  >
{`ROSE シリーズは、「日常に自然に馴染む香り」をめざして作られています。
強く香らせるのではなく、髪が揺れた瞬間にふっと漂う “距離の美しさ” を大切にしています。

WHITE は軽さ、VEIL は艶、BLUE は透明感。
それぞれの香りが、髪質や仕上がりに応じて静かに整えてくれる処方です。

派手さよりも、余白と質感。
静かに続く香りと手触りが、日常の印象をそっと深めます。`}
  </div>

  <div className="w-[48px] h-[1px] bg-white/25 mx-auto mt-16" />
  <p className="mt-10 text-center text-white/45 text-[0.92rem] tracking-[0.20em]">
    「香りは、生活の“輪郭”になる。」
  </p>
</div>



{/* =========================================================
    SCENT PALETTE — 3 Cards（香るレイヤー × シリーズ統一美）
========================================================= */}
<div className="relative z-10 pb-[18vh] mx-auto w-[88%] max-w-[1180px]">

  <div className="text-center mb-[10vh]">
    <div className="text-white/55 tracking-[0.22em] text-[0.78rem]">
      SCENT PALETTE
    </div>
    <h2 className="mt-4 text-[2.1rem] font-light tracking-[0.06em] text-white/92">
      香りのサンプルを選ぶ
    </h2>
    <p className="mt-5 text-white/60 text-[1.05rem] leading-[1.9]">
      香りはまず “空気” で伝わる。
      <br className="hidden md:block" />
      直感で、もっとも近い質感をお選びください。
    </p>
  </div>

  <div className="flex flex-col md:flex-row justify-center gap-[8vh] md:gap-[3vw]">
    {products.map((p, i) => (
      <div
        key={p.key}
        ref={(el) => (panelRefs.current[i] = el)}
        className={`relative text-center ${
          i === 0 ? "md:translate-y-[2vh] md:scale-[0.96]" : ""
        } ${i === 1 ? "md:-translate-y-[1vh] md:scale-[1.05]" : ""}`}
      >

{/* =========================================================
    Art image — 香る高級レイヤー（動的色変化版）
========================================================= */}

<div className="relative w-fit mx-auto">
  {/* 白膜（全カード共通） */}
  <div
    className="
      absolute inset-0
      opacity-[0.18]
      blur-[32px]
      mix-blend-screen
      pointer-events-none
    "
    style={{
      background:
        "radial-gradient(60% 50% at 50% 45%, rgba(255,255,255,0.55), rgba(255,255,255,0.04), transparent)",
    }}
  />

  {/* 香り色ベール：製品ごとに自動切替 */}
  <div
    className="
      absolute inset-0
      opacity-[0.11]
      blur-[45px]
      mix-blend-lighten
      pointer-events-none
    "
    style={{
      background:
        p.key === "white"
          ? "radial-gradient(70% 60% at 60% 50%, rgba(255,255,255,0.40), rgba(255,255,255,0.06), transparent)"
          : p.key === "veil"
          ? "radial-gradient(70% 60% at 60% 50%, rgba(255,80,130,0.35), rgba(80,0,40,0.06), transparent)"
          : "radial-gradient(70% 60% at 60% 50%, rgba(120,150,255,0.35), rgba(20,40,120,0.05), transparent)",
    }}
  />

  {/* 微粒子グレイン */}
  <div
    className="
      absolute inset-0
      opacity-[0.04]
      mix-blend-soft-light
      pointer-events-none
    "
    style={{
      backgroundImage: "url('/textures/grain-soft.png')",
      backgroundSize: "cover",
      filter: "blur(0.45px)",
    }}
  />

  {/* 実画像 */}
  <img
    src={p.artImage}
    alt={p.title}
    className="
      relative
      w-[70vw] md:w-[26vw]
      max-w-[420px]
      opacity-[0.95]
      mix-blend-lighten
      transition-all
      duration-[900ms]
    "
  />
</div>


        {/* Title */}
        <div className="mt-6 text-center">
          <div
            className={`text-[1.14rem] font-light tracking-[0.22em] ${titleColor[p.key]}`}
          >
            {p.title}
          </div>

          <div
            className="
              mt-2
              text-white/70
              text-[1rem]
              leading-[1.85]
              whitespace-pre-line
            "
          >
            {p.metaCopy}
          </div>
        </div>

        {/* summary */}
        <div
          className="
            mt-5
            text-white/75
            text-[1.02rem]
            leading-[1.88]
            italic
            px-4
            whitespace-pre-line
          "
        >
          {p.summary}
        </div>

        <a
          href={`#product-${p.key}`}
          className="
            mt-6 inline-block
            px-6 py-3
            rounded-[10px]
            border border-white/30
            text-white/85
            text-[0.82rem]
            tracking-[0.22em]
            hover:bg-white/10 hover:text-white
            transition-all
          "
        >
          VIEW SHAMPOO
        </a>
      </div>
    ))}
  </div>



{/* =========================================================
    PRODUCT LINE
========================================================= */}
<div
  ref={productLineRef}
  className="
    product-line-block relative opacity-0 translate-y-[26px]
    w-full mt-[22vh]
    flex flex-col items-center text-center
  "
>
  <div
    className="
      absolute top-[-14vh] left-0 right-0 h-[32vh]
      bg-[radial-gradient(ellipse_at_center,rgba(245,225,235,0.26),transparent)]
      blur-[95px]
      opacity-[0.45]
    "
  />

  <div className="w-[62%] max-w-[900px] h-[1px] bg-[rgba(240,210,220,0.32)]" />

  <p className="mt-6 text-[0.78rem] tracking-[0.34em] text-[rgba(220,200,210,0.55)]">
    PRODUCT LINE
  </p>

  <h2 className="mt-3 text-[2.35rem] font-light tracking-[0.02em] text-[rgba(245,235,240,0.92)]">
    The Rose Signature Collection
  </h2>

  <p className="mt-3 text-[1.02rem] leading-relaxed tracking-wide text-[rgba(230,215,225,0.78)]">
    香りの三つの方向性を、 “質感” として再設計したコレクション。
  </p>

  <div className="mt-10 w-[1px] h-[40px] bg-[rgba(240,210,220,0.45)] rounded-full" />
</div>
</div>

    </section>
  );
}
