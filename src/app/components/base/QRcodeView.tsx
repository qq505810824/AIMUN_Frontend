import QRCode from 'qrcode.react';

export default function QRcodeView(props: any) {
    return (
        <>
            <QRCode value={props.link} size={180} />
        </>
    );
}
