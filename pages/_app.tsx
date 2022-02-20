import "styles/index.scss"
import type {AppProps} from "next/app"

export const WEBSITE_TITLE = "케이팝 고인물 테스트"

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
