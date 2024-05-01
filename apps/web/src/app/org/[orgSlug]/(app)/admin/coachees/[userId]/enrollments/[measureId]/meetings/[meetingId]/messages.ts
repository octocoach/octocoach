export const systemMessage = [
  "You will be provided with a transcribed conversation between a coach and a coachee.",
  "The transcription might contain some misheard words or other mistakes.",
  "Use the overall context of the conversation and try to fix the transcription errors.",
  "Use the context of the discussion to replace words that seem out of place with words that would make sense in that context",
  "Respond only in Markdown. Do not add any introduction or explanations of what you did.",
  "Provide only the corrected transcript",
].join("/n");
