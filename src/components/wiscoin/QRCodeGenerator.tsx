
import { useState } from 'react';
import QRCode from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { wiscoinService } from '@/modules/wiscoin/services/wiscoinService';
import { toast } from '@/hooks/use-toast';

interface QRCodeGeneratorProps {
  walletId: string;
}

export function QRCodeGenerator({ walletId }: QRCodeGeneratorProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [paymentRequest, setPaymentRequest] = useState<{ id: string } | null>(null);

  const handleGenerateQR = async () => {
    try {
      const request = await wiscoinService.createPaymentRequest(
        walletId,
        parseFloat(amount),
        description
      );
      setPaymentRequest(request);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate payment request"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Payment QR Code</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Input
          type="number"
          placeholder="Amount (WC)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={handleGenerateQR} disabled={!amount}>
          Generate QR Code
        </Button>
        {paymentRequest && (
          <div className="flex justify-center p-4">
            <QRCode value={paymentRequest.id} size={200} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
