//= require checkout
// require jquery
// require jquery_ujs
// require turbolinks
// require_tree .

try {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (var i = 0; i < registrations.length; i++) {
      registrations[i].unregister();
    }
  });
} catch (e) {
  // Ignore this error, we either don't support service workers or none exist
}
