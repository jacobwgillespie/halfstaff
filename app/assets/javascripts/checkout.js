var button = document.getElementById('stripe-button');

if (button) {
  var email = document.getElementById('stripe-email');
  var form = document.getElementById('stripe-form');
  var select = document.getElementById('stripe-years');
  var token = document.getElementById('stripe-token');

  var handler = StripeCheckout.configure({
    key: window.STRIPE_TOKEN,
    image: window.STRIPE_LOGO,
    locale: 'auto',
    token: function(t) {
      email.value = t.email;
      token.value = t.id;
      form.submit();
    }
  });

  button.addEventListener('click', function(e) {
    e.preventDefault();

    var years = parseInt(select.value, 10);
    var description = 'Notifications for ' +
      (years > 1 ? 'an additional ' + years + ' years' : 'an additional year');
    var amount = 200 * years;

    handler.open({
      name: 'HalfStaff.co',
      description: description,
      amount: amount,
      zipCode: true,
    });
  });

  // Close Checkout on page navigation:
  window.addEventListener('popstate', function() {
    handler.close();
  });
}
