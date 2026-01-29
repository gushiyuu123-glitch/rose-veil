// src/sections/QASection_sp.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function QASection_sp() {
  const sectionRef = useRef(null);
  const qaRefs = useRef([]);
  const inquiryRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  /* ============================================================
      Q&A — アップグレード版コピー
  ============================================================ */
  const qaList = [
    {
      q: "香りはどれくらい持続しますか？",
      a: `ROSE VEIL の香りは “強く残す” のではなく  
“距離で伝わる余韻” を軸に調整しています。

髪が揺れた瞬間や、すれ違いざまに  
やわらかく香りが立つ設計で、人工的な強香はありません。

自然で上品な香りが  
2〜3時間ほど、静かに続きます。`,
    },
    {
      q: "ドラッグストア品と何が違いますか？",
      a: `市販品は「泡立ち」「強い香り」「コスパ」を中心に設計されています。

ROSE VEIL は  
“香りの輪郭” と “質感の余韻” を最優先に考えており、

・アミノ酸洗浄  
・艶膜レイヤー  
・透明感レイヤー  

の 3 構造で、  
“触れた瞬間の質感” を根本から変える処方です。`,
    },
    {
      q: "敏感肌でも使えますか？",
      a: `アミノ酸系のやさしい洗浄成分をベースに、  
アロエ・カミツレなどの植物エキスで刺激を抑えた設計です。

心配な方は、腕または首の後ろで  
軽いパッチテストをおすすめしています。`,
    },
    {
      q: "男性でも使えますか？",
      a: `もちろんお使いいただけます。

ROSE シリーズは“甘い強香”ではなく、  
“静けさ × 輪郭のある余韻” を重視しており、

男性でも自然に使える香りです。`,
    },
    {
      q: "配送やお支払いについて知りたいです",
      a: `配送料：全国一律 590円  
6,000円以上のご注文で送料無料です。

ご注文後 2〜3 営業日以内に発送します。

お支払い方法：  
VISA / Master / AMEX に対応しています。

未開封の場合は、商品到着から  
7日以内であれば返品・交換が可能です。`,
    },
  ];

  /* ============================
      GSAP（SP呼吸）
  ============================ */
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const items = qaRefs.current.filter(Boolean);
    gsap.set(items, { opacity: 0, y: 14, filter: "blur(6px)" });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        gsap.to(items, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.08,
          ease: "power2.out",
          stagger: 0.1,
        });

        if (inquiryRef.current) {
          const fades = inquiryRef.current.querySelectorAll(".inq-fade-sp");

          gsap.fromTo(
            fades,
            { opacity: 0, y: 12, filter: "blur(6px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.12,
              ease: "power2.out",
              stagger: 0.1,
              delay: 0.35,
            }
          );
        }

        io.disconnect();
      },
      { threshold: 0.05 }
    );

    io.observe(root);
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="
        relative w-full
        py-[16vh]
        bg-[#fcfbfa]
        text-black
        overflow-hidden
      "
    >

      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          opacity-[0.14]
          blur-[28px]
        "
        style={{
          background: `
            radial-gradient(680px 420px at 48% 22%, rgba(255,230,245,0.20), transparent 65%),
            radial-gradient(680px 420px at 62% 50%, rgba(255,150,170,0.14), transparent 65%),
            radial-gradient(680px 420px at 50% 88%, rgba(170,200,255,0.12), transparent 65%)
          `,
        }}
      />

      {/* 粒子 */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          opacity-[0.12]
          bg-[url('/grain.png')] bg-repeat
          mix-blend-soft-light
        "
      />

      {/* HEADER */}
      <div className="relative z-10 text-center mb-[10vh] px-4">
        <div className="text-[0.74rem] tracking-[0.32em] text-black/55">
          Q & A
        </div>

        <h2 className="mt-3 text-[1.85rem] font-light tracking-[0.02em] text-black/80 leading-tight">
          よくある質問とその回答
        </h2>

        <p className="mt-3 text-black/55 text-[0.92rem] leading-[1.85]">
          高級ブランドの Q&A は“説得”ではなく、<br />静かに理解が深まる設計です。
        </p>
      </div>

      {/* LIST */}
      <div
        className="
          relative z-10
          mx-auto w-[90%] max-w-[780px]
          divide-y divide-black/10
        "
      >
        {qaList.map((qa, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={i}
              ref={(el) => (qaRefs.current[i] = el)}
              className="py-6 cursor-pointer select-none"
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <div className="flex justify-between items-center">
                <span className="text-[1rem] tracking-[0.02em] text-black/78">
                  {qa.q}
                </span>
                <span className="text-black/35 text-[1.5rem] leading-none">
                  {isOpen ? "−" : "+"}
                </span>
              </div>

              <div
                className={`
                  overflow-hidden
                  transition-all duration-[520ms] ease-out
                  ${isOpen ? "max-h-[420px] mt-3" : "max-h-0"}
                `}
              >
                <p className="text-[0.9rem] text-black/55 leading-[1.85] whitespace-pre-line pb-4">
                  {qa.a}
                </p>
              </div>
            </div>
          );
        })}

        <button
          className="
            mt-8
            text-[0.82rem]
            tracking-[0.22em]
            text-black/40 hover:text-black/55
            transition
            pointer-events-none
            block mx-auto
            text-center
          "
        >
          さらによくある質問を見る
        </button>
      </div>

      {/* INQUIRY */}
      <div ref={inquiryRef} className="relative z-10 mt-[12vh] text-center px-4">
        <h3 className="inq-fade-sp text-[1.32rem] font-light tracking-[0.02em] text-black/80">
          ご相談・お問い合わせ
        </h3>

        <p className="inq-fade-sp mt-4 text-[0.9rem] text-black/55 leading-[1.8]">
          香り・質感・処方について静かにご相談いただけます。<br />
          無理なご案内は一切ありません。
        </p>

        <div className="inq-fade-sp mt-8 flex flex-col items-center gap-5">
          <a
            href="mailto:contact@gushikendesign.com"
            className="
              w-[220px] py-3
              border border-black/25 rounded-[10px]
              text-black/70 text-[0.82rem]
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
              w-[220px] py-3
              border border-black/25 rounded-[10px]
              text-black/70 text-[0.82rem]
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
