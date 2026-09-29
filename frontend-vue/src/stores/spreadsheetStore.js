// src/stores/spreadsheetStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSpreadsheetStore = defineStore('spreadsheet', () => {
  // 1. STATE: Armazena as informações temporárias
  const rawRows = ref([])
  const fileName = ref('')
  const totalRecords = ref(0)
  const validRecords = ref([])
  const errorRecords = ref([])
  const validationSummary = ref({
    emptyFields: 0,
    invalidEmails: 0,
    duplicates: 0,
    outOfPattern: 0
  })
  const isProcessing = ref(false)

  // 2. GETTERS: Informações calculadas a partir dos dados
  const invalidCount = computed(() => errorRecords.value.length)
  
  const successRate = computed(() => {
    if (totalRecords.value === 0) return 0
    return ((validRecords.value.length / totalRecords.value) * 100).toFixed(1)
  })
  
  const hasData = computed(() => totalRecords.value > 0)

  // 3. ACTIONS: Processos e validações executados
  function setSpreadsheetData(name, rows) {
    fileName.value = name
    rawRows.value = rows
    totalRecords.value = rows.length
  }

  function validateDataset() {
    isProcessing.value = true
    errorRecords.value = []
    validRecords.value = []
    
    const summary = { emptyFields: 0, invalidEmails: 0, duplicates: 0, outOfPattern: 0 }
    const seenEmails = new Set()

    rawRows.value.forEach((row, index) => {
      let hasError = false
      const rowNum = index + 1

      // Validação 1: Campos obrigatórios vazios
      if (!row.nome || !row.email || !row.cargo) {
        errorRecords.value.push({
          row: rowNum,
          field: 'Campos Obrigatórios',
          message: 'Existem campos obrigatórios vazios (Nome, E-mail ou Cargo).'
        })
        summary.emptyFields++
        hasError = true
      }

      // Validação 2: E-mail inválido (Regex)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (row.email && !emailRegex.test(row.email.trim())) {
        errorRecords.value.push({
          row: rowNum,
          field: 'E-mail',
          message: `O e-mail "${row.email}" está em formato inválido.`
        })
        summary.invalidEmails++
        hasError = true
      }

      // Validação 3: Registros duplicados
      if (row.email) {
        const cleanEmail = row.email.trim().toLowerCase()
        if (seenEmails.has(cleanEmail)) {
          errorRecords.value.push({
            row: rowNum,
            field: 'E-mail Duplicado',
            message: `O e-mail "${row.email}" está duplicado em outra linha.`
          })
          summary.duplicates++
          hasError = true
        } else {
          seenEmails.add(cleanEmail)
        }
      }

      if (!hasError) {
        validRecords.value.push(row)
      }
    })

    validationSummary.value = summary
    isProcessing.value = false
  }

  function resetStore() {
    rawRows.value = []
    fileName.value = ''
    totalRecords.value = 0
    validRecords.value = []
    errorRecords.value = []
    validationSummary.value = { emptyFields: 0, invalidEmails: 0, duplicates: 0, outOfPattern: 0 }
  }

  return {
    rawRows,
    fileName,
    totalRecords,
    validRecords,
    errorRecords,
    validationSummary,
    isProcessing,
    invalidCount,
    successRate,
    hasData,
    setSpreadsheetData,
    validateDataset,
    resetStore
  }
})