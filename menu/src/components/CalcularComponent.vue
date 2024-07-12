<template>
    <div class="container mt-2 col-md-6">
      <div class="border p-2">
        <h3>Calcular el % entre 2 números:</h3>
        <hr>
        <h5>Número Mayor</h5>
        <input class="form-control" type="number" v-model="primerValor">
        <h5>Número Menor</h5>
        <input class="form-control" type="number" v-model="segundoValor">
        <div>
          <button class="btn btn-primary mt-2" @click="calcular">Calcular</button>
        </div>
        <div>
          <h4 class="text-center mt-2" v-if="resultado">
            El porcentaje que existe entre los números es el {{ resultado }}%
          </h4>
        </div>
      </div>
      <div class="border p-2 mt-2">
        <h3>Convertir archivo en audio:</h3>
        <hr>
        <input class="form-control" type="file" @change="handleFileUpload" accept="image/*,.pdf">
        <div v-if="ocrResult">
            <div class="text-center">Listo</div>
        </div>
        <div v-if="loading">
          <div class="text-center">Procesando...</div>
        </div>
        <div>
          <button class="btn btn-primary mt-2" :disabled="!ocrResult" @click="convertirATextoAVoz">Descargar Audio</button>
        </div>
        <div v-if="descargando">Descargando...</div>
      </div>
    </div>
  </template>
  
  <script>
  import Tesseract from 'tesseract.js';
  import * as pdfjsLib from 'pdfjs-dist/build/pdf';
  
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';
  
  export default {
    data() {
      return {
        primerValor: "",
        segundoValor: "",
        resultado: "",
        ocrResult: null,
        loading: false,
        googleApiKey: "AIzaSyDXluz9Jo4X2O_KMvVXoPz8GrBJnHZ1dcE",
        audioUrl: null,
        descargando:false,
      };
    },
    methods: {
      calcular() {
        this.resultado = ((this.primerValor - this.segundoValor) * 100) / this.segundoValor;
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          this.loading = true;
          if (file.type === 'application/pdf') {
            this.processPDF(file);
          } else {
            this.processImage(file);
          }
        }
      },
      processImage(file) {
        const reader = new FileReader();
        reader.onload = () => {
          Tesseract.recognize(reader.result, 'spa', {
          }).then(({ data: { text } }) => {
            this.ocrResult = text;
            this.loading = false;
          }).catch(err => {
            console.error(err);
            this.loading = false;
          });
        };
        reader.readAsDataURL(file);
      },
      async processPDF(file) {
        const reader = new FileReader();
        reader.onload = async () => {
          const pdfData = new Uint8Array(reader.result);
          const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
          let fullText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 1 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
  
            await page.render({ canvasContext: context, viewport: viewport }).promise;
            const imageData = canvas.toDataURL();
            const { data: { text } } = await Tesseract.recognize(imageData, 'spa');
            fullText += text + '\n';
          }
          this.ocrResult = fullText;
          this.loading = false;
        };
        reader.readAsArrayBuffer(file);
      },
      async convertirATextoAVoz() {
        try {
            this.descargando = true;
          const synthesisUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${this.googleApiKey}`;
          const response = await fetch(synthesisUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              input: {
                text: this.ocrResult
              },
              voice: {
                languageCode: 'es-ES',
                name: 'es-ES-Standard-B',
                ssmlGender: 'FEMALE'
              },
              audioConfig: {
                audioEncoding: 'MP3'
              }
            })
          });
  
          if (!response.ok) {
            throw new Error(`Error al generar el audio: ${response.status} ${response.statusText}`);
          }
  
          const { audioContent } = await response.json();
  
          // Crear un Blob a partir del contenido base64 del audio
          const blob = this.base64ToBlob(audioContent, 'audio/mp3');
  
          // Crear una URL de objeto local para el Blob y descargar
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = 'audio.mp3';
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(url);
  
        } catch (error) {
          console.error('Error al convertir texto a voz:', error);
        } finally{
            this.descargando = false;
        }
      },
      base64ToBlob(base64, contentType) {
        const byteCharacters = atob(base64);
        const byteArrays = [];
  
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);
  
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
  
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
  
        return new Blob(byteArrays, { type: contentType });
      }
    },
  };
  </script>
  
  <style>
  /* Estilos de tu componente */
  </style>
  