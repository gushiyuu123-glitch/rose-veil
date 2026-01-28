// src/components/HeaderRight.jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/header-right.css";

export default function HeaderRight() {
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector;

      // 初期値を明示（中途半端バグの根を潰す）
      gsap.set(q(".vr-nav-item, .vr-line, .vr-dot"), {
        opacity: 0,
        x: 24,
      });

      gsap.to(q(".vr-nav-item, .vr-line, .vr-dot"), {
        opacity: 1,
        x: 0,
        duration: 1.25,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.15,
        overwrite: "auto",
        clearProps: "opacity,transform",
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
 <nav ref={navRef} className="vr-nav fixed-nav">



<a className="vr-nav-item" href="#concept">CONCEPT</a>
<a className="vr-nav-item" href="#products">PRODUCTS</a>

<a className="vr-nav-item" href="#purchase-guide">LAST VEIL</a>

<a className="vr-nav-item" href="#contact">CONTACT</a>


</nav>

  );
}
