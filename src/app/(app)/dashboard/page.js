"use client"

import { EventAPI } from '@/api';
import Header from '@/app/(app)/Header';
import Card from '@/components/Card';
import { useAuth } from '@/hooks/auth';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const { user } = useAuth()
    const [events, setEvents] = useState([]);

    const getEvents = async () => {
        const { data } = await EventAPI.list()

        console.log(data)

        setEvents(data)
    }

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <>
            <Header title="Dashboard" />
            <div className="py-8">
                <div className="mx-auto sm:px-2 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="mx-auto flex flex-col">
                                {events.length === 0 && <div className="text-center">No events found</div>}
                                {events.map((item, index) => (
                                    <Card data={item} key={index} user={user} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
