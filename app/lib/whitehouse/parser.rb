module Whitehouse
  class Parser
    MONTHS = %w(
      january february march april may june july august september october november december
    ).freeze
    END_TIMES = '(noon|sunset)'.freeze
    DATE = "(this )?((#{MONTHS.join('|')}) \\d{1,2},? \\d{4})".freeze
    RELATIVE_DATE = '(on (the|this)( \\w+)? day( of (interment))?)'.freeze
    UNTIL = "(until|through)( #{END_TIMES})?,? ((#{DATE})|#{RELATIVE_DATE})".freeze

    DATE_REGEX = Regexp.new(DATE, Regexp::IGNORECASE).freeze
    UNTIL_REGEX = Regexp.new(UNTIL, Regexp::IGNORECASE).freeze

    attr_reader :data

    def initialize(data)
      @data = data
    end

    def parse
      {
        body: body,
        end_date: end_date,
        end_time: end_time,
        hashid: hashid,
        html: html,
        notice_type: notice_type,
        posted_date: posted_date,
        scope: 'US',
        start_date: start_date,
        summary: summary,
        title: title,
        url: url,
      }
    end

    private

    def body
      @body ||= data['body'].
        map { |line| line.split("\n") }.
        flatten.
        map { |line| line.gsub(/^[\s\u00A0]+/, '').gsub(/[\s\u00A0]+$/, '') }.
        reject(&:empty?)
    end

    def body_content_lines
      @body_content_lines ||= body.reject { |line| line_centered?(line) }
    end

    def body_dates
      @body_dates ||= body_text.scan(DATE_REGEX).
        map { |r| r[1] }.
        map { |d| Date.parse(d) }
    end

    def body_text
      @body_text ||= body.join(' ')
    end

    def end_date
      @end_date ||= begin
        if until_body_date.nil?
          newest_date
        elsif until_body_date[5]
          Date.parse(until_body_date[5])
        elsif notice_type != 'interment'
          newest_date
        end
      end
    end

    def end_time
      @end_time ||= begin
        if until_body_date.nil? || until_body_date[1] == 'through'
          'end_of_day'
        else
          until_body_date[3]
        end
      end
    end

    def hashid
      HashidBuilder.encode(start_date.jd)
    end

    def html
      @html ||= body.
        map { |line| format_line(line) }.
        join
    end

    def newest_date
      @newest_date ||= body_dates.reduce(posted_date) do |memo, date|
        date > memo ? date : memo
      end
    end

    def notice_type
      @notice_type ||= begin
        if body_text.match? /on the day of interment/i
          'interment'
        else
          'date'
        end
      end
    end

    def posted_date
      @posted_date ||= Date.parse(data['date'])
    end

    def start_date
      @start_date ||= begin
        if until_body_date.nil?
          newest_date
        else
          posted_date
        end
      end
    end

    def summary
      @summary ||= body_content_lines.join(' ').truncate(600, separator: ' ')
    end

    def title
      @title ||= data['title'].gsub(/presidential proclamation( --|:)/i, '').strip
    end

    def until_body_date
      @until_body_date ||= body_text.match UNTIL_REGEX
    end

    def url
      @url ||= data['url']
    end

    # Utilities

    def format_line(line)
      if line_centered?(line)
        "<p class=\"centered\">#{line}</p>"
      else
        "<p>#{line}</p>"
      end
    end

    def line_centered?(line)
      line !~ /[a-z]/
    end
  end
end
