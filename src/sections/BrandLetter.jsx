// src/sections/BrandLetter.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BrandLetter() {
  const rootRef = useRef(null);

  /* ==============================================
     FADE-IN（静かな呼吸）
  ============================================== */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    gsap.set(el.querySelectorAll(".bl-fade"), {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    });

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;

        gsap.to(el.querySelectorAll(".bl-fade"), {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.45,
          ease: "power3.out",
          stagger: 0.16,
        });

        io.disconnect();
      },
      { threshold: 0.14 }
    );

    io.observe(el);
  }, []);

  return (
    <section
      ref={rootRef}
      className="
        relative w-full
        py-[26vh]
        text-black
        overflow-hidden

        bg-[url('/letter/soft-back-roseveil.png')]
        bg-cover bg-center bg-no-repeat bg-fixed
      "
    >
      {/* 1) 紙ベース */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 z-[1]
          bg-[url('/letter/paper-base.png')]
          bg-cover bg-center
          opacity-[0.18]
        "
      />

      {/* 2) Rose Veil のにじみ層 */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 z-[2]
          bg-[url('/letter/soft-back-roseveil.png')]
          bg-cover bg-[center_top_14%]
          opacity-[0.26]
          blur-[22px]
          scale-[1.06]
          brightness-[1.05]
          pointer-events-none
        "
      />

      {/* 3) 香りの淡い赤膜 */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 z-[3]
          opacity-[0.22]
          blur-[95px]
          pointer-events-none
        "
        style={{
          background: `
            radial-gradient(900px 700px at 60% 20%, rgba(255,150,170,0.16), transparent 70%),
            radial-gradient(1100px 880px at 48% 78%, rgba(170,200,255,0.14), transparent 70%)
          `,
        }}
      />

      {/* 4) 黒金の深度膜 */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 z-[3]
          opacity-[0.16]
          blur-[120px]
        "
        style={{
          background: `
            radial-gradient(1000px 760px at 50% 58%, rgba(50,40,45,0.08), transparent 70%)
          `,
        }}
      />

      {/* 5) 微粒子フィルム */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 z-[4]
          bg-[url('/grain.png')] bg-repeat
          opacity-[0.12]
          mix-blend-soft-light
        "
      />

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="relative z-[10] text-center mb-[10vh] px-6">
        <h2
          className="
            bl-fade
            text-[0.82rem]
            tracking-[0.34em]
            text-[rgba(60,50,55,0.46)]
          "
        >
          A LETTER FROM ROSE VEIL
        </h2>

        <div className="bl-fade w-[84px] h-[1px] bg-black/15 mx-auto mt-5" />

        <p
          className="
            bl-fade mt-6
            text-[2.15rem] md:text-[2.35rem]
            font-light tracking-[0.02em]
            text-[rgba(40,30,35,0.86)]
          "
        >
          あなたの美しさを願う、ひとつの手紙。
        </p>
      </div>

      {/* =====================================================
          BODY
      ===================================================== */}
      <div
        className="
          relative z-[10]
          mx-auto w-[88%] max-w-[900px]
          text-center
        "
      >
        {/* 奥行き膜 */}
        <div
          aria-hidden="true"
          className="
            absolute inset-0 z-[3]
            bg-[radial-gradient(circle,rgba(255,230,240,0.24),transparent)]
            blur-[95px]
            opacity-[0.26]
          "
        />

        <p
          className="
            bl-fade relative
            text-[1.02rem]
            text-[rgba(40,35,40,0.82)]
            leading-[2.05]
            whitespace-pre-line
            font-light tracking-wide
          "
        >
{`あなたがそっと前を向けるように。
日々の輪郭が、少しでも美しく整うように。

Rose Veil は、香りと質感で
“雰囲気そのもの”を優しく底上げするために生まれた一本です。

強さではなく、距離で伝わる香り。
やわらかく整う手触り。
乾いたあとに残る、ほのかな余韻。

これは、ほんの少しだけ
あなたの美しさを支えたいという願いを込めた手紙です。

忙しい日も、余裕がない朝も、
あなたを静かに後押しできますように。`}
        </p>

        <div className="bl-fade w-[110px] h-[1px] bg-black/15 mx-auto mt-10" />

        <p
          className="
            bl-fade mt-6
            text-[0.92rem]
            tracking-[0.22em]
            text-[rgba(40,40,45,0.52)]
          "
        >
          ROSE VEIL FRAGRANCE SHAMPOO
        </p>
      </div>
    </section>
  );
}
