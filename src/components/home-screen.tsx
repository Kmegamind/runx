"use client";

import { useEffect, useState } from "react";

const PRESET_DURATIONS_MIN = [20, 30, 45] as const;
const MIN_CUSTOM_DURATION_MIN = 15;
const MAX_CUSTOM_DURATION_MIN = 60;

type PresetDuration = (typeof PRESET_DURATIONS_MIN)[number];
type Duration = PresetDuration | number;

function getFinishTime(durationMin: number): string {
  const finishTime = new Date(Date.now() + durationMin * 60 * 1000);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(finishTime);
}

export function HomeScreen() {
  const [durationMin, setDurationMin] = useState<Duration>(30);
  const [customDuration, setCustomDuration] = useState("");
  const [finishTime, setFinishTime] = useState("--:--");
  const customDurationNumber =
    customDuration === "" ? undefined : Number(customDuration);
  const customDurationIsValid =
    customDurationNumber !== undefined &&
    Number.isInteger(customDurationNumber) &&
    customDurationNumber >= MIN_CUSTOM_DURATION_MIN &&
    customDurationNumber <= MAX_CUSTOM_DURATION_MIN &&
    customDurationNumber % 5 === 0;

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setFinishTime(getFinishTime(durationMin));
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [durationMin]);

  function choosePreset(duration: PresetDuration) {
    setDurationMin(duration);
    setCustomDuration("");
  }

  function chooseCustomDuration(value: string) {
    setCustomDuration(value);

    const nextDuration = Number(value);
    if (
      Number.isInteger(nextDuration) &&
      nextDuration >= MIN_CUSTOM_DURATION_MIN &&
      nextDuration <= MAX_CUSTOM_DURATION_MIN &&
      nextDuration % 5 === 0
    ) {
      setDurationMin(nextDuration);
    }
  }

  return (
    <main className="home-shell" data-world="dream">
      <div className="home-content">
        <header className="home-header">
          <div>
            <p className="eyebrow">RunX</p>
            <h1>Ride into a story.</h1>
          </div>
          <button
            type="button"
            className="world-toggle"
            aria-label="Switch story world"
            aria-pressed="false"
          >
            <span aria-hidden="true">⌁</span>
          </button>
        </header>

        <section className="character-stage" aria-label="Your story companions">
          <div
            className="character-card quixote-card"
            role="img"
            aria-label="Don Quixote, ready for adventure"
          >
            <div className="character-art quixote-art" aria-hidden="true" />
            <span>Don Quixote</span>
          </div>
          <div className="runner-marker" aria-hidden="true">
            <span>You</span>
          </div>
          <div
            className="character-card sancho-card"
            role="img"
            aria-label="Sancho, ready for adventure"
          >
            <div className="character-art sancho-art" aria-hidden="true" />
            <span>Sancho</span>
          </div>
        </section>

        <section className="episode-card glass" aria-labelledby="episode-title">
          <p className="card-kicker">Episode 1</p>
          <h2 id="episode-title">Giants on the Horizon</h2>
          <p className="episode-description">
            Windmills, mistaken giants, and two companions setting out across La
            Mancha.
          </p>

          <fieldset className="duration-fieldset">
            <legend>How long are we riding?</legend>
            <div
              className="duration-options"
              role="radiogroup"
              aria-label="Run duration"
            >
              {PRESET_DURATIONS_MIN.map((duration) => (
                <button
                  type="button"
                  role="radio"
                  aria-checked={
                    durationMin === duration && customDuration === ""
                  }
                  className="duration-option"
                  data-selected={
                    durationMin === duration && customDuration === ""
                  }
                  key={duration}
                  onClick={() => choosePreset(duration)}
                >
                  <strong>{duration}</strong>
                  <span>min</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="custom-duration">
            <label htmlFor="custom-duration">Custom length</label>
            <div className="custom-duration-control">
              <input
                id="custom-duration"
                type="number"
                min={MIN_CUSTOM_DURATION_MIN}
                max={MAX_CUSTOM_DURATION_MIN}
                step="5"
                inputMode="numeric"
                placeholder="25"
                value={customDuration}
                onChange={(event) => chooseCustomDuration(event.target.value)}
                aria-describedby="custom-duration-help"
              />
              <span aria-hidden="true">min</span>
            </div>
            <p id="custom-duration-help">
              Choose 15–60 minutes in 5-minute steps.
            </p>
          </div>

          <p className="finish-time" aria-live="polite">
            <span aria-hidden="true">✦</span> Story ends at{" "}
            <strong>{finishTime}</strong>
          </p>

          <button type="button" className="start-button">
            Start the story
            <span aria-hidden="true">→</span>
          </button>

          {!customDurationIsValid && customDuration !== "" && (
            <p className="duration-error" role="alert">
              Custom length must be between 15 and 60 minutes in 5-minute steps.
            </p>
          )}
        </section>

        <p className="pocket-hint">
          Pocket your phone. We&apos;ll talk you through it.
        </p>
      </div>
    </main>
  );
}
