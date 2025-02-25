"use client";
import { apiKeyManager } from "@/utils/get-key";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Settings2 } from "lucide-react";

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
    <div className="relative flex justify-center w-full ">
      <nav className="border rounded-md absolute w-[97%] mt-5 mx-auto max-md:w-[92%] bg-card/80 backdrop-blur-md z-10">
        <div className=" mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl text-muted-background font-sans font-medium max-md:text-xl">
              ExplainSQL
            </h1>
            <div className="flex items-center gap-4">
              {!isKeySet ? (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Settings2 />
                      Add API Key
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add API Key</DialogTitle>
                      <DialogDescription>
                        Enter your Google API key to use the SQL explainer
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                      <Input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter Google API Key"
                        className="w-full"
                        required
                      />
                      <div className="flex justify-end gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Save API Key</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-green-600 font-medium">
                    API Key is set ✓
                  </span>
                  <Button
                    onClick={handleRemove}
                    variant="destructive"
                    size="sm"
                  >
                    Remove API Key
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
