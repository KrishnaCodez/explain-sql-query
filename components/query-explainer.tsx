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
import { explainQuery } from "@/utils/actions";
import { apiKeyManager } from "@/utils/get-key";

export default function QueryExplainer() {
  const [query, setQuery] = useState("");
  const [explanations, setExplanations] = useState<
    { part: string; explanation: string }[]
  >([]);
  const [isExplaining, setIsExplaining] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isKeySet, setIsKeySet] = useState(false);

  useEffect(() => {
    const storedKey = apiKeyManager.getApiKey();
    setIsKeySet(!!storedKey);
  }, []);

  const handleExplain = useCallback(async () => {
    if (!query.trim()) return;

    setIsExplaining(true);
    try {
      const storedKey = apiKeyManager.getApiKey();
      if (!storedKey) {
        throw new Error(
          "API key not found. Please add your Google API key to continue."
        );
      }

      const result = await explainQuery(query, storedKey);
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
          <span className="cursor-help  px-1 rounded transition-colors">
            {item.part}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px]  ">
          <p>{item.explanation}</p>
        </TooltipContent>
      </Tooltip>
    ));
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 ">
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your SQL query here"
            className="flex-grow font-mono   "
          />
          {query && !explanations.length && (
            <Button
              onClick={handleExplain}
              disabled={isExplaining}
              className="  "
            >
              {isExplaining ? "Explaining..." : "Explain"}
            </Button>
          )}
        </div>

        {explanations.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm ">
              Explanation is ready! Hover over different parts to see
              explanation
            </h2>
            <TooltipProvider>
              <div className="p-4  border  rounded font-mono  whitespace-pre-wrap">
                {renderQueryWithTooltips()}
              </div>
            </TooltipProvider>
          </div>
        )}
      </div>
    </div>
  );
}
