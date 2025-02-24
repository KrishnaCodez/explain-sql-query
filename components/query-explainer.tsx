"use client";

import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { explainQuery } from "@/app/actions";

export default function QueryExplainer() {
  const [query, setQuery] = useState("");
  const [explanations, setExplanations] = useState<
    { part: string; explanation: string }[]
  >([]);
  const [isExplaining, setIsExplaining] = useState(false);

  const handleExplain = useCallback(async () => {
    if (!query.trim()) return;

    setIsExplaining(true);
    try {
      const result = await explainQuery(query);
      setExplanations(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExplaining(false);
    }
  }, [query]);

  useEffect(() => {
    setExplanations([]);
  }, []);

  const renderQueryWithTooltips = () => {
    if (explanations.length === 0) return query;

    return explanations.map((item, index) => (
      <Tooltip key={index}>
        <TooltipTrigger asChild>
          <span className="cursor-help hover:bg-gray-700 px-1 rounded transition-colors">
            {item.part}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px] bg-gray-900 text-gray-100 border-gray-800">
          <p>{item.explanation}</p>
        </TooltipContent>
      </Tooltip>
    ));
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your SQL query here"
            className="flex-grow font-mono bg-gray-900 border-gray-800 text-gray-100"
          />
          {query && !explanations.length && (
            <Button
              onClick={handleExplain}
              disabled={isExplaining}
              className="bg-gray-800 hover:bg-gray-700 text-gray-100"
            >
              {isExplaining ? "Explaining..." : "Explain"}
            </Button>
          )}
        </div>
        {explanations.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm text-gray-400">
              Explanation is ready! Hover over different parts to see
              explanation
            </h2>
            <TooltipProvider>
              <div className="p-4 bg-gray-900 border border-gray-800 rounded font-mono text-gray-100 whitespace-pre-wrap">
                {renderQueryWithTooltips()}
              </div>
            </TooltipProvider>
          </div>
        )}
      </div>
    </div>
  );
}
