//create two endpoints for
//1) posting a move to the server
//2) get daily ruleset
const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const ENDPOINTS = {
  POST_MOVE: (rulesetId: string) => `${BASE_URL}/${rulesetId}`,
  GET_RULE: `${BASE_URL}/daily`,
};
