import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <title>ECOMMERCE</title>
        <meta
          name='description'
          content='Generated by create next app'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link
          rel='icon'
          href='https://cdn-icons-png.flaticon.com/512/8539/8539259.png'
        />
      </Head>
      <body /* style={{backgroundColor:'white'}} */>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
