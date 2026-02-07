import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import UploadView from "@/components/UploadView";
import ProcessingView from "@/components/ProcessingView";
import ResultsView from "@/components/ResultsView";

type AppView = "upload" | "processing" | "results";

const Index = () => {
  const [currentView, setCurrentView] = useState<AppView>("upload");

  const handleFilesUploaded = useCallback(() => {
    setCurrentView("processing");
  }, []);

  const handleProcessingComplete = useCallback(() => {
    setCurrentView("results");
  }, []);

  return (
    <div className="wealth-gradient-bg min-h-screen">
      <AnimatePresence mode="wait">
        {currentView === "upload" && (
          <UploadView key="upload" onFilesUploaded={handleFilesUploaded} />
        )}
        {currentView === "processing" && (
          <ProcessingView key="processing" onComplete={handleProcessingComplete} />
        )}
        {currentView === "results" && (
          <ResultsView key="results" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
