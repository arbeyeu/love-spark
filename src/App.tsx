import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { JourneyProvider } from "./context/JourneyContext";

import Home from "./pages/Home";
import FictionalMatch from "./pages/FictionalMatch";
import Compatibility from "./pages/Compatibility";
import ProposalForm from "./pages/ProposalForm";
import ProposalView from "./pages/ProposalView";
import DatePlanner from "./pages/DatePlanner";
import SongGenerator from "./pages/SongGenerator";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <JourneyProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fictional-match" element={<FictionalMatch />} />
            <Route path="/compatibility" element={<Compatibility />} />
            <Route path="/proposal-form" element={<ProposalForm />} />
            <Route path="/proposal-view" element={<ProposalView />} />
            <Route path="/date-planner" element={<DatePlanner />} />
            <Route path="/song-generator" element={<SongGenerator />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </JourneyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
