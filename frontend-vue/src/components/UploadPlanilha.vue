<template>
  <div class="p-6 bg-white rounded-xl shadow-md max-w-xl mx-auto mt-10">
    <h2 class="text-xl font-bold text-gray-800 mb-4">Upload da Planilha CTI Provedor</h2>
    
    <div 
      class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-500 transition-colors cursor-pointer"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <input 
        type="file" 
        ref="fileInput" 
        @change="handleFileChange" 
        accept=".xlsx, .xls" 
        class="hidden" 
      />
      
      <p class="text-gray-600 mb-2">Arraste e solte sua planilha aqui ou</p>
      <button 
        @click="$refs.fileInput.click()" 
        class="px-4 py-2 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition"
      >
        Selecionar Arquivo
      </button>
      <p class="text-xs text-gray-400 mt-2">Formatos aceitos: .xlsx, .xls</p>
    </div>

    <div v-if="store.fileName" class="mt-4 p-3 bg-gray-50 rounded-md flex justify-between items-center">
      <span class="text-sm text-gray-700 font-medium">📄 Arquivo: {{ store.fileName }}</span>
      <span class="text-xs text-green-600 font-bold" v-if="!store.isProcessing">Processado com sucesso!</span>
    </div>

    <div v-if="store.isProcessing" class="mt-4 text-center text-orange-600 font-medium">
      Analisando dados da planilha...
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSpreadsheetStore } from '../stores/spreadsheetStore'
import * as XLSX from 'xlsx'
import { useRouter } from 'vue-router'

const store = useSpreadsheetStore()
const router = useRouter()
const fileInput = ref(null)

function processFile(file) {
  const reader = new FileReader()
  
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result)
    const workbook = XLSX.read(data, { type: 'array' })
    const firstSheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[firstSheetName]
    
    // Converte a planilha para JSON (considerando a primeira linha como cabeçalho)
    const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' })

    // Salva os dados brutos na Store
    store.setSpreadsheetData(file.name, rows)

    // Executa as validações definidas nas actions
    store.validateDataset()

    // Redireciona automaticamente para a tela de relatório após processar
    router.push('/epis') // ou a rota correspondente ao relatório
  }

  reader.readAsArrayBuffer(file)
}

function handleFileChange(event) {
  const file = event.target.files[0]
  if (file) processFile(file)
}

function handleDrop(event) {
  const file = event.dataTransfer.files[0]
  if (file) processFile(file)
}
</script>