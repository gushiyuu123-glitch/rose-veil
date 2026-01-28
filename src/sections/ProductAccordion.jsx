// src/sections/ProductOverlayWide.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";
import "../styles/movie-hover.css";

/* ============================================================
   UI TOKENS（Dior/CHANEL寄せ：黒×白×0.18線）
============================================================ */
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
  t70: "text-white/70",
  t55: "text-white/55",
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

const products = [
  {
    key: "white",
    title: "ROSE WHITE",
    metaCopy: "空気のように軽い指通り。揺れるたび、白光の甘さがふわりとほどける。",
    sub: "透明感の甘さ × 軽い仕上がり",
    image: "rose-white.png",
    detail: `ホワイトローズとホワイトムスクを
ブレンドした軽質感処方。
根元はふんわり、毛先はさらり。
重さゼロのまとまり感。

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
    metaCopy: "体温でふわりと開く深紅の甘さ。しっとり艶が続き、夜まで上品に香る",
    sub: "深紅の甘さ × しっとり上品",
    image: "rose-veil.png",
    detail: `ローズアブソリュートとホホバで
深い艶膜を形成。
体温で香りがふわりと開き、
上品なまとまりが続く。

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
    metaCopy: "静かな潤いが続き、揺れるたび青の透明感がそっと立ちのぼる。",
    sub: "青の静けさ × 凛とした潤い",
    image: "rose-blue.png",
    detail: `青みローズとベルガモットが
夜の静けさを演出。
重くならず透明感のある潤いが
長時間続く処方。

● 仕上がり：潤い・みずみずしさ
● 香り持続：〜7時間
● 容量：300ml`,
    ingredients: "ローズエキス / ベルガモット / マリンミネラル",
    price: 2580,
    priceLabel: "¥2,580（税込）",
    grad: "blue",
  },
];

/* ============================================================
   ◆ 右側の縦グラデ — 商品別
============================================================ */
const rightGrad = {
  blue: `linear-gradient(to bottom, rgba(10,20,40,0.30), rgba(10,20,40,0.14), rgba(10,20,40,0.00))`,
  veil: `linear-gradient(to bottom, rgba(80,0,20,0.34), rgba(80,0,20,0.16), rgba(80,0,20,0.00))`,
  white: `linear-gradient(to bottom, rgba(0,0,0,0.32), rgba(0,0,0,0.22), rgba(0,0,0,0.10))`,
};

function yen(n) {
  return `¥${Number(n || 0).toLocaleString("ja-JP")}`;
}

/* ============================================================
   Reveal（上質フェード：呼吸）
============================================================ */
function useInViewOnce({ rootMargin = "0px 0px -12% 0px" } = {}) {
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
        shown ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-[14px] blur-[6px]",
        className,
      ].join(" ")}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   Premium Underline Button（横ライン伸び：Dior寄せ）
============================================================ */
function UnderlineAction({ children, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group relative inline-flex items-center",
        UI.trackHi,
        "text-[0.92rem] font-light",
        "text-white/90 hover:text-white",
        "transition-colors",
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
            bg-white/40
            transition-all duration-500 ease-out
            group-hover:w-[132px]
            group-hover:bg-white/70
          "
        />
      </span>
      <span
        aria-hidden="true"
        className="
          ml-4 text-white/55
          transition-transform duration-500 ease-out
          group-hover:translate-x-[6px]
          group-hover:text-white/80
        "
      >
        →
      </span>
    </button>
  );
}

/* ============================================================
   CART MODAL（PC用：×とCARTが絶対に被らない）
============================================================ */
function CartModal({ open, onClose, cart, cartCount, cartTotal, changeQty, removeItem }) {
  // scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Esc close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={["fixed inset-0 z-[200]", open ? "pointer-events-auto" : "pointer-events-none"].join(" ")}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={[
          "absolute inset-0",
          "transition-all duration-700 ease-out",
          open ? "opacity-100" : "opacity-0",
          "bg-black/55 backdrop-blur-[6px]",
        ].join(" ")}
      />

      {/* Panel */}
      <div
        className={[
          "absolute right-0 top-0 h-full",
          "w-[460px] max-w-[92vw]",
          UI.panel,
          "border-l border-white/18",
          "shadow-[0_0_70px_rgba(0,0,0,0.55)]",
          "transition-transform duration-700 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-7 pt-7 pb-5 border-b border-white/18">
            <div className="flex items-start justify-between">
              <div>
                <Reveal delayMs={40}>
                  <div className={[UI.t85, UI.trackHi, "text-[0.92rem]"].join(" ")}>CART</div>
                </Reveal>
                <Reveal delayMs={110}>
                  <div className={[UI.t45, UI.trackMd, "text-[0.78rem] mt-2"].join(" ")}>
                    {cartCount > 0 ? `${cartCount} ITEMS` : `EMPTY`}
                  </div>
                </Reveal>
              </div>

              {/* ✅ ×は「固定サイズ」＋「余白」＋「z」確保（絶対に埋もれない） */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close cart"
                className="
                  group relative
                  mt-[2px]
                  w-[36px] h-[36px]
                  flex items-center justify-center
                  rounded-full
                  border border-white/14
                  bg-white/4 backdrop-blur-[4px]
                  text-white/75
                  transition-all duration-500 ease-out
                  hover:border-white/28 hover:bg-white/9 hover:text-white
                "
              >
                <span
                  className="
                    block text-[1.05rem]
                    leading-none
                    transition-transform duration-500
                    group-hover:scale-[1.12]
                  "
                >
                  ✕
                </span>
                <span
                  aria-hidden="true"
                  className="
                    absolute inset-0 rounded-full
                    bg-white/0
                    group-hover:bg-white/6
                    transition-all duration-500 ease-out
                  "
                />
              </button>
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-auto px-7 py-6">
            {cart.length === 0 ? (
              <Reveal delayMs={120}>
                <div className="pt-10 text-white/55 text-[0.92rem] leading-relaxed">
                  カートは空です。<br />
                  気になる香りを追加してください。
                </div>
              </Reveal>
            ) : (
              <div className="space-y-5">
                {cart.map((it, idx) => (
                  <Reveal key={it.key} delayMs={120 + idx * 60}>
                    <div className={[UI.r14, "p-4", UI.line18, "bg-white/5"].join(" ")}>
                      <div className="flex gap-4 items-start">
                        <div className={[UI.r12, "w-[70px] h-[70px] overflow-hidden shrink-0", UI.line18].join(" ")}>
                          <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className={[UI.t85, "text-[0.95rem] tracking-[0.08em] truncate"].join(" ")}>
                            {it.title}
                          </div>
                          <div className="mt-1 text-white/45 text-[0.78rem] tracking-[0.10em] leading-snug">{it.sub}</div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="text-white/80 text-[0.9rem] tracking-[0.06em]">{yen(it.price)}</div>
                            <button
                              type="button"
                              onClick={() => removeItem(it.key)}
                              className="text-white/35 hover:text-white/75 transition text-[0.78rem] tracking-[0.16em]"
                            >
                              REMOVE
                            </button>
                          </div>

                          {/* Qty */}
                          <div className="mt-4 flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => changeQty(it.key, -1)}
                              className={["w-9 h-9", UI.r10, UI.line18, "bg-white/5", "text-white/70 hover:text-white", "hover:border-white/28 transition"].join(" ")}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>

                            <div className="text-white/80 tracking-[0.12em] text-[0.9rem] w-8 text-center">{it.qty}</div>

                            <button
                              type="button"
                              onClick={() => changeQty(it.key, +1)}
                              className={["w-9 h-9", UI.r10, UI.line18, "bg-white/5", "text-white/70 hover:text-white", "hover:border-white/28 transition"].join(" ")}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>

                            <div className="ml-auto text-white/65 text-[0.86rem] tracking-[0.08em]">{yen(it.price * it.qty)}</div>
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
                <div className={[UI.t55, UI.trackHi, "text-[0.82rem]"].join(" ")}>TOTAL</div>
                <div className="text-white/92 text-[1.06rem] tracking-[0.10em] font-light">{yen(cartTotal)}</div>
              </div>
            </Reveal>

            <Reveal delayMs={200}>
              <button
                type="button"
                disabled={cart.length === 0}
                className={[
                  "group relative mt-5 w-full py-3",
                  UI.r14,
                  UI.trackHi,
                  "text-[0.9rem] font-light",
                  UI.line18,
                  "transition-all duration-500 ease-out",
                  cart.length === 0 ? "text-white/25 bg-white/5 cursor-not-allowed" : "text-white/90 bg-white/7 hover:bg-white/9 hover:border-white/28",
                ].join(" ")}
              >
                <span className="relative inline-block">
                  CHECKOUT
                  <span
                    aria-hidden="true"
                    className={[
                      "absolute left-1/2 -translate-x-1/2 -bottom-[6px]",
                      "h-[1px] w-[56px]",
                      "bg-white/30",
                      "transition-all duration-500 ease-out",
                      cart.length === 0 ? "" : "group-hover:w-[120px] group-hover:bg-white/60",
                    ].join(" ")}
                  />
                </span>
              </button>
            </Reveal>

            <Reveal delayMs={260}>
              <div className="mt-4 text-white/30 text-[0.74rem] tracking-[0.10em] leading-relaxed">
                ※ 決済導線は後でStripe等に接続できます
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN（PC ONLY）
============================================================ */
export default function ProductOverlayWide() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]); // {key,title,price,qty,image,sub}

  const cartCount = useMemo(() => cart.reduce((sum, it) => sum + it.qty, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, it) => sum + it.price * it.qty, 0), [cart]);

  function addToCart(p) {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.key === p.key);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { key: p.key, title: p.title, sub: p.sub, price: p.price, image: p.image, qty: 1 }];
    });
    setIsCartOpen(true);
  }

  function changeQty(key, delta) {
    setCart((prev) =>
      prev
        .map((it) => (it.key === key ? { ...it, qty: it.qty + delta } : it))
        .filter((it) => it.qty > 0)
    );
  }

  function removeItem(key) {
    setCart((prev) => prev.filter((it) => it.key !== key));
  }

  return (
    <section id="products" className="w-full relative overflow-hidden bg-black">
      {/* ✅ PC: Cart Triggerは “常に最前面” だが、モーダル(open)時は自動で操作不能にして衝突ゼロ */}
      <div className={["pointer-events-auto fixed top-4 right-6 z-[120]", isCartOpen ? "pointer-events-none opacity-0" : "opacity-100"].join(" ")}>
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="
            group relative px-5 py-3
            flex items-center gap-3
            rounded-[12px]
            bg-white/3 backdrop-blur-[4px]
            border border-white/12
            text-white/85
            text-[0.88rem] tracking-[0.22em]
            transition-all duration-500 ease-out
            hover:border-white/25 hover:bg-white/8
          "
        >
          <ShoppingBag size={18} strokeWidth={1.35} className="opacity-85 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="opacity-90 group-hover:opacity-100 transition-opacity">CART</span>
          {cartCount > 0 && <span className="text-white/60 text-[0.75rem] tracking-[0.10em]">{cartCount}</span>}

          <span
            aria-hidden="true"
            className="
              absolute left-4 right-4 -bottom-[6px]
              h-[1px] w-[26%]
              bg-white/30
              transition-all duration-500 ease-out
              group-hover:w-[70%]
              group-hover:bg-white/55
            "
          />
        </button>
      </div>

      {products.map((p, i) => (
        <div key={p.key} id={`product-${p.key}`} className="relative w-full border-b border-white/10">
          {/* ===== PHOTO AREA ===== */}
          <div className="relative w-full h-[112vh] overflow-hidden">
            <div className="cinema-hover w-full h-full">
              <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover object-center" />
              <div className="cinema-shadow" />

              {/* pin light */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(600px 420px at 78% 22%, rgba(255,255,255,0.12), rgba(255,255,255,0.04) 42%, rgba(0,0,0,0) 70%)",
                }}
              />

              {/* 3D edge / vignette */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.20), rgba(0,0,0,0.02) 32%, rgba(0,0,0,0.22))",
                  mixBlendMode: "multiply",
                }}
              />
            </div>

            {/* right vertical grad veil */}
            <div className="absolute inset-y-0 right-0 w-[30%] pointer-events-none backdrop-blur-[3px]" style={{ background: rightGrad[p.grad] }} />

            {/* OVERLAY */}
            <div
              className="
                absolute inset-0
                grid grid-cols-[50%_35%]
                gap-[8vw]
                px-[6vw]
                place-content-center
                pointer-events-none
              "
            >
              {/* LEFT */}
              <Reveal delayMs={80 + i * 80} className="relative text-left translate-x-[1.5vw]">
                <h3 className={`${UI.t95} ${titleColor[p.key]} text-[2.8rem] font-light tracking-[0.02em]`}>{p.title}</h3>

                {p.key === "white" && (
                  <div
                    aria-hidden="true"
                    className="
                      absolute -left-[6vw] -top-[4vh]
                      w-[38vw] h-[22vh]
                      rounded-[22px]
                      backdrop-blur-[14px]
                      bg-black/18
                      mix-blend-normal
                      pointer-events-none
                      z-[-1]
                    "
                  />
                )}

                <p className="text-white/75 text-[1.05rem] mt-4 leading-relaxed tracking-[0.02em]">{p.metaCopy}</p>
                <p className="text-white/80 text-[1.15rem] mt-3 tracking-[0.015em]">{p.sub}</p>
                <div className="mt-6 w-[180px] h-[1px] bg-white/20" />
              </Reveal>

              {/* RIGHT */}
              <div className="relative text-left pl-[17vw] translate-x-[2vw]">
                <Reveal delayMs={160 + i * 80}>
                  <p className="text-white/95 text-[1.08rem] leading-[1.95] whitespace-pre-line">{p.detail}</p>
                </Reveal>

                <Reveal delayMs={240 + i * 80}>
                  <p className="mt-6 text-[0.95rem] text-white/70 leading-relaxed">
                    <span className="text-white/45 tracking-[0.12em]">INGREDIENTS</span>
                    <br />
                    {p.ingredients}
                  </p>
                </Reveal>

                <Reveal delayMs={310 + i * 80}>
                  <p className="mt-7 text-[1.3rem] text-white/95 tracking-wide font-light">{p.priceLabel}</p>
                </Reveal>

                <Reveal delayMs={380 + i * 80} className="pointer-events-auto mt-6">
                  <UnderlineAction onClick={() => addToCart(p)}>PURCHASE</UnderlineAction>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      ))}

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
