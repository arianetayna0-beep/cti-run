<script setup>
import { onMounted } from 'vue'

const emit = defineEmits(['irParaHome'])

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
  <div class="relative min-h-screen flex items-center justify-center bg-[#0a0a08] px-4 overflow-hidden font-['Inter',sans-serif]">
    
    <!-- Canvas de partículas ao fundo -->
    <canvas id="bg-canvas" class="absolute inset-0 h-full w-full pointer-events-none z-0"></canvas>

    <!-- Gradiente de overlay para contraste sutil -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#0a0a08]/40 via-transparent to-[#0a0a08] pointer-events-none z-0"></div>

    <!-- Container do Card de Login -->
    <div class="relative z-10 w-full max-w-md p-8 bg-[#0a0a08]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl space-y-6">
      
      <div class="text-center space-y-2">
        <div class="inline-flex items-center gap-2 mb-2">
          <div class="w-6 h-6 rounded-lg bg-[#5a9682] flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0a0a08" stroke-width="2.5">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </div>
          <span class="font-['Sora',sans-serif] text-[15px] font-semibold tracking-tight text-white">
            CTI<span class="text-[#8fc0ae]">.RUN</span>
          </span>
        </div>
        <h2 class="text-2xl font-bold text-white font-['Sora',sans-serif]">Acesse sua conta</h2>
        <p class="text-sm text-neutral-400">Entre com suas credenciais do CTI RUN</p>
      </div>

      <form @submit.prevent class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-neutral-300 mb-1 uppercase tracking-wider">E-mail</label>
          <input 
            type="email" 
            placeholder="seu@email.com" 
            class="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-[#5a9682] transition text-sm"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-300 mb-1 uppercase tracking-wider">Senha</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            class="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-[#5a9682] transition text-sm"
          />
        </div>

        <router-link
          to="/dashboard"
          class="block w-full text-center bg-[#5a9682] hover:bg-[#4a7d6c] active:scale-95 text-[#0a0a08] font-bold py-3 rounded-xl transition shadow-lg shadow-[#5a9682]/20 cursor-pointer text-sm"
        >
          Entrar
        </router-link>
      </form>

      <div class="text-center pt-2">
        <button 
          @click="emit('irParaHome')" 
          class="text-xs text-neutral-400 hover:text-[#8fc0ae] transition cursor-pointer"
        >
          ← Voltar para a página inicial
        </button>
      </div>

    </div>
  </div>
</template>