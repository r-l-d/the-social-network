import React from "react";
import App from "./app";
import axios from "./axios";
import { render, waitForElement } from "@testing-library/react";

jest.mock("./axios");

test("App renders correctly", async () => {
    axios.get.mockResolvedValue({
        data: {
            id: 10,
            first: "Funky",
            last: "Chicken",
            image_url: "/funkychicken.png"
        }
    });
    const { container } = render(<App />);

    expect(container.innerHTML).toBe("");

    const elem = await waitForElement(() => container.querySelector("div"));

    expect(container.querySelectorAll("div").length).toBe(1);

    console.log("Container innerHTML is " + container.innerHTML);
});
