// log the pageview with their URL
export const pageview = (url: unknown) => {
  window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "", {
    page_path: url,
  })
}

// log specific events happening.
export const event = ({action, params}: {action: any, params?: any}) => {
  window.gtag("event", action, params)
}