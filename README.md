# :us: [Half Staff](https://halfstaff.co)

Is the flag at half staff?  [Half Staff](https://halfstaff.co) displays the current US flag status in a clean, simple format and allows for browsing past flag notices.

[![Build Status](https://travis-ci.org/jacobwgillespie/halfstaff.svg?branch=master)](https://travis-ci.org/jacobwgillespie/halfstaff)
[![Dependency Status](https://gemnasium.com/badges/github.com/jacobwgillespie/halfstaff.svg)](https://gemnasium.com/github.com/jacobwgillespie/halfstaff)
[![Code Climate](https://codeclimate.com/github/jacobwgillespie/halfstaff/badges/gpa.svg)](https://codeclimate.com/github/jacobwgillespie/halfstaff)
[![Issue Count](https://codeclimate.com/github/jacobwgillespie/halfstaff/badges/issue_count.svg)](https://codeclimate.com/github/jacobwgillespie/halfstaff)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jacobwgillespie/halfstaff/blob/master/LICENSE)

Table of Contents
-----------------

  * [Architecture](#architecture)
  * [Requirements](#requirements)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [License](#license)

Architecture
------------

Half Staff scrapes the contents of [Presidential Proclamations](https://www.whitehouse.gov/briefing-room/presidential-actions/proclamations) looking for presidential orders to fly the American flag at half-staff.  Those proclamations are then processed to understand duration and details surrounding the flag lowering, and all the information is saved a PostgreSQL database.  Ruby on Rails manages the background processing and builds the pages, hosted on [Heroku](https://www.heroku.com/).  [CloudFlare](https://www.cloudflare.com) operates as a CDN and provides SSL for the final site.

Additionally, users can elect to receive SMS notifications when the flag is lowered.  [Twilio](https://www.twilio.com/) provides the SMS gateway and is used as the login mechanism, and [Stripe](https://stripe.com/) is used for payment processing.

The website is automatically tested with Travis CI on any changes, deploying automatically if tests pass.

Requirements
------------

Half Staff requires the following to run:

  * Ruby 2.3+

Usage
-----

First, install the dependencies:

```sh
bundle install
```

Next, initialize the database:

```sh
rake db:create db:migrate
```

Next, fetch the most recent presidential proclamations:

```sh
rake halfstaff:pull_notices
```

Next, run the development server

```sh
rails server
```

Visit the application at http://localhost:3000.

Contributing
------------

Your contributions are welcome!  Feel free to open an issue or pull request.

License
-------

Half Staff is licensed under the [MIT](https://github.com/jacobwgillespie/halfstaff/blob/master/LICENSE) license.  
Copyright &copy; 2016-2017, Jacob Gillespie
