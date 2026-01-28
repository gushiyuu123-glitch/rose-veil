// src/sections/QASection.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function QASection() {
  const sectionRef = useRef(null);
  const qaRefs = useRef([]);
  const inquiryRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  const qaList = [
    {
      q: "香りはどれくらい持続しますか？",
      a: `ROSE VEIL は “強さ” ではなく “余韻” を重視しています。
動いたとき・髪が揺れた瞬間にふわりと香る設計で、
人工的な強い残香はありません。

自然で上品な残り香が
およそ 2〜3 時間ほど、静かに続きます。`,
    },
    {
      q: "ドラッグストア品と何が違いますか？",
      a: `配合の方向性がまったく異なります。

市販品は「泡立ち・香りの強さ・コスパ」を重視。
ROSE VEIL は「香りの輪郭・質感の整い・余韻」を中心に設計。

アミノ酸洗浄 × 艶膜レイヤー × 透明感レイヤーで、
“触れた瞬間の質感” が根本から違います。`,
    },
    {
      q: "敏感肌でも使えますか？",
      a: `刺激性の強い洗浄成分は避けています。
アミノ酸系ベースに加え、
アロエ・カミツレなどの植物エキスを配合し、
頭皮への負担を抑えた処方です。

心配な方は腕または首の後ろで
パッチテストを推奨しています。`,
    },
    {
      q: "男性でも使えますか？",
      a: `もちろん問題ありません。

ROSE シリーズの香りは “甘い/強い” ではなく
“静けさ・輪郭” を重視しているため、
男性でも自然に使えます。

香りの主張ではなく、透明感のある余韻が特徴です。`,
    },
  ];

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const items = qaRefs.current.filter(Boolean);

    gsap.set(items, { opacity: 0, y: 26, filter: "blur(12px)" });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        gsap.to(items, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.6,
          ease: "power2.out",
          stagger: 0.18,
        });

        if (inquiryRef.current) {
          gsap.fromTo(
            inquiryRef.current.querySelectorAll(".inq-fade"),
            { opacity: 0, y: 20, filter: "blur(10px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.6,
              ease: "power2.out",
              stagger: 0.15,
              delay: 0.5,
            }
          );
        }

        io.disconnect();
      },
      { threshold: 0.14 }
    );

    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
     id="contact" // ← 最終判断セクションID
      ref={sectionRef}
      className="
        relative w-full
        py-[20vh]
        bg-[#fcfbfa]
        text-black
        overflow-hidden
      "
    >
      {/* BACKGROUND — 香りの横霧（極薄） */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 opacity-[0.22] blur-[70px]
        "
        style={{
          background: `
            radial-gradient(900px 680px at 40% 32%, rgba(255,235,245,0.18), transparent),
            radial-gradient(900px 680px at 70% 50%, rgba(255,150,170,0.16), transparent),
            radial-gradient(900px 680px at 46% 78%, rgba(160,200,255,0.14), transparent)
          `,
        }}
      />

      {/* 粒子 */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 opacity-[0.26]
          bg-[url('/grain.png')] bg-repeat mix-blend-soft-light
        "
      />

      {/* HEADER */}
      <div className="relative z-10 text-center mb-[12vh]">
        <div className="text-[0.82rem] tracking-[0.32em] text-black/55">
          Q & A
        </div>

        <h2 className="mt-4 text-[2.0rem] md:text-[2.25rem] font-light tracking-[0.02em] text-black/80">
          よくある質問と、静かな回答。
        </h2>

        <p className="mt-4 text-black/55 text-[0.98rem] leading-[1.9]">
          高級ブランドの「疑問解消」は、強い説得ではなく“静かな理解”です。
        </p>
      </div>

      {/* LIST */}
      <div
        className="
          relative z-10
          mx-auto w-[88%] max-w-[840px]
          divide-y divide-black/10
        "
      >
        {qaList.map((qa, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={i}
              ref={(el) => (qaRefs.current[i] = el)}
              className="py-8 cursor-pointer select-none"
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <div className="text-[1.06rem] tracking-[0.02em] text-black/78 flex justify-between items-center">
                <span>{qa.q}</span>
                <span className="text-black/35 text-[1.6rem] leading-none">
                  {isOpen ? "−" : "+"}
                </span>
              </div>

              <div
                className={`
                  overflow-hidden
                  transition-all duration-[650ms] ease-out
                  ${isOpen ? "max-h-[500px] mt-4" : "max-h-0"}
                `}
              >
                <p className="text-[0.95rem] text-black/55 leading-[1.95] whitespace-pre-line tracking-wide pb-4">
                  {qa.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* INQUIRY */}
      <div ref={inquiryRef} className="relative z-10 mt-[14vh] text-center">
        <h3 className="inq-fade text-[1.38rem] font-light tracking-[0.02em] text-black/80">
          ご相談・お問い合わせ
        </h3>

        <p className="inq-fade mt-4 text-[0.95rem] text-black/55 leading-[1.8]">
          香り・質感・処方について、静かにご相談いただけます。<br />
          無理なご案内は一切ありません。
        </p>

        <div className="inq-fade mt-10 flex flex-col md:flex-row justify-center items-center gap-6">
          <a
            href="mailto:contact@gushikendesign.com"
            className="
              w-[240px] py-3
              border border-black/25 rounded-[10px]
              text-black/70 text-[0.85rem]
              tracking-[0.1em]
              hover:text-black hover:border-black/45
              transition-all
            "
          >
            メールで静かに相談する
          </a>

          <a
            href="tel:090-0000-0000"
            className="
              w-[240px] py-3
              border border-black/25 rounded-[10px]
              text-black/70 text-[0.85rem]
              tracking-[0.1em]
              hover:text-black hover:border-black/45
              transition-all
            "
          >
            電話で静かに相談する
          </a>
        </div>
      </div>
    </section>
  );
}
