'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CadastroProduto() {
  const router = useRouter()

  const [usuarioId, setUsuarioId] = useState<number | null>(null)

  const [form, setForm] = useState({
    nome_produto: '',
    descricao: '',
    quantidade: '',
    quantidade_descricao: '',
    validades_dias: '',
    valor_estimado: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const usuarioStr = localStorage.getItem('usuarioLogado') // Certifique-se de usar a chave correta
    if (usuarioStr) {
      try {
        const usuario = JSON.parse(usuarioStr)
        if (usuario?.id_usuario) {
          setUsuarioId(usuario.id_usuario)
        } else {
          setError('Usuário inválido.')
        }
      } catch (e) {
        console.error('Erro ao ler usuário do localStorage:', e)
        setError('Erro ao carregar usuário.')
      }
    } else {
      setError('Usuário não logado. Faça login para cadastrar produtos.')
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!usuarioId) {
      setError('ID do usuário não encontrado.')
      return
    }

    const { nome_produto, quantidade, validades_dias } = form
    if (!nome_produto || !quantidade || !validades_dias) {
      setError('Preencha todos os campos obrigatórios.')
      return
    }

    setLoading(true)
    setError(null)

    const payload: any = {
      nome_produto: form.nome_produto.trim(),
      descricao: form.descricao?.trim() || null,
      quantidade: Number(form.quantidade),
      quantidade_descricao: form.quantidade_descricao?.trim() || null,
      validades_dias: Number(form.validades_dias),
      status: 'DISPONIVEL',
      usuario: {
        id_usuario: usuarioId
      }
    }

    if (form.valor_estimado) {
      payload.valor_estimado = Number(form.valor_estimado)
    }

    console.log('Enviando payload:', payload)

    try {
      const response = await fetch('https://gs-savingfoods-production.up.railway.app/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Erro detalhado:', errorText)
        throw new Error('Erro ao criar produto')
      }

      alert('Produto cadastrado com sucesso!')
      router.push('/produtos')
    } catch (err) {
      console.error(err)
      setError('Erro ao cadastrar produto. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Produto</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nome_produto"
          placeholder="Nome do Produto *"
          value={form.nome_produto}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="quantidade"
          type="number"
          placeholder="Quantidade *"
          value={form.quantidade}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="quantidade_descricao"
          placeholder="Unidade (ex: kg, unid.)"
          value={form.quantidade_descricao}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="validades_dias"
          type="number"
          placeholder="Dias até vencer *"
          value={form.validades_dias}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="valor_estimado"
          type="number"
          step="0.01"
          placeholder="Valor estimado"
          value={form.valor_estimado}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 ${
            loading && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
        </button>
      </form>
    </div>
  )
}
