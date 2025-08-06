import { QRCodeSVG } from 'qrcode.react';
import { useState, useRef, type ChangeEvent } from 'react';
import { downloadImage } from './DownloadImage';
import '../styles/App.css'

export const QRCode = () => {
    const [input, setInput] = useState<string>("");
    const qrCodeRef = useRef<HTMLDivElement>(null);

    const handleDownloadPNG = () => {
        if (qrCodeRef.current) {
        downloadImage(qrCodeRef.current, 'qr-code', 'png');
        }
    }

    const handleDownloadJPEG = () => {
        if (qrCodeRef.current) {
        downloadImage(qrCodeRef.current, 'qr-code', 'jpeg');
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    return (
        <div className="qr-container">
            <div className="qr-code">
                <div ref={qrCodeRef}>
                    <QRCodeSVG value={input} bgColor="transparent" fgColor="#000000" size={200} />
                </div>
                <p>Scan QR</p>
                <input value={input} onChange={handleInputChange} placeholder='URL' className='QRinput' />
                <button onClick={handleDownloadPNG}>Download PNG</button>
                <button onClick={handleDownloadJPEG}>Download JPEG</button>
            </div>
        </div>
    );
};