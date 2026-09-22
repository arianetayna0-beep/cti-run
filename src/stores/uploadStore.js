import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as XLSX from 'xlsx' // Biblioteca para ler planilhas (Excel/CSV)

export const useUploadStore = defineStore('upload', () => {
  const dadosPlanilha = ref([])
  const carregando = ref(false)
  const erro = ref(null)

  function setDados(novosDados) {
    dadosPlanilha.value = novosDados
  }

  // Função para processar o arquivo enviado via input
  async function processarArquivo(event) {
    const arquivo = event.target.files[0]
    if (!arquivo) return

    carregando.value = true
    erro.value = null

    try {
      // Ler o arquivo como ArrayBuffer
      const data = await arquivo.arrayBuffer()
      
      // Processar a planilha com a biblioteca XLSX
      const workbook = XLSX.read(data, { type: 'array' })
      
      // Pega a primeira aba da planilha
      const nomePrimeiraAba = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[nomePrimeiraAba]
      
      // Converte os dados da aba em um array de objetos JSON
      const jsonDados = XLSX.utils.sheet_to_json(worksheet)

      // Salva no estado do Pinia
      setDados(jsonDados)
    } catch (err) {
      console.error('Erro ao ler a planilha:', err)
      erro.value = 'Não foi possível ler o arquivo. Certifique-se de que é uma planilha válida.'
    } finally {
      carregando.value = false
    }
  }

  return {
    dadosPlanilha,
    carregando,
    erro,
    setDados,
    processarArquivo
  }
})