import React from "react";
import LoginForm from "../LoginForm";
// import ReactDOM from "react-dom";
import {MemoryRouter} from "react-router-dom";
import { toHaveAttribute, toHaveTextContent} from "@testing-library/jest-dom/matchers";
// import {queries, getQueriesForElement} from "@testing-library/dom";
import {render} from "@testing-library/react"

expect.extend({toHaveAttribute, toHaveTextContent})

// function render(ui) {
//     const container = document.createElement('div');
//     ReactDOM.render(ui, container);
//     const queries = getQueriesForElement(container)
//     return {...queries, container}
// }

// test("LoginFrom  should render correct", () => {
//     const div  = document.createElement("div");
//     ReactDOM.render(
//         <MemoryRouter>
//             <LoginForm />
//         </MemoryRouter>
//     , div);
//
//     // expect(div.querySelector("#email").type).toBe("email")
//     // expect(div.querySelector("#email")).toHaveAttribute('type', "email")
//     // expect(div.querySelector("label")).toHaveTextContent("Email")
//
//     // const emailEl = queries.getByLabelText(div, /email/i);
//     const {getByLabelText} = render(div);
//     const emailEl =   getByLabelText(/email/i);
//     expect(emailEl).toHaveAttribute('type', 'email');
// })

test("LoginForm should render correct", () => {
    const { getByLabelText } = render(
        <MemoryRouter>
        <LoginForm />
        </MemoryRouter>
    );
    const emailEl = getByLabelText(/email/i)
    expect(emailEl).toHaveAttribute("type", "email");
})

test("Debug dom", () => {
    const {debug} =  render(
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>
        );
    debug();
});


test("Snapshot ", () => {
    const { container } = render(
        <MemoryRouter>
        <LoginForm />
        </MemoryRouter>
    );

    expect(container.firstChild).toMatchSnapshot()
})
