import React from "react";
import {render, fireEvent} from "@testing-library/react";
import Featured from "../Featured";
import FilmContext from "../../context/FilmContext";
import {toHaveClass} from "@testing-library/jest-dom/dist/to-have-class";

expect.extend({toHaveClass})

const toggleFeatured = jest.fn();

const RenderComponent = props => (
    <FilmContext.Provider value={{toggleFeatured}}>
        <Featured {...props} />
    </FilmContext.Provider>
);

test("should correct render FeaturedComponent", () => {
    const {container, rerender} = render(
    <RenderComponent id="3" featured={false} />,
);
    const spanEl = container.querySelector("span");
    const iEl = container.querySelector("i");

    expect(iEl).toHaveClass("empty");
    expect(iEl).not.toHaveClass("yellow");

    fireEvent.click(spanEl);
    expect(toggleFeatured).toHaveBeenCalledTimes(1);
    expect(toggleFeatured).toHaveBeenCalledWith("3");

    rerender(<RenderComponent id="3" featured={true} />);

    expect(iEl).toHaveClass("yellow");
    expect(iEl).not.toHaveClass("empty");
});