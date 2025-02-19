"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { explainQuery } from "@/app/actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function QueryExplainer() {
  const [query, setQuery] = useState("")
  const [explanations, setExplanations] = useState<{ part: string; explanation: string }[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleExplain = async () => {
    try {
      setError(null)
      const result = await explainQuery(query)
      setExplanations(result)
    } catch (err) {
      console.error(err)
      setError("An error occurred while explaining the query. Please try again.")
    }
  }

  const renderQueryWithTooltips = () => {
    if (explanations.length === 0) return query

    return explanations.map((item, index) => (
      <Tooltip key={index}>
        <TooltipTrigger asChild>
          <span className="underline cursor-help">{item.part}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{item.explanation}</p>
        </TooltipContent>
      </Tooltip>
    ))
  }

  return (
    <div className="space-y-4">
      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter your SQL query here" />
      <Button onClick={handleExplain}>Explain Query</Button>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <TooltipProvider>
        <div className="p-4 border rounded bg-gray-50">{renderQueryWithTooltips()}</div>
      </TooltipProvider>
    </div>
  )
}

