// src/sections/IngredientsSection_sp.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

const ING = {
  aestheticCopy: `
アミノ酸のやわらかな泡が、髪の表面を乱さずに余分な汚れだけを落とす。

ローズの香りは体温でゆっくりと開き、
揺れた瞬間にだけ “距離の美しさ” を残す。

シアバターと植物オイルは、軽い艶膜をつくり、
触れた瞬間の質感を静かに底上げする。

派手さよりも、余白と質感。
香りと手触りの“輪郭”が、日常の印象をそっと整える処方です。
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
      accent: "rgba(255,255,255,0.23)",
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
      accent: "rgba(255,90,140,0.20)",
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
      accent: "rgba(140,175,255,0.20)",
    },
  ],

  closeCopy: `
ROSE シリーズの処方は、「香り × 質感 × 持続」を静かに底上げするための 3レイヤー構造。

WHITE は “軽さと清潔感”
VEIL は “艶と深紅の余韻”
BLUE は “透明感と潤い”。

あなたの髪質と雰囲気に合う一本をお選びください。
`.trim(),
};

export default function IngredientsSection_sp() {
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
      scale: 0.97,
      filter: "blur(10px)",
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "sine.out" },
      });

      tl.to(headRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 })
        .to(aRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.05 }, "-=0.55")
        .to(
          cardsRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.12,
          },
          "-=0.52"
        )
        .to(closeRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.95 }, "-=0.52");

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          tl.play();
          io.disconnect();
        },
        { threshold: 0.18 }
      );

      io.observe(el);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative w-full bg-black text-white
        pt-[12vh] pb-[12vh]
        overflow-hidden
      "
    >
      {/* =====================================================
          ★ 背景（白膜 × 深紅 × 青膜）完全アップグレード版
      ===================================================== */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none z-[1]">

        {/* White Soft Film（基礎光） */}
        <div
          className="absolute inset-0 opacity-[0.10] blur-[26px] mix-blend-soft-light"
          style={{
            backgroundImage: "url('/textures/ing-bg.png')",
            backgroundSize: "cover",
          }}
        />

        {/* Deep Rose Film（深紅の気配） */}
        <div
          className="absolute inset-0 opacity-[0.16] blur-[40px] mix-blend-screen"
          style={{
            background: `
              radial-gradient(
                1080px 760px at 78% 88%,
                rgba(120, 20, 40, 0.25),
                transparent 68%
              )
            `,
          }}
        />

        {/* Blue Mist（青い静けさ） */}
        <div
          className="absolute inset-0 opacity-[0.14] blur-[40px] mix-blend-screen"
          style={{
            background: `
              radial-gradient(
                1000px 720px at 22% 80%,
                rgba(140,175,255,0.22),
                transparent 70%
              )
            `,
          }}
        />

        {/* Grain (極薄) */}
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-soft-light"
          style={{
            backgroundImage: "url('/textures/grain-soft.png')",
            backgroundSize: "cover",
            filter: "blur(0.3px)",
          }}
        />
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div ref={headRef} className="relative z-10 mx-auto w-[90%] max-w-[860px] text-center">
        <div className="text-white/55 tracking-[0.22em] text-[0.75rem]">
          INGREDIENTS / FORMULA
        </div>

        <h2 className="mt-4 text-[1.95rem] font-light tracking-[0.04em] text-white/96">
          美しさの裏側にある、処方の設計。
        </h2>

        <p className="mt-5 text-white/72 text-[0.95rem] leading-[1.85]">
          香りは “空気” 、質感は “膜”。  
          ROSE は、静かな上質さを支える成分設計です。
        </p>

        <div className="mt-9 mx-auto w-[54px] h-[1px] bg-white/22" />
      </div>

      {/* =====================================================
          AESTHETIC COPY
      ===================================================== */}
      <div ref={aRef} className="relative z-10 mx-auto mt-[10vh] w-[90%] max-w-[860px] text-center">
        <div
          className="
            relative rounded-[16px]
            border border-white/12
            bg-white/[0.03] backdrop-blur-[6px]
            px-6 py-8
          "
        >
          {/* 内部膜（気配だけ） */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.14] blur-[30px] mix-blend-screen"
            style={{
              background: `
                radial-gradient(420px 300px at 22% 32%, rgba(255,255,255,0.14), transparent 58%),
                radial-gradient(440px 330px at 54% 50%, rgba(255,90,140,0.10), transparent 58%),
                radial-gradient(460px 340px at 78% 36%, rgba(140,175,255,0.12), transparent 58%)
              `,
            }}
          />

          <div className="relative">
            <div className="text-white/38 tracking-[0.28em] text-[0.72rem]">
              AESTHETIC × SCIENCE
            </div>

            <p className="mt-5 text-white/85 text-[0.96rem] leading-[1.9] whitespace-pre-line font-light">
              {ING.aestheticCopy}
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          CATEGORIES
      ===================================================== */}
      <div className="relative z-10 mx-auto mt-[12vh] w-[92%] max-w-[960px]">
        <div className="text-center mb-[7vh]">
          <div className="text-white/55 tracking-[0.22em] text-[0.75rem]">FORMULA STRUCTURE</div>
          <h3 className="mt-4 text-[1.65rem] font-light tracking-[0.04em] text-white/96">
            3レイヤーで、香りと手触りを整える
          </h3>
          <p className="mt-4 text-white/65 text-[0.92rem] leading-[1.85]">
            成分は “列挙” ではなく “意図” で読む。
            役割別に整理すると、上質さの理由が見えてくる。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {ING.categories.map((c, idx) => (
            <div
              key={c.key}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="
                relative rounded-[16px]
                border border-white/12
                bg-white/[0.03] backdrop-blur-[6px]
                px-6 py-7 overflow-hidden
              "
            >
              {/* アクセント膜（超繊細） */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.14] blur-[28px] mix-blend-screen"
                style={{
                  background: `radial-gradient(380px 300px at 58% 30%, ${c.accent}, transparent 60%)`,
                }}
              />

              <div className="relative">
                <div className="text-white/40 tracking-[0.28em] text-[0.7rem]">{c.label}</div>

                <div className="mt-3 text-white/94 text-[1.05rem] tracking-[0.06em] font-light">
                  {c.title}
                </div>

                <div className="mt-3 text-white/60 text-[0.88rem] leading-[1.7]">
                  {c.note}
                </div>

                <div className="mt-5 h-[1px] w-full bg-white/12" />

                <ul className="mt-5 space-y-3">
                  {c.items.map((it) => (
                    <li key={it.name}>
                      <div className="text-white/92 text-[0.92rem] tracking-[0.03em]">
                        {it.name}
                      </div>
                      <div className="mt-1 text-white/55 text-[0.82rem] leading-[1.65]">
                        {it.role}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex items-center gap-3">
                  <div className="h-[1px] flex-1 bg-white/12" />
                  <div className="text-white/28 text-[0.68rem] tracking-[0.22em]">ROSE</div>
                  <div className="h-[1px] flex-1 bg-white/12" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          CLOSE COPY
      ===================================================== */}
      <div ref={closeRef} className="relative z-10 mx-auto mt-[12vh] w-[90%] max-w-[860px] text-center">
        <div className="mx-auto w-[54px] h-[1px] bg-white/18" />

        <p className="mt-9 text-white/82 text-[0.96rem] leading-[1.9] whitespace-pre-line font-light">
          {ING.closeCopy}
        </p>
      </div>
    </section>
  );
}
