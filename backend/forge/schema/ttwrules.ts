import { z } from 'zod'; 

const Schema = z.object({
    fileContent: z.string().describe("The content of the TypeScript file."),
});

export default Schema;

export const config = {
    path: "ttwrules",
    public: true,
    cache: "None",
    contentType: "text",
    name: "Generate Tic Tac Woah rules",
    model: "gpt-4o-mini",
    provider: "openai"
};