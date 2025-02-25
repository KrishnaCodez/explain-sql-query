"use client";
import { apiKeyManager } from "@/utils/get-key";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const Navbar = () => {
  const [apiKey, setApiKey] = useState("");
  const [isKeySet, setIsKeySet] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    apiKeyManager.setApiKey(apiKey);
    setIsKeySet(true);
    setApiKey("");
    setOpen(false);
  };

  const handleRemove = () => {
    apiKeyManager.removeApiKey();
    setIsKeySet(false);
  };

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold">SQL Query Explainer</h1>
          <div className="flex items-center gap-4">
            {!isKeySet ? (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline">Add API Key</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">API Key</h4>
                      <p className="text-sm text-muted-foreground">
                        Enter your Google API key to use the SQL explainer
                      </p>
                    </div>
                    <Input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter Google API Key"
                      className="w-full"
                      required
                    />
                    <Button type="submit" className="w-full">
                      Save API Key
                    </Button>
                  </form>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm text-green-600 font-medium">
                  API Key is set ✓
                </span>
                <Button onClick={handleRemove} variant="destructive" size="sm">
                  Remove API Key
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
