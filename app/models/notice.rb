class Notice < ApplicationRecord
  has_many :notice_notifications, dependent: :destroy
  has_many :users, through: :notice_notifications

  scope :current, -> { where('start_date <= ? AND end_date >= ?', Date.today, Date.today) }
  scope :recent, -> { order(posted_date: :desc).limit(10) }

  before_validation :set_slug, unless: -> { slug? }

  def self.import_whitehouse(page = nil)
    data = Whitehouse::Crawler.flag_proclamations(page)
    data.map do |d|
      Notice.where(d.slice(:title, :hashid)).first_or_create do |notice|
        notice.assign_attributes(d)
      end
    end
  end

  def self.pull_notices
    import_whitehouse
  end

  def set_slug
    self.slug = "#{hashid}-#{title.gsub(/\s/, '-').gsub(/[^\w-]/, '').downcase}"
  end

  def to_param
    slug
  end

  def self.send_current_notifications
    current.each(&:send_notifications)
  end

  def send_notifications
    users_needing_notifications.each do |user|
      Sms.send(user.phone, sms_body)
      notice_notifications.create(user: user)
    end
  end

  def users_needing_notifications
    User.active.where(
      'id NOT IN (' +
      'SELECT user_id FROM notice_notifications WHERE notice_notifications.notice_id = ?' +
      ')',
      id,
    )
  end

  def sms_body
    body = "#{scope} flag lowered: ~!~ https://halfstaff.co/n/#{hashid}"
    details = "#{title}. #{summary}"
    body.gsub('~!~', details.truncate(160 - body.length + 3))
  end
end
