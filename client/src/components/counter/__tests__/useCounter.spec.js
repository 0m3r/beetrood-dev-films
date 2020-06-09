import React from 'react';
import useCounter from "../useCounter";
import {renderHook, act} from "@testing-library/react-hooks";
import  cases from 'jest-in-case';

test("useCounter", () => {
    const {result} = renderHook(useCounter);

    expect(result.current.count).toBe(0)
    act(() => {
        result.current.increment();
    });
    expect(result.current.count).toBe(1)
    act(() => {
        result.current.decrement();
    });
    expect(result.current.count).toBe(0)
})

cases(
    "useCounter",
    ({step, initialCount, postIncrement, postDecrement}) => {
        const { result } = renderHook(useCounter, {
            initialProps: {initialCount, step}
        })

        act(() => { result.current.increment() })
        expect(result.current.count).toBe(postIncrement)
        act(() => { result.current.decrement() })
        expect(result.current.count).toBe(postDecrement)
    }, {
        basic: {
            postIncrement: 1,
            postDecrement: 0,
        },
        initialCount: {
            initialCount: 2,
            postIncrement: 3,
            postDecrement: 2,
        },
        step: {
            step: 2,
            postIncrement: 2,
            postDecrement: 0,
        },
        "initial count and step": {
            initialCount: 5,
            step: 2,
            postIncrement: 7,
            postDecrement: 5,
        },
    }
)