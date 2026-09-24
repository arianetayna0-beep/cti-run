<script setup>
import { ref, onMounted } from 'vue'

// Lista simulada de relatórios gerados no sistema
const relatorios = ref([
  { id: 1, nome: 'Relatório de Produção Industrial - Junho', tipo: 'Produção', data: '14/06/2026', status: 'Concluído', tamanho: '2.4 MB' },
  { id: 2, nome: 'Fechamento de Turno e Eficiência', tipo: 'Desempenho', data: '12/06/2026', status: 'Concluído', tamanho: '1.8 MB' },
  { id: 3, nome: 'Análise de Insumos e Desperdícios', tipo: 'Insumos', data: '10/06/2026', status: 'Processando', tamanho: '3.1 MB' },
  { id: 4, nome: 'Consolidado de Metas Semanais', tipo: 'Gestão', data: '05/06/2026', status: 'Concluído', tamanho: '950 KB' },
])

const filtroAtivo = ref('Todos')

// Canvas de partículas ao fundo mantendo a identidade visual do CTI RUN
onMounted(() => {
  const canvas = document.getElementById('bg-canvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let w, h, points

  function resize() {
    w = canvas.width = canvas.offsetWidth
    h = canvas.height = canvas.offsetHeight
  }

  function initPoints() {
    const count = Math.floor((w * h) / 9000)
    points = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.5
    }))
  }

  function step() {
    ctx.clearRect(0, 0, w, h)
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
        if (dist < 130) {
          ctx.strokeStyle = `rgba(90,150,130,${0.14 * (1 - dist / 130)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
    }
    for (const p of points) {
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
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
</script>

<template>
  <main class="relative min-h-screen overflow-hidden bg-[#0a0a08] text-white font-['Inter',sans-serif]">
    
    <!-- Canvas de partículas ao fundo -->
    <canvas id="bg-canvas" class="absolute inset-0 h-full w-full pointer-events-none z-0"></canvas>

    <!-- Gradiente de overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#0a0a08]/40 via-transparent to-[#0a0a08] pointer-events-none z-0"></div>

    <div class="relative z-10 max-w-6xl mx-auto px-6 py-8">

      <!-- Cabeçalho da Página / Voltar ao Dashboard -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div class="flex items-center gap-3">
          <router-link 
            to="/dashboard" 
            class="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center hover:bg-white/[0.1] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </router-link>
          <div>
            <h1 class="font-['Sora',sans-serif] text-xl font-semibold tracking-tight">Relatórios Gerenciais</h1>
            <p class="text-xs text-neutral-400">Acesse, filtre e exporte os relatórios gerados pelas planilhas</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <router-link 
            to="/upload" 
            class="bg-[#5a9682] hover:bg-[#4a7d6c] text-[#0a0a08] text-xs font-medium px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-[#5a9682]/20"
          >
            <span>Nova Importação</span>
          </router-link>
        </div>
      </div>

      <!-- Barra de Filtros e Busca -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <button 
            v-for="filtro in ['Todos', 'Produção', 'Desempenho', 'Insumos', 'Gestão']" 
            :key="filtro"
            @click="filtroAtivo = filtro"
            :class="[
              'px-4 py-2 rounded-xl text-xs font-medium transition-all',
              filtroAtivo === filtro 
                ? 'bg-[#5a9682] text-[#0a0a08] shadow-md shadow-[#5a9682]/20' 
                : 'bg-white/[0.03] border border-white/10 text-neutral-300 hover:bg-white/[0.06]'
            ]"
          >
            {{ filtro }}
          </button>
        </div>

        <div class="w-full md:w-72">
          <input 
            type="text" 
            placeholder="Pesquisar relatório..." 
            class="w-full bg-[#0a0a08]/80 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#5a9682] transition-colors"
          />
        </div>
      </div>

      <!-- Tabela / Lista de Relatórios -->
      <div class="rounded-2xl border border-white/10 bg-[#0a0a08]/85 backdrop-blur-md overflow-hidden shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-white/10 text-[11px] text-neutral-400 font-semibold uppercase tracking-wider bg-white/[0.02]">
                <th class="py-4 px-6">Nome do Relatório</th>
                <th class="py-4 px-6">Categoria</th>
                <th class="py-4 px-6">Data</th>
                <th class="py-4 px-6">Tamanho</th>
                <th class="py-4 px-6">Status</th>
                <th class="py-4 px-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5 text-xs">
              <tr v-for="item in relatorios" :key="item.id" class="hover:bg-white/[0.02] transition-colors">
                <td class="py-4 px-6 font-medium text-white flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-[#5a9682]/15 border border-[#5a9682]/30 flex items-center justify-center text-[#8fc0ae] shrink-0 font-bold">
                    📄
                  </div>
                  <span>{{ item.nome }}</span>
                </td>
                <td class="py-4 px-6 text-neutral-300">
                  <span class="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-[11px]">
                    {{ item.tipo }}
                  </span>
                </td>
                <td class="py-4 px-6 text-neutral-400">{{ item.data }}</td>
                <td class="py-4 px-6 text-neutral-400">{{ item.tamanho }}</td>
                <td class="py-4 px-6">
                  <span :class="[
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium',
                    item.status === 'Concluído' 
                      ? 'bg-[#3fb890]/15 text-[#6ee7b7] border border-[#3fb890]/30' 
                      : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  ]">
                    <span :class="['w-1.5 h-1.5 rounded-full', item.status === 'Concluído' ? 'bg-[#3fb890]' : 'bg-amber-400 animate-pulse']"></span>
                    {{ item.status }}
                  </span>
                </td>
                <td class="py-4 px-6 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button class="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-neutral-300 hover:bg-white/[0.1] hover:text-white transition-colors" title="Baixar Relatório">
                      📥
                    </button>
                    <button class="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-neutral-300 hover:bg-[#5a9682] hover:text-[#0a0a08] transition-colors" title="Visualizar">
                      👁️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Rodapé da Tabela / Paginação simulada -->
        <div class="py-4 px-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 bg-white/[0.01]">
          <span>Mostrando 4 de 12 relatórios</span>
          <div class="flex items-center gap-2">
            <button class="px-3 py-1 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-colors text-neutral-400 disabled:opacity-50" disabled>Anterior</button>
            <button class="px-3 py-1 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-colors text-white">Próxima</button>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>