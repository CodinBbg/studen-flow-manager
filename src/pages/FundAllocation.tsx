import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  PieChart, 
  Plus, 
  Edit2, 
  Trash2, 
  DollarSign,
  Target,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
//main fxn
const FundAllocation = () => {
  const { toast } = useToast();

  // Read total funds from localStorage (set by Dashboard)
  const getInitialFunds = () => {
    const stored = localStorage.getItem("totalFunds");
    return stored ? Number(stored) : 15000;
  };
  const [totalFunds, setTotalFunds] = useState(getInitialFunds());
  useEffect(() => {
    const handleStorage = () => setTotalFunds(getInitialFunds());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const [allocations, setAllocations] = useState([
    { id: 1, category: "Housing", budgeted: 6000, spent: 800, color: "bg-blue-500" },
    { id: 2, category: "Food & Meals", budgeted: 3000, spent: 1200, color: "bg-green-500" },
    { id: 3, category: "Academic Materials", budgeted: 2000, spent: 235, color: "bg-purple-500" },
    { id: 4, category: "Transportation", budgeted: 1500, spent: 150, color: "bg-orange-500" },
    { id: 5, category: "Personal & Misc", budgeted: 1500, spent: 365, color: "bg-pink-500" },
    { id: 6, category: "Emergency Fund", budgeted: 1000, spent: 0, color: "bg-red-500" },
  ]);

  const [newCategory, setNewCategory] = useState({ name: "", amount: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const totalAllocated = allocations.reduce((sum, allocation) => sum + allocation.budgeted, 0);
  const totalSpent = allocations.reduce((sum, allocation) => sum + allocation.spent, 0);
  const remaining = totalFunds - totalAllocated;

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.amount) return;

    const amount = parseFloat(newCategory.amount);
    if (amount + totalAllocated > totalFunds) {
      toast({
        title: "Insufficient Funds",
        description: "The allocation exceeds your available funds.",
        variant: "destructive",
      });
      return;
    }

    const newAllocation = {
      id: Date.now(),
      category: newCategory.name,
      budgeted: amount,
      spent: 0,
      color: `bg-${["blue", "green", "purple", "orange", "pink", "red"][Math.floor(Math.random() * 6)]}-500`
    };

    setAllocations([...allocations, newAllocation]);
    setNewCategory({ name: "", amount: "" });
    toast({
      title: "Category Added",
      description: `${newCategory.name} has been added to your budget.`,
    });
  };

  const handleDeleteCategory = (id: number) => {
    setAllocations(allocations.filter(allocation => allocation.id !== id));
    toast({
      title: "Category Deleted",
      description: "The budget category has been removed.",
    });
  };

  const getSpentPercentage = (spent: number, budgeted: number) => {
    return budgeted > 0 ? (spent / budgeted) * 100 : 0;
  };

  const getStatusColor = (percentage: number) => {
    if (percentage < 50) return "text-success";
    if (percentage < 80) return "text-warning";
    return "text-danger";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Fund Allocation</h1>
        <p className="text-muted-foreground">Plan and track your semester budget</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:bg-card-hover transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Funds</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Kshs. {totalFunds.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Available for semester</p>
          </CardContent>
        </Card>

        <Card className="hover:bg-card-hover transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Allocated</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Kshs. {totalAllocated.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((totalAllocated / totalFunds) * 100).toFixed(1)}% of funds
            </p>
          </CardContent>
        </Card>

        <Card className="hover:bg-card-hover transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">Kshs. {totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {totalAllocated > 0 ? ((totalSpent / totalAllocated) * 100).toFixed(1) : 0}% of budget
            </p>
          </CardContent>
        </Card>

        <Card className="hover:bg-card-hover transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unallocated</CardTitle>
            <PieChart className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Kshs. {remaining.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((remaining / totalFunds) * 100).toFixed(1)}% remaining
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Categories</CardTitle>
              <CardDescription>Track spending across different categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {allocations.map((allocation) => {
                const percentage = getSpentPercentage(allocation.spent, allocation.budgeted);
                return (
                  <div key={allocation.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${allocation.color}`} />
                        <span className="font-medium">{allocation.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(percentage)}>
                          {percentage.toFixed(1)}%
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleDeleteCategory(allocation.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Kshs. {allocation.spent} spent</span>
                      <span>Kshs. {allocation.budgeted} budgeted</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Add New Category */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Budget Category
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input
                  id="category-name"
                  placeholder="e.g., Entertainment"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-amount">Budget Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-sm text-muted-foreground">Kshs.</span>
                  <Input
                    id="category-amount"
                    type="number"
                    placeholder="0.00"
                    value={newCategory.amount}
                    onChange={(e) => setNewCategory({ ...newCategory, amount: e.target.value })}
                    className="pl-12"
                  />
                </div>
              </div>
              <Button onClick={handleAddCategory} className="w-full">
                Add Category
              </Button>
            </CardContent>
          </Card>

          {/* Budget Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Total Available:</span>
                <span className="font-bold">Kshs. {totalFunds.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Allocated:</span>
                <span className="font-semibold text-primary">Kshs. {totalAllocated.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Spent:</span>
                <span className="font-semibold text-warning">Kshs. {totalSpent.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span>Remaining to Allocate:</span>
                  <span className={`font-bold ${remaining >= 0 ? 'text-success' : 'text-danger'}`}>Kshs. {remaining.toLocaleString()}</span>
                </div>
              </div>
              {remaining < 0 && (
                <div className="bg-danger-light border border-danger rounded-lg p-3">
                  <p className="text-sm text-danger-foreground font-medium">
                    Over-allocated by Kshs. {Math.abs(remaining).toLocaleString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FundAllocation;