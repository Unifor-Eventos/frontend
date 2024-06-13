'use client'

import Button from '@/components/Button'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

const Page = () => {
    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const [status, setStatus] = useState(null)

    return (
        <>
            <div className="mb-4 text-sm text-gray-600">
                Obrigado por entrar! antes de começar, verifique o seu email
                atravez do link enviado. Se não recebeu o email, nós
                enviaremos outro.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    Um novo link de verificação será envoado para o seu email
                    fornecido durante o registro.
                </div>
            )}

            <div className="mt-4 flex items-center justify-between">
                <Button onClick={() => resendEmailVerification({ setStatus })}>
                    Reenviar Email de Verificação
                </Button>

                <button
                    type="button"
                    className="underline text-sm text-gray-600 hover:text-gray-900"
                    onClick={logout}>
                    Sair
                </button>
            </div>
        </>
    )
}

export default Page
