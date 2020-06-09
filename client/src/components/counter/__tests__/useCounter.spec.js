import React from 'react';
import useCounter from "../useCounter";
import {renderHook, act} from "@testing-library/react-hooks";

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