"use client"

import { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import Header from '@/app/(app)/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { EventAPI } from '@/api'; // Presumindo que o api.js ou api.ts é o arquivo onde está a função create

const CreateEvent = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        is_virtual: false,
        start_at: '',
        finish_at: '',
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
            // Armazenar o arquivo no estado para envio posterior
            setFormData((prev) => ({
                ...prev,
                file: file
            }));
        }
    };

    const handleChange = (e) => {
        if (typeof e === "boolean") {
            setFormData((prev) => ({
                ...prev,
                ["is_virtual"]: !!e ? 1 : 0,
            }));
        }

        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Extraindo dados e arquivo do estado
        const { title, description, is_virtual, start_at, finish_at, file } = formData;

        // Chamando a função create do API
        try {
            const response = await EventAPI.create({
                title,
                description,
                is_virtual,
                start_at,
                finish_at,
            }, file);

            console.log('Evento criado com sucesso:', response.data);
            // Opcionalmente, você pode redefinir o formulário ou navegar para outra página
        } catch (error) {
            console.error('Erro ao criar o evento:', error);
        }
    };

    return (
        <>
            <Header title="Dashboard" />
            <div className="py-8">
                <div className="mx-auto sm:px-2 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">Criar evento</h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Insira os dados para a criação de um evento
                                        </p>

                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-4">
                                                <Label htmlFor="title">Título</Label>
                                                <Input
                                                    type="text"
                                                    id="title"
                                                    name="title"
                                                    placeholder="Evento das Flores"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="col-span-full">
                                                <Label htmlFor="description">Descrição</Label>
                                                <Textarea
                                                    id="description"
                                                    name="description"
                                                    placeholder="Escreva um pouco sobre o evento"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="sm:col-span-3">
                                                <Label htmlFor="start_at">Início</Label>
                                                <Input
                                                    type="datetime-local"
                                                    id="start_at"
                                                    name="start_at"
                                                    value={formData.start_at}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="sm:col-span-3">
                                                <Label htmlFor="finish_at">Fim</Label>
                                                <Input
                                                    type="datetime-local"
                                                    id="finish_at"
                                                    name="finish_at"
                                                    value={formData.finish_at}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="col-span-full">
                                                <div className="items-top flex space-x-2">
                                                    <Checkbox
                                                        id="is_virtual"
                                                        name="is_virtual"
                                                        checked={formData.is_virtual}
                                                        onCheckedChange={handleChange}
                                                    />
                                                    <div className="grid gap-1.5 leading-none">
                                                        <label
                                                            htmlFor="is_virtual"
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            Será um evento virtual?
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-full">
                                                <Label htmlFor="file-upload">Banner</Label>

                                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                                    <div className="text-center">
                                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                            <label
                                                                htmlFor="file-upload"
                                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                            >
                                                                <span>Envie uma foto</span>
                                                                <input
                                                                    id="file-upload"
                                                                    name="file-upload"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    className="sr-only"
                                                                    onChange={handleImageChange}
                                                                />
                                                            </label>
                                                            <p className="pl-1">ou arraste e solte</p>
                                                        </div>
                                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF até 10MB</p>
                                                        {selectedImage && (
                                                            <div className="mt-4">
                                                                <img
                                                                    src={selectedImage}
                                                                    alt="Preview"
                                                                    className="mx-auto rounded-lg max-h-48"
                                                                />
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

export default CreateEvent
