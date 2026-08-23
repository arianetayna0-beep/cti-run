<script setup>
const emit = defineEmits(['irParaHome'])
</script>

<template>
  <div class="w-full max-w-md p-8 bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl space-y-6">
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
        @click="emit('irParaHome')" 
        class="text-xs text-zinc-400 hover:text-emerald-400 transition cursor-pointer"
      >
        ← Voltar para a página inicial
      </button>
    </div>
  </div>
</template>