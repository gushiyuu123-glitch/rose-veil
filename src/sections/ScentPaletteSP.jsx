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

useEffect(() => {
  const section = sectionRef.current;
  if (!section) return;

  // GSAP初期化（refがnullでも落ちないようにガード）
  const safeSet = (target, vars) => target && gsap.set(target, vars);

  safeSet(conceptRef.current, {
    opacity: 0,
    y: 24,
    filter: "blur(6px)",
    willChange: "transform,opacity,filter",
  });

  safeSet(productLineRef.current, {
    opacity: 0,
    y: 28,
    filter: "blur(6px)",
    willChange: "transform,opacity,filter",
  });

  panelRefs.current.forEach((p) => {
    safeSet(p, {
      opacity: 0,
      y: 22,
      scale: 0.965,
      filter: "blur(8px)",
      willChange: "transform,opacity,filter",
    });
  });

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.out" },
  });

  tl.to(conceptRef.current, {
    opacity: 1,
    y: 0,
    duration: 1.1,
    filter: "blur(0px)",
  })
    .to(
      panelRefs.current.filter(Boolean), // ← null混入対策
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.18,
      },
      "-=0.45"
    )
    .to(
      productLineRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.15,
        filter: "blur(0px)",
      },
      "-=0.35"
    );

  // iOS対策：IOを「少し早めに」発火させる + 初回描画ズレ対策
  let io;
  const playOnce = () => {
    if (tl.isActive() || tl.progress() > 0) return;
    tl.play();
    io && io.disconnect();
  };

  // Reduce Motion 対策（ONの人はフェードさせず表示）
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reduce) {
    tl.progress(1);
    return;
  }

  // requestAnimationFrameで1フレーム遅らせて監視開始（Safari安定化）
  const raf = requestAnimationFrame(() => {
    io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) playOnce();
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -18% 0px", // ← 少し手前で発火（スマホ安定）
      }
    );
    io.observe(section);

    // フォールバック：もし既に画面内なら即再生
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) playOnce();
  });

  return () => {
    cancelAnimationFrame(raf);
    io && io.disconnect();
    tl.kill();
  };
}, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative w-full bg-black text-white
        pt-[17vh] pb-[14vh]
        overflow-hidden
        pointer-events-auto
      "
    >
      {/* ===============================
          BACKGROUND LAYERS（静脈 × 光膜 × 粒子）
      =============================== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* 黒ベース */}
        <div className="absolute inset-0 bg-black" />

        {/* 右ローズ静脈（赤） */}
        <img
          src="/bg/rose-vein.png"
          className="
            absolute right-[-24%] bottom-[3%]
            w-[90vw]
            opacity-[0.16] blur-[4px]
            scale-[1.06] mix-blend-lighten
          "
        />

        {/* 右・白光膜 */}
        <div
          className="
            absolute right-[-6%] bottom-[12%]
            w-[74vw] h-[62vh]
            opacity-[0.12] blur-[48px]
            mix-blend-screen
          "
          style={{
            background:
              "radial-gradient(760px 540px at 52% 36%, rgba(255,255,255,0.22), transparent)",
          }}
        />

        {/* 左ローズ静脈（深紅） */}
        <img
          src="/bg/rose-red.png"
          className="
            absolute left-[-26%] top-[12%]
            w-[92vw] opacity-[0.18]
            blur-[5px] scale-[1.05]
            mix-blend-lighten
          "
        />

        {/* 左・桜膜 */}
        <div
          className="
            absolute left-[-12%] top-[18%]
            w-[68vw] h-[62vh]
            opacity-[0.14] blur-[52px]
            mix-blend-screen
          "
          style={{
            background:
              "radial-gradient(720px 520px at 50% 36%, rgba(255,60,110,0.16), transparent)",
          }}
        />

        {/* 粒子膜（世界観統一） */}
        <div
          className="
            absolute inset-0 opacity-[0.030]
            mix-blend-soft-light
          "
          style={{
            backgroundImage: "url('/textures/grain-soft.png')",
            backgroundSize: "cover",
          }}
        />
      </div>

      {/* ===============================
          SCENT CONCEPT
      =============================== */}
      <div
        ref={conceptRef}
        className="
          relative z-10 opacity-0
          mx-auto w-[88%] text-center
          mb-[11vh]
        "
      >
        <span className="text-white/35 tracking-[0.26em] text-[0.75rem]">
          SCENT CONCEPT
        </span>

        <p
          className="
            mt-6 text-[1.06rem]
            leading-[1.95]
            text-white/90 font-light
            whitespace-pre-line
            [text-wrap:balance]
            text-center
          "
        >
{`ROSE シリーズは「強く香らせないこと」を美学として設計。
髪が揺れた瞬間だけふっと漂う “距離の美しさ” を軸にしています。

WHITE は軽さ、VEIL は艶、BLUE は透明感。
日常に自然に馴染む香りと質感を選べる処方です。`}
        </p>

        <div className="w-[38px] h-[1px] bg-white/25 mx-auto mt-10" />

        <p className="mt-5 text-white/45 text-[0.85rem] tracking-[0.18em]">
          「香りは、生活の “輪郭” になる。」
        </p>
      </div>

      {/* ===============================
          PALETTE（ボトル群）
      =============================== */}
      <div className="relative z-10 mx-auto w-[88%] space-y-[14vh] mb-[18vh]">
        {products.map((p, i) => (
          <div
            key={p.key}
            ref={(el) => (panelRefs.current[i] = el)}
            className="opacity-0 translate-y-[22px]"
          >
            {/* 画像レイヤー */}
            <div className="relative w-fit mx-auto pointer-events-none">
              {/* 白光膜 */}
              <div
                className="
                  absolute inset-0 opacity-[0.14]
                  blur-[26px] mix-blend-screen
                "
                style={{
                  background:
                    "radial-gradient(60% 50% at 50% 45%, rgba(255,255,255,0.42), transparent)",
                }}
              />

              {/* 色膜（商品別：濃度最適化） */}
              <div
                className="
                  absolute inset-0 opacity-[0.12]
                  blur-[34px] mix-blend-lighten
                "
                style={{
                  background:
                    p.key === "white"
                      ? "rgba(255,255,255,0.30)"
                      : p.key === "veil"
                      ? "rgba(255,60,120,0.26)"
                      : "rgba(120,150,255,0.24)",
                }}
              />

              {/* 粒子膜 */}
              <div
                className="
                  absolute inset-0 opacity-[0.05]
                  mix-blend-soft-light
                "
                style={{
                  backgroundImage: "url('/textures/grain-soft.png')",
                  backgroundSize: "cover",
                }}
              />

              {/* 本体画像 */}
              <img
                src={p.artImage}
                alt={p.title}
                className="
                  relative w-[86vw] max-w-[420px]
                  opacity-[0.96] mix-blend-lighten
                "
              />
            </div>

            {/* テキスト */}
            <div className="mt-6 text-center">
              <div
                className={`
                  text-[1.14rem] font-light tracking-[0.20em]
                  ${titleColor[p.key]}
                `}
              >
                {p.title}
              </div>

              <p
                className="
                  mt-3 text-white/72 text-[0.98rem]
                  leading-[1.9] whitespace-pre-line
                  [text-wrap:balance] text-center
                "
              >
                {p.metaCopy}
              </p>

              <p
                className="
                  mt-4 text-white/80 italic
                  text-[0.95rem] leading-[1.9]
                  whitespace-pre-line
                  [text-wrap:balance] text-center
                "
              >
                {p.summary}
              </p>
            </div>

            {/* CTA */}
            <a
              href={`#products-sp-${p.key}`}
              className="
                relative z-[20]
                block mx-auto mt-7
                w-fit px-7 py-3 rounded-[12px]
                border border-white/22
                text-white/85 text-[0.82rem]
                tracking-[0.22em]
                hover:bg-white/10 hover:text-white
                transition-all pointer-events-auto
              "
            >
              VIEW SHAMPOO
            </a>
          </div>
        ))}
      </div>

      {/* ===============================
          PRODUCT LINE 最下部
      =============================== */}
      <div
        ref={productLineRef}
        className="relative z-10 opacity-0 translate-y-[32px] text-center"
      >
        <div className="w-[60%] mx-auto h-[1px] bg-white/18" />

        <p className="mt-6 text-[0.75rem] tracking-[0.28em] text-white/40">
          PRODUCT LINE
        </p>

        <h2 className="mt-3 text-[1.85rem] font-light tracking-[0.02em] text-white/90">
          The Rose Signature Collection
        </h2>

        <p className="mt-3 text-[0.95rem] leading-relaxed text-white/65 text-center">
          香りの三方向を “質感” として再設計したコレクション。
        </p>

        <div className="mt-10 w-[1px] h-[36px] mx-auto bg-white/25 rounded-full" />
      </div>
    </section>
  );
}
