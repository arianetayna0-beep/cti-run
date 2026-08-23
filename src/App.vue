<script setup>
import { ref } from 'vue'
import HomeView from './components/HomeView.vue'
import LoginView from './components/LoginView.vue'

// Estado para controlar qual tela está ativa
const telaAtual = ref('home')
</script>

<template>
  <div class="min-h-screen bg-[#0B0F0E] text-white p-8 flex flex-col justify-center items-center font-sans antialiased">
    <HomeView 
      v-if="telaAtual === 'home'" 
      @ir-para-login="telaAtual = 'login'" 
    />
    
    <LoginView 
      v-else-if="telaAtual === 'login'" 
      @ir-para-home="telaAtual = 'home'" 
    />
  </div>
</template>

<style>
@import "tailwindcss";
</style>