import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUploadStore = defineStore('upload', () => {
  const dadosPlanilha = ref([])
  const carregando = ref(false)

  function setDados(novosDados) {
    dadosPlanilha.value = novosDados
  }

  return {
    dadosPlanilha,
    carregando,
    setDados
  }
})