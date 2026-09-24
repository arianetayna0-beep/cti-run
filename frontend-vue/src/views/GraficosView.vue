<script setup>
import { onMounted } from 'vue'

// Canvas de partículas ao fundo para manter a identidade visual
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
            <h1 class="font-['Sora',sans-serif] text-xl font-semibold tracking-tight">Análise Gráfica Avançada</h1>
            <p class="text-xs text-neutral-400">Visualização detalhada dos indicadores de desempenho e produção</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-xs bg-[#3fb890]/15 text-[#6ee7b7] border border-[#3fb890]/30 px-3 py-1.5 rounded-lg font-medium flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#3fb890] animate-pulse"></span>
            Tempo Real Ativo
          </span>
        </div>
      </div>

      <!-- Grid de Cards de Métricas Rápidas -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div class="rounded-2xl border border-white/10 bg-[#0a0a08]/85 backdrop-blur-md p-6">
          <p class="text-xs text-neutral-400 mb-1">Eficiência Média</p>
          <div class="flex items-baseline justify-between">
            <h3 class="font-['Sora',sans-serif] text-2xl font-semibold">94.2%</h3>
            <span class="text-xs text-[#6ee7b7] bg-[#3fb890]/15 px-2 py-0.5 rounded font-medium">+4.1%</span>
          </div>
        </div>

        <div class="rounded-2xl border border-white/10 bg-[#0a0a08]/85 backdrop-blur-md p-6">
          <p class="text-xs text-neutral-400 mb-1">Total Produzido (Mês)</p>
          <div class="flex items-baseline justify-between">
            <h3 class="font-['Sora',sans-serif] text-2xl font-semibold">18.450 un</h3>
            <span class="text-xs text-[#6ee7b7] bg-[#3fb890]/15 px-2 py-0.5 rounded font-medium">+12.8%</span>
          </div>
        </div>

        <div class="rounded-2xl border border-white/10 bg-[#0a0a08]/85 backdrop-blur-md p-6">
          <p class="text-xs text-neutral-400 mb-1">Taxa de Erros/Perdas</p>
          <div class="flex items-baseline justify-between">
            <h3 class="font-['Sora',sans-serif] text-2xl font-semibold">0.8%</h3>
            <span class="text-xs text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded font-medium">-0.3%</span>
          </div>
        </div>
      </div>

      <!-- Gráfico Principal (Desempenho Geral) -->
      <div class="rounded-2xl border border-white/10 bg-[#0a0a08]/85 backdrop-blur-md p-6 sm:p-8 mb-8 shadow-2xl">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="font-['Sora',sans-serif] text-base font-semibold">Curva de Produtividade Semanal</h2>
            <p class="text-xs text-neutral-400">Comparativo entre o volume planejado e o executado</p>
          </div>
          <div class="flex items-center gap-2 text-xs">
            <span class="flex items-center gap-1.5 text-neutral-300"><span class="w-3 h-0.5 bg-[#6ee7b7]"></span> Executado</span>
          </div>
        </div>

        <!-- Área do Gráfico SVG de Linha Fina -->
        <div class="h-64 relative w-full pt-6 pb-2 px-2">
          <!-- Linhas de Grade de Fundo -->
          <div class="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-15">
            <div class="border-b border-dashed border-[#8fc0ae] w-full"></div>
            <div class="border-b border-dashed border-[#8fc0ae] w-full"></div>
            <div class="border-b border-dashed border-[#8fc0ae] w-full"></div>
            <div class="border-b border-dashed border-[#8fc0ae] w-full"></div>
          </div>

          <!-- SVG do Gráfico -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#3fb890" stop-opacity="0.4" />
                <stop offset="50%" stop-color="#6ee7b7" />
                <stop offset="100%" stop-color="#ffffff" />
              </linearGradient>
            </defs>

            <path 
              d="M 30,140 L 110,100 L 190,120 L 270,70 L 350,90 L 430,45 L 510,30 L 570,15" 
              fill="none" 
              stroke="url(#lineGrad2)" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            />

            <circle cx="110" cy="100" r="3.5" fill="#6ee7b7" filter="drop-shadow(0 0 6px #3fb890)" />
            <circle cx="270" cy="70" r="3.5" fill="#6ee7b7" filter="drop-shadow(0 0 6px #3fb890)" />
            <circle cx="430" cy="45" r="3.5" fill="#6ee7b7" filter="drop-shadow(0 0 6px #3fb890)" />
            <circle cx="570" cy="15" r="5" fill="#ffffff" filter="drop-shadow(0 0 10px #6ee7b7)" />
          </svg>

          <!-- Barras de Fundo -->
          <div class="absolute inset-x-4 bottom-2 h-40 flex items-end justify-between gap-3 z-0">
            <div class="w-full rounded-t-lg bg-gradient-to-t from-[#143828]/40 to-[#3fb890]/25 border-t border-[#4ade80]/30 h-[45%]"></div>
            <div class="w-full rounded-t-lg bg-gradient-to-t from-[#143828]/50 to-[#3fb890]/35 border-t border-[#4ade80]/40 h-[65%]"></div>
            <div class="w-full rounded-t-lg bg-gradient-to-t from-[#143828]/40 to-[#3fb890]/30 border-t border-[#4ade80]/30 h-[55%]"></div>
            <div class="w-full rounded-t-lg bg-gradient-to-t from-[#143828]/60 to-[#3fb890]/45 border-t border-[#4ade80]/50 h-[80%]"></div>
            <div class="w-full rounded-t-lg bg-gradient-to-t from-[#143828]/50 to-[#3fb890]/35 border-t border-[#4ade80]/40 h-[70%]"></div>
            <div class="w-full rounded-t-lg bg-gradient-to-t from-[#143828]/70 to-[#3fb890]/55 border-t border-[#4ade80]/60 h-[90%]"></div>
            <div class="w-full rounded-t-lg bg-gradient-to-t from-[#143828]/80 to-[#3fb890]/70 border-t border-[#6ee7b7] shadow-[0_0_15px_rgba(74,222,128,0.2)] h-[98%]"></div>
          </div>
        </div>

        <div class="grid grid-cols-7 text-center pt-4 border-t border-white/5 text-xs text-neutral-400 font-medium mt-2">
          <span>SEG</span>
          <span>TER</span>
          <span>QUA</span>
          <span>QUI</span>
          <span>SEX</span>
          <span>SÁB</span>
          <span>DOM</span>
        </div>
      </div>

    </div>
  </main>
</template>