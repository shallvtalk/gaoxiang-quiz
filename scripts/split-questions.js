const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "questions.json");
const outDir = path.join(root, "data");

const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const questions = source.questions || [];
const chapters = new Map();

for (const question of questions) {
  const number = question.chapter?.number || 0;
  const key = String(number).padStart(2, "0");
  if (!chapters.has(key)) {
    chapters.set(key, {
      key,
      number,
      title: question.chapter?.title || "未分章",
      questions: [],
    });
  }
  chapters.get(key).questions.push(question);
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const chapterIndex = [...chapters.values()]
  .sort((a, b) => a.number - b.number)
  .map(chapter => {
    const filename = `chapter-${chapter.key}.json`;
    const payload = {
      chapter: {
        number: chapter.number,
        title: chapter.title,
      },
      count: chapter.questions.length,
      questions: chapter.questions,
    };

    fs.writeFileSync(path.join(outDir, filename), `${JSON.stringify(payload, null, 2)}\n`);

    return {
      number: chapter.number,
      title: chapter.title,
      count: chapter.questions.length,
      file: filename,
    };
  });

const indexPayload = {
  version: 1,
  source: "questions.json",
  total: questions.length,
  chapters: chapterIndex,
};

fs.writeFileSync(path.join(outDir, "index.json"), `${JSON.stringify(indexPayload, null, 2)}\n`);

console.log(`Wrote ${chapterIndex.length} chapter files to ${path.relative(root, outDir)}`);
