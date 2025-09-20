import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  AlertCircle,
  PieChart,
  Clock
} from "lucide-react";

const Dashboard = () => {
  // User-editable total funds, persisted in localStorage
  const getInitialFunds = () => {
    const stored = localStorage.getItem("totalFunds");
    return stored ? Number(stored) : 15000;
  };
  const [totalFunds, setTotalFunds] = useState(getInitialFunds());
  const [inputFunds, setInputFunds] = useState(getInitialFunds());

  // Persist totalFunds to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("totalFunds", String(totalFunds));
  }, [totalFunds]);

  const currentBalance = 12350;
  const monthlyLimit = totalFunds * 0.25; // 25% monthly limit
  const monthlySpent = 1850;
  const remainingThisMonth = monthlyLimit - monthlySpent;
  const daysInMonth = 30;
  const daysRemaining = 18;

  const spentPercentage = (monthlySpent / monthlyLimit) * 100;
  const totalUsedPercentage = ((totalFunds - currentBalance) / totalFunds) * 100;

  const recentTransactions = [
    { id: 1, description: "Textbooks Purchase", amount: -235, date: "2024-09-18", category: "Academic" },
    { id: 2, description: "Meal Plan", amount: -450, date: "2024-09-15", category: "Food" },
    { id: 3, description: "Housing Payment", amount: -800, date: "2024-09-01", category: "Housing" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Manage your student loan funds effectively</p>
      </div>

      {/* Total Funds Input & Import */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <form
          onSubmit={e => {
            e.preventDefault();
            setTotalFunds(Number(inputFunds) || 0);
          }}
          className="flex gap-2 items-center"
        >
          <label htmlFor="funds-input" className="font-medium">Total Funds Allocated:</label>
          <Input
            id="funds-input"
            type="number"
            min="0"
            value={inputFunds}
            onChange={e => setInputFunds(Number(e.target.value))}
            className="w-32"
          />
          <button type="submit" className="px-3 py-1 rounded bg-primary text-white">Update</button>
        </form>
        <div className="flex gap-2 mt-2 md:mt-0">
          <button className="px-3 py-1 rounded bg-accent text-foreground" disabled title="Mpesa integration coming soon">Import from Mpesa</button>
          <button className="px-3 py-1 rounded bg-accent text-foreground" disabled title="Bank integration coming soon">Import from Bank</button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:bg-card-hover transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Kshs. {currentBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              of Kshs. {totalFunds.toLocaleString()} allocated
            </p>
          </CardContent>
        </Card>

        <Card className="hover:bg-card-hover transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Limit</CardTitle>
            <PieChart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Kshs. {monthlyLimit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              25% of total funds
            </p>
          </CardContent>
        </Card>

        <Card className="hover:bg-card-hover transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining This Month</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">Kshs. {remainingThisMonth.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {daysRemaining} days left
            </p>
          </CardContent>
        </Card>

        <Card className="hover:bg-card-hover transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Funds Used</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsedPercentage.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Kshs. {(totalFunds - currentBalance).toLocaleString()} spent
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Spending Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Monthly Spending Progress
            </CardTitle>
            <CardDescription>
              Track your spending against the 25% monthly limit
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Spent this month</span>
                <span className="font-medium">Kshs. {monthlySpent} / Kshs. {monthlyLimit}</span>
              </div>
              <Progress value={spentPercentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{spentPercentage.toFixed(1)}% used</span>
                <span>{daysRemaining} days remaining</span>
              </div>
            </div>
            
            {spentPercentage > 75 && (
              <div className="flex items-center gap-2 p-3 bg-warning-light rounded-lg">
                <AlertCircle className="h-4 w-4 text-warning" />
                <p className="text-sm text-warning-foreground">
                  You've used {spentPercentage.toFixed(1)}% of your monthly limit
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your latest fund withdrawals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{transaction.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {transaction.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{transaction.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-danger">
                      Kshs. {Math.abs(transaction.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;