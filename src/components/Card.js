import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EventAPI } from '@/api';

const Card = ({ data, user }) => {
    const formatDateTime = (dateTime) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateTime).toLocaleDateString('pt-BR', options);
    };

    const handleStartEvent = async () => {
        try {
            await EventAPI.update(data.id, { status: 'ongoing' });
            alert('Evento iniciado com sucesso!');
        } catch (error) {
            console.error('Erro ao iniciar o evento:', error);
            alert('Houve um erro ao iniciar o evento.');
        }
    };

    const handleFinalizeEvent = async () => {
        try {
            await EventAPI.update(data.id, { status: 'finished' });
            alert('Evento finalizado com sucesso!');
        } catch (error) {
            console.error('Erro ao finalizar o evento:', error);
            alert('Houve um erro ao finalizar o evento.');
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'ongoing':
                return 'bg-blue-200 text-blue-800';
            case 'pending':
                return 'bg-yellow-200 text-yellow-800';
            case 'finished':
                return 'bg-green-200 text-green-800';
            default:
                return 'bg-gray-200 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-lg border p-4 shadow-md">
            <img
                src={data.banner}
                alt={`Banner de ${data.title}`}
                className="w-full h-48 rounded-md object-cover"
            />
            <div className="px-1 py-4">
                <div className="font-bold text-xl mb-2">{data.title}</div>
                <p className="text-gray-700 text-base mb-4">
                    {data.description}
                </p>
                <div className="text-gray-600 text-sm mb-2">
                    <strong>Início:</strong> {formatDateTime(data.start_at)}
                </div>
                <div className="text-gray-600 text-sm mb-4">
                    <strong>Término:</strong> {formatDateTime(data.finish_at)}
                </div>
                <div className={`text-sm font-semibold px-2 py-1 rounded ${getStatusStyle(data.status)}`}>
                    Status: {data.status === 'ongoing' ? 'Em andamento' : data.status === 'pending' ? 'Não iniciado' : 'Finalizado'}
                </div>
                <Link
                    href={`/events/${data.id}`}
                    className="text-blue-500 hover:underline mt-4 block"
                >
                    Ver mais
                </Link>
            </div>

            <div className="px-1 py-4 flex justify-end space-x-4">
                {user && user.id === data.organizer.id && (
                    <>
                        <Button asChild>
                            <Link href={`/events/${data.id}/edit`}>Editar</Link>
                        </Button>

                        {data.status !== 'finished' && (
                            <>
                                {data.status !== 'ongoing' && (
                                    <Button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={handleStartEvent}
                                    >
                                        Iniciar evento
                                    </Button>
                                )}

                                {data.status === 'ongoing' && (
                                    <Button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={handleFinalizeEvent}
                                    >
                                        Finalizar evento
                                    </Button>
                                )}
                            </>
                        )}
                    </>
                )}

                {user && user.id !== data.organizer.id && (
                    <Button asChild>
                        <Link href={`/events/${data.id}/enroll`}>Realizar inscrição</Link>
                    </Button>
                )}

                {data.status === 'finished' && (
                    <Button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        asChild
                    >
                        <Link href={`/events/${data.id}/certificate`}>Gerar certificado</Link>
                    </Button>
                )}
            </div>
        </div>
    );
};

Card.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        banner: PropTypes.string.isRequired,
        start_at: PropTypes.string.isRequired,
        finish_at: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        organizer: PropTypes.shape({
            id: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
    }).isRequired,
};

export default Card;
