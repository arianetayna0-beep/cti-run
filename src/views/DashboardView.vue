<script setup>
import { computed } from 'vue'
import { useUploadStore } from '../stores/uploadStore'

const upload = useUploadStore()

// Todos os dados recebidos da planilha pelo Pinia
const clientes = computed(() => {
  return upload.dadosPlanilha || []
})

// TOTAL DE CLIENTES
const totalClientes = computed(() => {
  return clientes.value.length
})

// Função auxiliar para pegar uma coluna mesmo se o nome variar
function obterValor(objeto, campos) {
  for (const campo of campos) {
    if (
      objeto[campo] !== undefined &&
      objeto[campo] !== null &&
      objeto[campo] !== ''
    ) {
      return objeto[campo]
    }
  }

  return ''
}

// NOME DO CLIENTE
function obterNome(cliente) {
  return obterValor(cliente, [
    'nome_cliente',
    'cliente',
    'nome',
    'Cliente',
    'Nome Cliente',
    'Nome'
  ]) || 'Não informado'
}

// CONSULTOR
function obterConsultor(cliente) {
  return obterValor(cliente, [
    'consultor',
    'Consultor',
    'nome_consultor',
    'Nome Consultor'
  ]) || '-'
}

// SEGMENTO
function obterSegmento(cliente) {
  return obterValor(cliente, [
    'segmento',
    'Segmento'
  ]) || 'Não informado'
}

// NÍVEL
function obterNivel(cliente) {
  const nivel = obterValor(cliente, [
    'nivel_cliente',
    'nivel',
    'Nível',
    'Nivel',
    'Nível Cliente'
  ])

  return String(nivel || '')
    .trim()
    .toUpperCase()
}

// FATURAMENTO
function obterFaturamento(cliente) {
  let valor = obterValor(cliente, [
    'faturamento_anual',
    'faturamento',
    'Faturamento',
    'Faturamento Anual',
    'receita',
    'Receita'
  ])

  if (
    valor === '' ||
    valor === null ||
    valor === undefined
  ) {
    return 0
  }

  // Caso venha como número
  if (typeof valor === 'number') {
    return valor
  }

  valor = String(valor)
    .replace('R$', '')
    .trim()

  // Exemplo:
  // 100.000,50 -> 100000.50
  if (
    valor.includes('.') &&
    valor.includes(',')
  ) {
    valor = valor
      .replace(/\./g, '')
      .replace(',', '.')
  } else {
    valor = valor.replace(',', '.')
  }

  const numero = Number(valor)

  return Number.isNaN(numero)
    ? 0
    : numero
}

// CLIENTES A
const clientesNivelA = computed(() => {
  return clientes.value.filter(
    cliente => obterNivel(cliente) === 'A'
  ).length
})

// CLIENTES B
const clientesNivelB = computed(() => {
  return clientes.value.filter(
    cliente => obterNivel(cliente) === 'B'
  ).length
})

// CLIENTES C
const clientesNivelC = computed(() => {
  return clientes.value.filter(
    cliente => obterNivel(cliente) === 'C'
  ).length
})

// TOTAL FATURAMENTO
const faturamentoTotal = computed(() => {
  return clientes.value.reduce(
    (total, cliente) => {
      return total + obterFaturamento(cliente)
    },
    0
  )
})

// FATURAMENTO MÉDIO
const faturamentoMedio = computed(() => {
  if (!clientes.value.length) {
    return 0
  }

  return (
    faturamentoTotal.value /
    clientes.value.length
  )
})

// FORMATADOR
function formatarMoeda(valor) {
  return new Intl.NumberFormat(
    'pt-BR',
    {
      style: 'currency',
      currency: 'BRL'
    }
  ).format(valor || 0)
}

// SEGMENTOS
const segmentos = computed(() => {
  const resultado = {}

  clientes.value.forEach(cliente => {
    const segmento =
      obterSegmento(cliente)

    if (!resultado[segmento]) {
      resultado[segmento] = 0
    }

    resultado[segmento]++
  })

  return Object.entries(resultado)
    .sort((a, b) => b[1] - a[1])
})

// MAIOR SEGMENTO
const maiorSegmento = computed(() => {
  if (!segmentos.value.length) {
    return 'Sem dados'
  }

  return segmentos.value[0][0]
})

// PORCENTAGEM PARA BARRAS
function porcentagem(valor) {
  if (!totalClientes.value) {
    return 0
  }

  return Math.round(
    (valor / totalClientes.value) * 100
  )
}

// ÚLTIMOS REGISTROS
const ultimosClientes = computed(() => {
  return clientes.value.slice(0, 6)
})
</script>

<template>
  <main
    class="
      min-h-screen
      bg-[#0a0a08]
      px-6
      py-8
      text-white
    "
  >
    <div class="mx-auto max-w-7xl">

      <!-- HEADER -->
      <header
        class="
          mb-8
          flex
          flex-col
          justify-between
          gap-5

          md:flex-row
          md:items-end
        "
      >
        <div>
          <h1
            class="
              text-3xl
              font-semibold
              tracking-tight
            "
          >
            Dashboard
          </h1>

          <p
            class="
              mt-2
              text-sm
              text-neutral-400
            "
          >
            Visão geral dos dados importados da planilha.
          </p>
        </div>

        <router-link
          to="/upload"
          class="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#5a9682]
            px-5
            py-2.5
            text-sm
            font-medium
            text-[#0a0a08]
            transition

            hover:bg-[#6aa58f]
          "
        >
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 5v14"/>
            <path d="M5 12h14"/>
          </svg>

          Importar planilha
        </router-link>
      </header>

      <!-- SEM DADOS -->
      <section
        v-if="!upload.temDados"
        class="
          flex
          min-h-[420px]
          items-center
          justify-center
          rounded-2xl
          border
          border-white/10
          bg-white/[0.025]
        "
      >
        <div class="max-w-md text-center">

          <div
            class="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-xl
              bg-[#5a9682]/15
              text-[#8fc0ae]
            "
          >
            <svg
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path d="M7 3h10l4 4v14H7z"/>
              <path d="M17 3v5h5"/>
              <path d="M10 13h7"/>
              <path d="M10 17h5"/>
            </svg>
          </div>

          <h2
            class="
              mt-5
              text-lg
              font-semibold
            "
          >
            Nenhuma planilha processada
          </h2>

          <p
            class="
              mt-2
              text-sm
              leading-6
              text-neutral-400
            "
          >
            Importe uma planilha para visualizar
            os indicadores e dados no dashboard.
          </p>

          <router-link
            to="/upload"
            class="
              mt-6
              inline-flex
              rounded-xl
              bg-[#5a9682]
              px-5
              py-2.5
              text-sm
              font-medium
              text-[#0a0a08]
              transition

              hover:bg-[#6aa58f]
            "
          >
            Importar dados
          </router-link>

        </div>
      </section>

      <!-- CONTEÚDO -->
      <template v-else>

        <!-- KPIs -->
        <section
          class="
            grid
            gap-4

            sm:grid-cols-2
            xl:grid-cols-4
          "
        >

          <!-- TOTAL CLIENTES -->
          <article
            class="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              p-5
            "
          >
            <div
              class="
                flex
                items-start
                justify-between
              "
            >

              <div>
                <p
                  class="
                    text-sm
                    text-neutral-400
                  "
                >
                  Total de clientes
                </p>

                <p
                  class="
                    mt-4
                    text-3xl
                    font-semibold
                  "
                >
                  {{ totalClientes }}
                </p>
              </div>

              <div
                class="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#5a9682]/15
                  text-[#8fc0ae]
                "
              >
                <svg
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 00-3-3.87"/>
                </svg>
              </div>

            </div>

            <p
              class="
                mt-5
                border-t
                border-white/[0.06]
                pt-4
                text-xs
                text-neutral-500
              "
            >
              Registros da planilha atual
            </p>
          </article>

          <!-- FATURAMENTO -->
          <article
            class="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              p-5
            "
          >
            <div
              class="
                flex
                items-start
                justify-between
              "
            >

              <div>
                <p class="text-sm text-neutral-400">
                  Faturamento médio
                </p>

                <p
                  class="
                    mt-4
                    text-2xl
                    font-semibold
                  "
                >
                  {{ formatarMoeda(faturamentoMedio) }}
                </p>
              </div>

              <div
                class="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#5a9682]/15
                  text-[#8fc0ae]
                "
              >
                $
              </div>

            </div>

            <p
              class="
                mt-5
                border-t
                border-white/[0.06]
                pt-4
                text-xs
                text-neutral-500
              "
            >
              Média entre os registros
            </p>
          </article>

          <!-- NIVEL A -->
          <article
            class="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              p-5
            "
          >
            <div
              class="
                flex
                items-start
                justify-between
              "
            >

              <div>
                <p class="text-sm text-neutral-400">
                  Clientes nível A
                </p>

                <p
                  class="
                    mt-4
                    text-3xl
                    font-semibold
                  "
                >
                  {{ clientesNivelA }}
                </p>
              </div>

              <div
                class="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#5a9682]/15
                  text-sm
                  font-semibold
                  text-[#8fc0ae]
                "
              >
                A
              </div>

            </div>

            <p
              class="
                mt-5
                border-t
                border-white/[0.06]
                pt-4
                text-xs
                text-neutral-500
              "
            >
              Alta prioridade
            </p>
          </article>

          <!-- MAIOR SEGMENTO -->
          <article
            class="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              p-5
            "
          >
            <p class="text-sm text-neutral-400">
              Maior segmento
            </p>

            <p
              class="
                mt-4
                truncate
                text-2xl
                font-semibold
              "
            >
              {{ maiorSegmento }}
            </p>

            <p
              class="
                mt-5
                border-t
                border-white/[0.06]
                pt-4
                text-xs
                text-neutral-500
              "
            >
              Segmento mais frequente
            </p>
          </article>

        </section>

        <!-- SEGUNDA LINHA -->
        <section
          class="
            mt-6
            grid
            gap-6

            xl:grid-cols-2
          "
        >

          <!-- CLASSIFICAÇÃO -->
          <article
            class="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              p-6
            "
          >
            <h2
              class="
                font-semibold
              "
            >
              Classificação dos clientes
            </h2>

            <p
              class="
                mt-1
                text-sm
                text-neutral-400
              "
            >
              Distribuição entre os níveis A, B e C.
            </p>

            <div class="mt-8 space-y-6">

              <!-- A -->
              <div>

                <div
                  class="
                    mb-2
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    class="
                      text-sm
                      text-neutral-300
                    "
                  >
                    Nível A
                  </span>

                  <span class="text-sm">
                    {{ clientesNivelA }}
                  </span>
                </div>

                <div
                  class="
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-white/[0.06]
                  "
                >
                  <div
                    class="
                      h-full
                      rounded-full
                      bg-[#5a9682]
                    "
                    :style="{
                      width: `${porcentagem(clientesNivelA)}%`
                    }"
                  ></div>
                </div>

                <p
                  class="
                    mt-2
                    text-right
                    text-xs
                    text-neutral-500
                  "
                >
                  {{ porcentagem(clientesNivelA) }}%
                </p>

              </div>

              <!-- B -->
              <div>

                <div
                  class="
                    mb-2
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span class="text-sm text-neutral-300">
                    Nível B
                  </span>

                  <span class="text-sm">
                    {{ clientesNivelB }}
                  </span>
                </div>

                <div
                  class="
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-white/[0.06]
                  "
                >
                  <div
                    class="
                      h-full
                      rounded-full
                      bg-[#487766]
                    "
                    :style="{
                      width: `${porcentagem(clientesNivelB)}%`
                    }"
                  ></div>
                </div>

                <p
                  class="
                    mt-2
                    text-right
                    text-xs
                    text-neutral-500
                  "
                >
                  {{ porcentagem(clientesNivelB) }}%
                </p>

              </div>

              <!-- C -->
              <div>

                <div
                  class="
                    mb-2
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span class="text-sm text-neutral-300">
                    Nível C
                  </span>

                  <span class="text-sm">
                    {{ clientesNivelC }}
                  </span>
                </div>

                <div
                  class="
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-white/[0.06]
                  "
                >
                  <div
                    class="
                      h-full
                      rounded-full
                      bg-neutral-600
                    "
                    :style="{
                      width: `${porcentagem(clientesNivelC)}%`
                    }"
                  ></div>
                </div>

                <p
                  class="
                    mt-2
                    text-right
                    text-xs
                    text-neutral-500
                  "
                >
                  {{ porcentagem(clientesNivelC) }}%
                </p>

              </div>

            </div>
          </article>

          <!-- SEGMENTOS -->
          <article
            class="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              p-6
            "
          >
            <h2 class="font-semibold">
              Segmentos
            </h2>

            <p
              class="
                mt-1
                text-sm
                text-neutral-400
              "
            >
              Distribuição dos clientes por segmento.
            </p>

            <div
              v-if="segmentos.length"
              class="
                mt-8
                space-y-5
              "
            >

              <div
                v-for="([segmento, quantidade]) in segmentos"
                :key="segmento"
              >

                <div
                  class="
                    mb-2
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    class="
                      text-sm
                      text-neutral-300
                    "
                  >
                    {{ segmento }}
                  </span>

                  <span
                    class="
                      text-xs
                      text-neutral-500
                    "
                  >
                    {{ quantidade }}
                  </span>
                </div>

                <div
                  class="
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-white/[0.06]
                  "
                >
                  <div
                    class="
                      h-full
                      rounded-full
                      bg-[#5a9682]
                    "
                    :style="{
                      width: `${porcentagem(quantidade)}%`
                    }"
                  ></div>
                </div>

              </div>

            </div>

            <p
              v-else
              class="
                mt-10
                text-center
                text-sm
                text-neutral-500
              "
            >
              Nenhum segmento encontrado.
            </p>

          </article>

        </section>

        <!-- FATURAMENTO -->
        <section
          class="
            mt-6
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            p-6
          "
        >
          <div
            class="
              flex
              flex-col
              justify-between
              gap-4

              sm:flex-row
              sm:items-center
            "
          >
            <div>
              <h2 class="font-semibold">
                Resumo financeiro
              </h2>

              <p
                class="
                  mt-1
                  text-sm
                  text-neutral-400
                "
              >
                Informações calculadas a partir da planilha.
              </p>
            </div>

            <span
              class="
                rounded-lg
                border
                border-white/[0.07]
                bg-white/[0.03]
                px-3
                py-2
                text-xs
                text-neutral-400
              "
            >
              {{ totalClientes }} registros
            </span>
          </div>

          <div
            class="
              mt-6
              grid
              gap-4

              md:grid-cols-2
            "
          >

            <div
              class="
                rounded-xl
                border
                border-white/[0.07]
                bg-[#0d0d0b]
                p-5
              "
            >
              <p class="text-sm text-neutral-400">
                Faturamento total
              </p>

              <p
                class="
                  mt-3
                  text-2xl
                  font-semibold
                "
              >
                {{ formatarMoeda(faturamentoTotal) }}
              </p>
            </div>

            <div
              class="
                rounded-xl
                border
                border-white/[0.07]
                bg-[#0d0d0b]
                p-5
              "
            >
              <p class="text-sm text-neutral-400">
                Faturamento médio
              </p>

              <p
                class="
                  mt-3
                  text-2xl
                  font-semibold
                "
              >
                {{ formatarMoeda(faturamentoMedio) }}
              </p>
            </div>

          </div>
        </section>

        <!-- TABELA -->
        <section
          class="
            mt-6
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
          "
        >

          <div
            class="
              flex
              items-center
              justify-between
              border-b
              border-white/[0.07]
              p-6
            "
          >
            <div>
              <h2 class="font-semibold">
                Registros recentes
              </h2>

              <p
                class="
                  mt-1
                  text-sm
                  text-neutral-400
                "
              >
                Primeiros registros importados da planilha.
              </p>
            </div>

            <span
              class="
                rounded-lg
                bg-[#5a9682]/10
                px-3
                py-1.5
                text-xs
                text-[#8fc0ae]
              "
            >
              {{ totalClientes }} registros
            </span>
          </div>

          <div class="overflow-x-auto">

            <table
              class="
                w-full
                text-left
                text-sm
              "
            >

              <thead
                class="
                  bg-[#0d0d0b]
                  text-xs
                  text-neutral-500
                "
              >
                <tr>
                  <th class="px-6 py-4 font-medium">
                    Cliente
                  </th>

                  <th class="px-6 py-4 font-medium">
                    Consultor
                  </th>

                  <th class="px-6 py-4 font-medium">
                    Segmento
                  </th>

                  <th class="px-6 py-4 font-medium">
                    Nível
                  </th>

                  <th class="px-6 py-4 font-medium">
                    Faturamento
                  </th>
                </tr>
              </thead>

              <tbody>

                <tr
                  v-for="(cliente, index) in ultimosClientes"
                  :key="index"
                  class="
                    border-t
                    border-white/[0.05]
                    transition

                    hover:bg-white/[0.02]
                  "
                >

                  <td
                    class="
                      px-6
                      py-4
                      font-medium
                    "
                  >
                    {{ obterNome(cliente) }}
                  </td>

                  <td
                    class="
                      px-6
                      py-4
                      text-neutral-400
                    "
                  >
                    {{ obterConsultor(cliente) }}
                  </td>

                  <td
                    class="
                      px-6
                      py-4
                      text-neutral-400
                    "
                  >
                    {{ obterSegmento(cliente) }}
                  </td>

                  <td class="px-6 py-4">

                    <span
                      :class="[
                        `
                          inline-flex
                          min-w-7
                          items-center
                          justify-center
                          rounded-md
                          px-2
                          py-1
                          text-xs
                          font-medium
                        `,
                        obterNivel(cliente) === 'A'
                          ? `
                            bg-[#5a9682]/15
                            text-[#8fc0ae]
                          `
                          : obterNivel(cliente) === 'B'
                            ? `
                              bg-white/[0.06]
                              text-neutral-300
                            `
                            : `
                              bg-white/[0.04]
                              text-neutral-500
                            `
                      ]"
                    >
                      {{ obterNivel(cliente) || '-' }}
                    </span>

                  </td>

                  <td
                    class="
                      px-6
                      py-4
                      text-neutral-300
                    "
                  >
                    {{ formatarMoeda(obterFaturamento(cliente)) }}
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </section>

      </template>

    </div>
  </main>
</template>