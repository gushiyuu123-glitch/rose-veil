// src/sections/HowItFeels.jsx
import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

/* ============================================================
   HOW IT FEELS + REVIEWS（統合版）
   - Rose Veil evening（赤 × 黒）に統一
   - HowItFeels → Reviews を“余韻のまま”溶かす
   - GSAP：in-view 起動 / カード・レビューの静かなフェード
============================================================ */

export default function HowItFeels() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const reviewRefs = useRef([]);
  const mistLRef = useRef(null);
  const mistRRef = useRef(null);

  /* =========================
      FEELS DATA
  ========================= */
  const feels = useMemo(
    () => [
      {
        key: "white",
        label: "WHITE — AIRY SMOOTH",
        title: "触れた瞬間にほどける、空気の軽さ。",
        copy: `指を入れた瞬間に、摩擦がほどける。\n根元はふわり、毛先は静かにそろう。\n“軽いのに整う” を、手触りで実感できます。`,
        image: "/feel/feel-white.png",
        veil:
          "radial-gradient(70% 60% at 40% 30%, rgba(255,255,255,0.22), rgba(255,255,255,0.04), rgba(255,255,255,0))",
        accent: "rgba(200,205,245,0.18)",
      },
      {
        key: "veil",
        label: "VEIL — DEEP SILKY",
        title: "体温でひらく艶膜が、輪郭だけを残す。",
        copy: `しっとりしているのに、重たくない。\n体温で香りがふわりと開き、\n髪の“艶の輪郭”だけを静かに整えます。`,
        image: "/feel/feel-veil.png",
        veil:
          "radial-gradient(70% 60% at 60% 32%, rgba(255,170,190,0.22), rgba(255,255,255,0.04), rgba(255,255,255,0))",
        accent: "rgba(255,140,160,0.20)",
      },
      {
        key: "blue",
        label: "BLUE — CLEAR BREATH",
        title: "揮発する冷たさが、透明な余韻を残す。",
        copy: `乾いたあと、空気が澄む。\n動いたときにだけ香る“距離の美学”。\n透明感のある潤いが、静かに続きます。`,
        image: "/feel/feel-blue.png",
        veil:
          "radial-gradient(70% 60% at 52% 34%, rgba(170,200,255,0.18), rgba(255,255,255,0.04), rgba(255,255,255,0))",
        accent: "rgba(160,195,255,0.18)",
      },
    ],
    []
  );

  /* =========================
      REVIEWS DATA
  ========================= */
  const reviews = useMemo(
    () => [
      {
        name: "女性 / 20代",
        text: `香りが“静かに続く”タイプで、仕事中も上品にまとまります。\nつけすぎ感がなく、髪を触ったときの手触りがとても良い。`,
        stars: 5,
        tone: "veil",
      },
      {
        name: "女性 / 30代",
        text: `乾かしたあと、毛先だけ自然に艶が出て驚きました。\nローズの香りも甘すぎず、近くでふわっと香る絶妙さです。`,
        stars: 5,
        tone: "crimson",
      },
      {
        name: "男性 / 20代",
        text: `職場で「香りいいですね」と言われたのは初めてです。\n強くないのに清潔感が残りやすい。リピートします。`,
        stars: 4,
        tone: "blue",
      },
    ],
    []
  );

  const reviewTone = (tone) => {
    // “溶ける”ために薄い色膜だけ返す（目立たせない）
    if (tone === "crimson")
      return "radial-gradient(70% 60% at 30% 20%, rgba(255,140,160,0.16), rgba(255,255,255,0.02), rgba(255,255,255,0))";
    if (tone === "blue")
      return "radial-gradient(70% 60% at 70% 30%, rgba(160,195,255,0.14), rgba(255,255,255,0.02), rgba(255,255,255,0))";
    // default veil
    return "radial-gradient(70% 60% at 45% 25%, rgba(255,180,200,0.14), rgba(255,255,255,0.02), rgba(255,255,255,0))";
  };

  /* =========================
      GSAP
  ========================= */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const feelsCards = cardRefs.current.filter(Boolean);
    const revCards = reviewRefs.current.filter(Boolean);

    const fadeEls = root.querySelectorAll(".hif-fade");
    const revFadeEls = root.querySelectorAll(".rev-fade");

    gsap.set(fadeEls, { opacity: 0, y: 22, filter: "blur(12px)" });
    gsap.set(revFadeEls, { opacity: 0, y: 18, filter: "blur(12px)" });

    // Cards initial
    gsap.set(feelsCards, { opacity: 0, y: 28, filter: "blur(14px)" });
    gsap.set(revCards, { opacity: 0, y: 24, filter: "blur(14px)" });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        gsap.to(fadeEls, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.6,
          ease: "power2.out",
          stagger: 0.12,
        });

        gsap.to(feelsCards, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power2.out",
          stagger: 0.18,
          delay: 0.15,
        });

        // Mist drift
        if (mistLRef.current) {
          gsap.to(mistLRef.current, {
            x: 10,
            y: -14,
            rotate: 1.6,
            duration: 9.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
        if (mistRRef.current) {
          gsap.to(mistRRef.current, {
            x: -12,
            y: -10,
            rotate: -1.4,
            duration: 10.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }

        // Image breath
        gsap.utils.toArray(root.querySelectorAll(".hif-breath")).forEach((el, idx) => {
          gsap.to(el, {
            y: idx % 2 === 0 ? -1.2 : -0.8,
            duration: 5.4 + idx * 0.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });

        // Micro drift (cards)
        gsap.utils.toArray(feelsCards).forEach((el, idx) => {
          gsap.to(el, {
            x: idx === 1 ? 1.6 : 1.1,
            duration: 7.6 + idx * 0.7,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 0.6,
          });
        });

        // Reviews reveal (HowItFeels の余韻のあとに“静かに”)
        gsap.to(revFadeEls, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.10,
          delay: 0.55,
        });

        gsap.to(revCards, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.7,
          ease: "power2.out",
          stagger: 0.18,
          delay: 0.70,
        });

        // Reviews micro drift (超極小)
        gsap.utils.toArray(revCards).forEach((el, idx) => {
          gsap.to(el, {
            y: idx % 2 === 0 ? -1.0 : -0.6,
            duration: 8.4 + idx * 0.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.2,
          });
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
        relative w-full
        overflow-hidden
        py-[22vh]
        bg-[radial-gradient(circle_at_50%_20%,rgba(60,20,30,0.26),rgba(15,10,15,0.92))]
      "
    >
    {/* =========================================================
    BACKGROUND — Rose Veil淡ピンク版（完全修正版）
========================================================= */}
<div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">

  {/* ① 全体の淡いローズ幕（基調） */}
  <div
    className="
      absolute inset-0
      opacity-[0.22]
      blur-[90px]
      mix-blend-lighten
    "
    style={{
      background:
        "radial-gradient(1200px 900px at 50% 28%, rgba(255,168,188,0.30), rgba(0,0,0,0))",
    }}
  />

  {/* ② “光のピンク” を中央に溶かすレイヤー */}
  <div
    className="
      absolute inset-0
      opacity-[0.14]
      blur-[130px]
      mix-blend-screen
    "
    style={{
      background:
        "radial-gradient(900px 700px at 40% 40%, rgba(255,185,205,0.45), rgba(0,0,0,0))",
    }}
  />

  {/* ③ ごく淡い粒子（空気の層） */}
  <div
    className="
      absolute inset-0
      opacity-[0.08]
      mix-blend-soft-light
      bg-[url('/grain.png')] bg-repeat
      blur-[0.4px]
    "
  />
</div>


      {/* 左右ミスト */}
      <div
        ref={mistLRef}
        aria-hidden="true"
        className="
          absolute left-[-16vw] top-[10%]
          w-[44vw] h-[78vh]
          opacity-[0.14]
          blur-[44px]
          mix-blend-screen
          pointer-events-none
          z-[1]
        "
        style={{
          background:
            "radial-gradient(900px 560px at 60% 52%, rgba(255,180,200,0.28), rgba(255,255,255,0.06), transparent)",
        }}
      />
      <div
        ref={mistRRef}
        aria-hidden="true"
        className="
          absolute right-[-16vw] top-[6%]
          w-[46vw] h-[82vh]
          opacity-[0.16]
          blur-[48px]
          mix-blend-screen
          pointer-events-none
          z-[1]
        "
        style={{
          background:
            "radial-gradient(940px 580px at 40% 52%, rgba(255,160,180,0.22), rgba(255,255,255,0.06), transparent)",
        }}
      />

      {/* =========================================================
          HEADER
      ======================================================== */}
      <div className="relative z-10 text-center mb-[12vh] px-4">
        <div className="hif-fade text-[0.84rem] tracking-[0.34em] text-white/55">
          HOW&nbsp;IT&nbsp;FEELS
        </div>

        <h2 className="hif-fade mt-4 text-[2.15rem] md:text-[2.35rem] font-light tracking-[0.01em] text-white/90">
          体験の質感を、言葉にする。
        </h2>

        <p className="hif-fade mt-4 text-[0.98rem] text-white/65 tracking-wide leading-relaxed">
          香りは “強さ” ではなく、距離で伝わる。<br className="hidden md:block" />
          触れた瞬間・乾いたあと・揺れた瞬間の余韻を、静かに設計しました。
        </p>

        <div className="hif-fade w-[56px] h-[1px] bg-white/20 mx-auto mt-10" />
      </div>

      {/* =========================================================
          FEELS CARDS
      ======================================================== */}
      <div
        className="
          relative z-10
          w-[88%] max-w-[1180px]
          mx-auto
          grid grid-cols-1 md:grid-cols-3
          gap-[6vh] md:gap-[2.4vw]
        "
      >
        {feels.map((f, i) => (
          <article
            key={f.key}
            ref={(el) => (cardRefs.current[i] = el)}
            className="
              relative
              rounded-[22px]
              bg-white/[0.03]
              border border-white/[0.08]
              backdrop-blur-[14px]
              shadow-[0_16px_70px_rgba(0,0,0,0.35)]
              overflow-hidden
            "
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.85]"
              style={{ backgroundImage: f.veil }}
            />

            <div
              aria-hidden="true"
              className="absolute -top-[18%] -right-[18%] w-[60%] h-[60%] blur-[42px] opacity-[0.45]"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${f.accent}, rgba(255,255,255,0))`,
              }}
            />

            <div
              aria-hidden="true"
              className="
                absolute inset-0 opacity-[0.14]
                bg-[url('/grain.png')] bg-repeat
                mix-blend-soft-light
              "
            />

            <div className="relative p-[2.2rem] md:p-[2.1rem]">
              <div className="text-[0.78rem] tracking-[0.30em] text-white/45">
                {f.label}
              </div>

              <div className="mt-7 relative">
                <div
                  aria-hidden="true"
                  className="
                    absolute inset-0
                    blur-[38px]
                    opacity-[0.18]
                    mix-blend-screen
                  "
                  style={{
                    background:
                      "radial-gradient(70% 60% at 50% 40%, rgba(255,255,255,0.4), rgba(255,255,255,0.06), transparent)",
                  }}
                />

                <img
                  src={f.image}
                  alt={f.label}
                  className="
                    hif-breath
                    relative
                    w-full
                    rounded-[16px]
                    border border-white/[0.1]
                    opacity-[0.92]
                    object-cover
                  "
                />
              </div>

              <h3
                className="
                  mt-7
                  text-[1.15rem] md:text-[1.12rem]
                  font-light
                  tracking-[0.02em]
                  text-white/90
                  leading-snug
                "
                style={{ textShadow: "0 0 1px rgba(0,0,0,0.25)" }}
              >
                {f.title}
              </h3>

              <p className="mt-4 text-[0.96rem] text-white/60 leading-[1.95] whitespace-pre-line tracking-wide">
                {f.copy}
              </p>

              <div className="mt-7 w-[92px] h-[1px] bg-white/12" />
            </div>

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

      {/* =========================================================
          FOOT NOTE（余韻）
      ======================================================== */}
      <div className="relative z-10 mt-[14vh] text-center px-4">
        <p className="hif-fade text-[0.90rem] text-white/70 tracking-[0.20em]">
          “香りは、近づいた人だけが気づく。”
        </p>
      </div>

      {/* =========================================================
          REVIEWS（溶ける統合：A）
      ======================================================== */}
      <div className="relative z-10 mt-[14vh] px-4">
        {/* タイトル（強くしない） */}
        <div className="text-center mb-[9vh]">
          <div className="rev-fade text-[0.82rem] tracking-[0.34em] text-white/45">
            CUSTOMER&nbsp;REVIEWS
          </div>
          <h3 className="rev-fade mt-4 text-[1.95rem] md:text-[2.15rem] font-light tracking-[0.015em] text-white/86">
            静かに褒められる香り
          </h3>
          <p className="rev-fade mt-4 text-[0.98rem] text-white/58 tracking-wide leading-relaxed">
            体験は、言葉よりも“余韻”に残る。<br className="hidden md:block" />
            その余韻を、体験者の声で確かめる。
          </p>

          <div className="rev-fade w-[56px] h-[1px] bg-white/14 mx-auto mt-10" />
        </div>

        {/* REVIEW CARDS */}
        <div
          className="
            mx-auto
            w-[88%] max-w-[1200px]
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            gap-[6vh] md:gap-[2.2vw]
          "
        >
          {reviews.map((r, i) => (
            <article
              key={i}
              ref={(el) => (reviewRefs.current[i] = el)}
              className="
                relative
                rounded-[22px]
                bg-white/[0.03]
                border border-white/[0.08]
                backdrop-blur-[14px]
                shadow-[0_16px_70px_rgba(0,0,0,0.35)]
                overflow-hidden
                p-[2.4rem]
              "
            >
              {/* 内側膜（レビューも“溶ける”） */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.88]"
                style={{
                  backgroundImage: reviewTone(r.tone),
                }}
              />

              {/* 角に小さな光（匂いの輪郭） */}
              <div
                aria-hidden="true"
                className="absolute -top-[18%] -right-[18%] w-[58%] h-[58%] blur-[46px] opacity-[0.36]"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,190,210,0.16), rgba(255,255,255,0))",
                }}
              />

              {/* grain */}
              <div
                aria-hidden="true"
                className="
                  absolute inset-0 opacity-[0.14]
                  bg-[url('/grain.png')] bg-repeat
                  mix-blend-soft-light
                "
              />

              <div className="relative">
                {/* stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span
                      key={idx}
                      className={`
                        text-[1.05rem]
                        ${
                          idx < r.stars
                            ? "text-[rgba(255,175,195,0.78)]"
                            : "text-white/14"
                        }
                      `}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-[1.0rem] text-white/70 leading-[1.95] whitespace-pre-line tracking-wide">
                  {r.text}
                </p>

                <div className="mt-7 text-[0.84rem] text-white/45 tracking-[0.14em]">
                  {r.name}
                </div>

                <div className="mt-7 w-[78px] h-[1px] bg-white/12" />
              </div>

              {/* floating shadow */}
              <div
                aria-hidden="true"
                className="
                  absolute left-[10%] right-[10%] -bottom-[12px]
                  h-[18px] rounded-full
                  bg-black/45 blur-[18px]
                "
              />
            </article>
          ))}
        </div>

        {/* 余韻の一行（小さく締める） */}
        <div className="relative z-10 mt-[12vh] text-center">
          <p className="rev-fade text-[0.86rem] text-white/52 tracking-[0.20em]">
            “強さではなく、距離で伝わる。”
          </p>
        </div>
      </div>
    </section>
  );
}
