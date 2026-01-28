// src/sections/ReviewSection.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   REVIEW DATA
============================================================ */
const reviews = [
  {
    name: "女性 / 20代",
    text: `香りが“静かに続く”タイプで、仕事中も上品にまとまります。
つけすぎ感がなく、髪を触ったときの手触りがとても良い。`,
    stars: 5,
    tone: "veil",
  },
  {
    name: "女性 / 30代",
    text: `乾かしたあと、毛先だけ自然に艶が出て驚きました。
ローズの香りも甘すぎず、近くでふわっと香る絶妙さです。`,
    stars: 5,
    tone: "crimson",
  },
  {
    name: "男性 / 20代",
    text: `職場で「香りいいですね」と言われたのは初めてです。
強くないのに清潔感が残りやすい。リピートします。`,
    stars: 4,
    tone: "blue",
  },
];

/* ============================================================
   TONE GRADIENTS
============================================================ */
const toneGrad = (tone) => {
  if (tone === "crimson")
    return "radial-gradient(70% 60% at 30% 20%, rgba(255,140,160,0.18), rgba(255,255,255,0.03), transparent)";
  if (tone === "blue")
    return "radial-gradient(70% 60% at 70% 30%, rgba(160,195,255,0.16), rgba(255,255,255,0.03), transparent)";
  return "radial-gradient(70% 60% at 45% 25%, rgba(255,180,200,0.16), rgba(255,255,255,0.03), transparent)";
};

/* ============================================================
   Component
============================================================ */
export default function ReviewSection() {
  const ref = useRef(null);
  const cardsRef = useRef([]);

  /* -------------------------------
        Fade + Motion
  -------------------------------- */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cards = cardsRef.current.filter(Boolean);
    gsap.set(cards, { opacity: 0, y: 28, filter: "blur(14px)" });
    gsap.set(".rev-fade", { opacity: 0, y: 24, filter: "blur(14px)" });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        gsap.to(".rev-fade", {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.12,
        });

        gsap.to(cards, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power2.out",
          stagger: 0.16,
          delay: 0.15,
        });

        // 微ゆらぎ
        cards.forEach((card, i) => {
          gsap.to(card, {
            y: i % 2 === 0 ? -2 : -1,
            duration: 8 + i * 0.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });

        io.disconnect();
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="
        relative w-full
        overflow-hidden
        pt-[22vh] pb-[30vh]
      "
    >
      {/* ============================================================
          BACKGROUND — 黒 → 深紅 → ローズピンク → 白ピンク
          ★ Tailwind が無視するので style で指定（確実）
      ============================================================ */}
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(15,10,15,1) 0%,
              rgba(55,20,30,0.92) 20%,
              rgba(140,60,80,0.46) 46%,
              rgba(210,150,170,0.38) 64%,
              rgba(240,200,210,0.75) 80%,
              rgba(255,240,245,1) 100%
            )
          `,
          height: "230%",   // ★★★ 下のセクションまで覆う
          top: "-35%",       // ★★★ 境界を上へ持ち上げる
          pointerEvents: "none",
        }}
      />

      {/* 粒子ノイズ */}
      <div
        className="
          absolute inset-0 z-[-1]
          opacity-[0.20]
          bg-[url('/grain.png')] bg-repeat
          mix-blend-soft-light
        "
      />

      {/* ============================================================
          HEADER
      ============================================================ */}
      <div className="relative z-10 text-center mb-[12vh] px-4">
        <div className="rev-fade text-[0.82rem] tracking-[0.32em] text-white/45">
          CUSTOMER REVIEWS
        </div>

        <h2 className="rev-fade mt-4 text-[2.1rem] font-light text-white/92 tracking-[0.02em]">
          静かに褒められる香り。
        </h2>

        <p className="rev-fade mt-4 text-[0.96rem] text-white/62 leading-relaxed tracking-wide">
          “距離で伝わる香り” を、体験者の声で確かめる。
        </p>

        <div className="rev-fade w-[56px] h-[1px] bg-white/18 mx-auto mt-10" />
      </div>

      {/* ============================================================
          REVIEW CARDS
      ============================================================ */}
      <div
        className="
          relative z-10
          w-[88%] max-w-[1180px]
          mx-auto
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
          gap-[6vh] md:gap-[2.4vw]
        "
      >
        {reviews.map((r, i) => (
          <article
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="
              relative overflow-hidden
              p-[2.4rem]
              rounded-[22px]
              bg-white/[0.04]
              border border-white/[0.08]
              backdrop-blur-[14px]
              shadow-[0_14px_70px_rgba(0,0,0,0.45)]
            "
          >
            {/* tone膜 */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.85]"
              style={{ backgroundImage: toneGrad(r.tone) }}
            />

            {/* grain */}
            <div
              aria-hidden="true"
              className="
                absolute inset-0 opacity-[0.15]
                bg-[url('/grain.png')] bg-repeat
                mix-blend-soft-light
              "
            />

            <div className="relative">
              {/* STARS */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`text-[1.05rem] ${
                      idx < r.stars ? "text-[rgba(255,180,200,0.88)]" : "text-white/18"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-[1rem] text-white/75 leading-[1.95] tracking-wide whitespace-pre-line">
                {r.text}
              </p>

              <div className="mt-6 text-[0.84rem] text-white/40 tracking-[0.14em]">
                {r.name}
              </div>

              <div className="mt-6 w-[72px] h-[1px] bg-white/12" />
            </div>

            {/* 裏の影 */}
            <div
              aria-hidden="true"
              className="
                absolute left-[10%] right-[10%] -bottom-[12px]
                h-[18px] rounded-full
                bg-black/40 blur-[18px]
              "
            />
          </article>
        ))}
      </div>

      {/* FOOT NOTE */}
      <div className="relative z-10 mt-[14vh] text-center">
        <p className="rev-fade text-[0.86rem] text-white/55 tracking-[0.20em]">
          “強さではなく、距離で伝わる。”
        </p>
      </div>
    </section>
  );
}
