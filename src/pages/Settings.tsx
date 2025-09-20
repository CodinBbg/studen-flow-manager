import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  AlertTriangle,
  Save,
  Mail,
  Phone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Profile settings
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    phone: "+1 (555) 123-4567",
    studentId: "STU12345",
    
    // Notification settings
    emailNotifications: true,
    smsNotifications: false,
    monthlyReports: true,
    lowBalanceAlerts: true,
    
    // Security settings
    twoFactorAuth: false,
    monthlySpendingLimit: 3750, // 25% of 15000
    emergencyWithdrawals: true,
    
    // Banking settings
    bankName: "University Credit Union",
    accountNumber: "****1234",
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={settings.firstName}
                  onChange={(e) => handleSettingChange("firstName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={settings.lastName}
                  onChange={(e) => handleSettingChange("lastName", e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleSettingChange("email", e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => handleSettingChange("phone", e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                value={settings.studentId}
                disabled
                className="bg-muted"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Control how you receive updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Receive transaction alerts via email
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Get text alerts for important transactions
                </p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Monthly Reports</Label>
                <p className="text-xs text-muted-foreground">
                  Receive monthly spending summaries
                </p>
              </div>
              <Switch
                checked={settings.monthlyReports}
                onCheckedChange={(checked) => handleSettingChange("monthlyReports", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Low Balance Alerts</Label>
                <p className="text-xs text-muted-foreground">
                  Warn when balance is running low
                </p>
              </div>
              <Switch
                checked={settings.lowBalanceAlerts}
                onCheckedChange={(checked) => handleSettingChange("lowBalanceAlerts", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security & Limits
            </CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-xs text-muted-foreground">
                  Add extra security to your account
                </p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="spendingLimit">Monthly Spending Limit</Label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-sm text-muted-foreground">Kshs.</span>
                <Input
                  id="spendingLimit"
                  type="number"
                  value={settings.monthlySpendingLimit}
                  onChange={(e) => handleSettingChange("monthlySpendingLimit", parseFloat(e.target.value) || 0)}
                  className="pl-12"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Maximum amount you can withdraw per month (25% of total funds)
              </p>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Emergency Withdrawals</Label>
                <p className="text-xs text-muted-foreground">
                  Allow emergency withdrawals above limit
                </p>
              </div>
              <Switch
                checked={settings.emergencyWithdrawals}
                onCheckedChange={(checked) => handleSettingChange("emergencyWithdrawals", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Banking Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Banking Information
            </CardTitle>
            <CardDescription>Your connected bank account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Bank Name</Label>
              <Input value={settings.bankName} disabled className="bg-muted" />
            </div>

            <div className="space-y-2">
              <Label>Account Number</Label>
              <Input value={settings.accountNumber} disabled className="bg-muted" />
            </div>

            <div className="bg-warning-light border border-warning rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-warning-foreground">
                    Banking Information
                  </p>
                  <p className="text-xs text-warning-foreground">
                    To update banking information, please contact student financial services.
                  </p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Contact Financial Services
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;