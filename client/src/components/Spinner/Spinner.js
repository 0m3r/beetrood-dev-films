import React from "react"
import './Spinner.css'

export default function Spinner() {

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                backgroundColor: "rgba(0,0,0,.8)",
                height: "100vh",
                width: "100%"
            }}
        >
            <div
                style={{ position: "absolute", top: "50%", left: "50%" }}
                alt="Spinner loader"
                className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}