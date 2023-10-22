import {QRCodeSVG} from "qrcode.react";
import React from "react";
import QRgenerator from "../Article/qrcode";

export function Modal(linkQr) {

    return (

        <section className="modal hidden">
            <div className="flex">
                <button className="btn-close">⨉</button>
            </div>
            <div id={"qrcode"}>
                <QRgenerator props={linkQr}/>
            </div>
            <h2 id={"link"}>https://statyla.ru/article/{123}</h2>
        </section>
    )
}


