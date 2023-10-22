import QRcode from 'qrcode.react'
import {useState} from "react";
// import {Fab, TextField, TextareaAutosize, Grid} from '/node_modules/@material-ui/core'
// import {ArrowBack, GetApp} from '@material-ui/icons'
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
    // let abc = document.
    return (
        <div>
            <span>QR Generator</span>

            <div style={{marginTop:30}}>
                <input onChange={handleChange} style={{width:320}}
                           value={qr}  size="large" color="primary"
                />
            </div>

            <div>
                {
                    qr ?
                        <QRcode
                            id="myqr"
                            value={qr+props}
                            size={320}
                            includeMargin={true}
                        /> :
                        <p>No QR code preview</p>
                }
            </div>
        </div>
    );
}

export default QRgenerator;