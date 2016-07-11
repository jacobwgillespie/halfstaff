namespace :halfstaff do
  desc 'Pull updates from flag notice sources'
  task pull_notices: :environment do
    Notice.pull_notices
  end

  desc 'Send current notifications'
  task send_notifications: :environment do
    Notice.send_current_notifications
  end
end
