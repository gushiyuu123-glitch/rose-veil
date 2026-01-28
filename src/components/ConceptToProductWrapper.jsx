// src/components/ConceptToProductWrapper.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ConceptToProductWrapper({
  children,
  petals = ["/petals/petal-2.png"],
  count = 7,                 // ← 減らす（高級感MAX）
  density = "luxuryPlus",
}) {
  const wrapRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const layer = layerRef.current;
    if (!wrap || !layer) return;

    layer.innerHTML = "";

    /* ============================================================
       ✦ LUXURY++ — ハイブランドCMの動きにした特化モード
    ============================================================ */
    const dens = {
      luxuryPlus: {
        spawn: 3.8,         // ← 落下速度：極遅（40〜65秒級）
        wind: 70,           // ← 左右揺れ幅：大きい（上品な広がり）
        rot: 60,            // ← ゆっくり深い回転（花びらの重さ再現）
        blurMax: 1.6,
        op: [0.22, 0.32],   // ← 濃度を少し濃く（“存在する”感じ）
      },
    }[density];

    const W = () => wrap.getBoundingClientRect().width;
    const H = () => wrap.getBoundingClientRect().height;

    /* ============================================================
       ✦ 花びら生成（大きいサイズ：存在感）
    ============================================================ */
    const nodes = Array.from({ length: count }).map((_, i) => {
      const img = document.createElement("img");
      img.src = petals[i % petals.length];
      img.className = "rose-petal";
      img.style.position = "absolute";

      // ✦ サイズかなり大きくする（55〜110px）
      img.style.width = `${gsap.utils.random(55, 110)}px`;

      img.style.opacity = gsap.utils.random(dens.op[0], dens.op[1]);
      img.style.filter = `blur(${gsap.utils.random(0.1, dens.blurMax)}px)`;
      img.style.mixBlendMode = "screen";
      img.style.pointerEvents = "none";
      img.style.userSelect = "none";
      img.style.willChange = "transform, opacity";

      layer.appendChild(img);
      return img;
    });

    /* ============================================================
       ✦ アニメーション定義（超ゆっくり・広揺れ・重い落下）
    ============================================================ */
    const animateOne = (el, delay = 0) => {
      const startX = gsap.utils.random(0.05, 0.95) * W();
      const startY = gsap.utils.random(-0.32, -0.12) * H();
      const endY = H() + gsap.utils.random(250, 420);

      gsap.set(el, {
        x: startX,
        y: startY,
        rotation: gsap.utils.random(-18, 18),
        scale: gsap.utils.random(0.95, 1.25),
      });

      // ✦ 落下（超スロー）
      gsap.to(el, {
        y: endY,
        duration: gsap.utils.random(40, 65) * dens.spawn, // ← ここが命
        ease: "none",
        delay,
        onComplete: () => animateOne(el, 0),
      });

      // ✦ 左右の大きな呼吸揺れ
      gsap.to(el, {
        x: startX + gsap.utils.random(-dens.wind, dens.wind),
        duration: gsap.utils.random(11, 18),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay,
      });

      // ✦ ゆっくり深い回転
      gsap.to(el, {
        rotation: `+=${gsap.utils.random(-dens.rot, dens.rot)}`,
        duration: gsap.utils.random(18, 26),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay,
      });
    };

    // ✦ 生成タイミングもゆっくりに
    nodes.forEach((el, i) => animateOne(el, i * 0.85));

    /* ============================================================
       スクロールで出現
    ============================================================ */
    ScrollTrigger.create({
      trigger: wrap,
      start: "top 100%",
      end: "bottom 5%",
      onEnter: () => gsap.to(layer, { opacity: 1, duration: 2.4 }),
      onLeave: () => gsap.to(layer, { opacity: 0, duration: 1.4 }),
      onEnterBack: () => gsap.to(layer, { opacity: 1, duration: 2.4 }),
      onLeaveBack: () => gsap.to(layer, { opacity: 0, duration: 1.4 }),
    });
  }, [petals, count, density]);

  return (
    <section ref={wrapRef} className="relative w-full overflow-hidden">
      {/* 落下レイヤー */}
      <div
        ref={layerRef}
        className="absolute inset-0 z-[80] pointer-events-none opacity-0"
      />

      {/* 内容（ConceptSection & ProductAccordion） */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
