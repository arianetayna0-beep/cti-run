<script setup>
import { onMounted } from 'vue'

// Inicializa o canvas de partículas no fundo da página
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

    <!-- Gradiente de overlay para contraste sutil -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#0a0a08]/40 via-transparent to-[#0a0a08] pointer-events-none z-0"></div>

    <div class="relative z-10 max-w-6xl mx-auto px-8">

      <!-- Cabeçalho / Navbar -->
      <div class="flex items-center justify-between py-8">
        <div class="flex items-center gap-2">
          <!-- Seta apontando para a direita corrigida -->
          <div class="w-7 h-7 rounded-lg bg-[#5a9682] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a0a08" stroke-width="2.5">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </div>
          <span class="font-['Sora',sans-serif] text-[17px] font-semibold tracking-tight">
            CTI<span class="text-[#8fc0ae]">.RUN</span>
          </span>
        </div>

        <nav class="hidden md:flex items-center gap-8 text-[14px] text-neutral-300">
          <a href="#" class="hover:text-white transition-colors">Início</a>
          <a href="#" class="hover:text-white transition-colors">Transformação Digital</a>
          <a href="#" class="hover:text-white transition-colors">Contato</a>
        </nav>

        <router-link 
          to="/login"
          class="bg-[#5a9682] hover:bg-[#4a7d6c] text-[#0a0a08] text-[14px] font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Entrar no sistema
        </router-link>
      </div>

      <!-- Seção Hero Principal com Espaçamento e Enquadramento Otimizados -->
      <div class="pt-16 pb-20 text-center">
        
        <!-- Selo superior com boa distância -->
        <div class="inline-flex items-center gap-2 bg-white/[0.05] border border-white/10 text-[#8fc0ae] text-[13px] px-4 py-1.5 rounded-full mb-8 shadow-sm">
          Do Papel ao Dashboard Digital
        </div>

        <!-- Título original com largura ajustada para respiro perfeito -->
        <h1 class="font-['Sora',sans-serif] text-[36px] md:text-[46px] font-semibold tracking-tight leading-[1.2] mb-6 max-w-3xl mx-auto">
          Abandone o papel e transforme planilhas em <span class="text-[#8fc0ae]">decisões estratégicas</span>
        </h1>

        <!-- Subtítulo original com espaçamento adequado -->
        <p class="text-neutral-400 text-[16px] md:text-[17px] max-w-2xl mx-auto mb-12 leading-relaxed">
          O CTI RUN moderniza a gestão da sua empresa: elimine controles manuais em papel, centralize seus dados em planilhas digitais e gere relatórios automáticos em segundos.
        </p>

        <!-- Preview da Gráfica / Dashboard -->
        <div class="mt-8 rounded-2xl border border-white/10 bg-[#0a0a08]/80 backdrop-blur-md p-6 sm:p-8 max-w-2xl mx-auto shadow-2xl text-left">
          
          <!-- Cabeçalho do Card -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-2 text-sm text-neutral-300">
              <span class="w-2 h-2 rounded-full bg-[#3fb890] animate-pulse"></span>
              Desempenho Industrial em Tempo Real
            </div>
            <span class="text-xs bg-[#3fb890]/15 text-[#6ee7b7] px-2.5 py-1 rounded-md font-medium">+28.4%</span>
          </div>

          <!-- Área do Gráfico (Linha Fina + Barras de Fundo) -->
          <div class="h-56 sm:h-64 relative w-full pt-6 pb-2 px-2">
            
            <!-- Linhas de Grade de Fundo Sutis -->
            <div class="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-15">
              <div class="border-b border-dashed border-[#8fc0ae] w-full"></div>
              <div class="border-b border-dashed border-[#8fc0ae] w-full"></div>
              <div class="border-b border-dashed border-[#8fc0ae] w-full"></div>
              <div class="border-b border-dashed border-[#8fc0ae] w-full"></div>
            </div>

            <!-- SVG do Gráfico de Linha Fina, Vértices Brilhantes e Seta -->
            <svg class="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#3fb890" stop-opacity="0.4" />
                  <stop offset="50%" stop-color="#6ee7b7" />
                  <stop offset="100%" stop-color="#ffffff" />
                </linearGradient>
              </defs>

              <!-- Linha Fina Principal com Tendência de Alta -->
              <path 
                d="M 30,150 L 110,120 L 190,135 L 270,85 L 350,110 L 430,60 L 510,35 L 570,15" 
                fill="none" 
                stroke="url(#lineGrad)" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              />

              <!-- Pontos Brilhantes nos Vértices -->
              <circle cx="110" cy="120" r="3.5" fill="#6ee7b7" filter="drop-shadow(0 0 6px #3fb890)" />
              <circle cx="270" cy="85" r="3.5" fill="#6ee7b7" filter="drop-shadow(0 0 6px #3fb890)" />
              <circle cx="430" cy="60" r="3.5" fill="#6ee7b7" filter="drop-shadow(0 0 6px #3fb890)" />
              
              <!-- Ponto e Seta Final -->
              <circle cx="570" cy="15" r="5" fill="#ffffff" filter="drop-shadow(0 0 10px #6ee7b7)" />
              <path d="M 550,25 L 570,15 L 560,35" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <!-- Barras de Fundo Translúcidas -->
            <div class="absolute inset-x-4 bottom-2 h-36 flex items-end justify-between gap-2 z-0">
              <div class="w-full rounded-t-lg bg-gradient-to-t from-[#143828]/40 to-[#3fb890]/25 border-t border-[#4ade80]/30 h-[40%]"></div>
              <div class="w-full rounded-t-lg bg-gradient-to-t from-[#143828]/50 to-[#3fb890]/35 border-t border-[#4ade80]/40 h-[60%]"></div>
              <div class="w-full rounded-t-lg bg-gradient-to-t from-[#143828]/40 to-[#3fb890]/30 border-t border-[#4ade80]/30 h-[50%]"></div>
              <div class="w-full rounded-t-lg bg-gradient-to-t from-[#143828]/60 to-[#3fb890]/45 border-t border-[#4ade80]/50 h-[75%]"></div>
              <div class="w-full rounded-t-lg bg-gradient-to-t from-[#143828]/50 to-[#3fb890]/35 border-t border-[#4ade80]/40 h-[65%]"></div>
              <div class="w-full rounded-t-lg bg-gradient-to-t from-[#143828]/70 to-[#3fb890]/55 border-t border-[#4ade80]/60 h-[85%]"></div>
              <div class="w-full rounded-t-lg bg-gradient-to-t from-[#143828]/80 to-[#3fb890]/70 border-t border-[#6ee7b7] shadow-[0_0_15px_rgba(74,222,128,0.2)] h-[98%]"></div>
            </div>

          </div>

          <!-- Legendas dos Dias da Semana na Base -->
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

      <!-- Seção: Como Digitalizamos sua Empresa -->
      <section class="py-20 border-t border-white/5">
        <div class="text-center mb-16">
          <h2 class="font-['Sora',sans-serif] text-3xl font-semibold mb-3">Como Digitalizamos sua Empresa</h2>
          <p class="text-neutral-400 text-sm">Substitua cadernos e arquivos físicos por controle digital integrado</p>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <!-- Card 1 -->
          <article class="rounded-2xl border border-white/10 bg-[#0a0a08]/70 backdrop-blur-md p-6 transition-all hover:border-[#5a9682]/40">
            <div class="w-10 h-10 rounded-xl bg-[#5a9682]/10 border border-[#5a9682]/20 flex items-center justify-center mb-4 text-[#8fc0ae]">
              📄
            </div>
            <h3 class="font-['Sora',sans-serif] text-lg font-semibold mb-2">Digitalização e Importação</h3>
            <p class="text-sm text-neutral-400 leading-relaxed">
              Diga adeus ao papel. Converta anotações e planilhas em dados digitais centralizados.
            </p>
          </article>

          <!-- Card 2 -->
          <article class="rounded-2xl border border-white/10 bg-[#0a0a08]/70 backdrop-blur-md p-6 transition-all hover:border-[#5a9682]/40">
            <div class="w-10 h-10 rounded-xl bg-[#5a9682]/10 border border-[#5a9682]/20 flex items-center justify-center mb-4 text-[#8fc0ae]">
              ⚙️
            </div>
            <h3 class="font-['Sora',sans-serif] text-lg font-semibold mb-2">Tratamento sem Erros</h3>
            <p class="text-sm text-neutral-400 leading-relaxed">
              Elimine falhas manuais de digitação com padronização e validação automática das informações.
            </p>
          </article>

          <!-- Card 3 -->
          <article class="rounded-2xl border border-white/10 bg-[#0a0a08]/70 backdrop-blur-md p-6 transition-all hover:border-[#5a9682]/40">
            <div class="w-10 h-10 rounded-xl bg-[#5a9682]/10 border border-[#5a9682]/20 flex items-center justify-center mb-4 text-[#8fc0ae]">
              📊
            </div>
            <h3 class="font-['Sora',sans-serif] text-lg font-semibold mb-2">Painéis e Dashboards</h3>
            <p class="text-sm text-neutral-400 leading-relaxed">
              Acompanhe vendas, clientes e faturamento em gráficos visuais e atualizados em tempo real.
            </p>
          </article>
        </div>
      </section>

      <!-- Rodapé Institucional -->
      <footer class="py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
        <div>
          <span class="font-semibold text-neutral-300">CTI RUN</span>
          <span class="mx-2">•</span>
          <span>Projeto Integrador • SENAI SP</span>
        </div>
        <div>
          © 2026 CTI RUN - Todos os direitos reservados.
        </div>
      </footer>

    </div>
  </main>
</template>