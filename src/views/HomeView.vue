<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const irParaLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
    
    <!-- 1. CABEÇALHO -->
    <header class="border-b border-zinc-800 p-4 bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-zinc-950 text-sm">
            ⚡
          </div>
          <span class="text-xl font-bold tracking-wider text-white">CTI<span class="text-emerald-400">.RUN</span></span>
        </div>

        <nav class="hidden md:flex gap-6 text-sm text-zinc-300">
          <a href="#hero" class="hover:text-emerald-400 transition">Início</a>
          <a href="#recursos" class="hover:text-emerald-400 transition">Transformação Digital</a>
          <a href="#contato" class="hover:text-emerald-400 transition">Contato</a>
        </nav>

        <button 
          @click="irParaLogin"
          class="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm transition cursor-pointer"
        >
          Entrar no sistema
        </button>

      </div>
    </header>

    <!-- 2. BANNER PRINCIPAL COM GRÁFICO MODERNO -->
    <section id="hero" class="py-16 px-4 text-center max-w-4xl mx-auto flex flex-col items-center">
      <span class="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-full mb-4">
        Do Papel ao Dashboard Digital
      </span>

      <h1 class="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
        Abandone o papel e transforme planilhas em <span class="text-emerald-400">decisões estratégicas</span>
      </h1>
      
      <p class="mt-4 text-zinc-400 text-base sm:text-lg max-w-2xl">
        O CTI RUN moderniza a gestão da sua empresa: elimine controles manuais em papel, centralize seus dados em planilhas digitais e gere relatórios automáticos em segundos.
      </p>

      <!-- ILUSTRAÇÃO MODERNA DE GRÁFICO -->
      <div class="mt-10 w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden group hover:border-emerald-500/50 transition">
        
        <div class="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>

        <div class="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-xs font-semibold text-zinc-300">Desempenho Industrial em Tempo Real</span>
          </div>
          <span class="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded">+28.4%</span>
        </div>

        <div class="flex items-end justify-between h-28 gap-3 pt-4 px-2">
          <div class="w-full bg-zinc-800/60 rounded-t-lg h-12 flex flex-col justify-end items-center group-hover:bg-zinc-800 transition">
            <div class="w-full bg-zinc-700 rounded-t-lg h-8"></div>
          </div>
          <div class="w-full bg-zinc-800/60 rounded-t-lg h-16 flex flex-col justify-end items-center">
            <div class="w-full bg-emerald-600/60 rounded-t-lg h-12"></div>
          </div>
          <div class="w-full bg-zinc-800/60 rounded-t-lg h-22 flex flex-col justify-end items-center">
            <div class="w-full bg-emerald-500 rounded-t-lg h-18 shadow-lg shadow-emerald-500/20"></div>
          </div>
          <div class="w-full bg-zinc-800/60 rounded-t-lg h-14 flex flex-col justify-end items-center">
            <div class="w-full bg-emerald-400 rounded-t-lg h-10"></div>
          </div>
          <div class="w-full bg-zinc-800/60 rounded-t-lg h-24 flex flex-col justify-end items-center">
            <div class="w-full bg-emerald-500 rounded-t-lg h-20 shadow-lg shadow-emerald-500/20"></div>
          </div>
        </div>

        <div class="flex justify-between text-[10px] text-zinc-500 mt-3 border-t border-zinc-800/50 pt-2 font-mono">
          <span>SEG</span>
          <span>TER</span>
          <span>QUA</span>
          <span>QUI</span>
          <span>SEX</span>
        </div>
      </div>
    </section>

    <!-- 3. RECURSOS DO PROJETO -->
    <section id="recursos" class="py-16 px-4 bg-zinc-900 border-t border-b border-zinc-800">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-bold text-center mb-2 text-white">Como Digitalizamos sua Empresa</h2>
        <p class="text-zinc-400 text-center text-sm mb-10">Substitua cadernos e arquivos físicos por controle digital integrado</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div class="p-6 bg-zinc-950 rounded-xl border border-zinc-800 hover:border-emerald-500/40 transition">
            <div class="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 text-2xl mb-4">
              📄➡️💻
            </div>
            <h3 class="text-lg font-bold text-white">Digitalização e Importação</h3>
            <p class="text-sm text-zinc-400 mt-2">Diga adeus ao papel. Converta anotações e planilhas em dados digitais centralizados.</p>
          </div>

          <div class="p-6 bg-zinc-950 rounded-xl border border-zinc-800 hover:border-emerald-500/40 transition">
            <div class="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 text-2xl mb-4">
              ⚙️
            </div>
            <h3 class="text-lg font-bold text-white">Tratamento sem Erros</h3>
            <p class="text-sm text-zinc-400 mt-2">Elimine falhas manuais de digitação com padronização e validação automática das informações.</p>
          </div>

          <div class="p-6 bg-zinc-950 rounded-xl border border-zinc-800 hover:border-emerald-500/40 transition">
            <div class="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 text-2xl mb-4">
              📊
            </div>
            <h3 class="text-lg font-bold text-white">Painéis e Dashboards</h3>
            <p class="text-sm text-zinc-400 mt-2">Acompanhe vendas, clientes e faturamento em gráficos visuais e atualizados em tempo real.</p>
          </div>

        </div>
      </div>
    </section>

    <!-- 4. RODAPÉ -->
    <footer id="contato" class="py-8 px-4 bg-zinc-950 border-t border-zinc-900 mt-auto text-xs text-zinc-400">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <p class="font-bold text-white text-sm">CTI RUN</p>
          <p>Projeto Integrador • SENAI SP</p>
        </div>
        <div>
          <p>© 2026 CTI RUN - Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>

  </div>
</template>