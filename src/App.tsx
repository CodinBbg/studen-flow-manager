import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { EmergencyWithdrawalModal } from "@/components/modals/EmergencyWithdrawalModal";
import Dashboard from "./pages/Dashboard";
import TransferHistory from "./pages/TransferHistory";
import FundAllocation from "./pages/FundAllocation";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
              <AppSidebar onEmergencyWithdraw={() => setEmergencyModalOpen(true)} />
              
              <div className="flex-1 flex flex-col">
                <Header />
                
                <main className="flex-1 p-6">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/history" element={<TransferHistory />} />
                    <Route path="/allocation" element={<FundAllocation />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>

            <EmergencyWithdrawalModal 
              open={emergencyModalOpen}
              onOpenChange={setEmergencyModalOpen}
            />
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
