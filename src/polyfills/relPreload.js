const loadCSS = window.loadCSS = (href, before, media) => {
  // Arguments explained:
  // `href` [REQUIRED] is the URL for your CSS file.
  // `before` [OPTIONAL] is the element the script should use as a reference for injecting
  // our stylesheet <link> before
  // By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM.
  // However, you might desire a more specific location in your document.
  // `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
  const doc = window.document;
  const ss = doc.createElement('link');
  let ref;
  if (before) {
    ref = before;
  } else {
    const refs = (doc.body || doc.getElementsByTagName('head')[0]).childNodes;
    ref = refs[refs.length - 1];
  }

  const sheets = doc.styleSheets;
  ss.rel = 'stylesheet';
  ss.href = href;
  // temporarily set media to something inapplicable to ensure it'll fetch without blocking render
  ss.media = 'only x';

  // wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
  const ready = (cb) => {
    if (doc.body) {
      return cb();
    }
    return setTimeout(() => {
      ready(cb);
    });
  };

  // Inject link
  // Note: the ternary preserves the existing behavior of 'before' argument, but we could choose to
  // change the argument to 'after' in a later release and standardize on
  // ref.nextSibling for all refs
  // Note: `insertBefore` is used instead of `appendChild`,
  // for safety re: http://wwwindow.paulirish.com/2011/surefire-dom-element-insertion/
  ready(() => {
    ref.parentNode.insertBefore(ss, (before ? ref : ref.nextSibling));
  });

  // A method (exposed on return object for external use) that mimics onload by polling until
  // document.styleSheets until it includes the new sheet.
  const onloadcssdefined = (cb) => {
    const resolvedHref = ss.href;
    let i = sheets.length;
    while (i--) {
      if (sheets[i].href === resolvedHref) {
        return cb();
      }
    }

    return setTimeout(() => {
      onloadcssdefined(cb);
    });
  };

  function loadCB() {
    if (ss.addEventListener) {
      ss.removeEventListener('load', loadCB);
    }
    ss.media = media || 'all';
  }

  // once loaded, set link's media back to `all` so that the stylesheet applies once it loads
  if (ss.addEventListener) {
    ss.addEventListener('load', loadCB);
  }
  ss.onloadcssdefined = onloadcssdefined;
  onloadcssdefined(loadCB);
  return ss;
};

const relPreloadSupported = () => {
  try {
    return window.document.createElement('link').relList.supports('preload');
  } catch (e) {
    return false;
  }
};

// loop preload links and fetch using loadCSS
const polyfillRelPreload = () => {
  const links = window.document.getElementsByTagName('link');
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    if (link.rel === 'preload' && link.getAttribute('as') === 'style') {
      loadCSS(link.href, link);
      link.rel = null;
    }
  }
};

// if link[rel=preload] is not supported, we must fetch the CSS manually using loadCSS
if (!relPreloadSupported()) {
  polyfillRelPreload();
  const run = window.setInterval(polyfillRelPreload, 300);
  window.addEventListener('load', () => {
    window.clearInterval(run);
  });
}

window.relPreloadSupported = relPreloadSupported;
window.polyfillRelPreload = polyfillRelPreload;
