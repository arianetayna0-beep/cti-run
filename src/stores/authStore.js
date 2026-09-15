import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  // STATE = dados guardados enquanto a aplicação está em uso.
  // Começa lendo o localStorage. Assim, se o usuário atualizar a página, continua logado.
  state: () => ({
    logado: localStorage.getItem('cti_logado') === 'true',
    usuario: localStorage.getItem('cti_usuario') || ''
  }),

  // GETTERS = valores calculados do estado.
  getters: {
    nomeExibicao: (state) => state.usuario || 'Usuário'
  },

  // ACTIONS = ações que alteram o state.
  actions: {
    login(usuario, senha) {
      // Aula de front-end: qualquer usuário e senha preenchidos são aceitos.
      if (!usuario || !senha) {
        return false
      }

      this.logado = true
      this.usuario = usuario

      // Salvando no localStorage para persistir o login
      localStorage.setItem('cti_logado', 'true')
      localStorage.setItem('cti_usuario', usuario)

      return true
    },

    logout() {
      this.logado = false
      this.usuario = ''

      // Removendo os dados do localStorage
      localStorage.removeItem('cti_logado')
      localStorage.removeItem('cti_usuario')
    }
  }
})