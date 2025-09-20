import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Send, Briefcase, Banknote, Building2, ArrowRight } from "lucide-react";

const paymentOptions = [
  {
    label: "Send Money",
    description: "Send funds directly to another mobile number.",
    icon: Send,
  },
  {
    label: "Pochi La Biashara",
    description: "Pay to a business till (Mpesa).",
    icon: Briefcase,
  },
  {
    label: "Paybill",
    description: "Pay to a registered Paybill number.",
    icon: Banknote,
  },
  {
    label: "Till Number",
    description: "Pay to a merchant till number.",
    icon: Building2,
  },
  {
    label: "Bank Transfer",
    description: "Transfer funds to a bank account.",
    icon: CreditCard,
  },
];

const Transactions = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">In-App Purchases</h1>
        <p className="text-muted-foreground">Choose your preferred payment plan</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentOptions.map((option) => (
          <Card key={option.label} className="hover:bg-card-hover transition-colors">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <option.icon className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="text-lg font-semibold">{option.label}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full flex items-center justify-between">
                Select <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
