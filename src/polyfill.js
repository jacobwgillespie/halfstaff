// Polyfill rel=preload
import './polyfills/relPreload';

// Utility to format locale parts correctly
const correctPart = (part) => {
  if (part.length === 2) {
    return part.toUpperCase();
  } else if (part.length > 2) {
    part[0] = part[0].toUpperCase(); // eslint-disable-line no-param-reassign
  }
  return part;
};

// Retrieve the locale
let locale = navigator.languages
  ? navigator.languages[0]
  : (navigator.language || navigator.userLanguage);

// Fix locale case
if (locale) {
  locale = locale.split('-');
  locale = locale
    .slice(0, 1)
    .concat(locale.slice(1).map(correctPart))
    .join('-');
}

// Set up callbacks for external polyfill
const callbacks = [];
window.polyfilled = false;
window.polyfillComplete = () => {
  window.polyfilled = true;
  callbacks.forEach(cb => cb());
};

// Fetch any calls to onPolyfilled that took place before this script loaded
const previousCalls = window.onPolyfilled ? window.onPolyfilled.p || [] : [];
window.onPolyfilled = cb => {
  if (window.polyfilled) cb();
  else callbacks.push(cb);
};
previousCalls.forEach(cb => window.onPolyfilled(cb));

// Polyfill
if (locale) {
  const script = document.createElement('script');
  const firstScript = document.getElementsByTagName('script')[0];
  script.async = 1;
  script.src = `https://cdn.polyfill.io/v2/polyfill.min.js?callback=window.polyfillComplete&features=default,Intl.~locale.${locale}`;
  firstScript.parentNode.insertBefore(script, firstScript);

  // set global locale
  window.locale = locale;
} else {
  // No polyfilling necessary - trigger the scripts
  window.polyfillComplete();
}
