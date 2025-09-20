import { useState } from "react";
import { 
  LayoutDashboard, 
  History, 
  PiggyBank, 
  Settings, 
  HelpCircle,
  AlertTriangle,
  DollarSign
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Transfer History", url: "/history", icon: History },
  { title: "Fund Allocation", url: "/allocation", icon: PiggyBank },
];

const otherItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help", url: "/help", icon: HelpCircle },
];

interface AppSidebarProps {
  onEmergencyWithdraw: () => void;
}

export function AppSidebar({ onEmergencyWithdraw }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary-light text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-accent text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-surface border-r border-border">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-semibold text-foreground">StudentFunds</h2>
                <p className="text-xs text-muted-foreground">Loan Manager</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Emergency Withdrawal Button */}
        <div className="px-4 py-2">
          <Button 
            variant="destructive" 
            size={isCollapsed ? "icon" : "default"}
            className="w-full"
            onClick={onEmergencyWithdraw}
          >
            <AlertTriangle className="w-4 h-4" />
            {!isCollapsed && <span className="ml-2">Emergency Withdrawal</span>}
          </Button>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Other</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {otherItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}