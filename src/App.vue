<script setup>
import { ref } from 'vue'

// Estado para controlar qual tela está ativa: 'home' ou 'login'
const telaAtual = ref('home')

// Função para mudar de tela
const irParaLogin = () => {
  telaAtual.value = 'login'
}

const irParaHome = () => {
  telaAtual.value = 'home'
}

const handleDemonstracao = () => {
  alert('Abrindo vídeo de demonstração do CTI RUN!')
}
</script>

<template>
  <div class="min-h-screen bg-[#0B0F0E] text-white p-8 flex flex-col justify-center items-center font-sans antialiased">
    
    <!-- TELA 1: HOME (HERO) -->
    <div v-if="telaAtual === 'home'" class="max-w-3xl text-center space-y-6">
      
      <!-- TAG / BADGE -->
      <span class="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase">
        CTI RUN • Inteligência de Dados
      </span>

      <!-- TÍTULO PRINCIPAL -->
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
        Transforme dados em decisões que impulsionam <span class="text-emerald-400">resultados.</span>
      </h1>

      <!-- SUBTÍTULO -->
      <p class="text-zinc-400 text-lg max-w-xl mx-auto">
        O CTI RUN transforma planilhas em informações estratégicas. Upload, tratamento e análise de dados em um só lugar.
      </p>

      <!-- BOTÕES DA HOME -->
      <div class="flex flex-wrap justify-center gap-4 pt-4">
        <!-- Botão Acessar Sistema (vai para a tela de login) -->
        <button 
          @click="irParaLogin"
          class="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-black font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          Acessar Sistema
        </button>
        
        <button 
          @click="handleDemonstracao"
          class="border border-zinc-700 hover:border-emerald-500/50 active:scale-95 text-white font-medium px-6 py-3 rounded-xl transition bg-zinc-900/50 cursor-pointer"
        >
          Ver Demonstração
        </button>
      </div>

      <!-- ESPAÇO RESERVADO PARA A IMAGEM -->
      <div class="mt-12 p-8 border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30 text-zinc-500 text-sm">
        📷 [Espaço reservado para a Imagem do Dashboard / Logo]
      </div>

    </div>

    <!-- TELA 2: LOGIN -->
    <div v-else-if="telaAtual === 'login'" class="w-full max-w-md p-8 bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl space-y-6">
      
      <!-- CABEÇALHO DO LOGIN -->
      <div class="text-center space-y-2">
        <h2 class="text-2xl font-bold text-white">Acesse sua conta</h2>
        <p class="text-sm text-zinc-400">Entre com suas credenciais do CTI RUN</p>
      </div>

      <!-- FORMULÁRIO -->
      <form @submit.prevent class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-zinc-400 mb-1">E-mail</label>
          <input 
            type="email" 
            placeholder="seu@email.com" 
            class="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 transition text-sm"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-zinc-400 mb-1">Senha</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            class="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 transition text-sm"
          />
        </div>

        <button 
          type="submit" 
          class="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-black font-bold py-3 rounded-xl transition shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          Entrar
        </button>
      </form>

      <!-- BOTÃO VOLTAR -->
      <div class="text-center pt-2">
        <button 
          @click="irParaHome" 
          class="text-xs text-zinc-400 hover:text-emerald-400 transition cursor-pointer"
        >
          ← Voltar para a página inicial
        </button>
      </div>

    </div>

  </div>
</template>

<style>
@import "tailwindcss";
</style>