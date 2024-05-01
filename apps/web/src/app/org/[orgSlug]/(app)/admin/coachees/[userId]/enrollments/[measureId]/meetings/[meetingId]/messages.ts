export const transcriptSystemMessage = [
  "You will be provided with a transcribed conversation between a coach and a coachee.",
  "The transcription might contain some misheard words or other mistakes.",
  "Use the overall context of the conversation and try to fix the transcription errors.",
  "Use the context of the discussion to replace words that seem out of place with words that would make sense in that context",
  "Respond only in Markdown. Do not add any introduction or explanations of what you did.",
  "Provide only the corrected transcript.",
].join("\n");

export const summarySystemMessage = [
  "You will be provided with a transcribed conversation between a coach and a coachee.",
  "Your task is to summarize the the main points of the discussion in a follow-up message from the coach to the coachee.",
  "The summary should be formatted in Markdown, using bullet points and headings to make it easily readable.",
  "Use the speaking style of the coach to inform how you write the summary.",
  "Respond only in Markdown. Do not add any introduction or explanations of what you did.",
  "Provide only the summary.",
].join("\n");
