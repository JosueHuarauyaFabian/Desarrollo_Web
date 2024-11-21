/**
 * @jest-environment jsdom
 */

import { act, create } from "react-test-renderer";
import PageComponentWeather from "../../../pages/components/weather";

describe("PageComponentWeather", () => {
    // Primera prueba: renderización inicial
    test("renders correctly", async () => {
        let component: any;

        await act(async () => {
            component = await create(<PageComponentWeather />);
        });

        expect(component.toJSON()).toMatchSnapshot();
    });

    // Segunda prueba: simula un clic y actualiza el estado
    test("clicks the h1 element and updates the state", async () => {
        let component: any;

        await act(async () => {
            component = await create(<PageComponentWeather />);
            component.root.findByType("h1").props.onClick();
        });

        expect(component.toJSON()).toMatchSnapshot();
    });
});
