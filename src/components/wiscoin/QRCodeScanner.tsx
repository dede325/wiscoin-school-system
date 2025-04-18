
import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface QRCodeScannerProps {
  onScan: (data: string) => void;
}

export function QRCodeScanner({ onScan }: QRCodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (isScanning && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          onScan(decodedText);
          setIsScanning(false);
          scannerRef.current?.clear();
        },
        (error) => {
          console.error(error);
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    };
  }, [isScanning, onScan]);

  return (
    <div className="grid gap-4">
      <Button
        variant={isScanning ? "destructive" : "default"}
        onClick={() => setIsScanning(!isScanning)}
      >
        {isScanning ? "Stop Scanning" : "Start Scanning"}
      </Button>
      <div id="reader" className="w-full max-w-sm mx-auto" />
    </div>
  );
}
