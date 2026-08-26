import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI client (Server-Side Only)
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set in environment variables.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "placeholder",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Chatbot Riddle & Hint Endpoint
app.post("/api/riddle-chat", async (req, res) => {
  try {
    const { message, caseTitle, casePremise, hints, history, activeRiddle, solvedRiddlesCount } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGenAI();

    const systemInstruction = `
You are "Agent Cipher", the enigmatic Bureau Cryptographer and Noir Informant for "The Case Files" mystery bureau.
Your job is to entertain investigators by asking mysterious, thematic noir riddles, evaluating their answers, and granting official case hints when they solve your riddles!

CHARACTER PERSONA:
- Tone: Mysterious, clever, noir detective, speak with 1940s investigative intrigue ("Listen close, detective...", "Not bad, gumshoe...", "A sharp mind in a dark city.").
- Never give away the case solution directly without a solved riddle first.

CORE RULES FOR RIDDLES AND HINTS:
1. If the user asks for a riddle or starts a session: Generate a fun, clever 2-4 line riddle related to crime, shadows, clues, evidence, lockboxes, time, or secrets.
2. If an active riddle exists and the user provides an answer:
   - Carefully analyze if the user's answer is correct or close enough to solve the riddle.
   - If CORRECT: Congratulate them in character, set "isSolved": true, specify "unlockedHint" using one of the available case hints, and provide a new bonus riddle if requested!
   - If INCORRECT: Give a subtle, clever noir clue to help them figure out the riddle, set "isSolved": false.
3. Available Case Context:
   - Active Case Title: "${caseTitle || 'General Noir Mystery'}"
   - Case Premise: "${casePremise || 'A mysterious crime awaits solution.'}"
   - Available Hints to unlock: ${JSON.stringify(hints || [])}
   - Solved Riddles count so far: ${solvedRiddlesCount || 0}

OUTPUT FORMAT:
You MUST respond with valid JSON adhering to this schema:
{
  "reply": "Your in-character message to the player, including feedback, riddle result, or next challenge.",
  "isSolved": boolean (true ONLY if the user's current message correctly solved the active riddle),
  "unlockedHint": "The specific hint string from the case hints unlocked by solving the riddle (or empty string if not solved)",
  "nextRiddle": "The next riddle text if a new riddle was posed, else empty string",
  "expectedAnswer": "The short 1-3 word solution to the active/new riddle"
}
`;

    // Construct prompt with history context
    let formattedHistory = "";
    if (Array.isArray(history) && history.length > 0) {
      formattedHistory = "\nRecent Chat History:\n" + history.map((h: any) => `${h.role === 'user' ? 'Investigator' : 'Agent Cipher'}: ${h.text}`).join("\n") + "\n";
    }

    const promptText = `
Active Riddle: ${activeRiddle || "None"}
${formattedHistory}
Investigator Message: "${message}"

Respond strictly in JSON according to the system instructions.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { type: Type.STRING },
            isSolved: { type: Type.BOOLEAN },
            unlockedHint: { type: Type.STRING },
            nextRiddle: { type: Type.STRING },
            expectedAnswer: { type: Type.STRING },
          },
          required: ["reply", "isSolved"],
        },
        temperature: 0.7,
      },
    });

    const responseText = response.text || "{}";
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      parsedData = {
        reply: responseText,
        isSolved: false,
        unlockedHint: "",
        nextRiddle: "",
        expectedAnswer: "",
      };
    }

    return res.json(parsedData);
  } catch (error: any) {
    console.error("Error in /api/riddle-chat:", error);
    return res.status(500).json({
      error: "Failed to connect with Agent Cipher",
      details: error?.message || "Unknown error",
    });
  }
});

// AI Case Generator Endpoint
app.post("/api/generate-case", async (req, res) => {
  try {
    const { prompt, difficulty = "Seasoned", style = "Whodunit", setting = "Noir Manor" } = req.body;

    const ai = getGenAI();

    const systemInstruction = `
You are the Master AI Mystery Architect for "The Case Files".
Your goal is to generate a complete, high-quality, fully playable murder mystery or detective case file based on the user's prompt or theme.

RULES:
1. Generate realistic, intriguing details.
2. Ensure there are 3 to 4 suspects/characters with backgrounds, secrets, and private clues. Mark EXACTLY ONE suspect as "isCulprit: true" with a detailed culpritMotive.
3. Provide 2 to 3 distinct evidence items (e.g. Physical, Document, Financial) linked to suspects.
4. Include 3 timeline events with timestamps, locations, involved suspects, and at least 1 contradiction with a contradictionNote.
5. Provide 3 hints (Gentle, Moderate, Strong).
6. Provide a complete solution breakdown explaining the culprit, motive, method, key evidence, and solution summary.
7. Return valid JSON adhering strictly to the required schema.
`;

    const userPromptText = `
Theme/Concept: "${prompt || "A classic atmospheric murder mystery in a secluded estate"}"
Target Difficulty: ${difficulty}
Style: ${style}
Setting: ${setting}

Generate a complete MysteryCase object.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPromptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            fileNumber: { type: Type.STRING },
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            coverImage: { type: Type.STRING },
            price: { type: Type.NUMBER },
            difficulty: { type: Type.STRING },
            playerCount: { type: Type.STRING },
            minPlayers: { type: Type.NUMBER },
            maxPlayers: { type: Type.NUMBER },
            durationMinutes: { type: Type.STRING },
            minDurationMinutes: { type: Type.NUMBER },
            recommendedAge: { type: Type.STRING },
            setting: { type: Type.STRING },
            style: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            premise: { type: Type.STRING },
            settingDescription: { type: Type.STRING },
            whatsNeeded: { type: Type.ARRAY, items: { type: Type.STRING } },
            whatsIncluded: { type: Type.ARRAY, items: { type: Type.STRING } },
            difficultyExplanation: { type: Type.STRING },
            rating: { type: Type.NUMBER },
            reviewCount: { type: Type.NUMBER },
            characters: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  role: { type: Type.STRING },
                  age: { type: Type.NUMBER },
                  avatar: { type: Type.STRING },
                  background: { type: Type.STRING },
                  relationships: { type: Type.STRING },
                  knownInfo: { type: Type.STRING },
                  personalObjectives: { type: Type.ARRAY, items: { type: Type.STRING } },
                  secrets: { type: Type.STRING },
                  privateClues: { type: Type.ARRAY, items: { type: Type.STRING } },
                  isCulprit: { type: Type.BOOLEAN },
                  culpritMotive: { type: Type.STRING },
                },
                required: ["id", "name", "role", "age", "background", "relationships", "knownInfo", "personalObjectives", "secrets", "privateClues"],
              },
            },
            evidence: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  number: { type: Type.STRING },
                  title: { type: Type.STRING },
                  type: { type: Type.STRING },
                  foundAt: { type: Type.STRING },
                  image: { type: Type.STRING },
                  description: { type: Type.STRING },
                  transcription: { type: Type.STRING },
                  relatedSuspectIds: { type: Type.ARRAY, items: { type: Type.STRING } },
                  relatedObjects: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["id", "number", "title", "type", "foundAt", "description", "relatedSuspectIds", "relatedObjects"],
              },
            },
            timeline: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  timestamp: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  location: { type: Type.STRING },
                  involvedSuspectIds: { type: Type.ARRAY, items: { type: Type.STRING } },
                  hasContradiction: { type: Type.BOOLEAN },
                  contradictionNote: { type: Type.STRING },
                },
                required: ["id", "timestamp", "title", "description", "location", "involvedSuspectIds"],
              },
            },
            hints: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.NUMBER },
                  levelName: { type: Type.STRING },
                  text: { type: Type.STRING },
                },
                required: ["id", "levelName", "text"],
              },
            },
            solution: {
              type: Type.OBJECT,
              properties: {
                culpritId: { type: Type.STRING },
                culpritName: { type: Type.STRING },
                motive: { type: Type.STRING },
                howItHappened: { type: Type.STRING },
                keyEvidence: { type: Type.ARRAY, items: { type: Type.STRING } },
                breakdown: { type: Type.STRING },
              },
              required: ["culpritId", "culpritName", "motive", "howItHappened", "keyEvidence", "breakdown"],
            },
          },
          required: [
            "id", "fileNumber", "title", "subtitle", "price", "difficulty",
            "playerCount", "minPlayers", "maxPlayers", "durationMinutes", "minDurationMinutes",
            "setting", "style", "tags", "premise", "settingDescription", "whatsNeeded", "whatsIncluded",
            "difficultyExplanation", "characters", "evidence", "timeline", "hints", "solution"
          ],
        },
        temperature: 0.8,
      },
    });

    const responseText = response.text || "{}";
    const generatedCase = JSON.parse(responseText);

    // Fallbacks & defaults for missing visual fields
    if (!generatedCase.id) generatedCase.id = `ai-case-${Date.now()}`;
    if (!generatedCase.fileNumber) generatedCase.fileNumber = `FILE #${Math.floor(100 + Math.random() * 800)}-AI`;
    if (!generatedCase.coverImage) generatedCase.coverImage = "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80";
    if (!generatedCase.rating) generatedCase.rating = 5.0;
    if (!generatedCase.reviewCount) generatedCase.reviewCount = 1;
    if (!generatedCase.reviews) generatedCase.reviews = [];

    // Ensure character avatars have fallback images
    if (Array.isArray(generatedCase.characters)) {
      generatedCase.characters.forEach((char: any, index: number) => {
        if (!char.avatar) {
          const defaultAvatars = [
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80"
          ];
          char.avatar = defaultAvatars[index % defaultAvatars.length];
        }
      });
    }

    // Ensure evidence images have fallback images
    if (Array.isArray(generatedCase.evidence)) {
      generatedCase.evidence.forEach((ev: any) => {
        if (!ev.image) {
          ev.image = "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80";
        }
      });
    }

    return res.json({ success: true, case: generatedCase });
  } catch (error: any) {
    console.error("Error in /api/generate-case:", error);
    return res.status(500).json({
      error: "Failed to generate AI mystery case",
      details: error?.message || "Unknown error",
    });
  }
});

// Case of the Day Cache
let cachedDailyCase: { date: string; caseData: any } | null = null;

app.get("/api/case-of-the-day", async (req, res) => {
  try {
    const todayStr = new Date().toISOString().split("T")[0];
    const forceRefresh = req.query.force === "true";

    if (cachedDailyCase && cachedDailyCase.date === todayStr && !forceRefresh) {
      return res.json({
        success: true,
        date: todayStr,
        case: cachedDailyCase.caseData,
        cached: true,
      });
    }

    const dailyThemes = [
      { prompt: "The Midnight Express Poisoning: A wealthy diplomat found dead in a locked sleeper cabin aboard an alpine express train.", setting: "Alpine Express Train", style: "Locked Room", difficulty: "Seasoned" },
      { prompt: "The Venetian Opera House Heist: A prima donna's irreplaceable ruby tiara disappears during the climax of Aida.", setting: "Venice Opera House", style: "Whodunit", difficulty: "Master Detective" },
      { prompt: "The Lighthouse Specter: A lone lighthouse keeper vanishes on a stormy island off the coast of Maine.", setting: "Coastal Lighthouse", style: "Detective", difficulty: "Seasoned" },
      { prompt: "The Clockmaker's Final Tick: An eccentric inventor is found crushed inside his master clockwork chamber.", setting: "Victorian Workshop", style: "Locked Room", difficulty: "Master Detective" },
      { prompt: "The Diamond Syndicate Betrayal: A high-stakes heist at an exclusive Antwerp diamond exchange.", setting: "Antwerp Exchange", style: "Espionage", difficulty: "Seasoned" },
      { prompt: "The Speakeasy Sabotage: A bootlegging kingpin collapses on stage during a midnight jazz performance.", setting: "1928 Speakeasy", style: "Whodunit", difficulty: "Rookie" },
      { prompt: "The Antiquarian's Last Codex: A museum curator murdered in the subterranean archives.", setting: "Grand Library", style: "Whodunit", difficulty: "Seasoned" }
    ];

    const dayIndex = new Date().getDay();
    const selectedTheme = dailyThemes[dayIndex % dailyThemes.length];

    const ai = getGenAI();

    const systemInstruction = `
You are the Master AI Mystery Architect for "The Case Files".
Your task is to generate the OFFICIAL "CASE OF THE DAY" for ${todayStr}.
It must be a complete, high-quality, fully playable murder mystery.

RULES:
1. Generate realistic, intriguing details.
2. Ensure there are 3 to 4 suspects/characters with backgrounds, secrets, and private clues. Mark EXACTLY ONE suspect as "isCulprit: true" with a detailed culpritMotive.
3. Provide 2 to 3 distinct evidence items linked to suspects.
4. Include 3 timeline events with timestamps, locations, involved suspects, and at least 1 contradiction with a contradictionNote.
5. Provide 3 hints (Gentle, Moderate, Strong).
6. Provide a complete solution breakdown.
7. Return valid JSON.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `
Generate the Daily Mystery Case File for ${todayStr}.
Theme: ${selectedTheme.prompt}
Setting: ${selectedTheme.setting}
Style: ${selectedTheme.style}
Difficulty: ${selectedTheme.difficulty}
`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            fileNumber: { type: Type.STRING },
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            coverImage: { type: Type.STRING },
            price: { type: Type.NUMBER },
            difficulty: { type: Type.STRING },
            playerCount: { type: Type.STRING },
            minPlayers: { type: Type.NUMBER },
            maxPlayers: { type: Type.NUMBER },
            durationMinutes: { type: Type.STRING },
            minDurationMinutes: { type: Type.NUMBER },
            recommendedAge: { type: Type.STRING },
            setting: { type: Type.STRING },
            style: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            premise: { type: Type.STRING },
            settingDescription: { type: Type.STRING },
            whatsNeeded: { type: Type.ARRAY, items: { type: Type.STRING } },
            whatsIncluded: { type: Type.ARRAY, items: { type: Type.STRING } },
            difficultyExplanation: { type: Type.STRING },
            rating: { type: Type.NUMBER },
            reviewCount: { type: Type.NUMBER },
            characters: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  role: { type: Type.STRING },
                  age: { type: Type.NUMBER },
                  avatar: { type: Type.STRING },
                  background: { type: Type.STRING },
                  relationships: { type: Type.STRING },
                  knownInfo: { type: Type.STRING },
                  personalObjectives: { type: Type.ARRAY, items: { type: Type.STRING } },
                  secrets: { type: Type.STRING },
                  privateClues: { type: Type.ARRAY, items: { type: Type.STRING } },
                  isCulprit: { type: Type.BOOLEAN },
                  culpritMotive: { type: Type.STRING },
                },
                required: ["id", "name", "role", "age", "background", "relationships", "knownInfo", "personalObjectives", "secrets", "privateClues"],
              },
            },
            evidence: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  number: { type: Type.STRING },
                  title: { type: Type.STRING },
                  type: { type: Type.STRING },
                  foundAt: { type: Type.STRING },
                  image: { type: Type.STRING },
                  description: { type: Type.STRING },
                  transcription: { type: Type.STRING },
                  relatedSuspectIds: { type: Type.ARRAY, items: { type: Type.STRING } },
                  relatedObjects: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["id", "number", "title", "type", "foundAt", "description", "relatedSuspectIds", "relatedObjects"],
              },
            },
            timeline: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  timestamp: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  location: { type: Type.STRING },
                  involvedSuspectIds: { type: Type.ARRAY, items: { type: Type.STRING } },
                  hasContradiction: { type: Type.BOOLEAN },
                  contradictionNote: { type: Type.STRING },
                },
                required: ["id", "timestamp", "title", "description", "location", "involvedSuspectIds"],
              },
            },
            hints: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.NUMBER },
                  levelName: { type: Type.STRING },
                  text: { type: Type.STRING },
                },
                required: ["id", "levelName", "text"],
              },
            },
            solution: {
              type: Type.OBJECT,
              properties: {
                culpritId: { type: Type.STRING },
                culpritName: { type: Type.STRING },
                motive: { type: Type.STRING },
                howItHappened: { type: Type.STRING },
                keyEvidence: { type: Type.ARRAY, items: { type: Type.STRING } },
                breakdown: { type: Type.STRING },
              },
              required: ["culpritId", "culpritName", "motive", "howItHappened", "keyEvidence", "breakdown"],
            },
          },
          required: [
            "id", "fileNumber", "title", "subtitle", "price", "difficulty",
            "playerCount", "minPlayers", "maxPlayers", "durationMinutes", "minDurationMinutes",
            "setting", "style", "tags", "premise", "settingDescription", "whatsNeeded", "whatsIncluded",
            "difficultyExplanation", "characters", "evidence", "timeline", "hints", "solution"
          ],
        },
        temperature: 0.8,
      },
    });

    const responseText = response.text || "{}";
    const generatedCase = JSON.parse(responseText);

    if (!generatedCase.id) generatedCase.id = `cotd-${todayStr}`;
    if (!generatedCase.fileNumber) generatedCase.fileNumber = `DAILY #${todayStr.replace(/-/g, '')}`;
    if (!generatedCase.coverImage) generatedCase.coverImage = "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80";
    if (!generatedCase.rating) generatedCase.rating = 5.0;
    if (!generatedCase.reviewCount) generatedCase.reviewCount = 18;
    if (!generatedCase.reviews) generatedCase.reviews = [];

    // Fallbacks
    if (Array.isArray(generatedCase.characters)) {
      generatedCase.characters.forEach((char: any, index: number) => {
        if (!char.avatar) {
          const defaultAvatars = [
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80"
          ];
          char.avatar = defaultAvatars[index % defaultAvatars.length];
        }
      });
    }

    if (Array.isArray(generatedCase.evidence)) {
      generatedCase.evidence.forEach((ev: any) => {
        if (!ev.image) {
          ev.image = "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80";
        }
      });
    }

    cachedDailyCase = {
      date: todayStr,
      caseData: generatedCase,
    };

    return res.json({
      success: true,
      date: todayStr,
      case: generatedCase,
      cached: false,
    });
  } catch (error: any) {
    console.error("Error generating Case of the Day:", error);
    return res.status(500).json({
      error: "Failed to generate Case of the Day",
      details: error?.message || "Unknown error",
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
