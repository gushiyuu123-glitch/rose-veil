// src/sections/PhilosophySP.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PhilosophySP() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const tl = gsap.timeline();

        /* ============================
           ふわり背景（SP用・存在は薄く）
        ============================ */
        tl.fromTo(
          el.querySelectorAll(".sp-philo-veil"),
          { opacity: 0, scale: 1.06 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.9,
            ease: "power2.out",
            stagger: 0.12,
          },
          0
        );

        /* ============================
           テキスト
        ============================ */
        tl.fromTo(
          el.querySelectorAll(".sp-philo-text"),
          { opacity: 0, y: 18, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.28,
            ease: "power2.out",
            stagger: 0.10,
          },
          0.22
        );

        io.disconnect();
      },
      { threshold: 0.20 }
    );

    io.observe(el);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative w-full
        bg-black
        overflow-hidden
        pt-[18vh] pb-[14vh]
      "
    >
      {/* ================================
          左右の薔薇は SP では “気配レベル”
      ================================ */}
      <img
        src="/world/rose-left.png"
        alt=""
        className="
          absolute left-[2%] top-[22%]
          w-[180px] opacity-[0.10]
          blur-[14px]
          pointer-events-none select-none
        "
      />

      <img
        src="/world/rose-right.png"
        alt=""
        className="
          absolute right-[1%] bottom-[16%]
          w-[180px] opacity-[0.14]
          blur-[14px]
          pointer-events-none select-none
        "
      />

      {/* ================================
          光膜（SP適正強度）
      ================================ */}
      <div
        className="
          sp-philo-veil
          absolute top-[10%] left-[10%]
          w-[220px] h-[220px]
          bg-[radial-gradient(circle,rgba(255,210,230,0.16),rgba(255,210,230,0))]
          blur-[65px]
          opacity-[0.38]
        "
      />
      <div
        className="
          sp-philo-veil
          absolute bottom-[10%] right-[8%]
          w-[200px] h-[200px]
          bg-[radial-gradient(circle,rgba(255,185,215,0.12),rgba(255,185,215,0))]
          blur-[70px]
          opacity-[0.30]
        "
      />

      {/* ================================
          TEXT BLOCK
      ================================ */}
      <div
        className="
          relative z-10
          w-[84%] mx-auto text-center
        "
      >
        {/* TITLE */}
        <h2
          className="
            sp-philo-text
            font-eng
            tracking-[0.20em]
            text-[1.65rem]
            mb-[4vh]
            bg-clip-text text-transparent
          "
          style={{
            WebkitBackgroundClip: "text",
            backgroundImage:
              "linear-gradient(90deg,rgba(255,255,255,1),rgba(255,215,240,0.8),rgba(220,225,255,0.7),rgba(255,255,255,1))",
          }}
        >
          OUR PHILOSOPHY
        </h2>

        {/* メインコピー */}
        <p
          className="
            sp-philo-text
            text-[1.05rem]
            tracking-[0.05em]
            mb-[6vh]
            text-[rgb(248,242,238)]
          "
        >
          “<span className='text-[rgba(255,160,175,0.82)]'>香り</span>
          は、ほのかに漂う
          <span className='text-[rgba(230,150,160,0.82)]'>美しさ</span>
          である。”
        </p>

        {/* 3ブロック */}
        <div
          className="
            space-y-[8vh]
            text-[rgb(248,242,238)]
            leading-[1.85]
            tracking-[0.02em]
          "
        >
          {[
            {
              num: "01",
              title: "SILENT FRAGRANCE",
              body: `日常の近い距離だけでふわりと香る“静けさ”の設計。\n天然ローズ精油を軸に、甘さ・深み・余韻を繊細に整える。`,
            },
            {
              num: "02",
              title: "VEIL OF LIGHT",
              body: `髪が揺れた一瞬だけ立ち上がる薄い光膜のような香り。\n輪郭を曖昧にし、静かに美しさをまとわせる。`,
            },
            {
              num: "03",
              title: "WEARABLE LUXURY",
              body: `肌と髪に寄り添い、まとうように続くラグジュアリー。\n派手さではなく余白の美しさで魅せる香りの思想。`,
            },
          ].map((b, i) => (
            <div key={i} className="sp-philo-text">
              <div className="flex items-center gap-3 mb-[1.2vh] justify-center">
                <span className="text-[0.72rem] tracking-[0.22em] text-white/45">
                  {b.num}
                </span>
                <div className="h-[1px] w-[18%] bg-white/25" />
                <h3 className="text-white/80 text-[0.82rem] tracking-[0.20em]">
                  {b.title}
                </h3>
              </div>

              <p className="text-white/90 text-[0.98rem] whitespace-pre-line">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
