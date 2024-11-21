import type { NextPage } from "next";
import WeatherComponent from "../components/WeatherComponent";

export async function getStaticProps() {
    const temp = 35; // Simulación de datos de temperatura obtenidos de una API
    return {
        props: { temp },
        revalidate: 30, // ISR cada 30 segundos
    };
}

const WeatherPage: NextPage<{ temp: number }> = ({ temp }) => {
    return <WeatherComponent weather="sunny" temp={temp} />;
};

export default WeatherPage;
