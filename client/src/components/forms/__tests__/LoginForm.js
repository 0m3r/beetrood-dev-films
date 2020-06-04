import React from "react";
import LoginForm from "../LoginForm";
import ReactDOM from "react-dom";
import {MemoryRouter} from "react-router-dom";

test("LoginFrom  should render correct", () => {
    const div  = document.createElement("div");
    ReactDOM.render(
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>
    , div);

    expect(div.querySelector("#email").type).toBe("email")
})