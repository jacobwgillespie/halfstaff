module Whitehouse
  class Crawler
    BASE_URL = 'https://www.whitehouse.gov'.freeze

    class << self
      def flag_proclamations(page = nil)
        urls = proclamation_links(page)

        proclamations = urls.map { |u| proclamation(u) }

        proclamations = proclamations.select do |proclamation|
          proclamation['body'].find_index do |line|
            line.match(/half[\s-]staff/i)
          end
        end

        proclamations.map { |proclamation| Whitehouse::Parser.new(proclamation).parse }
      end

      private

      def proclamation_links(page = nil)
        query = page ? "?page=#{page}" : ''

        links = Wombat.crawl do
          base_url BASE_URL
          path "/briefing-room/presidential-actions/proclamations#{query}"

          links({ xpath: '//h3/a/@href' }, :list)
        end['links']

        links
      end

      def proclamation(url)
        proclamation = Wombat.crawl do
          base_url BASE_URL
          path url

          title css: '.pane-node-title h1'
          date css: '.press-article-date'

          body({ css: '#content-start .field-items p' }, :list)
        end

        proclamation['url'] = "#{BASE_URL}#{url}"

        proclamation
      end

      def parse_proclamation(data)
        ProclamationParser::Whitehouse.new(data).parse
      end
    end
  end
end
