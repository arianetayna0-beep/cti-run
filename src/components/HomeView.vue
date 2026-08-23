<script setup>
const emit = defineEmits(['irParaLogin'])
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
    
    <!-- 1. CABEÇALHO (Logo CTI RUN e Navegação) -->
    <header class="border-b border-zinc-800 p-4 bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        
        <!-- LOGO CTI RUN -->
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-zinc-950 text-sm">
            ⚡
          </div>
          <span class="text-xl font-bold tracking-wider text-white">CTI<span class="text-emerald-400">.RUN</span></span>
        </div>

        <!-- MENU DE NAVEGAÇÃO -->
        <nav class="hidden md:flex gap-6 text-sm text-zinc-300">
          <a href="#hero" class="hover:text-emerald-400 transition">Início</a>
          <a href="#recursos" class="hover:text-emerald-400 transition">Transformação Digital</a>
          <a href="#contato" class="hover:text-emerald-400 transition">Contato</a>
        </nav>

        <!-- BOTÃO ENTRAR NO SISTEMA -->
        <button 
          @click="emit('irParaLogin')"
          class="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm transition cursor-pointer"
        >
          Entrar no sistema
        </button>

      </div>
    </header>


    <!-- 2. BANNER PRINCIPAL (Hero Section) -->
    <section id="hero" class="py-20 px-4 text-center max-w-4xl mx-auto flex flex-col items-center">
      <span class="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-full mb-4">
        Do Papel ao Dashboard Digital
      </span>

      <h1 class="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
        Abandone o papel e transforme planilhas em <span class="text-emerald-400">decisões estratégicas</span>
      </h1>
      
      <p class="mt-4 text-zinc-400 text-base sm:text-lg max-w-2xl">
        O CTI RUN moderniza a gestão da sua empresa: elimine controles manuais em papel, centralize seus dados em planilhas digitais e gere relatórios automáticos em segundos.
      </p>

      <div class="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button 
          @click="emit('irParaLogin')"
          class="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-8 py-3.5 rounded-xl transition shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          Acessar Sistema
        </button>
      </div>
    </section>


    <!-- 3. RECURSOS DO PROJETO (Digitalização & Análise) -->
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