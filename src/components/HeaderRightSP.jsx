// src/components/HeaderRightSP.jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/header-right-sp.css";

export default function HeaderRightSP() {
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector;

      gsap.set(q(".sp-nav-item"), {
        opacity: 0,
        y: 12,
      });

      gsap.to(q(".sp-nav-item"), {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.18,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="
        sp-nav
        fixed bottom-0 left-1/2 -translate-x-1/2
        w-full max-w-[520px]
        bg-[rgba(0,0,0,0.72)]
        backdrop-blur-[14px]
        border-t border-white/10
        flex justify-around items-center
        py-3
        z-[999]
      "
    >
      <a className="sp-nav-item text-white/70 text-[0.75rem] tracking-[0.14em]" href="#concept">
        CONCEPT
      </a>

      <a className="sp-nav-item text-white/70 text-[0.75rem] tracking-[0.14em]" href="#products">
        PRODUCTS
      </a>

      <a className="sp-nav-item text-white/80 text-[0.75rem] tracking-[0.18em]" href="#purchase-guide">
        LAST VEIL
      </a>

      <a className="sp-nav-item text-white/70 text-[0.75rem] tracking-[0.14em]" href="#contact">
        CONTACT
      </a>
    </nav>
  );
}
