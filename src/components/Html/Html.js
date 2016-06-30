import { DOMProperty } from 'react/lib/ReactInjection';
import React, { PropTypes } from 'react';

// Patch React to allow `onload` and `as` attributes, required for <link rel="preload" />
DOMProperty.injectDOMPropertyConfig({
  Properties: {
    as: DOMProperty.MUST_USE_ATTRIBUTE,
    onload: DOMProperty.MUST_USE_ATTRIBUTE,
  },
  isCustomAttribute: name => name === 'as' || name === 'onload',
});

const criticalCSS = [
  '.loading{',
  'background-color:#2D2A32;',
  'padding:0;margin:0;',
  'position:absolute;top:0;left:0;bottom:0;right:0;',
  'z-index:100;',
  'visibility:visible;opacity:1;',
  'transition:opacity 300ms linear;',
  'display:-ms-flexbox;display:flex;',
  '-ms-flex-pack:center;justify-content:center;',
  '-ms-flex-align:center;align-items:center;',
  '}',
  '.loading svg{',
  'fill:#ddd;',
  '}',
].join('');

const earlyPolyfillInit = `
(function(w,n){w[n]=w[n]||function(c){(w[n].p=w[n].p).push(c)}})(window,'onPolyfilled');
`.trim();

const webfontLoader = `
WebFontConfig={google:{families:["Cairo:300,400,600,700:latin"]}},function(){var e=document.createElement("script");e.src="https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js",e.type="text/javascript",e.async="true";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}();
`.trim();

function Html({ assetHost, assets, body, head, icons, store }) {
  const attrs = head.htmlAttributes.toComponent();

  const iconBase = `${assetHost}/${icons.outputFilePrefix}`;

  /* eslint-disable max-len */
  return (
    <html lang="en">
      <head {...attrs}>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Nanji" />
        <meta name="application-name" content="Nanji" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {head.meta.toComponent()}

        {head.title.toComponent()}

        <link rel="apple-touch-icon" sizes="114x114" href={`${iconBase}apple-touch-icon-114x114.png`} />
        <link rel="apple-touch-icon" sizes="120x120" href={`${iconBase}apple-touch-icon-120x120.png`} />
        <link rel="apple-touch-icon" sizes="144x144" href={`${iconBase}apple-touch-icon-144x144.png`} />
        <link rel="apple-touch-icon" sizes="152x152" href={`${iconBase}apple-touch-icon-152x152.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${iconBase}apple-touch-icon-180x180.png`} />
        <link rel="apple-touch-icon" sizes="57x57" href={`${iconBase}apple-touch-icon-57x57.png`} />
        <link rel="apple-touch-icon" sizes="60x60" href={`${iconBase}apple-touch-icon-60x60.png`} />
        <link rel="apple-touch-icon" sizes="72x72" href={`${iconBase}apple-touch-icon-72x72.png`} />
        <link rel="apple-touch-icon" sizes="76x76" href={`${iconBase}apple-touch-icon-76x76.png`} />
        <link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)" href={`${iconBase}apple-touch-startup-image-320x460.png`} />
        <link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)" href={`${iconBase}apple-touch-startup-image-640x920.png`} />
        <link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" href={`${iconBase}apple-touch-startup-image-640x1096.png`} />
        <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" href={`${iconBase}apple-touch-startup-image-750x1294.png`} />
        <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3)" href={`${iconBase}apple-touch-startup-image-1182x2208.png`} />
        <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3)" href={`${iconBase}apple-touch-startup-image-1242x2148.png`} />
        <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 1)" href={`${iconBase}apple-touch-startup-image-748x1024.png`} />
        <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)" href={`${iconBase}apple-touch-startup-image-1496x2048.png`} />
        <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1)" href={`${iconBase}apple-touch-startup-image-768x1004.png`} />
        <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" href={`${iconBase}apple-touch-startup-image-1536x2008.png`} />
        <link rel="dns-prefetch" href="//cdn.nanji.io" />
        <link rel="dns-prefetch" href="//cdn.polyfill.io" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="icon" type="image/png" sizes="16x16" href={`${iconBase}favicon-16x16.png`} />
        <link rel="icon" type="image/png" sizes="192x192" href={`${iconBase}android-chrome-192x192.png`} />
        <link rel="icon" type="image/png" sizes="230x230" href={`${iconBase}favicon-230x230.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${iconBase}favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="96x96" href={`${iconBase}favicon-96x96.png`} />
        <link rel="shortcut icon" href={`${iconBase}favicon.ico`} />
        {head.link.toComponent()}

        <style
          dangerouslySetInnerHTML={{
            __html: criticalCSS,
          }}
        />
        <link
          rel="preload"
          href={`${assetHost}${assets.app.css}`}
          charSet="utf-8"
          as="style"
          onload="this.rel='stylesheet'"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: earlyPolyfillInit,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: webfontLoader,
          }}
        />
      </head>
      <body>
        <div id="react" dangerouslySetInnerHTML={{ __html: body }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.INITIAL_STATE=${JSON.stringify(store.getState())};`,
          }}
        />
        <script src={`${assetHost}${assets.polyfill.js}`} async />
        <script src={`${assetHost}${assets.app.js}`} async />
      </body>
    </html>
  );
  /* eslint-enable max-len */
}

Html.propTypes = {
  assetHost: PropTypes.string,
  assets: PropTypes.object,
  body: PropTypes.any,
  head: PropTypes.object,
  icons: PropTypes.object,
  store: PropTypes.object,
};

export default Html;
