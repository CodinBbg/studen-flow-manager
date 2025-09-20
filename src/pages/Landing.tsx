import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  Shield, 
  TrendingUp, 
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Fund Management",
      description: "Bank-level security to protect your student loan funds"
    },
    {
      icon: TrendingUp,
      title: "Smart Spending Limits",
      description: "Automatic 25% monthly limits to ensure funds last"
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Monitor your spending and balance in real-time"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">StudentFunds</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Manage Your Student Loans
            <span className="text-primary block">Responsibly</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take control of your student loan funds with smart spending limits, 
            real-time tracking, and emergency withdrawal protection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/signup" className="flex items-center gap-2">
                Start Managing Funds <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/login">Already have an account?</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose StudentFunds?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built specifically for students to manage loan funds responsibly and avoid overspending.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Smart Financial Management</h2>
              <div className="space-y-4">
                {[
                  "Automatic 25% monthly spending limits",
                  "Emergency withdrawal protection",
                  "Real-time balance tracking",
                  "Transaction categorization",
                  "Spending alerts and notifications"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-background p-8 rounded-lg shadow-lg">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Balance</span>
                  <span className="font-bold text-success">Kshs. 12,350</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Monthly Limit: Kshs. 3,750</span>
                  <span>18 days left</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 StudentFunds. Built for responsible student loan management.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;