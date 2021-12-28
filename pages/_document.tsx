import { Head, Html, Main, NextScript } from 'next/document';

const MyDocument = (): JSX.Element => {
  const url = '<https://example.com>';
  const title = '品詞クイズ';
  const description =
    '英語の品詞クイズです！出題される英単語がどの品詞に当てはまるか当てましょう！';

  return (
    <Html lang='ja-JP'>
      <Head>
        <meta name='description' content={description} />
        <meta name='theme-color' content='#333' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={title} />
        <meta property='og:url' content={url} />
        <meta property='og:description' content={description} />
        <meta property='og:site_name' content={title} />
        <meta property='og:image' content={`${url}/ogp.png`} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='format-detection' content='telephone=no' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
