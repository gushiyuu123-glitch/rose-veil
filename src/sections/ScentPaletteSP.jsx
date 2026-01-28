// src/sections/ScentPaletteSP.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { titleColor } from "../styles/titleColorTokens";
import { products } from "../data/products";

export default function ScentPaletteSP() {
  const sectionRef = useRef(null);
  const conceptRef = useRef(null);
  const productLineRef = useRef(null);
  const panelRefs = useRef([]);

  /* =========================================================
      GSAP — 呼吸アニメーション（SP向けに軽量化）
  ========================================================= */
  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.set(conceptRef.current, { opacity: 0, y: 22 });
    gsap.set(productLineRef.current, { opacity: 0, y: 26 });
    panelRefs.current.forEach((p) => {
      if (p) gsap.set(p, { opacity: 0, y: 22, scale: 0.96 });
    });

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "sine.out" },
    });

    tl.to(conceptRef.current, { opacity: 1, y: 0, duration: 1.1 })
      .to(
        panelRefs.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.15,
          stagger: 0.14,
          filter: "blur(0px)",
        },
        "-=0.45"
      )
      .to(
        productLineRef.current,
        { opacity: 1, y: 0, duration: 1.1 },
        "-=0.35"
      );

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tl.play();
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    io.observe(sectionRef.current);
  }, []);

  return (
    <section
      id="concept"
      ref={sectionRef}
      className="
        relative w-full bg-black text-white
        pt-[16vh] pb-[12vh]
        overflow-hidden
      "
    >

      {/* =========================================================
          BACKGROUND（SP専用：濃度ダウン × 香り膜だけ残す）
      ========================================================= */}
      <div aria-hidden="true" className="absolute inset-0 z-0">

        {/* 下地黒 */}
        <div className="absolute inset-0 bg-black" />

        {/* 白膜（右下） */}
        <img
          src="/bg/rose-vein.png"
          className="
            absolute right-[-14%] bottom-[-4%]
            w-[92vw]
            opacity-[0.22]
            blur-[5px]
            scale-[1.05]
            mix-blend-lighten
          "
        />

        {/* 白霧（右側） */}
        <div
          className="
            absolute right-[-6%] bottom-[8%]
            w-[70vw] h-[70vh]
            opacity-[0.12]
            blur-[55px]
            mix-blend-screen
          "
          style={{
            background:
              "radial-gradient(800px 580px at 50% 40%, rgba(255,255,255,0.28), transparent)",
          }}
        />

        {/* 赤膜（左側） */}
        <img
          src="/bg/rose-red.png"
          className="
            absolute left-[-26%] top-[12%]
            w-[90vw]
            opacity-[0.22]
            blur-[6px]
            scale-[1.06]
            mix-blend-lighten
          "
        />

        {/* 赤霧 */}
        <div
          className="
            absolute left-[-16%] top-[18%]
            w-[68vw] h-[64vh]
            opacity-[0.12]
            blur-[55px]
            mix-blend-screen
          "
          style={{
            background:
              "radial-gradient(750px 560px at 50% 36%, rgba(255,60,110,0.18), transparent)",
          }}
        />

        {/* 粒子 */}
        <div
          className="
            absolute inset-0
            opacity-[0.04]
            mix-blend-soft-light
          "
          style={{
            backgroundImage: "url('/textures/grain-soft.png')",
            backgroundSize: "cover",
            filter: "blur(0.4px)",
          }}
        />
      </div>

      {/* =========================================================
          SCENT CONCEPT（SP：縦幅圧縮 × 世界観維持）
      ========================================================= */}
      <div
        ref={conceptRef}
        className="
          relative z-10 opacity-0
          mx-auto w-[88%]
          text-center
          mb-[10vh]
        "
      >
        <span className="text-white/35 tracking-[0.26em] text-[0.75rem]">
          SCENT CONCEPT
        </span>

        <div
          className="
            mt-6
            leading-[1.9]
            text-[1.02rem]
            text-white/90
            font-light
            whitespace-pre-line
          "
        >
{`ROSE シリーズは「強く香らせないこと」を美学として設計。
髪が揺れた瞬間だけふっと漂う “距離の美しさ” を軸にしています。

WHITE は軽さ、VEIL は艶、BLUE は透明感。
日常に自然に馴染む香りと質感を選べる処方です。`}
        </div>

        <div className="w-[40px] h-[1px] bg-white/25 mx-auto mt-10" />

        <p className="mt-5 text-white/45 text-[0.85rem] tracking-[0.18em]">
          「香りは、生活の “輪郭” になる。」
        </p>
      </div>

      {/* =========================================================
          SCENT PALETTE（3カード縦配置）
      ========================================================= */}
      <div className="relative z-10 mx-auto w-[88%] space-y-[14vh] mb-[16vh]">

        {products.map((p, i) => (
          <div
            key={p.key}
            ref={(el) => (panelRefs.current[i] = el)}
            className="opacity-0 translate-y-[22px]"
          >
            {/* 画像（SPフルワイド系） */}
            <div className="relative w-fit mx-auto">

              {/* 白膜 */}
              <div
                className="
                  absolute inset-0 opacity-[0.14]
                  blur-[26px] mix-blend-screen
                "
                style={{
                  background:
                    "radial-gradient(60% 50% at 50% 45%, rgba(255,255,255,0.45), transparent)",
                }}
              />

              {/* 色膜 */}
              <div
                className="
                  absolute inset-0
                  opacity-[0.10]
                  blur-[42px]
                  mix-blend-lighten
                "
                style={{
                  background:
                    p.key === "white"
                      ? "radial-gradient(70% 60%, rgba(255,255,255,0.38), transparent)"
                      : p.key === "veil"
                      ? "radial-gradient(70% 60%, rgba(255,80,130,0.32), transparent)"
                      : "radial-gradient(70% 60%, rgba(120,150,255,0.32), transparent)",
                }}
              />

              {/* グレイン */}
              <div
                className="
                  absolute inset-0
                  opacity-[0.04]
                  mix-blend-soft-light
                "
                style={{
                  backgroundImage: "url('/textures/grain-soft.png')",
                  backgroundSize: "cover",
                  filter: "blur(0.4px)",
                }}
              />

              {/* 実画像 */}
              <img
                src={p.artImage}
                alt={p.title}
                className="
                  relative
                  w-[86vw] max-w-[420px]
                  opacity-[0.95]
                  mix-blend-lighten
                "
              />
            </div>

            {/* タイトル */}
            <div className="mt-6 text-center">
              <div
                className={`text-[1.12rem] font-light tracking-[0.20em] ${titleColor[p.key]}`}
              >
                {p.title}
              </div>
              <div className="mt-2 text-white/70 text-[0.98rem] leading-[1.85] whitespace-pre-line">
                {p.metaCopy}
              </div>
            </div>

            {/* summary */}
            <p className="mt-4 text-white/75 text-[0.95rem] leading-[1.85] italic whitespace-pre-line">
              {p.summary}
            </p>

            <a
              href={`#product-${p.key}`}
              className="
                block mx-auto mt-6
                w-fit
                px-6 py-3
                rounded-[10px]
                border border-white/25
                text-white/85
                text-[0.78rem]
                tracking-[0.20em]
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
          PRODUCT LINE（締めのセクション）
      ========================================================= */}
      <div
        ref={productLineRef}
        className="relative z-10 opacity-0 translate-y-[26px] text-center"
      >
        <div className="w-[60%] mx-auto h-[1px] bg-white/18" />

        <p className="mt-6 text-[0.75rem] tracking-[0.28em] text-white/40">
          PRODUCT LINE
        </p>

        <h2 className="mt-3 text-[1.85rem] font-light tracking-[0.02em] text-white/90">
          The Rose Signature Collection
        </h2>

        <p className="mt-3 text-[0.95rem] leading-relaxed text-white/65">
          香りの三方向を “質感” として再設計したコレクション。
        </p>

        <div className="mt-10 w-[1px] h-[36px] mx-auto bg-white/25 rounded-full" />
      </div>

    </section>
  );
}
