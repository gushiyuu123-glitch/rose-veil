// src/sections/HowItFeels.jsx
import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

/* ============================================================
   HOW IT FEELS + REVIEWS — “線なし” 完全アップグレード版
   - 変な線を全て削除（ライン系レイヤー 0）
   - 薄膜 / 光 / 霧 / 粒子 を整理して Rose Veil の世界観に統一
   - 動きは極小 & 均一（嫌な揺れゼロ）
   - 位置は一切いじらず、質感だけ向上
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
          "radial-gradient(70% 60% at 40% 30%, rgba(255,255,255,0.18), rgba(255,255,255,0.04), rgba(255,255,255,0))",
        accent: "rgba(200,205,245,0.16)",
      },
      {
        key: "veil",
        label: "VEIL — DEEP SILKY",
        title: "体温でひらく艶膜が、輪郭だけを残す。",
        copy: `しっとりしているのに、重たくない。\n体温で香りがふわりと開き、\n髪の“艶の輪郭”だけを静かに整えます。`,
        image: "/feel/feel-veil.png",
        veil:
          "radial-gradient(70% 60% at 60% 32%, rgba(255,170,190,0.20), rgba(255,255,255,0.04), rgba(255,255,255,0))",
        accent: "rgba(255,150,170,0.18)",
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
    if (tone === "crimson")
      return "radial-gradient(70% 60% at 30% 20%, rgba(255,140,160,0.16), rgba(255,255,255,0.02), rgba(255,255,255,0))";
    if (tone === "blue")
      return "radial-gradient(70% 60% at 70% 30%, rgba(160,195,255,0.14), rgba(255,255,255,0.02), rgba(255,255,255,0))";
    return "radial-gradient(70% 60% at 45% 25%, rgba(255,180,200,0.14), rgba(255,255,255,0.02), rgba(255,255,255,0))";
  };

  /* =========================
      GSAP（極小・均一で美しい動き）
  ========================= */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const feelsCards = cardRefs.current.filter(Boolean);
      const revCards = reviewRefs.current.filter(Boolean);

      const fadeEls = root.querySelectorAll(".hif-fade");
      const revFadeEls = root.querySelectorAll(".rev-fade");

      gsap.set([...fadeEls, ...revFadeEls], {
        opacity: 0,
        y: 20,
        filter: "blur(12px)",
      });
      gsap.set(feelsCards, { opacity: 0, y: 24, filter: "blur(14px)" });
      gsap.set(revCards, { opacity: 0, y: 20, filter: "blur(14px)" });

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          gsap.to(fadeEls, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.55,
            ease: "power2.out",
            stagger: 0.12,
          });

          gsap.to(feelsCards, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.7,
            ease: "power2.out",
            stagger: 0.18,
            delay: 0.12,
          });

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
            duration: 1.65,
            ease: "power2.out",
            stagger: 0.18,
            delay: 0.65,
          });

          if (!reduce) {
            // ミスト：超ゆっくり・揺れ幅ごく小さく
            if (mistLRef.current) {
              gsap.to(mistLRef.current, {
                x: 6,
                y: -8,
                duration: 18,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              });
            }
            if (mistRRef.current) {
              gsap.to(mistRRef.current, {
                x: -6,
                y: -6,
                duration: 19,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              });
            }

            // カード内部の“呼吸”も極小
            gsap.utils.toArray(root.querySelectorAll(".hif-breath")).forEach((el, idx) => {
              gsap.to(el, {
                y: idx % 2 === 0 ? -0.7 : -0.5,
                duration: 7 + idx * 0.5,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              });
            });
          }

          io.disconnect();
        },
        { threshold: 0.14 }
      );

      io.observe(root);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative w-full overflow-hidden
        py-[22vh]
        bg-[radial-gradient(circle_at_50%_20%,rgba(60,20,30,0.24),rgba(12,9,12,0.94))]
      "
    >
      {/* ============================================
          BACKGROUND（線なし：淡膜 × 光 × 粒子）
      ============================================ */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">

        {/* Rose 薄膜（基調） */}
        <div
          className="absolute inset-0 opacity-[0.26] blur-[110px] mix-blend-lighten"
          style={{
            background:
              "radial-gradient(1100px 820px at 50% 30%, rgba(255,168,188,0.32), rgba(0,0,0,0))",
          }}
        />

        {/* White Glow（透明感） */}
        <div
          className="absolute inset-0 opacity-[0.10] blur-[140px] mix-blend-screen"
          style={{
            background:
              "radial-gradient(980px 780px at 48% 42%, rgba(255,240,250,0.42), rgba(0,0,0,0))",
          }}
        />

        {/* Blue冷光（締め） */}
        <div
          className="absolute inset-0 opacity-[0.08] blur-[150px] mix-blend-screen"
          style={{
            background:
              "radial-gradient(1000px 800px at 60% 58%, rgba(150,190,255,0.18), rgba(0,0,0,0))",
          }}
        />

        {/* grain（極薄・斑点なし） */}
        <div className="absolute inset-0 opacity-[0.05] mix-blend-soft-light bg-[url('/grain.png')] bg-repeat" />
      </div>

      {/* ミスト */}
      <div
        ref={mistLRef}
        aria-hidden="true"
        className="
          absolute left-[-18vw] top-[10%]
          w-[50vw] h-[80vh]
          opacity-[0.12] blur-[50px]
          mix-blend-screen pointer-events-none z-[2]
        "
        style={{
          background:
            "radial-gradient(900px 560px at 60% 52%, rgba(255,180,200,0.22), rgba(255,255,255,0.05), transparent)",
        }}
      />
      <div
        ref={mistRRef}
        aria-hidden="true"
        className="
          absolute right-[-18vw] top-[6%]
          w-[52vw] h-[82vh]
          opacity-[0.14] blur-[56px]
          mix-blend-screen pointer-events-none z-[2]
        "
        style={{
          background:
            "radial-gradient(950px 600px at 40% 52%, rgba(255,160,180,0.22), rgba(255,255,255,0.05), transparent)",
        }}
      />

      {/* HEADER */}
      <div className="relative z-10 text-center mb-[12vh] px-4">
        <div className="hif-fade text-[0.84rem] tracking-[0.34em] text-white/58">
          HOW&nbsp;IT&nbsp;FEELS
        </div>

        <h2 className="hif-fade mt-4 text-[2.15rem] md:text-[2.35rem] font-light tracking-[0.01em] text-white/92">
          体験の質感を、言葉にする。
        </h2>

        <p className="hif-fade mt-4 text-[0.98rem] text-white/68 tracking-wide leading-relaxed">
          香りは “強さ” ではなく、距離で伝わる。
          <br className="hidden md:block" />
          動いた瞬間にだけ漂う“余韻”を設計しました。
        </p>

        <div className="hif-fade w-[56px] h-[1px] bg-white/20 mx-auto mt-10" />
      </div>

      {/* FEELS CARDS */}
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
              relative rounded-[22px]
              bg-white/[0.030]
              border border-white/[0.085]
              backdrop-blur-[14px]
              shadow-[0_16px_70px_rgba(0,0,0,0.36)]
              overflow-hidden
            "
          >
            <div aria-hidden="true" className="absolute inset-0 opacity-[0.92]" style={{ backgroundImage: f.veil }} />

            <div
              aria-hidden="true"
              className="absolute -top-[16%] -right-[16%] w-[60%] h-[60%] blur-[50px] opacity-[0.34]"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${f.accent}, rgba(255,255,255,0))`,
              }}
            />

            <div className="absolute inset-0 opacity-[0.08] mix-blend-soft-light bg-[url('/grain.png')] bg-repeat" />

            <div className="relative p-[2.2rem] md:p-[2.1rem]">
              <div className="text-[0.78rem] tracking-[0.30em] text-white/48">{f.label}</div>

              <div className="mt-7 relative">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 blur-[40px] opacity-[0.18] mix-blend-screen"
                  style={{
                    background:
                      "radial-gradient(70% 60% at 50% 40%, rgba(255,255,255,0.40), rgba(255,255,255,0.06), transparent)",
                  }}
                />

                <img
                  src={f.image}
                  alt={f.label}
                  className="
                    hif-breath relative w-full
                    rounded-[16px]
                    border border-white/[0.10]
                    opacity-[0.94]
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
                  text-white/92
                  leading-snug
                "
                style={{ textShadow: "0 0 1px rgba(0,0,0,0.25)" }}
              >
                {f.title}
              </h3>

              <p className="mt-4 text-[0.96rem] text-white/65 leading-[1.95] whitespace-pre-line tracking-wide">
                {f.copy}
              </p>

              <div className="mt-7 w-[92px] h-[1px] bg-white/12" />
            </div>

            <div
              aria-hidden="true"
              className="absolute left-[10%] right-[10%] -bottom-[12px] h-[18px] rounded-full bg-black/45 blur-[18px]"
            />
          </article>
        ))}
      </div>

      {/* FOOT NOTE */}
      <div className="relative z-10 mt-[14vh] text-center px-4">
        <p className="hif-fade text-[0.90rem] text-white/72 tracking-[0.20em]">
          “香りは、近づいた人だけが気づく。”
        </p>
      </div>

      {/* REVIEWS */}
      <div className="relative z-10 mt-[14vh] px-4">
        <div className="text-center mb-[9vh]">
          <div className="rev-fade text-[0.82rem] tracking-[0.34em] text-white/45">
            CUSTOMER&nbsp;REVIEWS
          </div>
          <h3 className="rev-fade mt-4 text-[1.95rem] md:text-[2.15rem] font-light tracking-[0.015em] text-white/90">
            静かに褒められる香り
          </h3>
          <p className="rev-fade mt-4 text-[0.98rem] text-white/60 tracking-wide leading-relaxed">
            体験は、言葉よりも“余韻”に残る。<br className="hidden md:block" />
            その余韻を、体験者の声で確かめる。
          </p>

          <div className="rev-fade w-[56px] h-[1px] bg-white/14 mx-auto mt-10" />
        </div>

        <div
          className="
            mx-auto w-[88%] max-w-[1200px]
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            gap-[6vh] md:gap-[2.2vw]
          "
        >
          {reviews.map((r, i) => (
            <article
              key={i}
              ref={(el) => (reviewRefs.current[i] = el)}
              className="
                relative rounded-[22px]
                bg-white/[0.030]
                border border-white/[0.085]
                backdrop-blur-[14px]
                shadow-[0_16px_70px_rgba(0,0,0,0.36)]
                overflow-hidden
                p-[2.4rem]
              "
            >
              <div aria-hidden="true" className="absolute inset-0 opacity-[0.92]" style={{ backgroundImage: reviewTone(r.tone) }} />

              <div
                aria-hidden="true"
                className="absolute -top-[18%] -right-[18%] w-[56%] h-[56%] blur-[52px] opacity-[0.32]"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,210,225,0.16), rgba(255,255,255,0))",
                }}
              />

              <div className="absolute inset-0 opacity-[0.10] bg-[url('/grain.png')] bg-repeat mix-blend-soft-light" />

              <div className="relative">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span
                      key={idx}
                      className={`
                        text-[1.05rem]
                        ${idx < r.stars ? "text-[rgba(255,185,205,0.75)]" : "text-white/14"}
                      `}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-[1.0rem] text-white/72 leading-[1.95] whitespace-pre-line tracking-wide">
                  {r.text}
                </p>

                <div className="mt-7 text-[0.84rem] text-white/46 tracking-[0.14em]">{r.name}</div>

                <div className="mt-7 w-[78px] h-[1px] bg-white/14" />
              </div>

              <div
                aria-hidden="true"
                className="absolute left-[10%] right-[10%] -bottom-[12px] h-[18px] rounded-full bg-black/50 blur-[18px]"
              />
            </article>
          ))}
        </div>

        <div className="relative z-10 mt-[12vh] text-center">
          <p className="rev-fade text-[0.86rem] text-white/55 tracking-[0.20em]">
            “強さではなく、距離で伝わる。”
          </p>
        </div>
      </div>
    </section>
  );
}
