import {QRCodeSVG} from "qrcode.react";
import React, {useState} from "react";

export function Modal(linkQr) {
    function QRgenerator(props) {
        const [qr, setQr] = useState('https://statyla.ru/');
        const handleChange = (event) => {
            setQr(event.target.value);
        };
        const downloadQR = () => {
            const canvas = document.getElementById("myqr");
            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "myqr.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };

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
}}


