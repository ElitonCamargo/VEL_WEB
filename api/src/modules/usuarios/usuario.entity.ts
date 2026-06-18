import type { BaseEntity } from "../../core/types/base.entity.ts";

export interface Usuario extends BaseEntity {
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
}