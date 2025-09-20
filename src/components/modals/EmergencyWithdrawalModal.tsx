import { useState } from "react";
import { AlertTriangle, DollarSign } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface EmergencyWithdrawalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmergencyWithdrawalModal({ open, onOpenChange }: EmergencyWithdrawalModalProps) {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Emergency Withdrawal Requested",
      description: `Kshs. ${amount} withdrawal request has been submitted for review.`,
    });

    setAmount("");
    setReason("");
    setIsProcessing(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-danger">
            <AlertTriangle className="w-5 h-5" />
            Emergency Withdrawal
          </DialogTitle>
          <DialogDescription>
            Emergency withdrawals bypass the 25% monthly limit but require justification. 
            These requests are subject to review and approval.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Withdrawal Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-sm text-muted-foreground">Kshs.</span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Emergency Withdrawal</Label>
            <Textarea
              id="reason"
              placeholder="Please explain why this emergency withdrawal is necessary..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="bg-warning-light border border-warning rounded-lg p-4">
            <p className="text-sm text-black font-bold">Warning</p>
            <p className="text-sm text-black">
              Emergency withdrawals are monitored and excessive use may result in loan restrictions.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              className="flex-1"
              disabled={isProcessing || !amount || !reason}
            >
              {isProcessing ? "Processing..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}