<script setup>
import { computed } from 'vue'
import { useUploadStore } from '../stores/uploadStore'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement } from 'chart.js'
import { Bar, Doughnut } from 'vue-chartjs'

// Registra os componentes do Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement)

const uploadStore = useUploadStore()

// 1. Total de Clientes
const totalClientes = computed(() => uploadStore.dadosPlanilha.length)

// 2. Faturamento Médio
const faturamentoMedio = computed(() => {
  const dados = uploadStore.dadosPlanilha
  if (!dados.length) return 0
  const soma = dados.reduce((acc, item) => {
    const valor = parseFloat(item.faturamento_anual) || 0
    return acc + valor
  }, 0)
  return soma / dados.length
})

// 3. Clientes Nível A
const clientesNivelA = computed(() => {
  return uploadStore.dadosPlanilha.filter(item => {
    const nivel = String(item.nivel_cliente || '').trim().toUpperCase()
    return nivel === 'A'
  }).length
})

// 4. Serviços Ativos
const servicosAtivos = computed(() => {
  let total = 0
  uploadStore.dadosPlanilha.forEach(item => {
    if (item.servicos_contratados) {
      const servicos = item.servicos_contratados.split(';')
      total += servicos.length
    }
  })
  return total
})

// --- DADOS PARA O GRÁFICO 1: Distribuição por Segmento ---
const dadosGraficoSegmento = computed(() => {
  const dados = uploadStore.dadosPlanilha
  const contagem = {}

  dados.forEach(item => {
    // Ajuste 'segmento' para o nome exato da coluna da sua planilha se for diferente (ex: 'ramo', 'categoria')
    const segmento = item.segmento || item.ramo || 'Outros'
    contagem[segmento] = (contagem[segmento] || 0) + 1
  })

  return {
    labels: Object.keys(contagem).length ? Object.keys(contagem) : ['Sem dados'],
    datasets: [
      {
        backgroundColor: ['#6ee7b7', '#34d399', '#059669', '#10b981', '#047857', '#64748b'],
        data: Object.keys(contagem).length ? Object.values(contagem) : [1],
        borderWidth: 0
      }
    ]
  }
})

// --- DADOS PARA O GRÁFICO 2: Evolução / Faturamento por Cliente ---
const dadosGraficoEvolucao = computed(() => {
  const dados = uploadStore.dadosPlanilha
  // Pega até os primeiros 10 clientes para o gráfico de barras não ficar poluído
  const topDados = dados.slice(0, 10)

  return {
    labels: topDados.map((item, index) => item.nome || item.cliente || `Cliente ${index + 1}`),
    datasets: [
      {
        label: 'Faturamento Anual (R$)',
        backgroundColor: '#6ee7b7',
        borderRadius: 6,
        data: topDados.map(item => parseFloat(item.faturamento_anual) || 0)
      }
    ]
  }
})

// Opções globais para deixar os gráficos com o tema escuro do design
const opcoesGraficos = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#a3a3a3',
        font: { family: 'sans-serif', size: 12 }
      }
    }
  },
  scales: {
    x: {
      ticks: { color: '#737373' },
      grid: { color: 'rgba(255, 255, 255, 0.05)' }
    },
    y: {
      ticks: { color: '#737373' },
      grid: { color: 'rgba(255, 255, 255, 0.05)' }
    }
  }
}

const opcoesDoughnut = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#a3a3a3',
        font: { family: 'sans-serif', size: 12 }
      }
    }
  }
}
</script>

<template>
  <div class="flex min-h-screen bg-[#0a0a08] text-white">
    
    <!-- BARRA LATERAL (SIDEBAR) -->
    <aside class="w-64 border-r border-white/10 bg-[#0a0a08] p-6 flex flex-col justify-between hidden md:flex">
      <div class="space-y-8">
        <!-- Logo / Topo Sidebar -->
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-[#5a9682]/20 border border-[#5a9682]/40 flex items-center justify-center text-[#6ee7b7]">
            ➔
          </div>
          <span class="text-xl font-bold tracking-wider text-white">CTI<span class="text-[#6ee7b7]">.RUN</span></span>
        </div>

        <!-- Links de Navegação -->
        <nav class="space-y-2">
          <router-link to="/dashboard" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1c2420] border border-[#5a9682]/40 text-[#6ee7b7] font-medium text-sm transition-all shadow-lg shadow-[#5a9682]/10">
            <span>📊</span> Dashboard
          </router-link>
          
          <router-link to="/upload" class="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 font-medium text-sm transition-all">
            <span>📁</span> Upload de Planilha
          </router-link>

          <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 font-medium text-sm transition-all">
            <span>📄</span> Relatórios
          </a>

          <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 font-medium text-sm transition-all">
            <span>📈</span> Gráficos
          </a>
        </nav>
      </div>
    </aside>

    <!-- CONTEÚDO PRINCIPAL -->
    <main class="flex-1 p-8 space-y-8 overflow-y-auto">
      
      <!-- Cabeçalho -->
      <header class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#5a9682]/30 bg-[#5a9682]/10 text-[#6ee7b7] text-xs font-medium mb-3">
            <span class="w-1.5 h-1.5 rounded-full bg-[#6ee7b7] animate-pulse"></span>
            CTI.RUN Insights
          </div>
          <h1 class="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p class="text-sm text-neutral-400 mt-1">Visão geral dos dados analisados e métricas estratégicas.</p>
        </div>

        <div class="flex items-center gap-3">
          <router-link to="/upload" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5a9682] hover:bg-[#4e8271] text-black font-medium text-sm transition-all shadow-lg shadow-[#5a9682]/20">
            <span>+ Importar planilha</span>
          </router-link>
          <button class="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 font-medium text-sm transition-all">
            <span>◀ Recolher</span>
          </button>
        </div>
      </header>

      <!-- CARDS DE MÉTRICAS -->
      <section class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <article class="rounded-2xl border border-white/10 bg-[#121212] p-6 shadow-xl backdrop-blur">
          <p class="text-xs uppercase tracking-wider text-neutral-400 font-medium">Total de clientes</p>
          <p class="mt-3 text-3xl font-extrabold text-white">{{ totalClientes }}</p>
        </article>

        <article class="rounded-2xl border border-white/10 bg-[#121212] p-6 shadow-xl backdrop-blur">
          <p class="text-xs uppercase tracking-wider text-neutral-400 font-medium">Faturamento médio</p>
          <p class="mt-3 text-3xl font-extrabold text-white">
            {{ faturamentoMedio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
          </p>
        </article>

        <article class="rounded-2xl border border-white/10 bg-[#121212] p-6 shadow-xl backdrop-blur">
          <p class="text-xs uppercase tracking-wider text-neutral-400 font-medium">Serviços ativos</p>
          <p class="mt-3 text-3xl font-extrabold text-white">{{ servicosAtivos }}</p>
        </article>

        <article class="rounded-2xl border border-white/10 bg-[#121212] p-6 shadow-xl backdrop-blur">
          <p class="text-xs uppercase tracking-wider text-neutral-400 font-medium">Clientes nível A</p>
          <p class="mt-3 text-3xl font-extrabold text-[#6ee7b7] drop-shadow-[0_0_10px_rgba(110,231,183,0.3)]">{{ clientesNivelA }}</p>
        </article>
      </section>

      <!-- SEÇÃO DE GRÁFICOS REAIS -->
      <section class="grid gap-6 md:grid-cols-2">
        
        <!-- Gráfico 1: Distribuição por Segmento -->
        <div class="rounded-2xl border border-white/10 bg-[#121212] p-6 shadow-xl flex flex-col justify-between">
          <h3 class="text-lg font-semibold text-white mb-4">Distribuição por segmento</h3>
          <div class="relative h-[280px] w-full flex items-center justify-center">
            <Doughnut :data="dadosGraficoSegmento" :options="opcoesDoughnut" />
          </div>
        </div>

        <!-- Gráfico 2: Faturamento por Cliente / Evolução -->
        <div class="rounded-2xl border border-white/10 bg-[#121212] p-6 shadow-xl flex flex-col justify-between">
          <h3 class="text-lg font-semibold text-white mb-4">Faturamento por cliente</h3>
          <div class="relative h-[280px] w-full flex items-center justify-center">
            <Bar :data="dadosGraficoEvolucao" :options="opcoesGraficos" />
          </div>
        </div>

      </section>

    </main>
  </div>
</template>