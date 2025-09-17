# Kawaii spammer for google forms (≧◡≦)

Kawaii is a multi-threaded chrome extension that spams your payload insanely fast. It is incredibly easy to use, configure, and mod.

---

## Installation:

### Userscript:
1. Install a userscript manager like Tampermonkey or Violentmonkey.
2. Find the `kawaii.user.js` [file](https://github.com/zzryn/kawaii_gforms_spammer/blob/main/kawaii.user.js) in the repository and click the button that says **Raw**.
3. The userscript manager will detect the file as a userscript and prompt you with an install page. To install:
   * Tampermonkey → Click the highlighted **Install** button. (duh)
   * Violentmonkey → Click the top-right **Confirm installation** button.
4. Reload the form page.

### Javascript:
1. Find the `kawaii.user.js` file in the repository and copy all lines.
2. On the form page, open DevTools and click on the **Console** tab.
3. Paste the code. Press enter/return.
   * If it gives you a highlighted warning saying **Don't paste code into the DevTools Console that you don't understand or haven't reviewed yourself. This could allow attackers to steal your identity or take control of your computer.**, then just enter ```allow pasting``` into the console.

---

## Usage:

1. Fill out all parts and pages of the form with whatever information you would like to spam.
   * Do **NOT** press submit yet.
2. Open DevTools and navigate to the **Network** tab.
3. Select **Doc** where it shows the content type filter.
4. Submit the form. A row with name **📄 formResponse** should appear.
5. Click on: the row, click **Payload**, then **View source**.
6. Right click to copy the source.
   * Clean it via **payload cleaner** section towards the bottom of the script's modal.
7. Return to the form entry page (it should have ```/viewform``` at the end of the URL).
8. Paste the cleaned payload in the first input box of Kawaii's GUI. Choose the number of submissions you would like to add.
   * If your goal is merciless spam, then just input "**E**".
9. Input a number of threads to use. 10 threads is the default. Higher = faster. If threads > 20, it risks rate limits; any more loses reliability. 
10. Click the start button and wait for it to complete.
11. Once Kawaii has finished sending submissions, click **✖** in the top-right corner of the GUI to close.

---

## Notes

- Kawaii does not work on forms that limit each email to one response.
- If the console throws the error `This document requires 'TrustedHTML' assignment.` upon execution, the additional script **Trusted-Types Helper** is required to bypass it. The userscript can be installed from [here](https://greasyfork.org/en/scripts/433051-trusted-types-helper), however I plan to implement a modified snippet of [7bp](https://github.com/7bp)'s code to Kawaii in the future.
