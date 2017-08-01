FROM ruby:2.4

RUN \
    bundle config --global frozen 1 && \
    mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Copy and install app
COPY Gemfile Gemfile.lock /usr/src/app/
RUN bundle install
COPY . /usr/src/app
RUN bundle exec rails assets:precompile

EXPOSE 3000
CMD bundle exec puma -t 5:5 -p 3000 -e production
