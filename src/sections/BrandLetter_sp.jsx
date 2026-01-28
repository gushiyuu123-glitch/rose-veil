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
        duration: 1.15,
        ease: "power2.out",
        stagger: 0.12,
      });

      io.disconnect();
    }, { threshold: 0.15 });

    io.observe(el);
  }, []);

  return (
<section
  ref={rootRef}
  className="
    relative w-full
    py-[16vh]
    text-black
    overflow-hidden
    bg-[url('/vertical-soft-paper.png')]   /* ← 絶対消えない背景 */
    bg-cover
    bg-top
  "
>

  {/* ============================
       ★ 強め滲みレイヤー（3段重ね）
  ============================ */}

  {/* ① 香りの淡紅膜（中） */}
  <div
    aria-hidden="true"
    className="
      absolute inset-0 -z-0
      opacity-[0.22]
      blur-[110px]
      bg-[radial-gradient(
        circle_at_48%_18%,
        rgba(255,175,200,0.40),
        transparent
      )]
    "
  />

  {/* ② 白の柔光膜（中） */}
  <div
    aria-hidden="true"
    className="
      absolute inset-0 -z-0
      opacity-[0.16]
      blur-[120px]
      bg-[radial-gradient(
        circle_at_52%_70%,
        rgba(255,255,255,0.55),
        transparent
      )]
    "
  />

  {/* ③ 桜ピンク膜（強め / 画面広域） */}
  <div
    aria-hidden="true"
    className="
      absolute inset-0 -z-0
      opacity-[0.28]
      blur-[150px]
      bg-[radial-gradient(
        900px_700px_at_50%_40%,
        rgba(255,160,185,0.38),
        transparent
      )]
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
      BODY
  ============================ */}
  <div className="relative z-10 mx-auto w-[90%] max-w-[900px] text-center">
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
