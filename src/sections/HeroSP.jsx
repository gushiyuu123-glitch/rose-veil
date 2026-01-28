// src/sections/HeroSP.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/hero-sp.css";

export default function HeroSP() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  /* ============================================================
      Copy Animation（SP専用：レイアウトを壊さない安全版）
  ============================================================ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 共通初期セット
      gsap.set(".sp-hero-title, .sp-hero-copy > *", {
        willChange: "opacity, transform, filter",
      });

      // Label & Sub
      gsap.from(".sp-hero-copy > :not(.sp-hero-title)", {
        opacity: 0,
        y: 16,
        filter: "blur(4px)",
        duration: 1.1,
        ease: "power2.out",
        delay: 0.05,
        stagger: 0.12,
      });

      // ★ Title（SP専用：letterSpacingを動かさない）
      gsap.fromTo(
        ".sp-hero-title",
        {
          opacity: 0,
          y: 10,
          scale: 0.96,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.28,
          ease: "power2.out",
          delay: 0.10,
        }
      );

      // Luxury / Scent の呼吸
      gsap.to(".sp-word-luxury, .sp-word-scent", {
        opacity: 0.95,
        duration: 3.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* ============================================================
      Particle Canvas（下層ミスト：最終版）
  ============================================================ */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let W = canvas.width;
    let H = canvas.height;

    const particles = Array.from({ length: 14 }).map(() => ({
      // 左寄せ（黄金比）
      x: W * 0.37 + (Math.random() * 50 - 25),

      // 下層（92〜96%）
      y: H * (0.92 + Math.random() * 0.04),

      // 極小粒
      r: Math.random() * 0.7 + 0.7,

      // 香りの膜色
      alpha: Math.random() * 0.10 + 0.06,

      dx: (Math.random() - 0.5) * 0.02,
      dy: (Math.random() - 0.5) * 0.015,

      phase: Math.random() * Math.PI * 2,
    }));

    function draw(t = 0) {
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        const breath = Math.sin(t * 0.00035 + p.phase) * 0.35;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 225, 238, ${p.alpha})`;
        ctx.arc(p.x, p.y + breath, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        p.dx += (Math.random() - 0.5) * 0.001;
        p.dy += (Math.random() - 0.5) * 0.001;
      });

      requestAnimationFrame(draw);
    }
    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <section id="hero" ref={heroRef} className="sp-hero-section">
      {/* 背景 */}
      <div className="sp-hero-bg" />
      <div className="sp-hero-shadow" />
      <div className="sp-hero-veil" />

      {/* 粒子 */}
      <div className="sp-hero-particles" />
      <canvas ref={canvasRef} className="sp-hero-canvas" />

      {/* コピー */}
      <div className="sp-hero-copy">
        <p className="sp-hero-label">ROSE VEIL — FRAGRANCE SHAMPOO</p>

        <h1 className="sp-hero-title">
          THREE COLORS OF LUXURY
        </h1>

        <p className="sp-hero-sub">
          三色の“<span className="sp-word-luxury">贅沢</span>”が、
          <span className="sp-word-scent">香り</span>から始まる。
        </p>
      </div>
    </section>
  );
}
