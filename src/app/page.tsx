"use client";

import { useState } from "react";
import Link from "next/link";

const durations = [20, 30, 45] as const;

export default function Home() {
  const [selectedDuration, setSelectedDuration] = useState<number>(30);
  const [isStarted, setIsStarted] = useState(false);

  return (
    <main className="home-shell">
      <div className="home-glow home-glow-top" aria-hidden="true" />
      <div className="home-glow home-glow-bottom" aria-hidden="true" />

      <nav className="topbar" aria-label="Primary">
        <Link className="brand" href="/" aria-label="RunX home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" role="img">
              <path d="M7 25 14.5 7H25l-3.1 7.3h-7.5L11.2 25H7Z" />
              <path d="m18.7 16.3 6.1 8.7h-5.3l-5.9-8.7h5.1Z" />
            </svg>
          </span>
          <span>RunX</span>
        </Link>
        <button
          className="profile-button"
          type="button"
          aria-label="Open profile"
        >
          <span>JD</span>
        </button>
      </nav>

      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">YOUR NEXT ADVENTURE</p>
        <h1 id="page-title">
          Run your way<span className="accent">.</span>
        </h1>
        <p className="hero-copy">
          Pick a pace. Find your focus.
          <br />
          Make every minute count.
        </p>
      </section>

      <section className="run-card" aria-labelledby="duration-title">
        <div className="card-heading">
          <div>
            <p className="card-kicker">READY WHEN YOU ARE</p>
            <h2 id="duration-title">How long are we running?</h2>
          </div>
          <span className="shoe-icon" aria-hidden="true">
            ⌁
          </span>
        </div>

        <div
          className="duration-grid"
          role="radiogroup"
          aria-label="Run duration"
        >
          {durations.map((duration) => (
            <button
              className={`duration-option ${selectedDuration === duration ? "selected" : ""}`}
              key={duration}
              type="button"
              role="radio"
              aria-label={`${duration} MIN`}
              aria-checked={selectedDuration === duration}
              onClick={() => {
                setSelectedDuration(duration);
                setIsStarted(false);
              }}
            >
              <span className="duration-number">{duration}</span>
              <span className="duration-unit">MIN</span>
              {selectedDuration === duration && (
                <span className="selected-dot" />
              )}
            </button>
          ))}
        </div>

        <button
          className="start-button"
          type="button"
          onClick={() => setIsStarted(true)}
        >
          <span>{isStarted ? "Run in progress" : "Start my run"}</span>
          <span className="button-arrow" aria-hidden="true">
            →
          </span>
        </button>
        <p className="card-note">
          <span className="pulse-dot" aria-hidden="true" />
          {isStarted
            ? `${selectedDuration} minute run started`
            : "Your run, your rules"}
        </p>
      </section>

      <footer className="home-footer">
        <span>RUN WITH INTENTION</span>
        <span className="footer-line" aria-hidden="true" />
        <span>© 2024 RUNX</span>
      </footer>
    </main>
  );
}
