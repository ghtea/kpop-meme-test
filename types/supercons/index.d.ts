declare module "supercons" {
  type IconProps = {
    size?: number
    glyph?: IconGlyph
    as?: any
  }

  type IconGlyph = 
  "admin" | "admin-badge" | "align-center" | "align-left" | "align-right" | "analytics" | "announcement" | "attachment" | "back" | "bag" | "bag-add" | "bag-fill" | "bag-remove" | "bank" | "battery" | "battery-bolt" | 
  "battery-fill" | "bolt" | "bolt-circle" | "bolt-docs" | "briefcase" | "bug" | "bug-fill" | "card" | "card-add" | "channel" | "channel-private" | "channels" | "checkbox" | "checkmark" | "clock" | "clock-fill" | 
  "cloud" | "cloud-download" | "cloud-upload" | "code" | "community" | "compass" | "controls" | "copy" | "copy-check" | "crosshairs" | "delete" | "docs" | "docs-fill" | "door-enter" | "door-leave" | "down" | 
  "down-caret" | "down-fill" | "edit" | "email" | "email-fill" | "embed" | "emoji" | "enter" | "event-add" | "event-cancel" | "event-check" | "event-code" | "event-like" | "event-move" | "everything" | "expand" | 
  "explore" | "external" | "external-fill" | "facebook" | "facebook-fill" | "figma" | "figma-fill" | "filter" | "filter-fill" | "flag" | "flag-fill" | "food" | "forbidden" | "forward" | "freeze" | "friend" | 
  "github" | "github-fill" | "google" | "google-fill" | "grid" | "help" | "history" | "home" | "idea" | "important" | "important-fill" | "info" | "inserter" | "instagram" | "instagram-fill" | "leader" | 
  "like" | "like-fill" | "link" | "list" | "map-app" | "map-pin" | "markdown" | "medium" | "medium-fill" | "meh" | "member-add" | "member-remove" | "mention" | "menu" | "message" | "message-fill" | 
  "message-new" | "message-simple" | "message-simple-fill" | "message-simple-new" | "messenger" | "messenger-fill" | "minus" | "minus-fill" | "moon" | "moon-fill" | "more" | "more-fill" | "mute" | "notification" | "notification-fill" | "payment" | 
  "payment-docs" | "payment-transfer" | "person" | "person-card" | "phone" | "phone-bolt" | "phone-vibrate" | "photo" | "photo-fill" | "pin" | "pin-fill" | "plus" | "plus-fill" | "post" | "post-cancel" | "post-fill" | 
  "private" | "private-outline" | "private-unlocked" | "profile" | "profile-fill" | "quote" | "relaxed" | "rep" | "reply" | "right-caret" | "rss" | "sad" | "sam" | "search" | "send" | "send-fill" | 
  "settings" | "share" | "shirt" | "shirt-fill" | "slack" | "slack-fill" | "sticker" | "support" | "support-fill" | "terminal" | "thread" | "thumbsdown" | "thumbsdown-fill" | "thumbsup" | "thumbsup-fill" | "transactions" | 
  "tv" | "tv-fill" | "twitch" | "twitch-fill" | "twitter" | "twitter-fill" | "up" | "up-caret" | "up-fill" | "view" | "view-back" | "view-close" | "view-close-small" | "view-fill" | "view-forward" | "view-hide" | 
  "view-reload" | "web" | "welcome" | "wifi" | "youtube" | "youtube-fill" | "zoom-in" | "zoom-out"

  const Icon: React.FunctionComponent<IconProps>

  export = Icon
}