<script setup>
import { ref, onMounted } from 'vue'

// Estado para controle do arquivo selecionado e simulação de envio
const selectedFile = ref(null)
const isDragging = ref(false)
const isUploading = ref(false)
const uploadSuccess = ref(false)

// Gerenciamento de arrastar e soltar (Drag and Drop)
const handleDrop = (e) => {
  isDragging.value = false
  const files = e.dataTransfer.files
  if (files.length > 0) {
    selectedFile.value = files[0]
    uploadSuccess.value = false
  }
}

const handleFileSelect = (e) => {
  const files = e.target.files
  if (files.length > 0) {
    selectedFile.value = files[0]
    uploadSuccess.value = false
  }
}

// Simulação de processamento / upload da planilha
const simulateUpload = () => {
  if (!selectedFile.value) return
  isUploading.value = true
  
  setTimeout(() => {
    isUploading.value = false
    uploadSuccess.value = true
  }, 2000)
}

// Canvas de partículas ao fundo mantendo a identidade visual
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

    <div class="relative z-10 max-w-5xl mx-auto px-6 py-8">

      <!-- Cabeçalho da Página / Voltar ao Dashboard -->
      <div class="flex items-center justify-between mb-12">
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
            <h1 class="font-['Sora',sans-serif] text-xl font-semibold tracking-tight">Upload de Planilha</h1>
            <p class="text-xs text-neutral-400">Importe seus dados de produção ou controle para o sistema</p>
          </div>
        </div>

        <span class="text-xs bg-[#5a9682]/15 text-[#8fc0ae] border border-[#5a9682]/30 px-3 py-1.5 rounded-lg font-medium">
          Módulo de Importação
        </span>
      </div>

      <!-- Container Principal de Upload -->
      <div class="max-w-2xl mx-auto">
        <div class="rounded-2xl border border-white/10 bg-[#0a0a08]/85 backdrop-blur-md p-8 shadow-2xl">
          
          <!-- Área de Arrastar e Soltar (Drag & Drop) -->
          <div 
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            :class="[
              'border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer relative flex flex-col items-center justify-center',
              isDragging ? 'border-[#5a9682] bg-[#5a9682]/10' : 'border-white/15 hover:border-[#5a9682]/50 bg-white/[0.02]'
            ]"
          >
            <input 
              type="file" 
              id="file-input" 
              class="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
              accept=".xlsx, .xls, .csv"
              @change="handleFileSelect"
            />

            <!-- Ícone de Pasta / Upload -->
            <div class="w-14 h-14 rounded-2xl bg-[#5a9682]/15 border border-[#5a9682]/30 flex items-center justify-center mb-4 text-[#8fc0ae] shadow-inner">
              📁
            </div>

            <h3 class="font-['Sora',sans-serif] text-base font-semibold mb-1">
              Arraste sua planilha aqui ou <span class="text-[#8fc0ae] underline underline-offset-4">procure no computador</span>
            </h3>
            <p class="text-xs text-neutral-400 max-w-xs mb-4">
              Suporta arquivos no formato <strong class="text-neutral-200">.XLSX</strong>, <strong class="text-neutral-200">.XLS</strong> ou <strong class="text-neutral-200">.CSV</strong>
            </p>

            <span class="text-[11px] text-neutral-500 bg-white/[0.04] px-3 py-1 rounded-full border border-white/5">
              Tamanho máximo recomendado: 15MB
            </span>
          </div>

          <!-- Card do Arquivo Selecionado -->
          <div v-if="selectedFile" class="mt-6 p-4 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-between">
            <div class="flex items-center gap-3 overflow-hidden">
              <div class="w-10 h-10 rounded-lg bg-[#3fb890]/20 flex items-center justify-center text-[#6ee7b7] shrink-0 font-bold text-xs">
                📊
              </div>
              <div class="truncate">
                <p class="text-sm font-medium text-white truncate">{{ selectedFile.name }}</p>
                <p class="text-xs text-neutral-400">{{ (selectedFile.size / 1024).toFixed(1) }} KB</p>
              </div>
            </div>

            <button 
              @click="selectedFile = null; uploadSuccess = false" 
              class="text-xs text-neutral-400 hover:text-red-400 transition-colors p-2"
            >
              Remover
            </button>
          </div>

          <!-- Mensagem de Sucesso -->
          <div v-if="uploadSuccess" class="mt-6 p-4 rounded-xl bg-[#3fb890]/15 border border-[#3fb890]/30 text-[#6ee7b7] text-sm flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            <span>Planilha importada e validada com sucesso! Os dados já refletem no dashboard.</span>
          </div>

          <!-- Botão de Envio / Processamento -->
          <div class="mt-8 flex items-center justify-end gap-4">
            <router-link 
              to="/dashboard"
              class="px-5 py-2.5 rounded-xl border border-white/10 text-sm text-neutral-300 hover:bg-white/[0.05] transition-colors"
            >
              Cancelar
            </router-link>

            <button 
              @click="simulateUpload"
              :disabled="!selectedFile || isUploading"
              :class="[
                'px-6 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2',
                !selectedFile || isUploading 
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-white/5' 
                  : 'bg-[#5a9682] hover:bg-[#4a7d6c] text-[#0a0a08] shadow-lg shadow-[#5a9682]/20'
              ]"
            >
              <span v-if="isUploading" class="w-4 h-4 border-2 border-[#0a0a08] border-t-transparent rounded-full animate-spin"></span>
              {{ isUploading ? 'Processando dados...' : 'Enviar e Processar' }}
            </button>
          </div>

        </div>
      </div>

    </div>
  </main>
</template>