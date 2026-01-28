// src/App.jsx
import Hero from "./sections/Hero";
import HeroSP from "./sections/HeroSP";

import Philosophy from "./sections/Philosophy";        // ブランドの光（世界観の核）
import PhilosophySP from "./sections/PhilosophySP";

import ScentPalette from "./sections/ScentPalette";     // 香り理解（コンセプト役）
import ScentPaletteSP from "./sections/ScentPaletteSP"; 

import ProductAccordion from "./sections/ProductAccordion"; // 商品（答え合わせ）
import ProductOverlayWide_sp from "./sections/ProductOverlayWide_sp"; 

import IngredientsSection from "./sections/IngredientsSection"; // 科学・根拠
import IngredientsSection_sp from "./sections/IngredientsSection_sp";

import HowItFeels from "./sections/HowItFeels";         // 体験の質感（自分事化）
import HowItFeels_sp from "./sections/HowItFeels_sp";

import ConceptSection from "./sections/ConceptSection"; // ※エンドロール側に配置
import ConceptSection_sp from "./sections/ConceptSection_sp";

import BrandLetter from "./sections/BrandLetter";       // ブランド人格（余韻）
import BrandLetter_sp from "./sections/BrandLetter_sp"; 

import QASection from "./sections/QASection";           // 不安解消
import QASection_sp from "./sections/QASection_sp"; 

import Footer from "./sections/Footer";                 // 終幕（静けさ）
import Footer_sp from "./sections/Footer_sp";  

import MinimalHeader from "./sections/MinimalHeader";
import MinimalHeader_sp from "./sections/MinimalHeader_sp";
export default function App() {
  return (
    <main className="w-full bg-black text-white">
      <div className="hidden lg:block">
      <MinimalHeader />
</div>
 <div className="block lg:hidden">
        <MinimalHeader_sp />
      </div>
      {/* ===========================
          HERO（PC/SP 分離）
      ============================ */}
      <div className="hidden lg:block">
        <Hero />
      </div>
      <div className="block lg:hidden">
        <HeroSP />
      </div>

      {/* ===========================
          ① ブランドの光（世界観の核）
      ============================ */}
      <div className="hidden lg:block">
      <Philosophy />
</div>
 <div className="block lg:hidden">
        <PhilosophySP />
      </div>
      {/* ===========================
          ② 香り理解（＝コンセプト代行）
          → ScentPalette は構造的に ConceptSection の役割を果たすため、
             “Hero → Philosophy の直後” が正しい位置。
      ============================ */}
       <div className="hidden lg:block">
      <ScentPalette />
</div>
 <div className="block lg:hidden">
  <ScentPaletteSP />
  </div>
      {/* ===========================
          ③ 商品の答え合わせ
      ============================ */}
      <div className="hidden lg:block">
      <ProductAccordion />
</div>
<div className="block lg:hidden">
  <ProductOverlayWide_sp />
  </div>
      {/* ===========================
          ④ 成分（科学）＝ 信頼の根拠
      ============================ */}
       <div className="hidden lg:block">
      <IngredientsSection />
      </div>
      <div className="block lg:hidden">
        <IngredientsSection_sp />
        </div>
      {/* ===========================
          ⑤ 体験の翻訳（How It Feels）
             → 自分事化フェーズ
      ============================ */}
      <div className="hidden lg:block">
      <HowItFeels />
</div>
     <div className="block lg:hidden">
        <HowItFeels_sp />
        </div>

      {/* ===========================
          ⑥ ConceptSection（締め版）
             → “エンドロールの余韻” に配置
      ============================ */}
      <div className="hidden lg:block">
      <ConceptSection />
</div>
<div className="block lg:hidden">
        <ConceptSection_sp />
        </div>
      {/* ===========================
          ⑦ Brand Letter（ブランド人格）
      ============================ */}
       <div className="hidden lg:block">
      <BrandLetter />
</div>
<div className="block lg:hidden">
        <BrandLetter_sp />
        </div>
      {/* ===========================
          ⑨ QA（不安解消）
      ============================ */}
       <div className="hidden lg:block">
      <QASection />
</div>
<div className="block lg:hidden">
        <QASection_sp />
        </div>
      {/* ===========================
          ⑩ FOOTER（静かな終幕）
      ============================ */}
       <div className="hidden lg:block">
      <Footer />
      </div>
      <div className="block lg:hidden">
        <Footer_sp />
        </div>
    </main>
  );
}
