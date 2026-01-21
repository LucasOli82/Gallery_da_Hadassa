# Projeto Galeria 

> Galeria simples de fotos e vídeos (pessoais) — página para armazenar e visualizar memórias.

## Sobre

Este projeto exibe imagens e vídeos em uma galeria responsiva. Miniaturas aparecem automaticamente; ao clicar, as mídias abrem em um lightbox (imagem em tela cheia ou player de vídeo).

## Estrutura do repositório

- `index.html` - página principal
- `style.css` - (opcional) estilos da raiz
- `src/css/Main.css` - estilos principais (galeria, lightbox, responsividade)
- `src/js/main.js` - script que popula a galeria e abre o lightbox
- `Assets/images/` - pasta para imagens (coloque suas fotos aqui)
- `Assets/videos/` - pasta para vídeos (coloque seus vídeos aqui)

## Como adicionar imagens

1. Copie suas imagens para `Assets/images/`.
2. Abra `src/js/main.js` e adicione os caminhos no array `IMAGES`, por exemplo:

```js
const IMAGES = ["Assets/images/photo1.jpg", "Assets/images/photo2.jpg"];
```

3. Salve e recarregue `index.html` no navegador.

Observações:

- As imagens exibidas em miniatura recebem a classe `thumb-small` automaticamente.

## Como adicionar vídeos

1. Copie arquivos de vídeo para `Assets/videos/`.
2. Adicione os caminhos no array `VIDEOS` em `src/js/main.js`, por exemplo:

```js
const VIDEOS = ["Assets/videos/video1.mp4", "Assets/videos/video2.webm"];
```

3. Ao clicar na miniatura, o vídeo será reproduzido em um player com controles.


## Comportamento da galeria

- Miniaturas: exibidas em grade responsiva.
- Imagem: clique para abrir em tela cheia (fechar com X / clicar fora / Esc).
- Vídeo: abre em lightbox com controles e autoplay.

