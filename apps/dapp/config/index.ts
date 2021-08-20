import type { AppConfig } from "~/types";

const domain = `${process.env.NEXT_PUBLIC_API_URL}` !== "undefined" ? new URL(`${process.env.NEXT_PUBLIC_API_URL}`) : "";

if (domain === "")
  throw Error("Please set NEXT_PUBLIC_API_URL")
  
const apiDomain = domain.host ? domain.host.split(":")[0] : "localhost";

export const appConfig: AppConfig = {
  apiDomain,
  contactEmail: "info@culturemap.test",
  apiUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  apiGraphQLUrl: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  infuraApiKey: `${process.env.NEXT_PUBLIC_INFURA_ID}`,
  defaultPageSize: 30,
};