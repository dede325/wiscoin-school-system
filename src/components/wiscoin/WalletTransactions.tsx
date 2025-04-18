
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { Transaction } from "@/modules/wiscoin/types/wiscoin";
import { format } from "date-fns";

interface WalletTransactionsProps {
  transactions: Transaction[];
  walletId: string;
}

export function WalletTransactions({ transactions, walletId }: WalletTransactionsProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((tx) => (
          <TableRow key={tx.id}>
            <TableCell>
              {format(new Date(tx.created_at), 'MMM d, yyyy HH:mm')}
            </TableCell>
            <TableCell className="capitalize">{tx.type}</TableCell>
            <TableCell className={tx.recipient_wallet_id === walletId ? 'text-green-600' : 'text-red-600'}>
              {tx.recipient_wallet_id === walletId ? '+' : '-'}
              {formatCurrency(tx.amount)} WC
            </TableCell>
            <TableCell>{tx.description || '-'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
