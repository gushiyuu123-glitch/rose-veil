// src/sections/HowItFeels_sp.jsx
import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

export default function HowItFeels_sp() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const reviewRefs = useRef([]);

  /* =========================
      FEELS DATA
  ========================= */
  const feels = useMemo(
    () => [
      {
        key: "white",
        label: "WHITE — AIRY SMOOTH",
        title: "触れた瞬間にほどける、空気の軽さ。",
        copy: `指を入れた瞬間に摩擦がほどける。\n根元はふわり、毛先は静かにそろう。\n“軽いのに整う” を実感できます。`,
        image: "/feel/feel-white.png",
        veil:
          "radial-gradient(72% 58% at 44% 34%, rgba(255,255,255,0.18), rgba(255,255,255,0.06), transparent)",
        accent: "rgba(200,205,245,0.12)",
      },
      {
        key: "veil",
        label: "VEIL — DEEP SILKY",
        title: "体温でひらく艶膜が、輪郭だけを残す。",
        copy: `しっとりしているのに重たくない。\n動いたときだけ香りがふわりと開きます。\n“艶の輪郭”が静かに整います。`,
        image: "/feel/feel-veil.png",
        veil:
          "radial-gradient(70% 60% at 60% 30%, rgba(255,170,190,0.14), rgba(255,255,255,0.05), transparent)",
        accent: "rgba(255,140,160,0.14)",
      },
      {
        key: "blue",
        label: "BLUE — CLEAR BREATH",
        title: "揮発する冷たさが、透明な余韻を残す。",
        copy: `乾いたあと空気が澄む。\n揺れた瞬間だけ香る“距離の美学”。\n透明感のある潤いが続きます。`,
        image: "/feel/feel-blue.png",
        veil:
          "radial-gradient(70% 60% at 52% 34%, rgba(170,200,255,0.14), rgba(255,255,255,0.05), transparent)",
        accent: "rgba(160,195,255,0.14)",
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
      REVIEWS DATA
  ========================= */
  const reviews = useMemo(
    () => [
      {
        name: "女性 / 20代",
        text: `香りが“静かに続く”タイプで上品。\n髪を触ったときの手触りもとても良い。`,
        stars: 5,
        tone: "veil",
      },
      {
        name: "女性 / 30代",
        text: `乾いたあと毛先に自然な艶。\nローズの香りも甘すぎず近くでふわっと香る。`,
        stars: 5,
        tone: "crimson",
      },
      {
        name: "男性 / 20代",
        text: `職場で「香りいいですね」と言われました。\n強くないのに清潔感が残りやすい。`,
        stars: 4,
        tone: "blue",
      },
    ],
    []
  );

  /* =========================
      GSAP
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
        bg-[radial-gradient(circle_at_50%_22%,rgba(60,20,30,0.22),rgba(15,10,15,0.95))]
      "
    >
      {/* =========================
          BACKGROUND（薄膜）
      ========================= */}
      <div aria-hidden="true" className="absolute inset-0 z-0">

        <div
          className="absolute inset-0 opacity-[0.18] blur-[70px] mix-blend-lighten"
          style={{
            background:
              "radial-gradient(1000px 700px at 50% 26%, rgba(255,168,188,0.24), transparent)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.14] blur-[90px] mix-blend-screen"
          style={{
            background:
              "radial-gradient(900px 620px at 46% 35%, rgba(255,255,255,0.26), transparent)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.12] blur-[90px] mix-blend-screen"
          style={{
            background:
              "radial-gradient(880px 620px at 18% 78%, rgba(170,200,255,0.16), transparent)",
          }}
        />

        <div className="absolute inset-0 opacity-[0.05] bg-[url('/grain.png')] mix-blend-soft-light blur-[0.4px]" />
      </div>

      {/* =========================
          HEADER
      ========================= */}
      <div className="relative z-10 text-center mb-[9vh] px-4">
        <div className="hif-sp-fade text-[0.75rem] tracking-[0.32em] text-white/50">
          HOW&nbsp;IT&nbsp;FEELS
        </div>

        <h2 className="hif-sp-fade mt-4 text-[1.92rem] font-light tracking-[0.01em] text-white/90">
          体験の質感を、言葉にする。
        </h2>

        <p className="hif-sp-fade mt-4 text-[0.94rem] text-white/65 leading-[1.80]">
          香りは “強さ” ではなく距離で伝わる。<br />
          揺れた瞬間の余韻を静かに設計しました。
        </p>

        <div className="hif-sp-fade w-[48px] h-[1px] bg-white/18 mx-auto mt-8" />
      </div>

      {/* =========================
          FEELS CARDS
      ========================= */}
      <div className="relative z-10 w-[88%] mx-auto flex flex-col gap-[10vh]">
        {feels.map((f, i) => (
          <article
            key={f.key}
            ref={(el) => (cardRefs.current[i] = el)}
            className="
              relative rounded-[20px]
              bg-white/[0.035]
              border border-white/[0.09]
              backdrop-blur-[12px]
              overflow-hidden
              shadow-[0_12px_50px_rgba(0,0,0,0.30)]
            "
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.70]"
              style={{ backgroundImage: f.veil }}
            />

            <div
              aria-hidden="true"
              className="absolute -top-[22%] -right-[22%] w-[60%] h-[60%] blur-[40px] opacity-[0.32]"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${f.accent}, transparent)`,
              }}
            />

            <div className="relative p-[1.9rem]">
              <div className="text-[0.72rem] tracking-[0.28em] text-white/45">
                {f.label}
              </div>

              <div className="mt-6 relative">
                <img
                  src={f.image}
                  alt={f.label}
                  className="
                    hif-sp-breath
                    w-full rounded-[14px]
                    border border-white/[0.08]
                    object-cover
                    opacity-[0.92]
                  "
                />
              </div>

              <h3 className="mt-6 text-[1.14rem] font-light text-white/88 leading-snug">
                {f.title}
              </h3>

              <p className="mt-4 text-[0.92rem] text-white/60 leading-[1.85] whitespace-pre-line">
                {f.copy}
              </p>

              <div className="mt-6 w-[80px] h-[1px] bg-white/12" />
            </div>
          </article>
        ))}
      </div>

      {/* =========================
          FOOT NOTE
      ========================= */}
      <div className="relative z-10 mt-[11vh] text-center px-4">
        <p className="hif-sp-fade text-[0.88rem] text-white/60 tracking-[0.18em]">
          “香りは、近づいた人だけが気づく。”
        </p>
      </div>

      {/* =========================
          REVIEWS
      ========================= */}
      <div className="relative z-10 mt-[12vh] w-[88%] mx-auto">
        <div className="text-center mb-[9vh]">
          <div className="rev-sp-fade text-[0.78rem] tracking-[0.32em] text-white/45">
            CUSTOMER&nbsp;REVIEWS
          </div>

          <h3 className="rev-sp-fade mt-4 text-[1.78rem] font-light tracking-[0.01em] text-white/86">
            静かに褒められる香り
          </h3>

          <p className="rev-sp-fade mt-4 text-[0.90rem] text-white/60 leading-[1.8]">
            言葉よりも “余韻” に残る体験。
          </p>

          <div className="rev-sp-fade w-[48px] h-[1px] bg-white/14 mx-auto mt-8" />
        </div>

        <div className="flex flex-col gap-[9vh]">
          {reviews.map((r, i) => (
            <article
              key={i}
              ref={(el) => (reviewRefs.current[i] = el)}
              className="
                relative rounded-[20px]
                bg-white/[0.035]
                border border-white/[0.08]
                p-[2rem]
                backdrop-blur-[12px]
                shadow-[0_12px_50px_rgba(0,0,0,0.30)]
              "
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.70]"
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

                <p className="text-[0.92rem] text-white/65 leading-[1.85] whitespace-pre-line">
                  {r.text}
                </p>

                <div className="mt-6 text-[0.78rem] text-white/45 tracking-[0.14em]">
                  {r.name}
                </div>

                <div className="mt-6 w-[72px] h-[1px] bg-white/12" />
              </div>
            </article>
          ))}
        </div>

        <div className="relative z-10 mt-[10vh] text-center">
          <p className="rev-sp-fade text-[0.82rem] text-white/50 tracking-[0.18em]">
            “強さではなく、距離で伝わる。”
          </p>
        </div>
      </div>
    </section>
  );
}
