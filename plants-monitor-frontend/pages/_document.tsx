import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link href="https://fonts.cdnfonts.com/css/google-sans" rel="stylesheet" />
                </Head>
                <body>
                    <div className="app-background">
                        <div className="app-background-blur" />
                    </div>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
