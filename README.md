# kawaii gogle form raper (≧◡≦)

multi-threaded chrome extension that spams your payload insanely fast. incredibly easy to use & configure.

### installation instructions

1. clone the repository
2. open google chrome and type ```chrome://extensions``` in the url bar.
3. turn on **developer mode** and click **load unpacked**.
4. select the cloned folder and load it.
5. the extensions UI should appear whenever you visit a google form url.

### usage

1. go to the target google form.
2. right click anywhere, and click '**Inspect**'.
3. with the inspect window open, go to the '**Network**' section.
4. fill out the form with the fields you would like to spam.
5. submit the form. a small cell with the name '**formResponse**' should appear in the inspect window.
6. click on the cell, click on '**Payload**', and click '**view source**'.
7. copy the source and clean it using the **payload cleaner** located on the bottom of the extension's ui.
8. return to the form submission page (it should have ```/viewform``` at the end of the url)
9. paste the cleaned payload in the top input box of the gui, where it says to. then choose the number of submissions you would like to add. if your goal is merciless spam, then just input 999999999 or something.
10. input a number of threads to use. 20 threads is the default because it is very fast and doesnt trigger rate limits. anything more will risk rate limiting at the price of faster submissions. anything above 40-50 will result in some submissions not going through and a high chance of rate limits. 
11. click the start button and wait.

### important notes

- this will not work on forms that limit each email to one response.
- there is a close button on the top right, you just need to hover on it.
