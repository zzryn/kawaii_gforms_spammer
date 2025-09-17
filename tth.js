(function() {
  const overwrite_default = false; // set true to attempt replacing existing default policy
  const name = "Trusted-Types Helper";

  function passThroughFunc(string, sink) {
    return string; // passthrough return unchanged
  }

  const TTPName = "passthrough";
  let TTP_default;
  let TTP = {
    createHTML: passThroughFunc,
    createScript: passThroughFunc,
    createScriptURL: passThroughFunc
  };
  let needsTrustedHTML = false;

  function log(...args) {
    const out = (name ? [name + ":", ...args] : args);
    try {
      console.log(...out);
    } catch (_) {
      // no-op lmao
    }
  }

  function init() {
    try {
      if (typeof window.isSecureContext !== "undefined" && window.isSecureContext) {
        if (window.trustedTypes && window.trustedTypes.createPolicy) {
          needsTrustedHTML = true;

          if (trustedTypes.defaultPolicy) {
            log("TT Default Policy exists");
            if (overwrite_default) {
              TTP = window.trustedTypes.createPolicy("default", TTP);
            } else {
              TTP = window.trustedTypes.createPolicy(TTPName, TTP);
            }
            TTP_default = trustedTypes.defaultPolicy;
            log("Created custom passthrough policy (use var 'TTP') with name:", TTPName, TTP);
          } else {
            TTP_default = TTP = window.trustedTypes.createPolicy("default", TTP);
          }

          log("Trusted-Type Policies:", { TTP, TTP_default });
        }
      }
    } catch (e) {
      log(e);
    }

    try {
      if (!window.bp) window.bp = {};
      window.bp.TTP = TTP;
      window.bp.TTP_default = TTP_default;
      window.bp.needsTrustedHTML = needsTrustedHTML;
    } catch (_) {
      // no-op 2: electric boogaloo
    }
  }

  init();
})();
