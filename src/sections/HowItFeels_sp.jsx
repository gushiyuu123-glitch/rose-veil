// src/sections/HowItFeels_sp.jsx
import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

export default function HowItFeels_sp() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const reviewRefs = useRef([]);

  /* =========================
      FEELS DATA（アップグレード済）
  ========================= */
  const feels = useMemo(
    () => [
      {
        key: "white",
        label: "WHITE — AIRY SMOOTH",
        title: "触れた瞬間にほどける、空気の軽さ。",
        copy: `指を入れた瞬間に摩擦が消え、
髪が“そよぐように”整う軽さ。
白い光の余韻だけを静かに残します。`,
        image: "/feel/feel-white.webp",
        veil:
          "radial-gradient(72% 58% at 44% 34%, rgba(255,255,255,0.20), rgba(255,255,255,0.06), transparent)",
        accent: "rgba(200,205,245,0.13)",
      },
      {
        key: "veil",
        label: "VEIL — DEEP SILKY",
        title: "体温でゆっくり溶ける、深紅の艶膜。",
        copy: `しっとりなのに、重くならない。
揺れた瞬間だけ甘さがふわりと開き、
“艶の輪郭”が穏やかに整います。`,
        image: "/feel/feel-veil.webp",
        veil:
          "radial-gradient(70% 60% at 60% 30%, rgba(255,170,190,0.16), rgba(255,255,255,0.05), transparent)",
        accent: "rgba(255,145,165,0.15)",
      },
      {
        key: "blue",
        label: "BLUE — CLEAR BREATH",
        title: "冷たさが揮発し、青い透明感だけが残る。",
        copy: `乾いたあと空気が澄み、
揺れた一瞬だけ香りが立つ“距離の美学”。
静かな潤いが長く続きます。`,
        image: "/feel/feel-blue.webp",
        veil:
          "radial-gradient(70% 60% at 52% 34%, rgba(170,200,255,0.16), rgba(255,255,255,0.05), transparent)",
        accent: "rgba(165,195,255,0.16)",
      },
    ],
    []
  );

  /* =========================
      REVIEW TONES
  ========================= */
  const reviewTone = (tone) => {
    if (tone === "crimson")
      return "radial-gradient(70% 60% at 30% 20%, rgba(255,140,160,0.12), rgba(255,255,255,0.04), transparent)";
    if (tone === "blue")
      return "radial-gradient(70% 60% at 70% 30%, rgba(160,195,255,0.12), rgba(255,255,255,0.04), transparent)";
    return "radial-gradient(70% 60% at 45% 25%, rgba(255,180,200,0.12), rgba(255,255,255,0.04), transparent)";
  };

  /* =========================
      REVIEWS DATA（アップグレード済）
  ========================= */
  const reviews = useMemo(
    () => [
      {
        name: "女性 / 20代",
        text: `香りが“静かに続く”感じが本当に上品。
触れたときの手触りもやわらかくて心地いい。`,
        stars: 5,
        tone: "veil",
      },
      {
        name: "女性 / 30代",
        text: `乾いたあと毛先に自然な艶。
ローズの甘さも控えめで、
近くに来たときだけふわっと香る。`,
        stars: 5,
        tone: "crimson",
      },
      {
        name: "男性 / 20代",
        text: `強い香りじゃないのに清潔感が残る。
「何使ってるの？」と聞かれることが増えました。`,
        stars: 4,
        tone: "blue",
      },
    ],
    []
  );

  /* =========================
      GSAP（既存の品質そのまま）
  ========================= */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const feelsCards = cardRefs.current.filter(Boolean);
    const revCards = reviewRefs.current.filter(Boolean);

    const fadeEls = root.querySelectorAll(".hif-sp-fade");
    const revFadeEls = root.querySelectorAll(".rev-sp-fade");

    gsap.set([fadeEls, revFadeEls], { opacity: 0, y: 16, filter: "blur(12px)" });
    gsap.set([...feelsCards, ...revCards], { opacity: 0, y: 22, filter: "blur(12px)" });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        gsap.to(fadeEls, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.10,
          ease: "power2.out",
        });

        gsap.to(feelsCards, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.15,
          stagger: 0.16,
          delay: 0.12,
          ease: "power2.out",
        });

        gsap.utils.toArray(root.querySelectorAll(".hif-sp-breath")).forEach((el, idx) => {
          gsap.to(el, {
            y: idx % 2 === 0 ? -1.1 : -0.7,
            duration: 4.8 + idx * 0.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });

        gsap.to(revFadeEls, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.12,
          delay: 0.35,
          ease: "power2.out",
        });

        gsap.to(revCards, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.25,
          stagger: 0.18,
          delay: 0.48,
          ease: "power2.out",
        });

        io.disconnect();
      },
      { threshold: 0.14 }
    );

    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
<section
  ref={sectionRef}
  className="
    relative w-full overflow-hidden
    py-[13vh]
    bg-[radial-gradient(circle_at_50%_22%,rgba(40,20,30,0.26),rgba(10,6,12,0.92))]
  "
>
  {/* --------------------------
      BACKGROUND
  --------------------------- */}
  <div aria-hidden="true" className="absolute inset-0 z-0">
    <div
      className="absolute inset-0 opacity-[0.16] blur-[48px]"
      style={{
        background:
          "radial-gradient(760px 520px at 50% 26%, rgba(255,160,185,0.22), transparent)",
      }}
    />
    <div
      className="absolute inset-0 opacity-[0.12] blur-[50px]"
      style={{
        background:
          "radial-gradient(700px 480px at 48% 40%, rgba(255,255,255,0.22), transparent)",
      }}
    />
    <div className="absolute inset-0 opacity-[0.06] bg-[url('/grain.png')] mix-blend-soft-light" />
  </div>

  {/* --------------------------
      HEADER（アップグレード）
  --------------------------- */}
  <div className="relative z-10 text-center mb-[8vh] px-4">
    <div className="hif-sp-fade text-[0.75rem] tracking-[0.32em] text-white/50">
      HOW&nbsp;IT&nbsp;FEELS
    </div>

    <h2 className="hif-sp-fade mt-4 text-[1.88rem] font-light tracking-[0.01em] text-white/90">
      “質感”を、静かに言葉へ。
    </h2>

    <p className="hif-sp-fade mt-4 text-[0.92rem] text-white/65 leading-[1.80]">
      香りは強さではなく、距離で伝わる。<br />
      揺れた瞬間の余韻を丁寧にデザインしました。
    </p>

    <div className="hif-sp-fade w-[46px] h-[1px] bg-white/16 mx-auto mt-8" />
  </div>

  {/* --------------------------
      FEELS CARDS
  --------------------------- */}
  <div className="relative z-10 w-[88%] mx-auto flex flex-col gap-[9vh]">
    {feels.map((f, i) => (
      <article
        key={f.key}
        ref={(el) => (cardRefs.current[i] = el)}
        className="
          relative rounded-[20px]
          bg-white/[0.04]
          border border-white/[0.08]
          backdrop-blur-[10px]
          overflow-hidden
          shadow-[0_8px_34px_rgba(0,0,0,0.28)]
        "
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.55] blur-[34px]"
          style={{ backgroundImage: f.veil }}
        />

        <div
          aria-hidden="true"
          className="absolute -top-[20%] -right-[20%] w-[52%] h-[52%] blur-[32px] opacity-[0.26]"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${f.accent}, transparent)`,
          }}
        />

        <div className="relative p-[1.8rem]">
          <div className="text-[0.72rem] tracking-[0.26em] text-white/45">
            {f.label}
          </div>

          <div className="mt-6 relative">
            <img
              src={f.image}
              alt={f.label}
              className="
                hif-sp-breath
                w-full rounded-[14px]
                border border-white/[0.06]
                object-cover
                opacity-[0.90]
              "
            />
          </div>

          <h3 className="mt-6 text-[1.12rem] font-light text-white/88 leading-snug">
            {f.title}
          </h3>

          <p className="mt-4 text-[0.90rem] text-white/62 leading-[1.85] whitespace-pre-line">
            {f.copy}
          </p>

          <div className="mt-6 w-[78px] h-[1px] bg-white/12" />
        </div>
      </article>
    ))}
  </div>

  {/* --------------------------
      FOOT NOTE
  --------------------------- */}
  <div className="relative z-10 mt-[10vh] text-center px-4">
    <p className="hif-sp-fade text-[0.86rem] text-white/58 tracking-[0.18em]">
      “香りは、近づいた人だけが気づく。”
    </p>
  </div>

  {/* --------------------------
      REVIEWS
  --------------------------- */}
  <div className="relative z-10 mt-[11vh] w-[88%] mx-auto">
    <div className="text-center mb-[8vh]">
      <div className="rev-sp-fade text-[0.78rem] tracking-[0.30em] text-white/45">
        CUSTOMER&nbsp;REVIEWS
      </div>

      <h3 className="rev-sp-fade mt-4 text-[1.74rem] font-light tracking-[0.01em] text-white/86">
        静かに褒められる香り
      </h3>

      <p className="rev-sp-fade mt-4 text-[0.88rem] text-white/60 leading-[1.8]">
        言葉よりも “余韻” に残る体験。
      </p>

      <div className="rev-sp-fade w-[46px] h-[1px] bg-white/14 mx-auto mt-8" />
    </div>

    <div className="flex flex-col gap-[8vh]">
      {reviews.map((r, i) => (
        <article
          key={i}
          ref={(el) => (reviewRefs.current[i] = el)}
          className="
            relative rounded-[20px]
            bg-white/[0.04]
            border border-white/[0.08]
            p-[1.8rem]
            backdrop-blur-[10px]
            shadow-[0_8px_34px_rgba(0,0,0,0.28)]
          "
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.55] blur-[34px]"
            style={{ backgroundImage: reviewTone(r.tone) }}
          />

          <div className="relative">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`
                    text-[1.0rem]
                    ${
                      idx < r.stars
                        ? "text-[rgba(255,175,195,0.75)]"
                        : "text-white/14"
                    }
                  `}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="text-[0.90rem] text-white/65 leading-[1.85] whitespace-pre-line">
              {r.text}
            </p>

            <div className="mt-6 text-[0.78rem] text-white/45 tracking-[0.14em]">
              {r.name}
            </div>

            <div className="mt-6 w-[70px] h-[1px] bg-white/12" />
          </div>
        </article>
      ))}
    </div>

    <div className="relative z-10 mt-[9vh] text-center">
      <p className="rev-sp-fade text-[0.80rem] text-white/50 tracking-[0.18em]">
        “強さではなく、距離で伝わる。”
      </p>
    </div>
  </div>
</section>
  );
}
