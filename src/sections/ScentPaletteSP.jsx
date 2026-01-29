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

  /* ===============================
      GSAP（SP最適）
  =============================== */
  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.set(conceptRef.current, { opacity: 0, y: 24 });
    gsap.set(productLineRef.current, { opacity: 0, y: 32 });

    panelRefs.current.forEach((p) => {
      if (!p) return;
      gsap.set(p, {
        opacity: 0,
        y: 26,
        scale: 0.965,
        filter: "blur(6px)",
      });
    });

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.out" },
    });

    tl.to(conceptRef.current, { opacity: 1, y: 0, duration: 1.1 })
      .to(
        panelRefs.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.15,
          stagger: 0.18,
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
      ([e]) => {
        if (e.isIntersecting) {
          tl.play();
          io.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    io.observe(sectionRef.current);
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
          背景（全て pointer-events-none）
      =============================== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-black" />

        <img
          src="/bg/rose-vein.png"
          className="
            absolute right-[-26%] bottom-[6%]
            w-[92vw] opacity-[0.18] blur-[4px]
            scale-[1.05] mix-blend-lighten
          "
        />

        <div
          className="
            absolute right-[-4%] bottom-[11%]
            w-[72vw] h-[68vh]
            opacity-[0.10] blur-[48px]
            mix-blend-screen
          "
          style={{
            background:
              "radial-gradient(800px 580px at 50% 35%, rgba(255,255,255,0.23), transparent)",
          }}
        />

        <img
          src="/bg/rose-red.png"
          className="
            absolute left-[-22%] top-[11%]
            w-[90vw] opacity-[0.18] blur-[5px]
            scale-[1.05] mix-blend-lighten
          "
        />

        <div
          className="
            absolute left-[-14%] top-[18%]
            w-[68vw] h-[62vh]
            opacity-[0.11] blur-[50px]
            mix-blend-screen
          "
          style={{
            background:
              "radial-gradient(720px 520px at 50% 36%, rgba(255,60,110,0.15), transparent)",
          }}
        />

        <div
          className="
            absolute inset-0 opacity-[0.035]
            mix-blend-soft-light
          "
          style={{
            backgroundImage: "url('/textures/grain-soft.png')",
            backgroundSize: "cover",
          }}
        />
      </div>

      {/* ===============================
          SCENT CONCEPT（全センター）
      =============================== */}
      <div
        ref={conceptRef}
        className="
          relative z-10 opacity-0
          mx-auto w-[88%]
          text-center
          mb-[11vh]
        "
      >
        <span className="text-white/35 tracking-[0.26em] text-[0.75rem]">
          SCENT CONCEPT
        </span>

        <p
          className="
            mt-6 text-[1.03rem]
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
          PALETTE（全センター揃え）
      =============================== */}
      <div className="relative z-10 mx-auto w-[88%] space-y-[14vh] mb-[18vh]">
        {products.map((p, i) => (
          <div
            key={p.key}
            ref={(el) => (panelRefs.current[i] = el)}
            className="opacity-0 translate-y-[26px]"
          >
            {/* 画像 */}
            <div className="relative w-fit mx-auto pointer-events-none">
              <div
                className="
                  absolute inset-0 opacity-[0.13]
                  blur-[24px] mix-blend-screen
                "
                style={{
                  background:
                    "radial-gradient(60% 50% at 50% 45%, rgba(255,255,255,0.42), transparent)",
                }}
              />

              <div
                className="
                  absolute inset-0 opacity-[0.10]
                  blur-[38px] mix-blend-lighten
                "
                style={{
                  background:
                    p.key === "white"
                      ? "rgba(255,255,255,0.34)"
                      : p.key === "veil"
                      ? "rgba(255,80,130,0.28)"
                      : "rgba(120,150,255,0.27)",
                }}
              />

              <div
                className="
                  absolute inset-0 opacity-[0.04]
                  mix-blend-soft-light
                "
                style={{
                  backgroundImage: "url('/textures/grain-soft.png')",
                  backgroundSize: "cover",
                }}
              />

              <img
                src={p.artImage}
                alt={p.title}
                className="
                  relative w-[86vw] max-w-[420px]
                  opacity-[0.96] mix-blend-lighten
                "
              />
            </div>

            {/* テキスト（すべて中央揃え） */}
            <div className="mt-6 text-center">
              <div
                className={`text-[1.12rem] font-light tracking-[0.20em] ${titleColor[p.key]}`}
              >
                {p.title}
              </div>

              <p
                className="
                  mt-3 text-white/70
                  text-[0.98rem] leading-[1.9]
                  whitespace-pre-line
                  [text-wrap:balance]
                  text-center
                "
              >
                {p.metaCopy}
              </p>
            </div>

            <p
              className="
                mt-4 text-white/75
                text-[0.95rem] leading-[1.9]
                italic whitespace-pre-line
                [text-wrap:balance]
                text-center
              "
            >
              {p.summary}
            </p>

            {/* ===============================
                CTA（ページ内リンク100%成功版）
            =============================== */}
            <a
              href={`#products-sp-${p.key}`}
              className="
                relative z-[20]
                block mx-auto mt-7
                w-fit px-7 py-3
                rounded-[12px]
                border border-white/22
                text-white/85
                text-[0.82rem]
                tracking-[0.22em]
                hover:bg-white/10 hover:text-white
                transition-all
                pointer-events-auto
              "
            >
              VIEW SHAMPOO
            </a>
          </div>
        ))}
      </div>

      {/* ===============================
          PRODUCT LINE
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
