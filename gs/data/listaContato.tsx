
export type Contato = {
    id: number;
    nome: string;
    rm: string;
    github: string;
    linkedin: string;
    email: string;
    foto: string;
    fotoalt: string;
}

export const listaContato: Contato[] = [
    {
        id: 1, nome: 'Jonas Kimio Isiki', rm: '560560',
        github: 'https://github.com/FIAPJonasKI',
        linkedin: 'https://www.linkedin.com/in/jonas-kimio-isiki-43422b275/',
        email: 'mailto:rm560560@fiap.com.br',
        foto: '/imagens/F_Jonas.jpg',
        fotoalt: 'Foto de Jonas' 
    },

    {
        id: 2, nome: 'Daniel Kendi Saijo Araki', rm: '553043',
        github: 'https://github.com/DanKendi',
        linkedin: 'https://www.linkedin.com/in/daniel-kendi-saijo-araki/',
        email: 'mailto:rm553043@fiap.com.br',
        foto: '/imagens/F_Daniel.jpg',
        fotoalt: 'Foto do Daniel'
    },

    {
        id: 3, nome: 'Marcos Vinicius Alves Marques', rm: '560475',
        github: 'https://github.com/M4rkitos',
        linkedin: 'https://www.linkedin.com/in/marcos-vin%C3%ADcius-marques-9a5284264/',
        email: 'mailto:rm560475@fiap.com.br',
        foto: '/imagens/F_Marcos.jpg',
        fotoalt: 'Foto Marcos' 
    },
]