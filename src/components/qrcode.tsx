import { QRCode } from 'react-qr-code';

interface QrcodeProps {
  value: string;
}

const Qrcode = ({ value }: QrcodeProps) => {
    return (
        <QRCode value={value} />
    );
};

export default Qrcode;