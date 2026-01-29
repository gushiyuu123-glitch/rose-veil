// src/sections/Hero.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import HeaderRight from "../components/HeaderRight";
import "../styles/hero.css";

export default function Hero() {
  const heroRef = useRef(null);

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
        { opacity: 0, y: 12, filter: "blur(7px)", letterSpacing: "0.16em" },
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

  return (
    <section ref={heroRef} className="hero-section">

      {/* ナビ吸着 */}
      <HeaderRight />

      {/* 背景レイヤー類（残す） */}
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

        {/* ⛔ 花びら（canvas）は削除 */}
      </div>
    </section>
  );
}
