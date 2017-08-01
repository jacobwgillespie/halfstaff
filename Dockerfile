FROM ruby:2.4-alpine

RUN \
    apk add --update \
      build-base \
      libxml2-dev \
      libxslt-dev \
      postgresql-dev && \
    rm -rf /var/cache/apk/* && \
    bundle config --global frozen 1 && \
    mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Copy and install app
COPY Gemfile Gemfile.lock /usr/src/app/
RUN bundle install
COPY . /usr/src/app

EXPOSE 3000
CMD bundle exec puma -t 5:5 -p 3000 -e production
