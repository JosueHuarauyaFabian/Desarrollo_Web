import React, { useState, useEffect } from "react";
import styles from "./Weather.module.css";

interface WeatherProps {
    weather: string;
    temp: number;
}

const WeatherComponent: React.FC<WeatherProps> = ({ weather, temp }) => {
    const [count, setCount] = useState<number>(() => {
        if (typeof window !== "undefined") {
            const savedCount = localStorage.getItem("count");
            return savedCount ? parseInt(savedCount) : 0;
        }
        return 0;
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("count", count.toString());
        }
    }, [count]);

    return (
        <div className={styles.weatherContainer}>
            <h1 onClick={() => setCount(count + 1)}>
                El clima es {weather}, la temperatura es {temp}°C, y el contador muestra {count}
            </h1>
        </div>
    );
};

export default WeatherComponent;
