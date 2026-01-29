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
      y: 14,               // ← SP 最適値
      filter: "blur(6px)", // ← 負荷を1/2に
    });

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      gsap.to(items, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.10,
        ease: "power2.out",
        stagger: 0.10,
      });

      io.disconnect();
    }, { threshold: 0.10 });

    io.observe(el);
  }, []);

  return (
<section
  ref={rootRef}
  className="
    relative w-full
    py-[15vh]
    overflow-hidden
    text-black

    /* ★ まずベースの紙背景（固定） */
    bg-[url('/vertical-soft-paper.png')]
    bg-cover bg-top
  "
>

  {/* =================================================
      ★ 1) “背景画像” をより背景化 – にじみ処理
      -------------------------------------------------
      ・opacity は 0.12〜0.18（存在を残す最適帯）
      ・blur は 48〜60px（SPで負荷軽い最大値）
      ・scale で端の濃さを溶かす
    ================================================= */}
  <div
    aria-hidden="true"
    className="
      absolute inset-0
      -z-0
      opacity-[0.16]
      blur-[52px]
      scale-[1.12]
      pointer-events-none
      mix-blend-soft-light
      bg-[url('/letter/soft-back-roseveil.png')]
      bg-cover bg-center
    "
  />

  {/* =================================================
      ★ 2) 香り膜 – Radial（淡紅 × 白 × 青）
      （背景画像をさらに奥に押すフェード）
    ================================================= */}

  {/* 淡紅（soft rose mist） */}
  <div
    aria-hidden="true"
    className="
      absolute inset-0 -z-0
      opacity-[0.3]
      blur-[80px]
      bg-[radial-gradient(
        680px_480px_at_50%_22%,
        rgba(255,165,190,0.40),
        transparent 70%
      )]
    "
  />

  {/* 柔白（white veil） */}
  <div
    aria-hidden="true"
    className="
      absolute inset-0 -z-0
      opacity-[0.3]
      blur-[90px]
      bg-[radial-gradient(
        720px_520px_at_52%_70%,
        rgba(255,255,255,0.55),
        transparent 75%
      )]
    "
  />

  {/* 微青（evening blue haze） */}
  <div
    aria-hidden="true"
    className="
      absolute inset-0 -z-0
      opacity-[0.3]
      blur-[100px]
      bg-[radial-gradient(
        760px_560px_at_50%_45%,
        rgba(170,200,255,0.38),
        transparent 75%
      )]
    "
  />

  {/* =================================================
      ★ 3) 微粒子（grain）
      -------------------------------------------------
      ・“紙の上の香り”の雰囲気を作る
    ================================================= */}
  <div
    aria-hidden="true"
    className="
      absolute inset-0 -z-0
      opacity-[0.14]
      bg-[url('/grain.png')] bg-repeat
      mix-blend-soft-light
    "
  />
  {/* テキストの背後に “薄い香り膜” */}
  <div
    aria-hidden="true"
    className="
      absolute inset-0 opacity-[0.22]
      blur-[48px]
      bg-[radial-gradient(
        circle,
        rgba(255,210,230,0.22),
        transparent
      )]
    "
  />

  {/* =================================================
      HEADER
    ================================================= */}
  <div className="relative z-10 text-center mb-[7vh] px-6">
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
        text-[1.75rem]
        font-light
        tracking-[0.02em]
        text-[rgba(40,30,35,0.88)]
        leading-[1.38]
      "
    >
      静かに、美しさの輪郭を整える手紙。
    </p>
  </div>

  {/* =================================================
      BODY
    ================================================= */}
  <div className="relative z-10 mx-auto w-[90%] max-w-[900px] text-center">
<p
  className="
    bl-fade-sp relative
    text-[0.95rem]
    leading-[1.88]
    font-light
    whitespace-pre-line
    tracking-[0.01em]
    text-[rgba(40,35,40,0.82)]    /* ← 文字本体は普通の色で保持 */
    [text-shadow:0_1px_1px_rgba(0,0,0,0.06)]
  "
  style={{
    background: `
      radial-gradient(600px 380px at 50% 20%, rgba(255,170,190,0.07), transparent 70%),
      radial-gradient(600px 380px at 48% 80%, rgba(170,190,255,0.05), transparent 70%)
    `,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
  }}
>


{`髪が揺れた瞬間にふわりと漂う、
静かで上品な香り。

Rose Veil は、日常の“輪郭”を
そっと美しく整える処方です。

香りは強さではなく距離で伝わり、
触れた瞬間の質感や乾いたあとの余韻が
静かに続きます。

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
