<script setup>
import { ref, onMounted } from 'vue'

const sidebarOpen = ref(true)

// Inicializa o canvas da Sidebar (Grade de Planilha + Partículas)
onMounted(() => {
  const canvas = document.getElementById('sidebar-canvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let w, h, points

  function resize() {
    w = canvas.width = canvas.offsetWidth
    h = canvas.height = canvas.offsetHeight
  }

  function initPoints() {
    const count = Math.floor((w * h) / 3500)
    points = Array.from({ length: Math.max(count, 12) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.2 + 0.4
    }))
  }

  function step() {
    ctx.clearRect(0, 0, w, h)

    // 1. GRADE SUTIL NA SIDEBAR
    ctx.strokeStyle = 'rgba(90, 150, 130, 0.04)'
    ctx.lineWidth = 1
    const gridSize = 24

    ctx.beginPath()
    for (let x = 0; x < w; x += gridSize) {
      ctx.moveTo(x, 0)
      ctx.lineTo(x, h)
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
    }
    ctx.stroke()

    // 2. PARTÍCULAS E CONEXÕES NA SIDEBAR
    for (const p of points) {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > w) p.vx *= -1
      if (p.y < 0 || p.y > h) p.vy *= -1
    }

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i], b = points[j]
        const dx = a.x - b.x, dy = a.y - b.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 90) {
          ctx.strokeStyle = `rgba(90,150,130,${0.22 * (1 - dist / 90)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
    }

    for (const p of points) {
      ctx.fillStyle = 'rgba(255,255,255,0.7)'
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fill()
    }

    requestAnimationFrame(step)
  }

  window.addEventListener('resize', () => { resize(); initPoints(); })
  resize()
  initPoints()
  step()
})

// Inicializa o Canvas do Gráfico Estático de Fundo (Estilo Off-White Fino com Pontos Brancos Brilhantes)
onMounted(() => {
  const canvas = document.getElementById('bg-chart-canvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  function drawStaticChart() {
    const w = canvas.width = window.innerWidth
    const h = canvas.height = window.innerHeight
    ctx.clearRect(0, 0, w, h)

    ctx.save()
    ctx.beginPath()

    // Coordenadas seguindo o padrão exato da referência enviada (com oscilações e forte alta no final)
    const points = [
      { x: w * 0.05, y: h * 0.90 },
      { x: w * 0.12, y: h * 0.84 },
      { x: w * 0.20, y: h * 0.74 },
      { x: w * 0.28, y: h * 0.60 },
      { x: w * 0.35, y: h * 0.85 },
      { x: w * 0.42, y: h * 0.68 },
      { x: w * 0.48, y: h * 0.62 },
      { x: w * 0.55, y: h * 0.67 },
      { x: w * 0.62, y: h * 0.63 },
      { x: w * 0.70, y: h * 0.76 },
      { x: w * 0.76, y: h * 0.64 },
      { x: w * 0.82, y: h * 0.58 },
      { x: w * 0.88, y: h * 0.35 },
      { x: w * 0.95, y: h * 0.15 }
    ]

    // Preenchimento sutil abaixo da linha com tom off-white bem leve
    ctx.moveTo(points[0].x, h)
    points.forEach(p => ctx.lineTo(p.x, p.y))
    ctx.lineTo(w, h)
    ctx.closePath()

    const grad = ctx.createLinearGradient(0, 0, 0, h)
    grad.addColorStop(0, 'rgba(235, 240, 238, 0.04)')
    grad.addColorStop(1, 'rgba(235, 240, 238, 0.00)')
    ctx.fillStyle = grad
    ctx.fill()

    // Linha principal muito fina e em cor Off-White elegante
    ctx.beginPath()
    points.forEach((p, index) => {
      if (index === 0) ctx.moveTo(p.x, p.y)
      else ctx.lineTo(p.x, p.y)
    })

    ctx.strokeStyle = 'rgba(235, 240, 238, 0.35)'
    ctx.lineWidth = 1.5
    ctx.stroke()
    ctx.restore()

    // Pontos de luz brancos e iluminados em cada vértice do gráfico
    points.forEach((p) => {
      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = '#ffffff'
      ctx.shadowBlur = 8
      ctx.beginPath()
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    })
  }

  window.addEventListener('resize', drawStaticChart)
  drawStaticChart()
})
</script>

<template>
  <div class="min-h-screen bg-[#0a0a08] text-white font-['Inter',sans-serif] flex overflow-hidden relative">
    
    <!-- CANVAS DO GRÁFICO ESTÁTICO AO FUNDO -->
    <canvas id="bg-chart-canvas" class="absolute inset-0 h-full w-full pointer-events-none z-0"></canvas>

    <!-- SIDEBAR COM PLANILHA EM GRADE E PARTÍCULAS -->
    <aside :class="sidebarOpen ? 'w-64' : 'w-20'" class="relative z-20 border-r border-white/10 bg-[#0a0a08]/75 backdrop-blur-xl flex flex-col transition-all duration-300 overflow-hidden">
      
      <canvas id="sidebar-canvas" class="absolute inset-0 h-full w-full pointer-events-none z-0"></canvas>
      <div class="absolute inset-0 bg-[#0a0a08]/65 pointer-events-none z-0"></div>

      <!-- Topo da Sidebar / Logo -->
      <div class="relative z-10 p-6 flex items-center justify-between border-b border-white/5">
        <div class="flex items-center gap-3 overflow-hidden">
          <div class="w-8 h-8 rounded-xl bg-[#5a9682] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(90,150,130,0.3)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0a08" stroke-width="2.5">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </div>
          <span v-if="sidebarOpen" class="font-['Sora',sans-serif] text-lg font-bold tracking-tight text-white whitespace-nowrap">
            CTI<span class="text-[#8fc0ae]">.RUN</span>
          </span>
        </div>
      </div>

      <!-- Links de Navegação da Sidebar -->
      <nav class="relative z-10 flex-1 px-4 py-6 space-y-2">
        <router-link 
          to="/dashboard" 
          class="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#5a9682]/15 border border-[#5a9682]/30 text-[#8fc0ae] font-medium text-sm transition-all shadow-[0_0_15px_rgba(90,150,130,0.1)]"
        >
          <span class="text-lg">📊</span>
          <span v-if="sidebarOpen" class="whitespace-nowrap">Dashboard</span>
        </router-link>

        <router-link 
          to="/upload" 
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.03] font-medium text-sm transition-all"
        >
          <span class="text-lg">📂</span>
          <span v-if="sidebarOpen" class="whitespace-nowrap">Upload de Planilha</span>
        </router-link>

        <router-link 
          to="/relatorios" 
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.03] font-medium text-sm transition-all"
        >
          <span class="text-lg">📄</span>
          <span v-if="sidebarOpen" class="whitespace-nowrap">Relatórios</span>
        </router-link>

        <router-link 
          to="/graficos" 
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.03] font-medium text-sm transition-all"
        >
          <span class="text-lg">📈</span>
          <span v-if="sidebarOpen" class="whitespace-nowrap">Gráficos</span>
        </router-link>
      </nav>

      <!-- Rodapé da Sidebar / Sair -->
      <div class="relative z-10 p-4 border-t border-white/5 flex items-center justify-between">
        <router-link 
          to="/login" 
          class="flex items-center gap-3 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 text-sm font-medium transition-all w-full"
        >
          <span class="text-lg">🚪</span>
          <span v-if="sidebarOpen" class="whitespace-nowrap">Sair</span>
        </router-link>
      </div>

    </aside>

    <!-- CONTEÚDO PRINCIPAL DA PÁGINA -->
    <main class="flex-1 min-h-screen p-8 overflow-y-auto relative z-10">
      <div class="max-w-6xl mx-auto">

        <!-- Cabeçalho do Dashboard -->
        <header class="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-[#5a9682]/40 bg-[#0a0a08]/40 backdrop-blur-md px-3 py-1 text-xs font-medium text-[#8fc0ae] shadow-[0_0_15px_rgba(90,150,130,0.15)]">
              <span class="h-2 w-2 rounded-full bg-[#3fb890] animate-pulse"></span>
              CTI.RUN Insights
            </div>
            <h1 class="text-4xl font-extrabold tracking-tight font-['Sora',sans-serif]">
              Dashboard
            </h1>
            <p class="mt-1 text-neutral-400">
              Visão geral dos dados analisados e métricas estratégicas.
            </p>
          </div>

          <!-- Botão para recolher/expandir a sidebar -->
          <button 
            @click="sidebarOpen = !sidebarOpen"
            class="px-4 py-2 rounded-xl border border-white/10 bg-[#0a0a08]/40 backdrop-blur-md text-xs text-neutral-300 hover:bg-white/[0.08] transition"
          >
            {{ sidebarOpen ? '◀ Recolher Menu' : '▶ Expandir' }}
          </button>
        </header>

        <!-- Cards de Indicadores (Efeito Vidro Mais Transparente) -->
        <section class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <article class="rounded-2xl border border-white/10 bg-[#0a0a08]/50 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-[#5a9682]/60 hover:shadow-[0_0_25px_rgba(90,150,130,0.2)]">
            <p class="text-xs uppercase tracking-wider text-neutral-400 font-medium">Total de clientes</p>
            <p class="mt-3 text-3xl font-extrabold text-white">0</p>
          </article>

          <article class="rounded-2xl border border-white/10 bg-[#0a0a08]/50 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-[#5a9682]/60 hover:shadow-[0_0_25px_rgba(90,150,130,0.2)]">
            <p class="text-xs uppercase tracking-wider text-neutral-400 font-medium">Faturamento médio</p>
            <p class="mt-3 text-3xl font-extrabold text-white">R$ 0,00</p>
          </article>

          <article class="rounded-2xl border border-white/10 bg-[#0a0a08]/50 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-[#5a9682]/60 hover:shadow-[0_0_25px_rgba(90,150,130,0.2)]">
            <p class="text-xs uppercase tracking-wider text-neutral-400 font-medium">Serviços ativos</p>
            <p class="mt-3 text-3xl font-extrabold text-white">0</p>
          </article>

          <article class="rounded-2xl border border-[#5a9682]/40 bg-[#0a0a08]/60 p-6 shadow-[0_0_30px_rgba(90,150,130,0.15)] backdrop-blur-md transition-all duration-300 hover:border-[#5a9682]">
            <p class="text-xs uppercase tracking-wider text-[#8fc0ae] font-medium">Clientes nível A</p>
            <p class="mt-3 text-3xl font-extrabold text-[#6ee7b7] drop-shadow-[0_0_10px_rgba(110,231,183,0.3)]">0</p>
          </article>
        </section>

        <!-- Seção de Gráficos (Efeito Vidro Mais Transparente) -->
        <section class="mt-8 grid gap-6 lg:grid-cols-2">
          <article class="min-h-72 rounded-2xl border border-white/10 bg-[#0a0a08]/50 p-6 shadow-2xl backdrop-blur-md">
            <h2 class="text-xl font-bold text-white font-['Sora',sans-serif]">Distribuição por segmento</h2>
            <div class="mt-8 flex h-48 items-center justify-center rounded-xl border border-dashed border-white/10 text-neutral-500 bg-white/[0.01]">
              Gráfico será implementado aqui
            </div>
          </article>

          <article class="min-h-72 rounded-2xl border border-white/10 bg-[#0a0a08]/50 p-6 shadow-2xl backdrop-blur-md">
            <h2 class="text-xl font-bold text-white font-['Sora',sans-serif]">Evolução de clientes</h2>
            <div class="mt-8 flex h-48 items-center justify-center rounded-xl border border-dashed border-white/10 text-neutral-500 bg-white/[0.01]">
              Gráfico será implementado aqui
            </div>
          </article>
        </section>

      </div>
    </main>

  </div>
</template>