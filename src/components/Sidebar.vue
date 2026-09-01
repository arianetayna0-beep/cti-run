<script setup>
import { ref } from 'vue'

// Estado reativo que controla se a sidebar está aberta ou fechada

const menuAberto = ref(false)


// Funções para manipular a exibição do menu

const alternarMenu = () => { menuAberto.value = !menuAberto.value }
const fecharMenu = () => { menuAberto.value = false }
</script>
<template>
 <div>


 <!-- BOTÃO HAMBÚRGUER (Fixo na barra superior ou canto superior esquerdo) -->

 <button type="button" @click="alternarMenu" class="fixed top-3 left-4 z-50 p-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 focus:outline-none" aria-label="Abrir ou fechar menu">
 <svg v-if="!menuAberto" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 
18h16" /></svg>
 <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
 </button>

 
 <!-- FUNDO ESCURO MODAL (Backdrop)
 Fecha a sidebar automaticamente ao clicar na área escura da tela -->
 
 <div v-show="menuAberto" @click="fecharMenu" class="fixed inset-0 bg-black/50 z-30 transition-opacity" aria-hidden="true"></div>
 <!-- SIDEBAR (MENU LATERAL RETRÁTIL) -->
 <aside v-show="menuAberto" class="fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-40 p-6 pt-20 shadow-xl flex flex-col justify-between">
 <nav aria-label="Navegação do sistema">
 <h2 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Navegação</h2>
 
 <ul class="space-y-3">
 <li><router-link to="/app/upload" @click="fecharMenu" class="block px-3 py-2 rounded hover:bg-slate-800" active-class="bg-indigo-600 font-bold">Upload de Arquivos</router-link></li>
 <li><router-link to="/app/relatorios" @click="fecharMenu" class="block px-3 py-2 rounded hover:bg-slate-800" active-class="bg-indigo-600 font-bold">Relatórios</router-link></li>
 <li><router-link to="/app/graficos" @click="fecharMenu" class="block px-3 py-2 rounded hover:bg-slate-800" active-class="bg-indigo-600 font-bold">Gráficos</router-link></li>
 </ul>
 </nav>
 <footer class="text-xs text-slate-500 border-t border-slate-800 pt-4">
 CTI Insights &copy; 2026
 </footer>
 </aside>
 </div>
</template>
