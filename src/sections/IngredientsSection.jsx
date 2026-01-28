// src/sections/IngredientsSection.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

const ING = {
  aestheticCopy: `
アミノ酸のやわらかな泡が、髪の表面を乱さずに余分な汚れだけを落とす。
ローズの香りは体温でゆっくりと開き、揺れた瞬間にだけ “距離の美しさ” を残す。

シアバターと植物オイルは、軽い艶膜をつくり、触れた瞬間の質感を静かに底上げする。
派手さよりも、余白と質感。香りと手触りの“輪郭”が、日常の印象をそっと整えるための処方です。
`.trim(),

  categories: [
    {
      key: "active",
      label: "ACTIVE CORE",
      title: "香りと質感の中心成分",
      note: "「香りの輪郭」と「髪の整い」を支える核",
      items: [
        { name: "ローズアブソリュート", role: "体温で開く深度のある香り" },
        { name: "ホワイトローズエキス", role: "清潔感のある甘さ・透明感" },
        { name: "ブルーローズリーフ抽出液", role: "静かな透明感・余韻の整え" },
        { name: "アミノ酸系洗浄成分", role: "やわらかい泡で負担を抑える" },
        { name: "加水分解ケラチン", role: "髪の芯を補強し、まとまりへ" },
        { name: "加水分解シルク", role: "触感のなめらかさ・光沢感" },
      ],
      accent: "rgba(255,255,255,0.42)",
    },
    {
      key: "texture",
      label: "TEXTURE LAYER",
      title: "艶膜・質感レイヤー",
      note: "“しっとり” と “さらり” を両立する設計",
      items: [
        { name: "シアバター", role: "軽い艶膜を形成し、手触りを整える" },
        { name: "ホホバオイル", role: "重くならないまとまり・保護" },
        { name: "アルガンオイル", role: "艶の深度・光の密度を補強" },
        { name: "ローズヒップオイル", role: "透明感のある輝き・柔らかさ" },
      ],
      accent: "rgba(255,90,140,0.38)",
    },
    {
      key: "care",
      label: "SCALP & MOISTURE",
      title: "保湿・頭皮ケア",
      note: "“清潔感” を支える、静かな安心設計",
      items: [
        { name: "パンテノール", role: "保湿・コンディショニング" },
        { name: "アロエベラエキス", role: "うるおい・穏やかな鎮静" },
        { name: "カミツレ花エキス", role: "柔らかさ・整肌" },
        { name: "海藻エキス", role: "保水膜・みずみずしさ" },
      ],
      accent: "rgba(140,175,255,0.36)",
    },
  ],

  closeCopy: `
ROSE シリーズの処方は、「香り × 質感 × 持続」を静かに底上げするための 3レイヤー構造。
WHITE は “軽さと清潔感”、VEIL は “艶と深紅の余韻”、BLUE は “透明感と潤い”。
あなたの髪質と雰囲気に合う一本をお選びください。
`.trim(),
};

export default function IngredientsSection() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const aRef = useRef(null);
  const cardsRef = useRef([]);
  const closeRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.set([headRef.current, aRef.current, closeRef.current], {
      opacity: 0,
      y: 18,
      filter: "blur(10px)",
    });
    gsap.set(cardsRef.current, {
      opacity: 0,
      y: 18,
      scale: 0.98,
      filter: "blur(10px)",
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: "sine.out" } });

      tl.to(headRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1 })
        .to(aRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.15 }, "-=0.55")
        .to(
          cardsRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.05,
            stagger: 0.14,
          },
          "-=0.55"
        )
        .to(closeRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.05 }, "-=0.55");

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          tl.play();
          io.disconnect();
        },
        { threshold: 0.14 }
      );

      io.observe(el);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative w-full
        bg-black text-white
        pt-[18vh] pb-[18vh]
        overflow-hidden
      "
    >
      {/* ============================================
          ★ フルワイド背景（画像 + 深紅 + 白光 + 青膜）
      ============================================ */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none z-[1]">

{/* BACKGROUND IMAGE (Ultra subtle) */}
<div
  className="
    absolute inset-0
    opacity-[0.12]
    bg-center bg-cover
    blur-[80px]
    mix-blend-soft-light
  "
  style={{
    backgroundImage: "url('/textures/ing-bg.png')",
  }}
/>

        {/* DEEP RED (Right bottom) */}
        <div
          className="
            absolute inset-0 opacity-[0.22] blur-[120px] mix-blend-screen
          "
          style={{
            background: `
              radial-gradient(
                1400px 900px at 82% 85%,
                rgba(120, 20, 40, 0.32),
                transparent 70%
              )
            `,
          }}
        />

        {/* WHITE LAB LIGHT */}
        <div
          className="
            absolute inset-0 opacity-[0.25] blur-[100px] mix-blend-lighten
          "
          style={{
            background: `
              radial-gradient(
                1100px 800px at 48% 12%,
                rgba(255,255,255,0.26),
                transparent 65%
              )
            `,
          }}
        />

        {/* BLUE MIST */}
        <div
          className="
            absolute inset-0 opacity-[0.18] blur-[120px] mix-blend-screen
          "
          style={{
            background: `
              radial-gradient(
                1200px 820px at 20% 80%,
                rgba(140,175,255,0.22),
                transparent 68%
              )
            `,
          }}
        />

        {/* Soft grain (existing) */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-soft-light"
          style={{
            backgroundImage: "url('/textures/grain-soft.png')",
            backgroundSize: "cover",
            filter: "blur(0.6px)",
          }}
        />
      </div>

      {/* ===== HEADER ===== */}
      <div ref={headRef} className="relative z-10 mx-auto w-[88%] max-w-[1100px] text-center">
        <div className="text-white/60 tracking-[0.22em] text-[0.78rem]">
          INGREDIENTS / FORMULA
        </div>

        <h2 className="mt-4 text-[2.35rem] md:text-[2.55rem] font-light tracking-[0.03em] text-white/96">
          美しさの裏側にある、処方の設計。
        </h2>

        <p className="mt-5 text-white/70 text-[1.02rem] leading-[1.9]">
          香りは “空気” 、質感は “膜” 。<br className="hidden md:block" />
          ROSE は、静かな上質さを支える成分設計でつくられています。
        </p>

        <div className="mt-10 mx-auto w-[64px] h-[1px] bg-white/25" />
      </div>

      {/* ===== Aesthetic Copy ===== */}
      <div ref={aRef} className="relative z-10 mx-auto mt-[10vh] w-[88%] max-w-[980px] text-center">
        <div
          className="
            relative rounded-[18px]
            border border-white/14
            bg-white/[0.04] backdrop-blur-[8px]
            px-7 md:px-10 py-9 md:py-10
            overflow-hidden
          "
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.42] blur-[58px] mix-blend-screen"
            style={{
              background: `
                radial-gradient(520px 340px at 22% 32%, rgba(255,255,255,0.20), transparent 60%),
                radial-gradient(540px 380px at 54% 50%, rgba(255,90,140,0.16), transparent 62%),
                radial-gradient(560px 380px at 78% 36%, rgba(140,175,255,0.16), transparent 62%)
              `,
            }}
          />

          <div className="relative">
            <div className="text-white/45 tracking-[0.28em] text-[0.78rem]">
              AESTHETIC × SCIENCE
            </div>

            <p className="mt-6 text-white/84 text-[1.06rem] leading-[2.0] whitespace-pre-line font-light">
              {ING.aestheticCopy}
            </p>
          </div>
        </div>
      </div>

      {/* ===== Categories ===== */}
      <div className="relative z-10 mx-auto mt-[14vh] w-[90%] max-w-[1180px]">
        <div className="text-center mb-[8vh]">
          <div className="text-white/60 tracking-[0.22em] text-[0.78rem]">
            FORMULA STRUCTURE
          </div>

          <h3 className="mt-4 text-[1.85rem] md:text-[2.05rem] font-light tracking-[0.03em] text-white/96">
            3レイヤーで、香りと手触りを整える
          </h3>

          <p className="mt-4 text-white/68 text-[1.0rem] leading-[1.9]">
            成分は “列挙” ではなく、“意図”で読む。<br className="hidden md:block" />
            役割別に整理すると、上質さの理由が見えてくる。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {ING.categories.map((c, idx) => (
            <div
              key={c.key}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="
                relative rounded-[16px]
                border border-white/14
                bg-white/[0.04] backdrop-blur-[10px]
                px-6 py-7 overflow-hidden
              "
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.22] blur-[62px] mix-blend-screen"
                style={{
                  background: `radial-gradient(420px 360px at 60% 30%, ${c.accent}, transparent 62%)`,
                }}
              />

              <div className="relative">
                <div className="text-white/45 tracking-[0.28em] text-[0.74rem]">
                  {c.label}
                </div>

                <div className="mt-3 text-white/96 text-[1.12rem] tracking-[0.06em] font-light">
                  {c.title}
                </div>

                <div className="mt-3 text-white/60 text-[0.92rem] leading-[1.7]">
                  {c.note}
                </div>

                <div className="mt-6 h-[1px] w-full bg-white/14" />

                <ul className="mt-5 space-y-3">
                  {c.items.map((it) => (
                    <li key={it.name} className="text-left">
                      <div className="text-white/90 text-[0.96rem] tracking-[0.04em]">
                        {it.name}
                      </div>
                      <div className="mt-1 text-white/58 text-[0.86rem] leading-[1.65]">
                        {it.role}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex items-center gap-3">
                  <div className="h-[1px] flex-1 bg-white/12" />
                  <div className="text-white/35 text-[0.72rem] tracking-[0.22em]">ROSE</div>
                  <div className="h-[1px] flex-1 bg-white/12" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== CLOSE ===== */}
      <div
        ref={closeRef}
        className="relative z-10 mx-auto mt-[14vh] w-[88%] max-w-[980px] text-center"
      >
        <div className="mx-auto w-[64px] h-[1px] bg-white/20" />

        <p className="mt-10 text-white/80 text-[1.02rem] leading-[2.0] whitespace-pre-line font-light">
          {ING.closeCopy}
        </p>
      </div>
    </section>
  );
}
