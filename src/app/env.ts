import { z } from "zod";//uma bliblioteca que ajuda a fazer validação de e transfoamcao de dados baseados em eschima(estrutura)

const envSchema = z.object({
	NEXT_PUBLIC_API_BASE_URL: z.string().url(),
    //toda variável ambiente disponivel tanto do lado do client quanto do servidor do next, 
    // preciso que ele inicie com NEXT PUBLIC, se não a variavel fica visivel coemnte na parte server side, e não  na parte client side
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error(
		"Invalid enviroment variables",
		parsedEnv.error.flatten().fieldErrors,
	);
    throw new Error('Invalid enviroment variables')
}

export const env = parsedEnv.data

// resumo:
//  if (!parsedEnv.success): Aqui, ele está verificando se o objeto parsedEnv tem uma propriedade success que
//  indica se a validação das variáveis de ambiente foi bem-sucedida. Se for false, significa que houve um erro na validação.

// console.log("Invalid environment variables", parsedEnv.error.flatten().fieldErrors): Caso a validação falhe,
//  o código registra no console uma mensagem indicando que há variáveis de ambiente inválidas. Além disso, ele
//  exibe os erros específicos usando parsedEnv.error.flatten().fieldErrors, que provavelmente contém os detalhes de quais variáveis estão com problemas.

//  throw new Error('Invalid environment variables'): Depois de registrar o erro, ele lança uma exceção que interrompe
//  a execução do código, indicando que as variáveis de ambiente estão incorretas e precisam ser corrigidas antes de continuar.