// src/sections/Philosophy.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Philosophy() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const tl = gsap.timeline();

        /* ============================
           左ローズ（淡い静度の揺れ）
        ============================ */
        tl.fromTo(
          el.querySelector(".rose-left"),
          { opacity: 0, y: 28, filter: "blur(16px)" },
          {
            opacity: 0.26,
            y: 0,
            filter: "blur(10px)",
            duration: 1.9,
            ease: "sine.out",
          },
          0.1
        );

        /* ============================
           右ローズ（深度の影を作る）
        ============================ */
        tl.fromTo(
          el.querySelector(".rose-right"),
          { opacity: 0, y: 32, filter: "blur(16px)" },
          {
            opacity: 0.40,
            y: 0,
            filter: "blur(9px)",
            duration: 2.0,
            ease: "power2.out",
          },
          0.22
        );

        /* ============================
           霧膜（光のベール）
        ============================ */
        tl.fromTo(
          el.querySelectorAll(".philo-veil"),
          { opacity: 0, scale: 1.05 },
          {
            opacity: 1,
            scale: 1,
            duration: 2.2,
            ease: "power2.out",
            stagger: 0.14,
          },
          0
        );

        /* ============================
           テキスト（呼吸の整い）
        ============================ */
        tl.fromTo(
          el.querySelectorAll(".philo-text"),
          { opacity: 0, y: 16, filter: "blur(7px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.32,
            ease: "power2.out",
            stagger: 0.12,
          },
          0.38
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

       pt-[22.8vh] pb-[17.2vh]

        lg:pt-[33.6vh] lg:pb-[19.2vh]
      "
    >
      {/* 左ローズ */}
      <img
        src="/world/rose-left.png"
        alt=""
        className="
          rose-left
          absolute left-[10%]  top-[30.5%]
         w-[348px]
          opacity-[0.26]
          blur-[10px]
          pointer-events-none select-none
        "
      />

      {/* 右ローズ */}
      <img
        src="/world/rose-right.png"
        alt=""
        className="
          rose-right
          absolute right-[7%]  top-[78%]
         w-[344px]
         opacity-[0.36]
          blur-[9px]
          pointer-events-none select-none
        "
      />

      {/* 光膜（薄膜ベール） */}
      <div
        className="
          philo-veil
          absolute top-[12%] left-[15%]
          w-[417px] h-[417px]
          bg-[radial-gradient(circle,rgba(255,210,230,0.15),rgba(255,210,230,0))]
          blur-[95px]
          opacity-[0.38]
        "
      />
      <div
        className="
          philo-veil
          absolute bottom-[12%] right-[12%]
          w-[368px] h-[368px]
          bg-[radial-gradient(circle,rgba(255,185,215,0.12),rgba(255,185,215,0))]
          blur-[100px]
          opacity-[0.32]
        "
      />

      {/* 本文エリア */}
      <div className="relative z-10 w-[78%] max-w-[860px] mx-auto text-center">

        {/* タイトル */}
        <h2
          className="
            philo-text
            font-eng
            tracking-[0.22em]
           text-[2.18rem]
            mb-[3.2vh]
            bg-clip-text text-transparent
          "
          style={{
            WebkitBackgroundClip: "text",
            backgroundImage:
              "linear-gradient(90deg,rgba(255,255,255,1) 0%,rgba(255,215,240,0.78) 22%,rgba(255,180,220,0.72) 48%,rgba(220,225,255,0.78) 74%,rgba(255,255,255,1) 100%)",
          }}
        >
          THE PHILOSOPHY OF ROSE
        </h2>

        {/* メインコピー */}
        <p
          className="
            philo-text
           text-[1.28rem]
            tracking-[0.06em]
            mb-[8vh]
            text-[rgb(248,242,238)]
          "
        >
          “<span className="text-[rgba(255,160,175,0.8)]">香り</span>
          は、あなたの
          <span className="text-[rgba(230,150,160,0.8)]">輪郭</span>
          をそっと整える。”
        </p>

        {/* 3ブロック */}
        <div
          className="
            space-y-[9vh]
            text-[rgb(248,242,238)]
            leading-[2.08]
            tracking-[0.02em]
          "
        >
          {[
            {
              num: "01",
              title: "DISTANT FRAGRANCE",
              body: `近い距離だけでそっと漂う、静けさの香り設計。\n華やかさではなく“距離の美しさ”で印象を整える。`,
            },
            {
              num: "02",
              title: "VEIL SILHOUETTE",
              body: `髪が揺れた一瞬だけ立ち上がる、薄い光膜のような香り。\n輪郭をやわらかく曖昧にし、静かに美をまとう。`,
            },
            {
              num: "03",
              title: "QUIET LUXURY",
              body: `肌と髪に寄り添い、まとうように続くラグジュアリー。\n余白の上品さが、時間とともに深度を与える。`,
            },
          ].map((b, i) => (
            <div key={i} className="philo-text">
              <div className="flex items-center gap-4 mb-[1.4vh] justify-center">
                <span className="text-[0.78rem] tracking-[0.25em] text-[rgb(248,242,238)]/55">
                  {b.num}
                </span>
                <div className="h-[1px] w-[14%] bg-white/25" />
                <h3
                  className="
                    text-[rgb(248,242,238)]/82
                    text-[0.88rem]
                    tracking-[0.22em]
                  "
                >
                  {b.title}
                </h3>
              </div>

              <p className="text-[rgb(248,242,238)]/92 text-[1.04rem] whitespace-pre-line">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
