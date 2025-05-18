"use client"

import Loading from "@/components/Loading";
import { getUsers } from "@/lib/api/actions";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type AgentUser = {
    id: string;
    userName: string;
    email: string;
    avatar: string;
    posts: { id: string }[];
};

const AgentsPage = () => {
    
    const [users, setUsers] = useState<AgentUser[] | null>(null);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            if (data.success) {
                setUsers(data.users);

            } else {
                toast.error(data.message);
            }

        } catch (error) {
            const errMessage = error instanceof Error ? error.message : "An unknown error occured";
            toast.error(errMessage);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const agents = users?.filter((user) => user.posts && user.posts.length > 0);

    return agents ? (
        <div className='mt-5 md:mt-8'>
            <h1 className='text-2xl md:text-3xl text-center mb-8'>Agents</h1>
            <div className="relative overflow-x-auto">
                <table className="w-full text-xs md:text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-2 md:px-6 py-3 max-md:text-center">
                                <span className="hidden md:inline">Agent Name</span>
                                <span className="inline md:hidden">Agent</span>
                            </th>
                            <th scope="col" className="px-2 md:px-6 py-3 max-md:text-center">
                                Email
                            </th>
                            <th scope="col" className="px-2 md:px-6 py-3 max-md:text-center">
                                <span className="hidden md:inline">Number of properties</span>
                                <span className="inline md:hidden">Properties</span>
                            </th>
                        </tr>
                    </thead>

                    {agents?.map((agent) => (
                        <tbody key={agent.id}>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" className="px-2 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center max-md:flex-col max-md:mt-8 gap-0.5 md:gap-3">
                                        <Image src={agent.avatar} alt={agent.userName} height={50} width={50} className="max-md:self-center w-8 h-8 md:w-16 md:h-16 rounded-full aspect-square" />
                                        <h2 className="text-sm md:text-xl">{agent.userName}</h2>
                                    </div>
                                </th>
                                <td className="px-2 md:px-6 py-4">
                                    <p className="text-sm md:text-lg">{agent.email}</p>
                                </td>
                                <td className="px-2 md:px-6 py-4 max-md:text-center">
                                    <Link href={`/list/?userId=${agent.id}&userName=${agent.userName}`} className="text-sm md:text-lg text-blue-600 hover:underline">{agent.posts.length}</Link>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    ) : (
        <Loading />
    )
}

export default AgentsPage
