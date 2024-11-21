import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from './Hello.module.css';

const Hello: NextPage = () => {
    return (
        <div className={styles.helloContainer}>
            <Head>
                <title>Hello Page</title>
                <meta name="description" content="This is the hello page" />
                <meta property="og:title" content="Hello World" key="title" />
            </Head>
            <div>Hello World!</div>
            <div>
                Usa el ancla de HTML para un <a href="https://nostarch.com">enlace externo</a> y el componente Link para una{" "}
                <Link href="/components/weather">pagina interna</Link>.
                <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </div>
        </div>
    );
};

export default Hello;
