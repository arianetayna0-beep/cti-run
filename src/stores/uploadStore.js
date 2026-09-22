import { defineStore } from 'pinia'

import { ref, computed } from 'vue'

import * as XLSX from 'xlsx'
 
export const useUploadStore = defineStore('upload', () => {

  const arquivo = ref(null)
 
  const dadosPlanilha = ref([])
 
  const carregando = ref(false)
 
  const erro = ref(null)
 
  const totalRegistros = computed(() => {

    return dadosPlanilha.value.length

  })
 
  const temDados = computed(() => {

    return dadosPlanilha.value.length > 0

  })
 
  function selecionarArquivo(file) {

    arquivo.value = file
 
    dadosPlanilha.value = []
 
    erro.value = null

  }
 
  function removerArquivo() {

    arquivo.value = null
 
    dadosPlanilha.value = []
 
    erro.value = null

  }
 
  async function processarArquivo() {

    if (!arquivo.value) {

      erro.value = 'Selecione uma planilha antes de continuar.'

      return false

    }
 
    carregando.value = true

    erro.value = null
 
    try {

      const data =

        await arquivo.value.arrayBuffer()
 
      const workbook =

        XLSX.read(data, {

          type: 'array'

        })
 
      const nomePrimeiraAba =

        workbook.SheetNames[0]
 
      const worksheet =

        workbook.Sheets[nomePrimeiraAba]
 
      const jsonDados =

        XLSX.utils.sheet_to_json(

          worksheet,

          {

            defval: ''

          }

        )
 
      dadosPlanilha.value =

        jsonDados
 
      return true
 
    } catch (err) {

      console.error(

        'Erro ao ler a planilha:',

        err

      )
 
      erro.value =

        'Não foi possível ler o arquivo. Verifique se a planilha é válida.'
 
      return false
 
    } finally {

      carregando.value = false

    }

  }
 
  return {

    arquivo,

    dadosPlanilha,

    carregando,

    erro,
 
    totalRegistros,

    temDados,
 
    selecionarArquivo,

    removerArquivo,

    processarArquivo

  }

})
 