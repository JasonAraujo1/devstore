import { env } from "../env";

export function api(path: string, init?: RequestInit) {
	const baseUrl = env.NEXT_PUBLIC_API_BASE_URL;
	const apiPrefix ='/api'
	const url = new URL(apiPrefix.concat(path), baseUrl);

	return fetch(url, init);
    //o fech extende a web fech api (nova forma do navegadores de fazer requisições http), 
    // ja o axios não usa isso(usa a xml httpRequest), não usar o fetch é deixar de lado todas a parte das requisições
}
