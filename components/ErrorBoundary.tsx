"use client";

import React, { Component, ReactNode, ErrorInfo } from "react";
import { useToast } from "hooks/use-toast";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console or external service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-600 text-white rounded">
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function ErrorBoundaryWrapper({ children }: { children: ReactNode }) {
  const { toast } = useToast();

  React.useEffect(() => {
    function handleGlobalError(event: ErrorEvent) {
      toast({
        title: "An error occurred",
        description: event.message,
        variant: "destructive",
      });
      console.error("Global error:", event.error);
    }

    function handlePromiseRejection(event: PromiseRejectionEvent) {
      toast({
        title: "Unhandled promise rejection",
        description: event.reason?.message || String(event.reason),
        variant: "destructive",
      });
      console.error("Unhandled promise rejection:", event.reason);
    }

    window.addEventListener("error", handleGlobalError);
    window.addEventListener("unhandledrejection", handlePromiseRejection);

    return () => {
      window.removeEventListener("error", handleGlobalError);
      window.removeEventListener("unhandledrejection", handlePromiseRejection);
    };
  }, [toast]);

  return <ErrorBoundary>{children}</ErrorBoundary>;
}
