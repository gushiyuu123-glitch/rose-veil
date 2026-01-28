// src/sections/HeroSP.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/hero-sp.css";

export default function HeroSP() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  /* ============================================================
      Copy Animation
  ============================================================ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sp-hero-copy > :not(.sp-hero-title)", {
        opacity: 0,
        y: 18,
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
          y: 12,
          filter: "blur(7px)",
          letterSpacing: "0.18em",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          letterSpacing: "0.12em",
          duration: 1.35,
          ease: "power2.out",
          delay: 0.14,
        }
      );

      gsap.to(".sp-word-luxury, .sp-word-scent", {
        opacity: 0.95,
        duration: 3.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* ============================================================
      Particle Canvas
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

    const particles = Array.from({ length: 12 }).map(() => ({
      x: W * 0.5 + (Math.random() * 80 - 40),
      y: H * 0.45 + (Math.random() * 40 - 20),
      r: Math.random() * 1.4 + 0.6,
      alpha: Math.random() * 0.16 + 0.10,
      dx: (Math.random() - 0.5) * 0.06,
      dy: (Math.random() - 0.5) * 0.05,
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 220, 240, ${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy * 0.6;
        p.dx += (Math.random() - 0.5) * 0.003;
        p.dy += (Math.random() - 0.5) * 0.003;
      });

      requestAnimationFrame(draw);
    }
    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <section id="hero" ref={heroRef} className="sp-hero-section">

      {/* 背景・光膜・影 */}
      <div className="sp-hero-bg" />
      <div className="sp-hero-shadow" />
      <div className="sp-hero-veil" />

      {/* 粒子 */}
      <div className="sp-hero-particles" />
      <canvas ref={canvasRef} className="sp-hero-canvas" />

      {/* コピー */}
      <div className="sp-hero-copy">
        <p className="sp-hero-label">ROSE VEIL — FRAGRANCE SHAMPOO</p>

        <h1 className="sp-hero-title">THREE COLORS OF LUXURY</h1>

        <p className="sp-hero-sub">
          三色の“<span className="sp-word-luxury">贅沢</span>”が、
          <span className="sp-word-scent">香り</span>から始まる。
        </p>
      </div>
    </section>
  );
}
