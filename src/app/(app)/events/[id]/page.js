"use client"

import { EventAPI } from '@/api';
import Header from '@/app/(app)/Header';
import Card from '@/components/Card';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/auth';

const ShowEvent = () => {
    const { user } = useAuth()
    const params = useParams()
    const eventId = params.id;
    const [event, setEvent] = useState(null);
    const [rolls, setRolls] = useState([]);

    const getEvent = async () => {
        const { data } = await EventAPI.getById(eventId);
        setEvent(data);
    };

    const getRolls = async () => {
        const id = params.id;
        try {
            const { data } = await EventAPI.listEnroll(eventId);
            setRolls(data);
        } catch (error) {
            console.error('Erro ao listar as inscrições:', error);
        }
    };

    useEffect(() => {
        getEvent();
        getRolls();
    }, [params.id]);

    const handleAccept = async (enrollId) => {
        try {
            await EventAPI.acceptEnroll(eventId, enrollId);
            getRolls();
        } catch (error) {
            console.error('Erro ao aceitar a inscrição:', error);
        }
    };

    const handleReject = async (enrollId) => {
        try {
            await EventAPI.rejectEnroll(eventId, enrollId);
            getRolls();
        } catch (error) {
            console.error('Erro ao recusar a inscrição:', error);
        }
    };

    return (
        <>
            <Header title="Dashboard" />
            <div className="py-8">
                <div className="mx-auto sm:px-2 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="mx-auto flex flex-col">
                                {!event ? (
                                    <div className="text-center">No event found</div>
                                ) : (
                                    <Card data={event} user={user} />
                                )}
                            </div>
                            {user.role === 'admin' || user.id == event?.organizer.id && (
                                <div className="mt-8">
                                    <h2 className="text-lg font-semibold">Pedidos de Inscrição</h2>
                                    {!rolls.length ? (
                                        <div className="text-center">Nenhuma inscrição encontrada</div>
                                    ) : (
                                        <ul className="mt-4 space-y-4">
                                            {rolls.map((roll) => (
                                                <li key={roll.id} className="border p-4 rounded-lg shadow-sm">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <p><strong>Usuário:</strong> {roll.user.name}</p>
                                                            <p><strong>Status:</strong> {roll.status}</p>
                                                            <p><strong>Resumo:</strong> {roll.resume}</p>
                                                            <p>
                                                                <strong>Resumo Download:</strong>
                                                                <a href={roll.resume_url} target="_blank" className="text-indigo-600 underline ml-1">
                                                                    Baixar
                                                                </a>
                                                            </p>
                                                        </div>
                                                        <div className="flex space-x-4">
                                                            {roll.status !== "accepted" && (
                                                                <Button onClick={() => handleAccept(roll.user.id)} className="bg-green-500 text-white">
                                                                    Aceitar
                                                                </Button>
                                                            )}
                                                            <Button onClick={() => handleReject(roll.user.id)} className="bg-red-500 text-white">
                                                                Recusar
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShowEvent;
