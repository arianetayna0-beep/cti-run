<script setup>

import { computed, ref } from 'vue'

import { useRouter } from 'vue-router'
 
import { useUploadStore } from '../stores/uploadStore'
 
const upload = useUploadStore()
 
const router = useRouter()
 
const isDragging = ref(false)
 
const uploadSuccess = ref(false)
 
const selectedFile = computed(() => {

  return upload.arquivo

})
 
const fileSize = computed(() => {

  if (!upload.arquivo) {

    return ''

  }
 
  return `${(

    upload.arquivo.size / 1024

  ).toFixed(1)} KB`

})
 
function handleDrop(event) {

  isDragging.value = false
 
  const files =

    event.dataTransfer.files
 
  if (files.length > 0) {

    upload.selecionarArquivo(

      files[0]

    )
 
    uploadSuccess.value = false

  }

}
 
function handleFileSelect(event) {

  const files =

    event.target.files
 
  if (files.length > 0) {

    upload.selecionarArquivo(

      files[0]

    )
 
    uploadSuccess.value = false

  }

}
 
function removerArquivo() {

  upload.removerArquivo()
 
  uploadSuccess.value = false

}
 
async function processar() {

  const sucesso =

    await upload.processarArquivo()
 
  if (sucesso) {

    uploadSuccess.value = true

  }

}
 
function irDashboard() {

  router.push('/dashboard')

}
</script>
 
<template>
<main

    class="

      relative

      min-h-screen

      overflow-hidden

      bg-[#0a0a08]

      px-6

      py-8

      text-white

    "
>
 
    <div class="mx-auto max-w-5xl">
 
      <!-- HEADER -->
<div

        class="

          mb-12

          flex

          items-center

          justify-between

        "
>
 
        <div class="flex items-center gap-3">
 
          <router-link

            to="/dashboard"

            class="

              flex

              h-9

              w-9

              items-center

              justify-center

              rounded-xl

              border

              border-white/10

              bg-white/[0.05]

              transition
 
              hover:bg-white/[0.1]

            "
>
<svg

              width="16"

              height="16"

              viewBox="0 0 24 24"

              fill="none"

              stroke="currentColor"

              stroke-width="2"
>
<path d="M19 12H5M12 19l-7-7 7-7"/>
</svg>
</router-link>
 
          <div>
<h1

              class="

                text-xl

                font-semibold

                tracking-tight

              "
>

              Upload de Planilha
</h1>
 
            <p

              class="

                text-xs

                text-neutral-400

              "
>

              Importe seus dados para o sistema
</p>
</div>
 
        </div>
 
        <span

          class="

            rounded-lg

            border

            border-[#5a9682]/30

            bg-[#5a9682]/15

            px-3

            py-1.5

            text-xs

            font-medium

            text-[#8fc0ae]

          "
>

          Módulo de Importação
</span>
 
      </div>
 
      <!-- CONTAINER -->
<div class="mx-auto max-w-2xl">
 
        <div

          class="

            rounded-2xl

            border

            border-white/10

            bg-[#0a0a08]/85

            p-8

          "
>
 
          <!-- DROP -->
<div

            @dragover.prevent="isDragging = true"

            @dragleave.prevent="isDragging = false"

            @drop.prevent="handleDrop"
 
            :class="[

              `

              relative

              flex

              cursor-pointer

              flex-col

              items-center

              justify-center

              rounded-xl

              border-2

              border-dashed

              p-10

              text-center

              transition-all

              `,

              isDragging

                ? `

                  border-[#5a9682]

                  bg-[#5a9682]/10

                `

                : `

                  border-white/15

                  bg-white/[0.02]

                  hover:border-[#5a9682]/50

                `

            ]"
>
 
            <input

              type="file"

              class="

                absolute

                inset-0

                h-full

                w-full

                cursor-pointer

                opacity-0

              "

              accept=".xlsx,.xls,.csv"

              @change="handleFileSelect"
>
 
            <div

              class="

                mb-4

                flex

                h-14

                w-14

                items-center

                justify-center

                rounded-2xl

                border

                border-[#5a9682]/30

                bg-[#5a9682]/15

                text-[#8fc0ae]

              "
>

              📁
</div>
 
            <h3

              class="

                mb-1

                text-base

                font-semibold

              "
>

              Arraste sua planilha aqui ou
<span

                class="

                  text-[#8fc0ae]

                  underline

                  underline-offset-4

                "
>

                procure no computador
</span>
</h3>
 
            <p

              class="

                mb-4

                max-w-xs

                text-xs

                text-neutral-400

              "
>

              Arquivos XLSX, XLS ou CSV
</p>
 
          </div>
 
          <!-- ARQUIVO -->
<div

            v-if="selectedFile"

            class="

              mt-6

              flex

              items-center

              justify-between

              rounded-xl

              border

              border-white/10

              bg-white/[0.03]

              p-4

            "
>
 
            <div

              class="

                flex

                min-w-0

                items-center

                gap-3

              "
>
 
              <div

                class="

                  flex

                  h-10

                  w-10

                  shrink-0

                  items-center

                  justify-center

                  rounded-lg

                  bg-[#3fb890]/20

                "
>

                📊
</div>
 
              <div class="truncate">
 
                <p

                  class="

                    truncate

                    text-sm

                    font-medium

                  "
>

                  {{ selectedFile.name }}
</p>
 
                <p

                  class="

                    text-xs

                    text-neutral-400

                  "
>

                  {{ fileSize }}
</p>
 
              </div>
 
            </div>
 
            <button

              @click="removerArquivo"

              class="

                p-2

                text-xs

                text-neutral-400

                transition
 
                hover:text-red-400

              "
>

              Remover
</button>
 
          </div>
 
          <!-- ERRO -->
<div

            v-if="upload.erro"

            class="

              mt-6

              rounded-xl

              border

              border-red-500/30

              bg-red-500/10

              p-4

              text-sm

              text-red-400

            "
>

            {{ upload.erro }}
</div>
 
          <!-- SUCESSO -->
<div

            v-if="uploadSuccess"

            class="

              mt-6

              flex

              items-center

              gap-3

              rounded-xl

              border

              border-[#3fb890]/30

              bg-[#3fb890]/15

              p-4

              text-sm

              text-[#6ee7b7]

            "
>
<svg

              width="20"

              height="20"

              viewBox="0 0 24 24"

              fill="none"

              stroke="currentColor"

              stroke-width="2.5"
>
<path d="M20 6L9 17l-5-5"/>
</svg>
 
            <span>

              Planilha processada com sucesso.

              Foram lidos

              {{ upload.totalRegistros }}

              registros.
</span>
</div>
 
          <!-- BOTÕES -->
<div

            class="

              mt-8

              flex

              items-center

              justify-end

              gap-4

            "
>
 
            <router-link

              to="/dashboard"

              class="

                rounded-xl

                border

                border-white/10

                px-5

                py-2.5

                text-sm

                text-neutral-300

                transition
 
                hover:bg-white/[0.05]

              "
>

              Cancelar
</router-link>
 
            <button

              @click="processar"

              :disabled="

                !selectedFile ||

                upload.carregando

              "

              :class="[

                `

                flex

                items-center

                gap-2

                rounded-xl

                px-6

                py-2.5

                text-sm

                font-medium

                transition-all

                `,

                !selectedFile ||

                upload.carregando

                  ? `

                    cursor-not-allowed

                    bg-neutral-800

                    text-neutral-500

                  `

                  : `

                    bg-[#5a9682]

                    text-[#0a0a08]

                    hover:bg-[#4a7d6c]

                  `

              ]"
>
 
              <span

                v-if="upload.carregando"

                class="

                  h-4

                  w-4

                  animate-spin

                  rounded-full

                  border-2

                  border-[#0a0a08]

                  border-t-transparent

                "
></span>
 
              {{

                upload.carregando

                  ? 'Processando...'

                  : 'Enviar e Processar'

              }}
 
            </button>
 
          </div>
 
          <!-- IR PRO DASH -->
<button

            v-if="uploadSuccess"

            @click="irDashboard"

            class="

              mt-4

              w-full

              rounded-xl

              border

              border-[#5a9682]/30

              bg-[#5a9682]/10

              px-5

              py-3

              text-sm

              font-medium

              text-[#8fc0ae]

              transition
 
              hover:bg-[#5a9682]/20

            "
>

            Ver dados no Dashboard
</button>
 
        </div>
 
      </div>
 
    </div>
 
  </main>
</template>
 