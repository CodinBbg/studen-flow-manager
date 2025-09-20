import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Download, Calendar } from "lucide-react";

const TransferHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock data - would come from API
  const transactions = [
    {
      id: "TXN001",
      date: "2024-09-18",
      description: "Textbooks Purchase - Barnes & Noble",
      category: "Academic",
      amount: -235.00,
      status: "completed",
      balance: 12350.00,
      type: "regular"
    },
    {
      id: "TXN002",
      date: "2024-09-15",
      description: "Monthly Meal Plan",
      category: "Food",
      amount: -450.00,
      status: "completed",
      balance: 12585.00,
      type: "regular"
    },
    {
      id: "TXN003",
      date: "2024-09-10",
      description: "Emergency Medical Expense",
      category: "Medical",
      amount: -750.00,
      status: "completed",
      balance: 13035.00,
      type: "emergency"
    },
    {
      id: "TXN004",
      date: "2024-09-01",
      description: "Housing Payment - Dormitory",
      category: "Housing",
      amount: -800.00,
      status: "completed",
      balance: 13785.00,
      type: "regular"
    },
    {
      id: "TXN005",
      date: "2024-08-28",
      description: "Laboratory Equipment",
      category: "Academic",
      amount: -125.00,
      status: "pending",
      balance: 14585.00,
      type: "regular"
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success-light text-success">Completed</Badge>;
      case "pending":
        return <Badge className="bg-warning-light text-warning">Pending</Badge>;
      case "failed":
        return <Badge className="bg-danger-light text-danger">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    return type === "emergency" ? (
      <Badge variant="destructive">Emergency</Badge>
    ) : (
      <Badge variant="outline">Regular</Badge>
    );
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || transaction.category.toLowerCase() === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Transfer History</h1>
        <p className="text-muted-foreground">View and manage your transaction history</p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="housing">Housing</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            {filteredTransactions.length} transactions found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-accent">
                    <TableCell className="font-mono text-sm">
                      {transaction.date}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">ID: {transaction.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.category}</Badge>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(transaction.type)}
                    </TableCell>
                    <TableCell className="font-mono">
                      <span className="text-danger font-semibold">
                        Kshs. {Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transaction.status)}
                    </TableCell>
                    <TableCell className="font-mono text-success font-semibold">
                      Kshs. {transaction.balance.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferHistory;