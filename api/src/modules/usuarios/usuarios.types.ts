export interface Usuario {
    id: number;
    perfil_id: number | null;
    email: string;
    senha: string;
    nome: string;
    whatsapp?: string;
    avatar?: string;
    endereco?: {
        uf: string;
        cidade: string;
        bairro?: string;
        rua: string;
        numero: string;
        complemento?: string;
        cep?: string;
    };
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}