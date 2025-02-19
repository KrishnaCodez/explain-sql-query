"use server"

import { generateObject } from "ai"
import { google } from "@ai-sdk/google";

import { z } from "zod"

export async function explainQuery(query: string) {
  const parts = query.split(/\s+/)

  const explanations = await Promise.all(
    parts.map(async (part) => {
      const result = await generateObject({
        model: google("gemini-1.5-flash"),
        system: "You are an expert SQL analyst. Explain SQL query parts concisely and accurately.",
        prompt: `Explain this part of an SQL query: "${part}"`,
        schema: z.object({
          explanation: z.string().describe("A concise explanation of the SQL query part"),
        }),
      })

      return {
        part,
        explanation: result.object.explanation,
      }
    }),
  )

  return explanations
}

