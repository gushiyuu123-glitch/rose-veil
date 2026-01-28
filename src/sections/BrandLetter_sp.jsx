// src/sections/BrandLetter_sp.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BrandLetter_sp() {
  const rootRef = useRef(null);

  /* ============================
     呼吸フェード（SP）
  ============================ */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const items = el.querySelectorAll(".bl-fade-sp");

    gsap.set(items, {
      opacity: 0,
      y: 16,
      filter: "blur(10px)",
    });

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      gsap.to(items, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power2.out",
        stagger: 0.12,
      });

      io.disconnect();
    }, { threshold: 0.14 });

    io.observe(el);
  }, []);

  return (
    <section
      ref={rootRef}
      className="
        relative w-full
        py-[16vh]
        bg-[#fcfbfa]
        text-black
        overflow-hidden
      "
    >

      {/* ============================
          ★ SP縦背景（しっかり見せる）
      ============================ */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-[url('/vertical-soft-paper.png')]
          bg-cover bg-center
          opacity-[0.48]     /* ← visibility強化 */
          blur-[4px]         /* ← にじみ減らして写真を見せる */
        "
      />



      {/* ============================
          HEADER
      ============================ */}
      <div className="relative z-10 text-center mb-[8vh] px-6">
        <h2
          className="
            bl-fade-sp
            text-[0.72rem]
            tracking-[0.32em]
            text-[rgba(60,50,55,0.48)]
          "
        >
          A LETTER FROM ROSE VEIL
        </h2>

        <div className="bl-fade-sp w-[70px] h-[1px] bg-black/15 mx-auto mt-4" />

        <p
          className="
            bl-fade-sp
            mt-6
            text-[1.76rem]
            font-light
            tracking-[0.02em]
            text-[rgba(40,30,35,0.85)]
            leading-[1.38]
          "
        >
          静かに、美しさの輪郭を整える手紙。
        </p>
      </div>

      {/* ============================
          BODY（短縮版）
      ============================ */}
      <div
        className="
          relative z-10 mx-auto
          w-[90%] max-w-[900px]
          text-center
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute inset-0
            opacity-[0.16]
            blur-[55px]
            bg-[radial-gradient(
              circle,
              rgba(255,230,240,0.18),
              transparent
            )]
          "
        />

        <p
          className="
            bl-fade-sp relative
            text-[0.94rem]
            text-[rgba(40,35,40,0.78)]
            leading-[1.82]
            whitespace-pre-line
            tracking-wide
            font-light
          "
        >
{`髪が揺れた瞬間にふわりと漂う、静かで上品な香り。

Rose Veil は、日常の“輪郭”をそっと美しく整える処方です。

香りは強さではなく距離で伝わり、
触れた瞬間の質感や乾いたあとの余韻が静かに続きます。

忙しい朝も、ふとした瞬間も、
あなたに静かに寄り添うように。`}
        </p>

        <div className="bl-fade-sp w-[94px] h-[1px] bg-black/15 mx-auto mt-10" />

        <p
          className="
            bl-fade-sp mt-6
            text-[0.82rem]
            tracking-[0.22em]
            text-[rgba(40,40,45,0.55)]
          "
        >
          ROSE VEIL FRAGRANCE SHAMPOO
        </p>
      </div>
    </section>
  );
}
