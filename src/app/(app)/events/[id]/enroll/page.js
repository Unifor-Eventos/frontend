"use client"

import { useState } from 'react';
import { PhotoIcon, DocumentIcon } from '@heroicons/react/24/solid';
import Header from '@/app/(app)/Header';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EventAPI } from '@/api';
import { useParams, useRouter } from 'next/navigation';

const EnrollEvent = () => {
    const router = useRouter();
    const params = useParams();
    const eventId = params.id;

    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        resume: '',
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFormData((prev) => ({
                ...prev,
                resume_file: file
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { resume, resume_file } = formData;

        try {
            const response = await EventAPI.enroll(eventId, {
                resume,
            }, resume_file);

            router.push(`/events/${eventId}`);
        } catch (error) {
            console.error('Erro ao criar o evento:', error);
        }
    };

    return (
        <>
            <Header title="Inscrição no evento" />
            <div className="py-8">
                <div className="mx-auto sm:px-2 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Inscrever-se no evento</h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Insira os dados para a inscrição no evento
                                        </p>

                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="col-span-full">
                                                <Label htmlFor="resume">Resumo</Label>
                                                <Textarea
                                                    id="resume"
                                                    name="resume"
                                                    placeholder="Escreva um pouco sobre o evento"
                                                    value={formData.resume}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="col-span-full">
                                                <Label htmlFor="file-upload">Arquivo de Resumo</Label>

                                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                                    <div className="text-center">
                                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                            <label
                                                                htmlFor="file-upload"
                                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                            >
                                                                <span>Envie um arquivo</span>
                                                                <input
                                                                    id="file-upload"
                                                                    name="file-upload"
                                                                    type="file"
                                                                    accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                                    className="sr-only"
                                                                    onChange={handleFileChange}
                                                                />
                                                            </label>
                                                            <p className="pl-1">ou arraste e solte</p>
                                                        </div>
                                                        <p className="text-xs leading-5 text-gray-600">PDF, DOC, DOCX até 10MB</p>
                                                        {selectedFile && (
                                                            <div className="mt-4 flex justify-center items-center">
                                                                <DocumentIcon className="h-12 w-12 text-gray-500" aria-hidden="true" />
                                                                <span className="ml-2 text-gray-600">{selectedFile.name}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <Button type="submit">Salvar</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EnrollEvent;
