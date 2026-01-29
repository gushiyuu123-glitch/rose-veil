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
      y: 14,
      filter: "blur(6px)",
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

    bg-[url('/vertical-soft-paper.webp')]
    bg-cover bg-top
  "
>

  {/* =================================================
      1) 背景画像の抽象化（にじみ処理）
  ================================================= */}
  <div
    aria-hidden="true"
    className="
      absolute inset-0 -z-0
      opacity-[0.16]
      blur-[52px]
      scale-[1.1]
      pointer-events-none
      mix-blend-soft-light
      bg-[url('/letter/soft-back-roseveil.webp')]
      bg-cover bg-center
    "
  />

  {/* =================================================
      2) 香りの3層膜（rose / white / blue）
  ================================================= */}

  {/* soft rose veil */}
  <div
    aria-hidden="true"
    className="
      absolute inset-0 -z-0
      opacity-[0.28]
      blur-[80px]
      bg-[radial-gradient(
        680px_480px_at_50%_22%,
        rgba(255,165,190,0.40),
        transparent 70%
      )]
    "
  />

  {/* white light veil */}
  <div
    aria-hidden="true"
    className="
      absolute inset-0 -z-0
      opacity-[0.28]
      blur-[90px]
      bg-[radial-gradient(
        720px_520px_at_52%_70%,
        rgba(255,255,255,0.55),
        transparent 75%
      )]
    "
  />

  {/* blue haze */}
  <div
    aria-hidden="true"
    className="
      absolute inset-0 -z-0
      opacity-[0.28]
      blur-[100px]
      bg-[radial-gradient(
        760px_560px_at_50%_45%,
        rgba(170,200,255,0.35),
        transparent 75%
      )]
    "
  />

  {/* =================================================
      3) 粒子（grain）
  ================================================= */}
  <div
    aria-hidden="true"
    className="
      absolute inset-0 -z-0
      opacity-[0.14]
      bg-[url('/grain.png')]
      bg-repeat
      mix-blend-soft-light
    "
  />

  {/* テキスト下の淡い香り膜 */}
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
        bl-fade-sp mt-6
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
      BODY（全文アップグレード）
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
    text-[rgba(40,35,40,0.82)]
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
{`髪が揺れた瞬間にふわりと香りがほどけ、  
その“余韻”だけが静かに残る。

Rose Veil は、毎日の中で  
美しさの輪郭をそっと整えるために生まれました。

香りは強く主張するのではなく、  
距離で伝わるものだと考えています。

近づいたときに初めて気づく甘さ、  
触れたときに感じるやわらかい質感、  
乾いたあとに残る透明な気配。

そのすべてが控えめで、  
あなたの雰囲気を壊さずに寄り添うように  
慎重に調整されています。

慌ただしい朝も、  
ふとした瞬間に自分を思い出したい時間も、  
Rose Veil の“静かなやさしさ”が  
そっと呼吸を整えてくれます。`}
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
