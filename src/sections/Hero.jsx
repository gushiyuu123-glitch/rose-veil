// src/sections/Hero.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import HeaderRight from "../components/HeaderRight";
import "../styles/hero.css";

export default function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  /* ========================
     Hero Copy Animation
  ======================== */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-copy > :not(.hero-title)", {
        opacity: 0,
        y: 18,
        filter: "blur(4px)",
        duration: 1.25,
        ease: "power2.out",
        delay: 0.06,
        stagger: 0.14,
      });

      gsap.fromTo(
        ".hero-title",
        {
          opacity: 0,
          y: 12,
          filter: "blur(7px)",
          letterSpacing: "0.16em",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          letterSpacing: "0.12em",
          duration: 1.45,
          ease: "power2.out",
          delay: 0.16,
        }
      );

      gsap.to(".word-scent, .word-luxury", {
        opacity: 0.96,
        filter: "blur(0.25px)",
        duration: 2.9,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      gsap.to(".hero-label", {
        duration: 4.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",

        onUpdate() {
          const el = document.querySelector(".hero-label");
          if (!el) return;

          const t = this.ratio;
          const brightness = 1.02 + t * 0.003;
          const opacity = 0.86 + t * 0.015;

          el.style.opacity = opacity.toFixed(3);
          el.style.filter = `brightness(${brightness}) blur(0.22px)`;
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* ========================
     Canvas Rose Particles
  ======================== */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const W = canvas.width;
    const H = canvas.height;

    const particles = Array.from({ length: 18 }).map(() => ({
      x: W * 0.30 + (Math.random() * 40 - 20),
      y: H * 0.30 + (Math.random() * 40 - 20),
      r: Math.random() * 1.6 + 0.8,
      alpha: Math.random() * 0.18 + 0.10,
      dx: (Math.random() - 0.5) * 0.08,
      dy: (Math.random() - 0.5) * 0.06,
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
        p.dx += (Math.random() - 0.5) * 0.0035;
        p.dy += (Math.random() - 0.5) * 0.0035;
      });

      requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero-section">

      {/* ← ★ ナビを Hero 内に吸着（absolute） */}
      <HeaderRight />

      <div className="hero-bg" />
      <div className="hero-shadow-right" />
      <div className="hero-lux-film" />
      <div className="hero-veil" />
      <div className="hero-particles" />
<div className="hero-nav-mask"></div>

      <div className="hero-copy">
        <p className="hero-label">ROSE VEIL — FRAGRANCE SHAMPOO</p>

        <h1 className="hero-title">THREE COLORS OF LUXURY</h1>

        <p className="hero-sub">
          三色の“<span className="word-luxury">贅沢</span>”が、
          <span className="word-scent">香り</span>から始まる。
        </p>

        <canvas ref={canvasRef} className="hero-particle-canvas"></canvas>
      </div>
    </section>
  );
}
