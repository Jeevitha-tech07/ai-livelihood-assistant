'use client';

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

interface AccordionItemProps {
  children: React.ReactNode;
  className?: string;
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
}

export function Accordion({ children, className }: AccordionProps) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}

export function AccordionItem({ children, className }: AccordionItemProps) {
  return (
    <div className={cn("border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden", className)}>
      {children}
    </div>
  );
}

export function AccordionTrigger({ children, className, isOpen, onToggle }: AccordionTriggerProps) {
  return (
    <button
      onClick={onToggle}
      type="button"
      className={cn(
        "flex w-full items-center justify-between p-4 font-semibold text-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-900 text-left",
        className
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          "w-4 h-4 shrink-0 text-slate-500 transition-transform duration-200",
          isOpen && "rotate-180 text-emerald-600"
        )}
      />
    </button>
  );
}

export function AccordionContent({ children, className, isOpen }: AccordionContentProps) {
  if (!isOpen) return null;
  return (
    <div className={cn("p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 animate-in fade-in duration-200", className)}>
      {children}
    </div>
  );
}
