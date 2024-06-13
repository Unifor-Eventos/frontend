import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
                <Link
                    href={`/events/${data.id}`}
                    className="text-blue-500 hover:underline"
                >
                    Ver mais
                </Link>
            </div>

            <div className="px-1 py-4 flex justify-end space-x-4">

                {user && user.id == data.organizer.id && (
                    <Button asChild>
                        <Link href={`/events/${data.id}/edit`}>Editar</Link>
                    </Button>
                )}

                {user && user.id != data.organizer.id && (
                    <Button asChild>
                        <Link href={`/events/${data.id}/enroll`}>Realizar inscrição</Link>
                    </Button>
                )}
            </div>
        </div>
    );
}

Card.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        banner: PropTypes.string.isRequired,
        start_at: PropTypes.string.isRequired,
        finish_at: PropTypes.string.isRequired,
    }).isRequired,
};

export default Card;
