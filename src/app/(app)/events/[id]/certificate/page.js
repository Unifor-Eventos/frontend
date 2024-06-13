"use client"

import { EventAPI } from '@/api';
import Header from '@/app/(app)/Header';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth';

const Certificate = () => {
    const { user } = useAuth();
    const params = useParams();
    const eventId = params.id;
    const [event, setEvent] = useState(null);

    const getEvent = async () => {
        const { data } = await EventAPI.getById(eventId);
        setEvent(data);
    };

    useEffect(() => {
        getEvent();
    }, [params.id]);

    return (
        <>
            <Header title="Certificado de Participação" />
            <div className="py-8">
                <div className="mx-auto max-w-3xl sm:px-2 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border-4 border-blue-500">
                        <div className="p-8 bg-white border-b border-gray-200 text-center">
                            {!event ? (
                                <div className="text-center text-xl font-semibold">Nenhum evento encontrado</div>
                            ) : (
                                <div className="certificate-content">
                                    <h1 className="text-4xl font-bold mb-4">Certificado de Participação</h1>
                                    <p className="text-xl mb-4">
                                        Este certificado atesta que
                                    </p>
                                    <p className="text-3xl font-semibold mb-4">
                                        {user.name}
                                    </p>
                                    <p className="text-xl mb-4">
                                        participou do evento
                                    </p>
                                    <p className="text-2xl font-semibold mb-4">
                                        {event.title}
                                    </p>
                                    <p className="text-xl">
                                        {new Date(event.start_at).toLocaleDateString()}
                                        {event.start_at !== event.finish_at &&
                                            ` a ${new Date(event.finish_at).toLocaleDateString()}`}.
                                    </p>
                                    <div className="mt-8">
                                        <p className="text-xl">Assinatura</p>
                                        <div className="signature mt-4">
                                            <img src="/path/to/signature.png" alt="Assinatura" className="mx-auto w-48" />
                                            <p className="text-xl">{event.organizer.name}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Certificate;
