<template>
  <div class="upload-container">
    <h2>Importar Planilha de Dados</h2>
    
    <!-- Input para selecionar o arquivo -->
    <input type="file" @change="uploadStore.processarArquivo" accept=".xlsx, .xls, .csv" />

    <!-- Indicador de carregamento -->
    <p v-if="uploadStore.carregando">Processando planilha...</p>

    <!-- Exibição prévia dos dados carregados -->
    <div v-if="uploadStore.dadosPlanilha.length > 0">
      <h3>Dados Carregados com Sucesso!</h3>
      <p>Total de linhas: {{ uploadStore.dadosPlanilha.length }}</p>
      
      <table border="1" class="tabela-dados">
        <thead>
          <tr>
            <th v-for="(valor, chave) in uploadStore.dadosPlanilha[0]" :key="chave">
              {{ chave }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(linha, index) in uploadStore.dadosPlanilha.slice(0, 10)" :key="index">
            <td v-for="(valor, chave) in linha" :key="chave">
              {{ valor }}
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="uploadStore.dadosPlanilha.length > 10">*(Mostrando as primeiras 10 linhas)*</p>
    </div>
  </div>
</template>

<script setup>
import { useUploadStore } from '../stores/uploadStore'

const uploadStore = useUploadStore()
</script>

<style scoped>
.upload-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}
.tabela-dados {
  margin-top: 15px;
  border-collapse: collapse;
  width: 100%;
}
.tabela-dados th, .tabela-dados td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.tabela-dados th {
  background-color: #f2f2f2;
}
</style>