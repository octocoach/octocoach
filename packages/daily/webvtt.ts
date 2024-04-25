export class WebVTT {
  constructor(private raw: string) {}

  stripHeader() {
    return this.raw.replace(/^WEBVTT\s*(\r\n|\n|\r)?/, "");
  }

  parse() {
    const parsed = this.stripHeader()
      .split("\n\n")
      .map((entry) => {
        const [_id, time, speech] = entry.split("\n");

        if (!_id || !time || !speech) throw new Error(`Error parsing VTT`);

        const [start, end] = time.split(" --> ");

        if (!start || !end)
          throw new Error(`Error extracting timestamps for ${_id}`);

        const match = speech.match(/<v>([^<]+)<\/v>(.+)/);

        if (!match || !match[1] || !match[2])
          throw new Error(`Error parsing speech for ${_id}`);

        const speaker = match[1].replaceAll(":", "").trim();
        const content = match[2].trim();

        return { start, end, speaker, content };
      });

    return parsed;
  }

  clean() {
    const parsed = this.parse();

    let result = "";
    let currentContent = "";
    let currentSpeaker = "";

    for (const { speaker, content } of parsed) {
      if (speaker !== currentSpeaker) {
        if (currentSpeaker) {
          result += `${currentSpeaker}: ${currentContent.trim()}\n`;
        }
        currentSpeaker = speaker;
        currentContent = content;
      } else {
        currentContent += ` ${content}`;
      }
    }
    if (currentSpeaker && currentContent) {
      result += `${currentSpeaker}: ${currentContent.trim()}\n`;
    }

    return result.trim();
  }
}
