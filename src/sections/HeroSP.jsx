// src/sections/HeroSP.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/hero-sp.css";

export default function HeroSP() {
  const heroRef = useRef(null);

  /* ============================================================
      Copy Animation（SP専用：レイアウトを壊さない安全版）
  ============================================================ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".sp-hero-title, .sp-hero-copy > *", {
        willChange: "opacity, transform, filter",
      });

      gsap.from(".sp-hero-copy > :not(.sp-hero-title)", {
        opacity: 0,
        y: 16,
        filter: "blur(4px)",
        duration: 1.1,
        ease: "power2.out",
        delay: 0.05,
        stagger: 0.12,
      });

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

  return (
    <section id="hero" ref={heroRef} className="sp-hero-section">

      {/* 背景膜・影（残す） */}
      <div className="sp-hero-bg" />
      <div className="sp-hero-shadow" />
      <div className="sp-hero-veil" />

      {/* ❌ 粒子 演出は削除 */}
      {/* <div className="sp-hero-particles" /> */}
      {/* <canvas ref={canvasRef} className="sp-hero-canvas" /> */}

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
