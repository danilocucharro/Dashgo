import { useQuery } from "react-query";
import { api } from "../api";

type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export async function getUsers(): Promise<User[]> {// os dados serao salvos em cache local nessa chave
    const { data } = await api.get('users')

    const users = data.users.map(user =>{
        return{
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: new Date(user.createdAt).toLocaleDateString()
        }
    });

    return users;
}

export function useUsers(){
    return useQuery('users', getUsers, {
        staleTime: 1000 * 5// durante 5 segundos o feching nao precisa-ra ser recarregado se for mudado de foco
    })
}