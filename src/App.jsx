// ─── CardOpen.jsx ────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from "react";
import AdminPanel from "./AdminPanel";

const gold = "#C9A84C";
const goldLight = "#F0D080";
const goldDark = "#8B6914";
const cream = "#FAF6EE";
const darkText = "#2C1A0E";
const mutedText = "#7A5C3A";

const cardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Noto+Serif+Sinhala:wght@300;400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .card-scene {
    min-height: 100vh;
    background: radial-gradient(ellipse at center, #3D2010 0%, #1A0A04 100%);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    position: relative; overflow: hidden;
  }
  .card-scene.fade-out { animation: sceneFade 0.6s ease forwards; }
  @keyframes sceneFade { to { opacity: 0; } }

  .wrap {
    position: relative; width: 300px; height: 420px;
    perspective: 1200px;
  }

  .inside {
    position: absolute; inset: 0;
    background: linear-gradient(160deg, #FFFBF0 0%, #FAF0D0 100%);
    border: 1px solid rgba(201,168,76,0.5);
    border-radius: 2px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 6px; padding: 2rem; text-align: center;
  }
  .inside-names {
    font-family: 'Great Vibes', cursive;
    font-size: 2.8rem; color: ${darkText}; line-height: 1.2;
  }
  .inside-amp {
    font-family: 'Great Vibes', cursive;
    font-size: 2rem; color: ${gold}; display: block; margin: 2px 0;
  }
  .inside-date {
    font-family: 'Noto Serif Sinhala', serif;
    font-size: 0.75rem; letter-spacing: 4px; color: ${mutedText}; margin-top: 10px;
  }
  .inside-divider { display: flex; align-items: center; gap: 8px; width: 80%; margin: 6px 0; }
  .inside-divider-line { flex: 1; height: 1px; background: ${gold}; opacity: 0.4; }
  .inside-divider-dot  { width: 5px; height: 5px; background: ${gold}; transform: rotate(45deg); }

  .door {
    position: absolute; top: 0; height: 100%; width: 50%;
    background: linear-gradient(160deg, #3D2010 0%, #1A0A04 100%);
    transform-style: preserve-3d;
    transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer; overflow: hidden; z-index: 2;
  }
  .door.left  { left: 0;  transform-origin: left center;  border-radius: 2px 0 0 2px; }
  .door.right { right: 0; transform-origin: right center; border-radius: 0 2px 2px 0; }
  .door.left.open  { transform: rotateY(-110deg); }
  .door.right.open { transform: rotateY(110deg); }

  .door-inner {
    position: absolute; inset: 0; margin: 12px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    border: 1px solid rgba(201,168,76,0.25);
  }
  .door.left  .door-inner { border-right: none; }
  .door.right .door-inner { border-left: none; }

  .door-name { font-family: 'Great Vibes', cursive; font-size: 2rem; text-align: center; }
  .door.left  .door-name { color: #f5e6c0; }
  .door.right .door-name { color: ${gold}; }

  .seam {
    position: absolute; top: 0; left: 50%; z-index: 3;
    width: 1px; height: 100%;
    background: rgba(201,168,76,0.2); pointer-events: none;
  }
  .tap-hint {
    position: absolute; bottom: 18px; left: 50%;
    transform: translateX(-50%);
    font-family: 'Noto Serif Sinhala', serif;
    font-size: 0.65rem; letter-spacing: 2px;
    color: rgba(245,230,192,0.5); white-space: nowrap; z-index: 4;
    animation: hintPulse 2s ease-in-out infinite;
  }
  @keyframes hintPulse { 0%,100%{opacity:0.3} 50%{opacity:1} }
`;

function CardOpen({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const [fading, setFading] = useState(false);

  const handleClick = () => {
    if (open) { setOpen(false); return; }
    setOpen(true);
    // Wait 1.5 s after doors open → fade out → navigate
    setTimeout(() => {
      setFading(true);
      setTimeout(() => onNavigate(), 600);
    }, 1500);
  };

  return (
    <div className={`card-scene${fading ? " fade-out" : ""}`}>
      <style>{cardStyles}</style>
      <div className="wrap" onClick={handleClick}>
        <div className="inside">
          <div className="inside-names">
            නදීෂා
            <span className="inside-amp">&amp;</span>
            කසුන්
          </div>
          <div className="inside-divider">
            <div className="inside-divider-line" />
            <div className="inside-divider-dot" />
            <div className="inside-divider-line" />
          </div>
          <div className="inside-date">15 · 08 · 2026</div>
        </div>

        <div className={`door left${open ? " open" : ""}`}>
          <div className="door-inner">
            <div className="door-name">නදීෂා</div>
          </div>
        </div>

        <div className={`door right${open ? " open" : ""}`}>
          <div className="door-inner">
            <div className="door-name">කසුන්</div>
          </div>
        </div>

        <div className="seam" />
        {!open && <div className="tap-hint">✦ tap to open ✦</div>}
      </div>
    </div>
  );
}


// ─── WeddingInvitation.jsx ────────────────────────────────────────────────────

const wiStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Noto+Serif+Sinhala:wght@300;400;600&family=Great+Vibes&display=swap');

  .wi-wrap { font-family: 'Cormorant Garamond', 'Noto Serif Sinhala', serif; background: ${cream}; color: ${darkText}; min-height: 100vh; overflow-x: hidden; }
  .wi-section { padding: 4rem 1.5rem; text-align: center; position: relative; }
  .wi-divider { display: flex; align-items: center; justify-content: center; gap: 1rem; margin: 1.5rem auto; max-width: 320px; }
  .wi-divider-line { flex: 1; height: 1px; background: linear-gradient(to right, transparent, ${gold}); }
  .wi-divider-line.right { background: linear-gradient(to left, transparent, ${gold}); }
  .wi-divider-diamond { width: 8px; height: 8px; background: ${gold}; transform: rotate(45deg); flex-shrink: 0; }
  .wi-ornament { color: ${gold}; font-size: 1.4rem; letter-spacing: 4px; }

  .wi-hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(180deg, #FAF0D7 0%, ${cream} 60%); position: relative; overflow: hidden; padding: 2rem 1.5rem; }
  .wi-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.13) 0%, transparent 70%); pointer-events: none; }
  .wi-hero-border { border: 1px solid ${gold}; border-radius: 2px; padding: 2.5rem 2rem; max-width: 380px; width: 100%; position: relative; margin-top: 1rem; }
  .wi-hero-border::before, .wi-hero-border::after { content: '✦'; position: absolute; color: ${gold}; font-size: 1rem; }
  .wi-hero-border::before { top: -0.6rem; left: 50%; transform: translateX(-50%); background: #FAF0D7; padding: 0 0.5rem; }
  .wi-hero-border::after  { bottom: -0.6rem; left: 50%; transform: translateX(-50%); background: ${cream}; padding: 0 0.5rem; }
  .wi-sinhala-label { font-family: 'Noto Serif Sinhala', serif; font-size: 0.85rem; color: ${mutedText}; letter-spacing: 2px; margin-bottom: 0.5rem; }
  .wi-couple-names { font-family: 'Great Vibes', cursive; font-size: 3.4rem; color: ${darkText}; line-height: 1.1; }
  .wi-couple-and   { font-family: 'Great Vibes', cursive; font-size: 2rem; color: ${gold}; display: block; margin: 0.2rem 0; }
  .wi-save-label   { font-size: 0.7rem; letter-spacing: 4px; text-transform: uppercase; color: ${mutedText}; margin-bottom: 0.4rem; }
  .wi-save-date    { font-size: 1.7rem; letter-spacing: 6px; color: ${gold}; font-weight: 300; }
  .wi-scroll-hint  { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 0.4rem; animation: wiBounce 2s infinite; }
  .wi-scroll-hint span { font-size: 0.65rem; letter-spacing: 3px; color: ${mutedText}; text-transform: uppercase; }
  .wi-scroll-arrow { width: 1px; height: 28px; background: ${gold}; margin: 0 auto; }
  @keyframes wiBounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }

  .wi-intro-text { font-family: 'Noto Serif Sinhala', serif; font-size: 1rem; line-height: 2; color: ${mutedText}; max-width: 340px; margin: 0 auto; }
  .wi-mr-mrs { font-family: 'Great Vibes', cursive; font-size: 2.5rem; color: ${darkText}; display: block; margin-top: 1rem; }

  .wi-countdown-bg    { background: linear-gradient(135deg, #2C1A0E 0%, #4A2C14 100%); color: ${cream}; }
  .wi-countdown-label { font-family: 'Noto Serif Sinhala', serif; font-size: 0.9rem; color: rgba(240,208,128,0.8); letter-spacing: 1px; margin-bottom: 2rem; }
  .wi-countdown-grid  { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.8rem; max-width: 360px; margin: 0 auto; }
  .wi-count-block { text-align: center; }
  .wi-count-num   { font-size: 2.6rem; font-weight: 300; color: ${goldLight}; display: block; line-height: 1; }
  .wi-count-unit  { font-family: 'Noto Serif Sinhala', serif; font-size: 0.65rem; color: rgba(240,208,128,0.6); letter-spacing: 2px; margin-top: 0.3rem; display: block; }

  .wi-venue-card { border: 1px solid ${gold}; max-width: 360px; margin: 1.5rem auto 0; padding: 1.5rem; }
  .wi-venue-name { font-size: 1.6rem; color: ${darkText}; font-weight: 400; }
  .wi-venue-sub  { font-family: 'Noto Serif Sinhala', serif; font-size: 0.85rem; color: ${mutedText}; margin-top: 0.3rem; }
  .wi-venue-time { font-size: 1.1rem; color: ${gold}; margin-top: 0.8rem; letter-spacing: 2px; }
  .wi-map-btn    { display: inline-block; margin-top: 1rem; background: ${gold}; color: #fff; border: none; padding: 0.6rem 1.5rem; font-family: 'Cormorant Garamond', serif; font-size: 0.9rem; letter-spacing: 2px; cursor: pointer; text-decoration: none; }

  .wi-timeline { max-width: 360px; margin: 0 auto; position: relative; }
  .wi-timeline::before { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom, transparent, ${gold} 10%, ${gold} 90%, transparent); transform: translateX(-50%); }
  .wi-tl-item  { display: grid; grid-template-columns: 1fr 18px 1fr; align-items: start; margin-bottom: 2rem; }
  .wi-tl-left  { text-align: right; padding-right: 1.2rem; }
  .wi-tl-right { text-align: left;  padding-left:  1.2rem; }
  .wi-tl-dot   { width: 10px; height: 10px; border-radius: 50%; background: ${gold}; border: 2px solid ${cream}; outline: 1px solid ${gold}; z-index: 1; margin-top: 0.2rem; justify-self: center; }
  .wi-tl-time  { font-size: 0.8rem; color: ${gold}; letter-spacing: 1px; display: block; }
  .wi-tl-event { font-family: 'Noto Serif Sinhala', serif; font-size: 0.85rem; color: ${darkText}; line-height: 1.5; }

  .wi-rsvp-bg      { background: #FAF0D7; }
  .wi-rsvp-deadline { font-family: 'Noto Serif Sinhala', serif; font-size: 0.9rem; color: ${mutedText}; margin: 1rem 0 1.5rem; }
  .wi-cal-btn  { display: inline-flex; align-items: center; gap: 0.6rem; background: ${gold}; color: #fff; border: none; padding: 0.8rem 2rem; font-family: 'Cormorant Garamond', serif; font-size: 1rem; letter-spacing: 2px; cursor: pointer; margin: 0.5rem; }
  .wi-rsvp-btn { display: inline-flex; align-items: center; gap: 0.6rem; background: transparent; color: ${goldDark}; border: 1px solid ${gold}; padding: 0.8rem 2rem; font-family: 'Cormorant Garamond', serif; font-size: 1rem; letter-spacing: 2px; cursor: pointer; margin: 0.5rem; }

  .wi-footer       { background: linear-gradient(180deg, #2C1A0E 0%, #1A0F06 100%); color: ${goldLight}; padding: 3rem 1.5rem; text-align: center; }
  .wi-footer-names { font-family: 'Great Vibes', cursive; font-size: 2.5rem; color: ${goldLight}; }
  .wi-footer-small { font-size: 0.7rem; letter-spacing: 3px; color: rgba(240,208,128,0.5); margin-top: 1rem; }

  .wi-sec-eyebrow { font-size: 0.65rem; letter-spacing: 4px; color: ${gold}; text-transform: uppercase; margin-bottom: 0.5rem; }
  .wi-sec-title   { font-size: 1.8rem; color: ${darkText}; font-weight: 400; }

  .wi-fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .wi-fade-in.visible { opacity: 1; transform: translateY(0); }

  .wi-wrap.entering { animation: wiEnter 0.7s ease forwards; }
  @keyframes wiEnter { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

  @media(max-width:400px){
    .wi-couple-names { font-size: 2.8rem; }
    .wi-countdown-grid { gap: 0.5rem; }
    .wi-count-num { font-size: 2rem; }
  }
`;

const weddingDate = new Date("2026-08-15T10:00:00");

function useCountdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = weddingDate - now;
      if (diff <= 0) { setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTime({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, className = "", style = {} }) {
  const ref = useFadeIn();
  return <div ref={ref} className={`wi-fade-in ${className}`} style={style}>{children}</div>;
}

function WiDivider() {
  return (
    <div className="wi-divider">
      <div className="wi-divider-line" />
      <div className="wi-divider-diamond" />
      <div className="wi-divider-line right" />
    </div>
  );
}

const timeline = [
  { time: "ප.ව. 10:00", side: "left",  event: "පෝයාල මහතාගේ රැඩීම\nPoruwa Preparation" },
  { time: "ප.ව. 11:00", side: "right", event: "පෝරුව වාර්තු\nPoruwa Ceremony" },
  { time: "ප.ව. 12:00", side: "left",  event: "ආශීර්වාද හා සාම්ප්‍රදායික\nBlessings & Traditions" },
  { time: "ප.ව. 01:00", side: "right", event: "දිවා ආහාරය\nWedding Lunch" },
  { time: "ප.ව. 02:30", side: "left",  event: "ඡායාරූප රාත්‍රිය\nPhoto Session" },
  { time: "ප.ව. 07:00", side: "right", event: "රාත්‍රී ආහාරය\nEvening Reception" },
];

function WeddingInvitation({ guestName }) {
  const { days, hours, minutes, seconds } = useCountdown();
  return (
    <div className="wi-wrap entering">
      <style>{wiStyles}</style>

      {/* HERO */}
      <section className="wi-hero">
        <div style={{ marginBottom: "1.5rem" }}>
          <div className="wi-sinhala-label">ශුභ මංගලට</div>
          <div className="wi-ornament">✦ ✦ ✦</div>
        </div>
        <div className="wi-hero-border">
          <p className="wi-save-label">Save The Date</p>
          <div className="wi-couple-names">
            නදීෂා
            <span className="wi-couple-and">&amp;</span>
            කසුන්
          </div>
          <WiDivider />
          <p className="wi-save-label">Wedding Day</p>
          <p className="wi-save-date">15 · 08 · 2026</p>
        </div>
        <div
          style={{
            marginTop: "1.5rem",
            fontFamily: "'Noto Serif Sinhala', serif",
            fontSize: "0.8rem",
            color: mutedText,
          }}
        >
          {guestName}
        </div>
        <div className="wi-scroll-hint">
          <span>Scroll</span>
          <div className="wi-scroll-arrow" />
        </div>
      </section>

      {/* INVITATION */}
      <FadeSection>
        <section className="wi-section">
          <p className="wi-sec-eyebrow">ආරාධනයයි</p>
          <p className="wi-sec-title">ඔබ සාදරයෙන් ආරාධනා කරමු</p>
          <WiDivider />
          <p className="wi-intro-text">
            ඔබව අපගේ මංගල උත්සවයට ඉතාමත් ආදරයෙන් ආරාධනා කරන්නෙමු.
            දෙදෙනා එකව මෙ සුන්දර රාත්‍රිය ගමන් ආරම්භ කිරීමේ සතුට ඔබ සමගද
            බෙදා ගැනීමට අප බලාපොරොත්තු වෙමු.
          </p>
          <span className="wi-mr-mrs">{guestName}</span>
        </section>
      </FadeSection>

      {/* COUNTDOWN */}
      <FadeSection>
        <section className="wi-section wi-countdown-bg">
          <p className="wi-countdown-label">සදාකාලික බැදීමට තවත් ...</p>
          <div className="wi-countdown-grid">
            {[
              { num: String(days).padStart(3, "0"),    unit: "දින" },
              { num: String(hours).padStart(2, "0"),   unit: "පැය" },
              { num: String(minutes).padStart(2, "0"), unit: "මිනිත්තු" },
              { num: String(seconds).padStart(2, "0"), unit: "තත්පර" },
            ].map((b, i) => (
              <div key={i} className="wi-count-block">
                <span className="wi-count-num">{b.num}</span>
                <span className="wi-count-unit">{b.unit}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "2rem", fontFamily: "'Noto Serif Sinhala', serif", fontSize: "0.85rem", color: "rgba(240,208,128,0.6)" }}>
            අපෙස් විශේෂ දිනට ඔබව සහ පවුල එළඹීමට සූදානම් වෙමු
          </p>
        </section>
      </FadeSection>

      {/* VENUE */}
      <FadeSection>
        <section className="wi-section">
          <p className="wi-sec-eyebrow">ආරාධිත උත්සවය</p>
          <p className="wi-sec-title">රැස්වීමේ ස්ථානය</p>
          <WiDivider />
          <div className="wi-venue-card">
            <div className="wi-ornament" style={{ fontSize: "1.8rem" }}>🏛</div>
            <p className="wi-venue-name">හිල්ටන් කොළඹ</p>
            <p className="wi-venue-sub">Hilton Colombo, Sir Chittampalam A. Gardiner Mawatha, Colombo 02</p>
            <p className="wi-venue-time">ප.ව. 10:00</p>
            <a href="https://maps.google.com/?q=Hilton+Colombo" target="_blank" rel="noreferrer" className="wi-map-btn">
              📍 Open in Google Maps
            </a>
          </div>
        </section>
      </FadeSection>

      {/* TIMELINE */}
      <FadeSection>
        <section className="wi-section" style={{ background: "#FDF8F0" }}>
          <p className="wi-sec-eyebrow">දිනක්‍රමය</p>
          <p className="wi-sec-title">උත්සව කාලසටහන</p>
          <WiDivider />
          <div className="wi-timeline" style={{ marginTop: "2rem" }}>
            {timeline.map((item, i) => (
              <div key={i} className="wi-tl-item">
                <div className="wi-tl-left">
                  {item.side === "left" && (
                    <>
                      <span className="wi-tl-time">{item.time}</span>
                      <span className="wi-tl-event">
                        {item.event.split("\n").map((l, j) => <span key={j} style={{ display: "block" }}>{l}</span>)}
                      </span>
                    </>
                  )}
                </div>
                <div className="wi-tl-dot" />
                <div className="wi-tl-right">
                  {item.side === "right" && (
                    <>
                      <span className="wi-tl-time">{item.time}</span>
                      <span className="wi-tl-event">
                        {item.event.split("\n").map((l, j) => <span key={j} style={{ display: "block" }}>{l}</span>)}
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </FadeSection>

      {/* RSVP */}
      <FadeSection>
        <section className="wi-section wi-rsvp-bg">
          <p className="wi-sec-eyebrow">රැඳීම සහතික කරන්න</p>
          <p className="wi-sec-title">ඔබගේ සහභාගිත්වය</p>
          <WiDivider />
          <p className="wi-rsvp-deadline">
            <span>කරුණාකර </span><strong>10th May 2026</strong><span> ට පෙර රැඳීම සහතික කරන්න</span>
          </p>
          <div><button className="wi-cal-btn">📅 Add to Google Calendar</button></div>
          <div><button className="wi-rsvp-btn">✉ රැඳීම සහතික කරන්න</button></div>
        </section>
      </FadeSection>

      {/* GALLERY */}
      <FadeSection>
        <section className="wi-section" style={{ background: cream }}>
          <p className="wi-sec-eyebrow">අපගේ ගමන</p>
          <p className="wi-sec-title">ආදරේ කතාව</p>
          <WiDivider />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", maxWidth: "360px", margin: "1.5rem auto 0" }}>
            {[["💍","2019"],["🌸","2021"],["🌺","2023"],["💒","2026"]].map(([icon, yr], i) => (
              <div key={i} style={{ aspectRatio: "1", background: "linear-gradient(135deg, #F5E6C8 0%, #E8D5A0 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: `1px solid ${gold}` }}>
                <div style={{ fontSize: "1.6rem" }}>{icon}</div>
                <div style={{ fontSize: "0.7rem", letterSpacing: "2px", color: mutedText, marginTop: "0.4rem" }}>{yr}</div>
              </div>
            ))}
          </div>
        </section>
      </FadeSection>

      {/* FOOTER */}
      <footer className="wi-footer">
        <div className="wi-ornament" style={{ color: goldLight, marginBottom: "1rem" }}>✦ ✦ ✦</div>
        <div className="wi-footer-names">නදීෂා &amp; කසුන්</div>
        <div style={{ height: "1px", background: gold, opacity: 0.3, maxWidth: "200px", margin: "1.5rem auto" }} />
        <p className="wi-footer-small">15 · AUGUST · 2026</p>
        <p className="wi-footer-small" style={{ marginTop: "0.5rem" }}>HILTON COLOMBO</p>
        <div className="wi-ornament" style={{ color: goldLight, marginTop: "2rem", fontSize: "1rem" }}>♥ With Love ♥</div>
      </footer>
    </div>
  );
}


// ─── App.jsx — entry point ────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("card");
  const [guestName, setGuestName] = useState("Mr & Mrs Dissanayake");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    if (name) {
      setGuestName(name);
    }
  }, []);

  if (window.location.pathname === "/admin") {
    return <AdminPanel />;
  }

  return page === "card" ? (
    <CardOpen onNavigate={() => setPage("invitation")} />
  ) : (
    <WeddingInvitation guestName={guestName} />
  );
}