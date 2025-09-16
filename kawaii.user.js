// ==UserScript==
// @name         Kawaii
// @namespace    https://raw.githubusercontent.com/zzryn/kawaii_gforms_spammer/refs/heads/main/kawaii.user.js
// @version      null
// @description  try to take over the world!
// @author       You
// @match        *://docs.google.com/forms/d/*
// @icon         data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7
// @grant        none
// ==/UserScript==

(() => {
  // Do not execute if the panel already exists
  if (document.getElementById("form-spammer-panel")) return;

  // Create and add the background overlay
  const overlay = document.createElement("div");
  overlay.id = "form-spammer-overlay";
  document.body.appendChild(overlay);

  // Create the main panel
  const panel = document.createElement("div");
  panel.id = "form-spammer-panel";

  // Set the panel's inner HTML with updated styles for dragging
  panel.innerHTML = `
    <button id="close-panel" title="Close">✖</button>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
      :root {
        --fog-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
      }

      #form-spammer-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        z-index: 999998;
        background-color: rgba(0, 0, 0, 0.3);
      }

      #form-spammer-panel {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #1f2937;
        border: 1px solid #4b5563;
        border-radius: 8px;
        padding: 15px;
        width: 300px;
        z-index: 999999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        font-family: 'Segoe UI', sans-serif;
        font-size: 14px;
        font-weight: bold;
        color: #e5e7eb;
        text-shadow: none;
        cursor: move; /* Set move cursor for the whole panel */
        user-select: none; /* Disable text selection */
        -webkit-user-select: none; /* For Safari */
      }

      /* Reset cursor for interactive elements */
      #form-spammer-panel input,
      #form-spammer-panel textarea,
      #form-spammer-panel button,
      #close-panel {
          cursor: auto;
      }

      #form-spammer-panel h3 {
        color: #ffffff;
        font-size: 18px;
        text-shadow: var(--fog-shadow);
      }
      #form-spammer-panel label,
      #form-spammer-panel input,
      #form-spammer-panel textarea,
      #form-spammer-panel code,
      #form-spammer-panel em,
      .field-block,
      .small-note,
      #progress-counter {
        color: #d1d5db;
        text-shadow: none;
      }
      #form-spammer-panel input,
      #form-spammer-panel textarea,
      #form-spammer-panel button {
        width: calc(100% - 2px);
        margin: 5px 0;
        padding: 8px;
        border-radius: 6px;
        font-size: 14px;
        box-sizing: border-box;
      }
      #form-spammer-panel input,
      #form-spammer-panel textarea {
        background: #374151;
        color: #ffffff;
        border: 1px solid #4b5563;
        outline: none;
      }
      #form-spammer-panel input::placeholder,
      #form-spammer-panel textarea::placeholder {
        color: #9ca3af;
      }
      #form-spammer-panel button {
        background-color: #4f46e5;
        color: #ffffff;
        font-weight: 600;
        border: none;
        text-shadow: none !important;
      }
      #form-spammer-panel button:hover {
        background-color: #4338ca;
      }
      .field-block {
        background: rgba(255, 255, 255, 0.05);
        padding: 8px;
        margin-bottom: 8px;
        border-radius: 6px;
      }
      #progress-counter {
        text-align: center;
        font-weight: bold;
        margin: 10px 0;
      }
      .small-note {
        font-family: 'Comic Neue', cursive;
        font-size: 12px;
        margin-top: -2px;
        margin-bottom: 8px;
        background: #374151;
        padding: 4px 6px;
        border-radius: 6px;
        border: 1px solid #4b5563;
      }
      hr {
        margin: 15px 0;
        border-color: #4b5563;
      }
      #close-panel {
        position: absolute !important;
        top: 6px !important;
        right: 10px !important;
        background: transparent !important;
        border: none !important;
        padding: 0 !important;
        margin: 0 !important;
        width: auto !important;
        height: auto !important;
        font-size: 18px !important;
        font-weight: bold !important;
        color: #9ca3af !important;
        line-height: 1 !important;
        text-shadow: none !important;
        z-index: 1000000 !important;
      }
      #close-panel:hover {
        color: #ffffff !important;
      }
    </style>
    <h3>kawaii gogle form spammer (≧◡≦)</h3>
    <label for="form-payload">paste payload to send</label>
    <textarea id="form-payload" placeholder="e.g. entry.123=value&entry.456=value"></textarea>
    <label for="form-count">Total submissions</label>
    <input type="number" id="form-count" value="1000" min="1" placeholder="e.g. 99999999" />
    <label for="thread-count">Threads</label>
    <input type="number" id="thread-count" value="20" min="1" placeholder="e.g. 20" />
    <div class="small-note">⚠️ 20 threads is ideal for spam. any more will be more prone to rate limits, but will birth potential to crashing the form itself. repeated use will also risk rate limiting.</div>
    <button id="form-submit">(//ω//) start !!1</button>
    <div id="progress-counter">0/0</div>
    <hr>
    <h3>payload cleaner</h3>
    <label for="clean-input">paste full payload here to clean</label>
    <textarea id="clean-input" placeholder="e.g. entry.123=value&entry.456=value"></textarea>
    <button id="clean-button">clean my load</button>
    <label for="clean-output">cleaned result</label>
    <textarea id="clean-output" placeholder="cleaned result will appear here"></textarea>
  `;
  document.body.appendChild(panel);

  // --- Draggable Modal Logic ---
  let isDragging = false;
  let startX, startY, initialX, initialY;

  const startDrag = function(e) {
    // Prevent dragging on form elements, buttons, and the close icon
    const noDrag = 'INPUT, TEXTAREA, BUTTON, #close-panel';
    if (e.target.matches(noDrag)) {
        return;
    }
    e.preventDefault();

    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

    isDragging = true;
    startX = clientX;
    startY = clientY;
    const rect = panel.getBoundingClientRect();
    initialX = rect.left;
    initialY = rect.top;

    panel.style.transition = 'none';

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', stopDrag);
  };

  const drag = function(e) {
    if (!isDragging) return;
    e.preventDefault();

    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

    const dx = clientX - startX;
    const dy = clientY - startY;
    let newX = initialX + dx;
    let newY = initialY + dy;

    const maxX = window.innerWidth - panel.offsetWidth;
    const maxY = window.innerHeight - panel.offsetHeight;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    panel.style.left = `${newX}px`;
    panel.style.top = `${newY}px`;
    panel.style.right = 'auto';
    panel.style.transform = 'none';
  };

  const stopDrag = function() {
    if (isDragging) {
      isDragging = false;
      panel.style.transition = '';

      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchmove', drag);
      document.removeEventListener('touchend', stopDrag);
    }
  };

  // Attach drag listeners to the entire panel
  panel.addEventListener('mousedown', startDrag);
  panel.addEventListener('touchstart', startDrag, { passive: false });
  // --- End of Draggable Logic ---

  const log = document.getElementById("progress-counter");
  const counter = document.getElementById("progress-counter");

  const detectFormUrl = () => {
    const form = document.querySelector("form[action*='formResponse']");
    return form ? new URL(form.action).href : null;
  };

  const cleanPayload = (raw) => {
    return raw
      .split("&")
      .filter(pair => /^entry\.\d+=/.test(pair))
      .join("&");
  };

  document.getElementById("form-submit").addEventListener("click", async () => {
    const url = detectFormUrl();
    if (!url) {
      log.textContent = "❌ invalid form URL. make sure ur on the form submission page not the response page.";
      return;
    }
    const rawPayload = document.getElementById("form-payload").value.trim();
    const totalCount = parseInt(document.getElementById("form-count").value);
    const threadCount = parseInt(document.getElementById("thread-count").value);
    if (!rawPayload || isNaN(totalCount) || isNaN(threadCount)) {
      log.textContent = "❌ invalid payload or count.";
      return;
    }
    const cleaned = cleanPayload(rawPayload);
    if (!cleaned) {
      log.textContent = "❌ no valid answer fields found (entry.xxx=...). (×﹏×)";
      return;
    }
    log.textContent = "starting with cleaned payloads...";
    counter.textContent = `0/${totalCount}`;
    let completed = 0;
    const submitBatch = async (batchSize) => {
      for (let i = 0; i < batchSize; i++) {
        if (completed >= totalCount) return;
        try {
          await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: cleaned
          });
        } catch (err) {
          console.error(err);
        } finally {
            completed++;
            counter.textContent = `${completed}/${totalCount}`;
        }
      }
    };
    const submissionsPerThread = Math.ceil(totalCount / threadCount);
    const threads = [];
    for (let i = 0; i < threadCount; i++) {
      threads.push(submitBatch(submissionsPerThread));
    }
    await Promise.all(threads);
    log.textContent += "\n finished !!  o(＞＜ = ＞＜)o ";
  });

  document.getElementById("clean-button").addEventListener("click", () => {
    const raw = document.getElementById("clean-input").value.trim();
    const cleaned = cleanPayload(raw);
    document.getElementById("clean-output").value = cleaned || "no valid entry.xxx=... fields found.";
  });

  document.getElementById("close-panel").addEventListener("click", () => {
    document.getElementById("form-spammer-panel").remove();
    document.getElementById("form-spammer-overlay").remove();
  });
})();
