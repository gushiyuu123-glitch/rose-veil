// ================================
// ProductOverlayWide_sp.jsx（最適化版）
// ================================
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";
import "../styles/movie-hover_sp.css";

/* ------------------------------------------------------------
   UI TOKENS（黒×薄膜×上質UI）
------------------------------------------------------------ */
const UI = {
  // line
  line18: "border border-white/18",
  line28: "border border-white/28",
  // surfaces
  glass5: "bg-white/5 backdrop-blur-[6px]",
  glass7: "bg-white/7 backdrop-blur-[8px]",
  panel: "bg-black/72 backdrop-blur-[10px]",
  // text
  t95: "text-white/95",
  t85: "text-white/85",
  t75: "text-white/75",
  t60: "text-white/60",
  t45: "text-white/45",
  // tracking
  trackHi: "tracking-[0.22em]",
  trackMd: "tracking-[0.12em]",
  // radius
  r10: "rounded-[10px]",
  r12: "rounded-[12px]",
  r14: "rounded-[14px]",
};

const titleColor = {
  white: "text-[#d9d6f2]",
  veil: "text-[#f5c8d6]",
  blue: "text-[#c8e2ff]",
};

/* ------------------------------------------------------------
   商品データ（アップグレード完全版）
------------------------------------------------------------ */
const products = [
  {
    key: "white",
    title: "ROSE WHITE",
    metaCopy:
      "触れた瞬間、空気のように軽い指通り。揺れるたび、白い光の甘さがそっとほどける。",
    sub: "透明感の甘さ × 軽い仕上がり",
    image: "rose-white.png",
    detail: `ホワイトローズとホワイトムスクを
やわらかく重ねた軽質感処方。
根元はふんわり、毛先はさらり。
重さを感じさせない上品なまとまり。

● 仕上がり：軽い・さらさら
● 香り持続：〜6時間
● 容量：300ml`,
    ingredients: "ローズエキス / ボタニカル成分 / シアバター",
    price: 2480,
    priceLabel: "¥2,480（税込）",
    grad: "white",
  },
  {
    key: "veil",
    title: "ROSE VEIL",
    metaCopy:
      "体温でふわりと開く深紅の甘さ。艶がゆっくりと重なり、夜まで上品に香り続ける。",
    sub: "深紅の甘さ × しっとり上品",
    image: "rose-veil.png",
    detail: `ローズアブソリュートとホホバが
深く上質な艶膜を形成。
体温で香りがひらき、
しっとりとしたまとまりが続く処方。

● 仕上がり：しっとり・上質な艶
● 香り持続：〜8時間
● 容量：320ml`,
    ingredients: "ローズアブソリュート / ホホバオイル / シアバター",
    price: 2680,
    priceLabel: "¥2,680（税込）",
    grad: "veil",
  },
  {
    key: "blue",
    title: "ROSE BLUE",
    metaCopy:
      "静かな潤いが長く続き、揺れるたびに青の透明感がそっと立ちのぼる。",
    sub: "青の静けさ × 凛とした潤い",
    image: "rose-blue.png",
    detail: `青みローズとベルガモットが織りなす
凛とした潤いの処方。
重さのないみずみずしさが続き、
髪に静かな透明感を与える。

● 仕上がり：潤い・みずみずしさ
● 香り持続：〜7時間
● 容量：300ml`,
    ingredients: "ローズエキス / ベルガモット / マリンミネラル",
    price: 2580,
    priceLabel: "¥2,580（税込）",
    grad: "blue",
  },
];

/* ------------------------------------------------------------
   商品別「右縦グラデ膜」
------------------------------------------------------------ */
const rightGrad = {
  blue: `linear-gradient(to bottom, rgba(10,20,40,0.30), rgba(10,20,40,0.12), rgba(10,20,40,0.00))`,
  veil: `linear-gradient(to bottom, rgba(80,0,20,0.34), rgba(80,0,20,0.16), rgba(80,0,20,0.00))`,
  white: `linear-gradient(to bottom, rgba(0,0,0,0.30), rgba(0,0,0,0.18), rgba(0,0,0,0.04))`,
};

const yen = (n) => `¥${Number(n || 0).toLocaleString("ja-JP")}`;

/* ------------------------------------------------------------
   高級フェード（呼吸）
------------------------------------------------------------ */
function useInViewOnce({ rootMargin = "0px 0px -15% 0px" } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [shown, rootMargin]);

  return { ref, shown };
}

function Reveal({ children, className = "", delayMs = 0 }) {
  const { ref, shown } = useInViewOnce();
  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-[1100ms] ease-out will-change-transform",
        shown ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-[12px] blur-[5px]",
        className,
      ].join(" ")}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------
   Premium Underline Button
------------------------------------------------------------ */
function UnderlineAction({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={[
        "group relative inline-flex items-center",
        UI.trackHi,
        "text-[0.92rem] font-light text-white/85 hover:text-white",
        "transition-all",
        className,
      ].join(" ")}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="
            absolute left-0 -bottom-[10px]
            h-[1px] w-[26px]
            bg-white/35
            transition-all duration-500 ease-out
            group-hover:w-[128px]
            group-hover:bg-white/65
          "
        />
      </span>

      <span
        aria-hidden="true"
        className="
          ml-4 text-white/55
          transition-all duration-500 ease-out
          group-hover:translate-x-[5px] group-hover:text-white/80
        "
      >
        →
      </span>
    </button>
  );
}

/* ------------------------------------------------------------
   カートモーダル
------------------------------------------------------------ */
function CartModal({ open, onClose, cart, cartCount, cartTotal, changeQty, removeItem }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-[200] ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`
          absolute inset-0 bg-black/55 backdrop-blur-[4px]
          transition-all duration-700 ease-out
          ${open ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          absolute right-0 top-0 h-full w-[92vw] sm:w-[460px]
          ${UI.panel} border-l border-white/18 shadow-[0_0_70px_rgba(0,0,0,0.55)]
          transition-transform duration-700 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-7 pt-7 pb-5 border-b border-white/18 flex items-center justify-between">
            <Reveal delayMs={40}>
              <div className={`${UI.t85} ${UI.trackHi} text-[0.92rem]`}>CART</div>
            </Reveal>

            <button
              onClick={onClose}
              aria-label="Close"
              className="
                z-[3] w-[34px] h-[34px] flex items-center justify-center rounded-full
                border border-white/12 bg-white/3 backdrop-blur-[3px]
                text-white/65 hover:text-white hover:border-white/25 hover:bg-white/6
                transition-all duration-500
              "
            >
              ✕
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-auto px-7 py-6">
            {cart.length === 0 ? (
              <Reveal delayMs={140}>
                <div className="pt-10 text-white/55 text-[0.92rem] leading-relaxed">
                  カートは空です。<br />
                  気になる香りを追加してください。
                </div>
              </Reveal>
            ) : (
              <div className="space-y-5">
                {cart.map((it, idx) => (
                  <Reveal key={it.key} delayMs={120 + idx * 70}>
                    <div className={`${UI.r14} p-4 ${UI.line18} ${UI.glass5}`}>
                      <div className="flex gap-4 items-start">
                        <div className={`w-[70px] h-[70px] shrink-0 overflow-hidden ${UI.r12} ${UI.line18}`}>
                          <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className={`${UI.t85} text-[0.95rem] tracking-[0.06em] truncate`}>
                            {it.title}
                          </div>
                          <div className="mt-1 text-white/45 text-[0.78rem] tracking-[0.10em] leading-snug">{it.sub}</div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="text-white/80 text-[0.9rem] tracking-[0.04em]">{yen(it.price)}</div>
                            <button
                              onClick={() => removeItem(it.key)}
                              className="text-white/35 hover:text-white/75 transition text-[0.78rem] tracking-[0.16em]"
                            >
                              REMOVE
                            </button>
                          </div>

                          {/* QTY */}
                          <div className="mt-4 flex items-center gap-3">
                            <button
                              onClick={() => changeQty(it.key, -1)}
                              className={`w-9 h-9 ${UI.r10} ${UI.line18} bg-white/5 text-white/70 hover:text-white hover:border-white/28 transition`}
                            >
                              −
                            </button>

                            <div className="text-white/80 tracking-[0.12em] text-[0.9rem] w-8 text-center">{it.qty}</div>

                            <button
                              onClick={() => changeQty(it.key, +1)}
                              className={`w-9 h-9 ${UI.r10} ${UI.line18} bg-white/5 text-white/70 hover:text-white hover:border-white/28 transition`}
                            >
                              +
                            </button>

                            <div className="ml-auto text-white/70 text-[0.86rem] tracking-[0.08em]">{yen(it.price * it.qty)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-7 py-6 border-t border-white/18">
            <Reveal delayMs={120}>
              <div className="flex items-center justify-between">
                <div className={`${UI.t55} ${UI.trackHi} text-[0.82rem]`}>TOTAL</div>
                <div className="text-white/92 text-[1.06rem] tracking-[0.10em] font-light">{yen(cartTotal)}</div>
              </div>
            </Reveal>

            <Reveal delayMs={200}>
              <button
                disabled={cart.length === 0}
                className={`
                  group relative mt-5 w-full py-3
                  ${UI.r14} ${UI.line18}
                  text-[0.9rem] tracking-[0.22em] font-light
                  transition-all duration-500
                  ${cart.length === 0
                    ? "bg-white/5 text-white/25 cursor-not-allowed"
                    : "bg-white/6 text-white/85 hover:bg-white/10 hover:border-white/25"}
                `}
              >
                <span className="relative inline-block">
                  CHECKOUT
                  <span
                    aria-hidden="true"
                    className={`
                      absolute left-1/2 -translate-x-1/2 -bottom-[7px]
                      h-[1px] w-[60px]
                      bg-white/30
                      transition-all duration-500
                      ${cart.length === 0 ? "" : "group-hover:w-[120px] group-hover:bg-white/55"}
                    `}
                  />
                </span>
              </button>
            </Reveal>

            <Reveal delayMs={260}>
              <div className="mt-4 text-white/30 text-[0.74rem] tracking-[0.10em] leading-relaxed">
                ※ Stripe等の決済導線は後で追加できます
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   MAIN（PC/SP 共通・高級設計）
------------------------------------------------------------ */
export default function ProductOverlayWide_sp() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const cartCount = useMemo(() => cart.reduce((s, it) => s + it.qty, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((s, it) => s + it.price * it.qty, 0), [cart]);

  const addToCart = (p) => {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.key === p.key);
      if (idx >= 0) {
        const next = [...prev];
        next[idx].qty++;
        return next;
      }
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const changeQty = (key, delta) => {
    setCart((prev) =>
      prev
        .map((it) => (it.key === key ? { ...it, qty: it.qty + delta } : it))
        .filter((it) => it.qty > 0)
    );
  };

  const removeItem = (key) => {
    setCart((prev) => prev.filter((it) => it.key !== key));
  };

  return (
    <section id="products-sp" className="w-full relative bg-black overflow-hidden">
      {/* CART TRIGGER */}
      <div
        className={`
          fixed top-3 right-3 sm:top-4 sm:right-6 z-[120]
          transition-all duration-500
          ${isCartOpen ? "opacity-0 pointer-events-none -translate-y-1" : "opacity-100"}
        `}
      >
        <button
          onClick={() => setIsCartOpen(true)}
          className="
            group px-5 py-3 flex items-center gap-3
            rounded-[12px]
            bg-white/3 backdrop-blur-[4px]
            border border-white/12
            text-white/85 text-[0.88rem] tracking-[0.22em]
            hover:border-white/25 hover:bg-white/8
            transition-all duration-500
          "
        >
          <ShoppingBag size={18} strokeWidth={1.35} className="opacity-85 group-hover:opacity-100 transition" />
          CART
          {cartCount > 0 && <span className="text-white/60 text-[0.75rem] tracking-[0.08em]">{cartCount}</span>}
        </button>
      </div>

      {/* PRODUCTS */}
{products.map((p, i) => (
  <div key={p.key} id={`products-sp-${p.key}`} className="relative w-full border-b border-white/10">

          {/* PHOTO AREA */}
          <div className="relative w-full h-[78vh] lg:h-[112vh] overflow-hidden">
            {/* PHOTO */}
            <img
              src={p.image}
              alt={p.title}
              className="absolute inset-0 w-full h-full object-cover object-center z-[1]"
            />

            {/* BASE DARK LAYER */}
            <div
              aria-hidden="true"
              className="absolute inset-0 z-[0] pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.15) 32%, rgba(0,0,0,0.4))",
                mixBlendMode: "multiply",
              }}
            />

{/* ★ テキスト背面の縦薄膜（高級演出：視認性UP） */}
<div
  aria-hidden="true"
  className="
    absolute inset-0
    z-[2]
    pointer-events-none
    rounded-[18px]
    backdrop-blur-[4px]
  "
  style={{
    background: rightGrad[p.grad],
    opacity: 0.62,
    mixBlendMode: "soft-light",
  }}
/>

            {/* PC OVERLAY */}
            <div
              className="
                hidden lg:grid absolute inset-0
                grid-cols-[50%_35%] gap-[8vw]
                px-[6vw] place-content-center
                pointer-events-none z-[3]
              "
            >
              <Reveal delayMs={80 + i * 100} className="text-left translate-x-[1vw]">
                <h3 className={`${UI.t95} ${titleColor[p.key]} text-[2.8rem] font-light`}>{p.title}</h3>
                <p className="text-white/75 text-[1.06rem] mt-4 leading-relaxed">{p.metaCopy}</p>
                <p className="text-white/80 text-[1.15rem] mt-3">{p.sub}</p>
                <div className="mt-6 w-[180px] h-[1px] bg-white/20" />
              </Reveal>

              <Reveal delayMs={160 + i * 100} className="text-left pl-[17vw]">
                <p className="text-white/95 text-[1.08rem] leading-[1.95] whitespace-pre-line">{p.detail}</p>

                <p className="mt-6 text-white/70 text-[0.95rem] leading-relaxed">
                  <span className="text-white/45 tracking-[0.12em]">INGREDIENTS</span>
                  <br />
                  {p.ingredients}
                </p>

                <p className="mt-7 text-[1.3rem] text-white/95 tracking-wide font-light">{p.priceLabel}</p>

                <div className="mt-6 pointer-events-auto">
                  <UnderlineAction onClick={() => addToCart(p)}>PURCHASE</UnderlineAction>
                </div>
              </Reveal>
            </div>
          </div>

          {/* SP */}
          <div className="lg:hidden relative bg-black px-6 pt-10 pb-12 text-left z-[3]">
            {/* ★ テキスト背面の縦薄膜（SP用） */}
<div
  aria-hidden="true"
  className="absolute inset-0 z-[2] pointer-events-none rounded-[18px] backdrop-blur-[2px]"
  style={{
    background: rightGrad[p.grad],
    opacity: 0.22,            // ← ほぼ存在の気配だけ残す値
    mixBlendMode: "soft-light",
  }}
/>


            <Reveal delayMs={60}>
              <h3 className={`${titleColor[p.key]} text-[1.85rem] font-light tracking-[0.10em]`}>{p.title}</h3>

              <p className="text-white/75 text-[0.98rem] mt-4 leading-[1.9]">{p.metaCopy}</p>
              <p className="text-white/55 text-[0.95rem] mt-3 tracking-[0.08em]">{p.sub}</p>
              <div className="mt-7 w-[120px] h-[1px] bg-white/18" />
            </Reveal>

            <Reveal delayMs={120}>
              <p className="mt-7 text-[0.95rem] text-white/78 leading-[1.95] whitespace-pre-line">{p.detail}</p>
            </Reveal>

            <Reveal delayMs={180}>
              <p className="mt-7 text-[0.85rem] text-white/45 leading-relaxed">
                <span className="text-white/35 tracking-[0.14em]">INGREDIENTS</span>
                <br />
                <span className="text-white/65">{p.ingredients}</span>
              </p>
            </Reveal>

            <Reveal delayMs={240}>
              <button
                onClick={() => addToCart(p)}
                className="
                  group mt-7 w-full py-3.5
                  rounded-[14px] border border-white/18 bg-white/6 backdrop-blur-[6px]
                  text-white/85 text-[0.9rem] tracking-[0.22em]
                  hover:bg-white/10 hover:border-white/28 transition-all
                "
              >
                <span className="relative inline-flex items-center justify-center w-full">
                  PURCHASE
                  <span
                    aria-hidden="true"
                    className="
                      ml-3 text-white/55 transition-all
                      group-hover:translate-x-[6px] group-hover:text-white/80
                    "
                  >
                    →
                  </span>
                </span>
              </button>
            </Reveal>
          </div>
        </div>
      ))}

      {/* CART MODAL */}
      <CartModal
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        cartCount={cartCount}
        cartTotal={cartTotal}
        changeQty={changeQty}
        removeItem={removeItem}
      />
    </section>
  );
}
