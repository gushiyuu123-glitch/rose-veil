// src/sections/PhilosophySP.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PhilosophySP() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const texts = el.querySelectorAll(".sp-philo-text");
    const veils = el.querySelectorAll(".sp-philo-veil");

    /* ======================================
       初期状態（揺れない・高級）
    ====================================== */
    gsap.set([...texts, ...veils], {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        /* ======================================
           光膜（薄い香り → ふわっと出る）
        ====================================== */
        veils.forEach((v, i) => {
          gsap.to(v, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power2.out",
            delay: 0.12 + i * 0.14,
          });
        });

        /* ======================================
           テキスト（静けさ × 余白の演出）
        ====================================== */
        texts.forEach((t, i) => {
          gsap.to(t, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.25,
            ease: "power2.out",
            delay: 0.32 + i * 0.12,
          });
        });

        io.disconnect();
      },
      { threshold: 0.26 }
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
      {/* ======================================
          左右の薔薇（気配だけ / SP最適）
      ====================================== */}
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
          w-[180px] opacity-[0.13]
          blur-[14px]
          pointer-events-none select-none
        "
      />

      {/* ======================================
          光膜（Rose Veil SP：赤み1%・香り0.5%）
      ====================================== */}
      <div
        className="
          sp-philo-veil
          absolute top-[20%] left-[12%]
          w-[140px] h-[140px]
          blur-[78px]
          opacity-[0.27]
          pointer-events-none
        "
        style={{
          background:
            "radial-gradient(circle, rgba(255,215,230,0.15), rgba(255,215,230,0))",
        }}
      />

      <div
        className="
          sp-philo-veil
          absolute bottom-[12%] right-[10%]
          w-[140px] h-[140px]
          blur-[78px]
          opacity-[0.27]
          pointer-events-none
        "
        style={{
          background:
            "radial-gradient(circle, rgba(255,190,210,0.12), rgba(255,190,210,0))",
        }}
      />

      {/* ======================================
          TEXT BLOCK（最高の改行 × バランス）
      ====================================== */}
      <div className="relative z-10 w-[90%] mx-auto text-center">
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
              "linear-gradient(90deg,rgba(255,255,255,1),rgba(255,218,240,0.85),rgba(230,230,255,0.72),rgba(255,255,255,1))",
          }}
        >
          OUR PHILOSOPHY
        </h2>

        {/* MAIN COPY */}
        <p
          className="
            sp-philo-text
            text-[1.05rem]
            tracking-[0.04em]
            mb-[6vh]
            leading-[1.9]
            text-[rgb(248,242,238)]
            [text-wrap:balance]
          "
        >
          “<span className='text-[rgba(255,160,175,0.82)]'>香り</span>
          は、ほのかに漂う
          <span className='text-[rgba(230,150,160,0.82)]'>美しさ</span>
          である。”
        </p>

        {/* ======================================
            3 BLOCKS
        ====================================== */}
        <div
          className="
            space-y-[8vh]
            text-[rgb(248,242,238)]
            leading-[2.05]
            tracking-[0.03em]
            [text-wrap:balance]
          "
        >
          {[
            {
              num: "01",
              title: "SILENT FRAGRANCE",
              body: `日常の近い距離だけでふわりと香る“静けさ”の設計。天然ローズ精油を軸に、甘さ・深み・余韻を繊細に整える。`,
            },
            {
              num: "02",
              title: "VEIL OF LIGHT",
              body: `髪が揺れた一瞬だけ立ち上がる薄い光膜のような香り。輪郭を曖昧にし、静かに美しさをまとわせる。`,
            },
            {
              num: "03",
              title: "WEARABLE LUXURY",
              body: `肌と髪に寄り添い、まとうように続くラグジュアリー。派手さではなく余白の美しさで魅せる香りの思想。`,
            },
          ].map((b, i) => (
            <div key={i} className="sp-philo-text">
              {/* Block Header */}
              <div className="flex items-center gap-3 mb-[1.2vh] justify-center">
                <span className="text-[0.72rem] tracking-[0.22em] text-white/45">
                  {b.num}
                </span>
                <div className="h-[1px] w-[18%] bg-white/25" />
                <h3 className="text-white/80 text-[0.82rem] tracking-[0.20em]">
                  {b.title}
                </h3>
              </div>

              {/* Body */}
              <p className="text-white/90 text-[0.98rem] leading-[1.95]">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
