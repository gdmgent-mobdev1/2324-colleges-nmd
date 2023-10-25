import { QuizResult, Settings } from "./types";

export const fetchQuiz = async (settings: Settings): Promise<QuizResult[]> => {
  const response = await fetch("todo url + use settings");
  if (response.ok) {
    const result: QuizResult[] = await response.json();
    return result;
  }
  throw new Error(`Failed to fetch pokemon with status ${response.status}`);
};
