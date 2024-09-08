import React from "react";
import "../style/loader.css";

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div class="loader">
        <svg viewBox="0 0 80 80">
          <rect x="8" y="8" width="64" height="64"></rect>
          <text
            x="50%"
            y="60%"
            text-anchor="middle"
            fill="black"
            font-size="24"
            font-weight="bold"
          >
            Z
          </text>
        </svg>
      </div>

      <div class="loader">
        <svg viewBox="0 0 80 80">
          <rect x="8" y="8" width="64" height="64"></rect>
          <text
            x="50%"
            y="60%"
            text-anchor="middle"
            fill="black"
            font-size="24"
            font-weight="bold"
          >
            E
          </text>
        </svg>
      </div>

      <div class="loader">
        <svg viewBox="0 0 80 80">
          <rect x="8" y="8" width="64" height="64"></rect>
          <text
            x="50%"
            y="60%"
            text-anchor="middle"
            fill="black"
            font-size="24"
            font-weight="bold"
          >
            N
          </text>
        </svg>
      </div>
      <div class="loader">
        <svg viewBox="0 0 80 80">
          <rect x="8" y="8" width="64" height="64"></rect>
          <text
            x="50%"
            y="60%"
            text-anchor="middle"
            fill="black"
            font-size="24"
            font-weight="bold"
          >
            V
          </text>
        </svg>
      </div>
      <div class="loader">
        <svg viewBox="0 0 80 80">
          <rect x="8" y="8" width="64" height="64"></rect>
          <text
            x="50%"
            y="60%"
            text-anchor="middle"
            fill="black"
            font-size="24"
            font-weight="bold"
          >
            E
          </text>
        </svg>
      </div>
      <div class="loader">
        <svg viewBox="0 0 80 80">
          <rect x="8" y="8" width="64" height="64"></rect>
          <text
            x="50%"
            y="60%"
            text-anchor="middle"
            fill="black"
            font-size="24"
            font-weight="bold"
          >
            S
          </text>
        </svg>
      </div>
      <div class="loader">
        <svg viewBox="0 0 80 80">
          <rect x="8" y="8" width="64" height="64"></rect>
          <text
            x="50%"
            y="60%"
            text-anchor="middle"
            fill="black"
            font-size="24"
            font-weight="bold"
          >
            T
          </text>
        </svg>
      </div>
    </div>
  );
}

export default Loader;
