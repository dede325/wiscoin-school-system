
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface WalletCardProps {
  balance: number;
  lockedBalance: number;
}

export function WalletCard({ balance, lockedBalance }: WalletCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Wallet</CardTitle>
        <CardDescription>Your current Wiscoin balance</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold">{formatCurrency(balance)} WC</div>
          {lockedBalance > 0 && (
            <div className="text-sm text-muted-foreground">
              Locked: {formatCurrency(lockedBalance)} WC
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
