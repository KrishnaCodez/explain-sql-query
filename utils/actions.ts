"use server";

import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";
import { apiKeyManager } from "./get-key";

const splitSqlQuery = (query: string): string[] => {
  // Split query into logical parts based on SQL keywords and clauses
  const parts = [];
  let currentPart = "";

  // Define SQL keywords that should split into separate parts
  const keywords = [
    "SELECT",
    "FROM",
    "WHERE",
    "GROUP BY",
    "ORDER BY",
    "HAVING",
    "JOIN",
    "LEFT JOIN",
    "RIGHT JOIN",
    "INNER JOIN",
    "LIMIT",
    "OFFSET",
    "AS",
    "ON",
    "AND",
    "OR",
  ];

  const words = query.split(/\s+/);
  let i = 0;

  while (i < words.length) {
    // Check for two-word keywords
    const twoWords = `${words[i]} ${words[i + 1] || ""}`;
    if (keywords.includes(twoWords.toUpperCase())) {
      if (currentPart) {
        parts.push(currentPart.trim());
        currentPart = "";
      }
      parts.push(twoWords);
      i += 2;
      continue;
    }

    // Check for single-word keywords
    if (keywords.includes(words[i].toUpperCase())) {
      if (currentPart) {
        parts.push(currentPart.trim());
        currentPart = "";
      }
      parts.push(words[i]);
      i++;
      continue;
    }

    // Add to current part
    currentPart += " " + words[i];
    i++;
  }

  // Add final part if exists
  if (currentPart) {
    parts.push(currentPart.trim());
  }

  return parts.filter(Boolean);
};

export async function explainQuery(query: string, apiKey: string) {

  if (!apiKey) {
    throw new Error(
      "API key not found. Please add your Google API key to continue."
    );
  }

  const parts = splitSqlQuery(query);

  const google = createGoogleGenerativeAI({
    apiKey: apiKey,
  });

  const explanations = await Promise.all(
    parts.map(async (part) => {
      const result = await generateObject({
        model: google("gemini-1.5-flash"),
        system: `You are an expert SQL analyst. Explain SQL query parts concisely and accurately. Focus on the purpose and impact of each logical part of the query.`,
        prompt: `Explain this part of the SQL query in context: "${part}"
                Full query for context: "${query}"
                Explain what this specific part does in 1-2 sentences.`,
        schema: z.object({
          explanation: z
            .string()
            .describe(
              "A concise explanation of what this part of the SQL query does"
            ),
        }),
      });

      //   console.log(explanations, `parts: ${part}`);
      return {
        part,
        explanation: result.object.explanation,
      };
    })
  );

  return explanations;
}
