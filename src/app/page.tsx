"use client";

import { useEffect, useState } from "react";

const DURATIONS_MIN = [20, 30, 45] as const;
type DurationMin = (typeof DURATIONS_MIN)[number];

function getFinishTime(durationMin: DurationMin): string {
  const finishTime = new Date(Date.now() + durationMin * 60 * 1000);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(finishTime);
}

export default function Home() {
  const [durationMin, setDurationMin] = useState<DurationMin>(30);
  const [finishTime, setFinishTime] = useState("--:--");

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setFinishTime(getFinishTime(durationMin));
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [durationMin]);

  return (
    <main className="home-shell">
      <div className="home-content">
        <header className="home-header">
          <p className="eyebrow">RunX</p>
          <p className="header-note">A story for your miles</p>
        </header>

        <section className="welcome" aria-labelledby="welcome-title">
          <p className="welcome-kicker">Episode 01</p>
          <h1 id="welcome-title">Ride into a story.</h1>
          <p className="welcome-copy">
            Join Don Quixote and Sancho as they set out across La Mancha.
          </p>
        </section>

        <section className="episode-card" aria-labelledby="episode-title">
          <div className="episode-art" aria-hidden="true">
            <span className="sun" />
            <span className="hill hill-back" />
            <span className="hill hill-front" />
            <span className="windmill">
              <span className="windmill-blade blade-one" />
              <span className="windmill-blade blade-two" />
              <span className="windmill-body" />
            </span>
          </div>

          <div className="episode-details">
            <p className="card-kicker">Today&apos;s adventure</p>
            <h2 id="episode-title">Giants on the Horizon</h2>
            <p className="episode-description">
              Windmills, mistaken giants, and two companions setting out.
            </p>

            <fieldset className="duration-fieldset">
              <legend>How long are we riding?</legend>
              <div
                className="duration-options"
                role="radiogroup"
                aria-label="Run duration"
              >
                {DURATIONS_MIN.map((duration) => {
                  const isSelected = durationMin === duration;

                  return (
                    <label
                      key={duration}
                      className="duration-option"
                      data-selected={isSelected}
                    >
                      <input
                        type="radio"
                        name="run-duration"
                        value={duration}
                        aria-label={`${duration} min`}
                        checked={isSelected}
                        onChange={() => setDurationMin(duration)}
                      />
                      <strong>{duration}</strong>
                      <span>min</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <p className="finish-time" aria-live="polite">
              <span aria-hidden="true">✦</span>
              Story ends at <strong>{finishTime}</strong>
            </p>

            <button type="button" className="start-button">
              Start the story
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>

        <p className="pocket-hint">
          Pocket your phone. We&apos;ll talk you through it.
        </p>
      </div>
    </main>
  );
}
