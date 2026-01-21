// Script simples para inicializar a galeria
document.addEventListener('DOMContentLoaded',()=>{
    const gallery = document.getElementById('gallery');

    // Se desejar adicionar imagens, liste os caminhos aqui (ex: 'Assets/images/photo1.jpg')
    const IMAGES = ['Assets/images/photo1.jpg', 'Assets/images/photo2.jpg', 
                    'Assets/images/photo3.jpg', 'Assets/images/photo4.jpg', 
                    'Assets/images/photo5.jpg', 'Assets/images/photo6.jpg', 
                    'Assets/images/photo7.jpg'];

    // Vídeos: coloque arquivos em Assets/Movies e adicione os nomes aqui
    const MOVIES = ['Assets/Movies/Video (1).mp4', 'Assets/Movies/Video (2).mp4',
                    'Assets/Movies/Video (3).mp4', 'Assets/Movies/Video (4).mp4',
                    'Assets/Movies/Video (5).mp4'];

    function showNoteIfEmpty(){
        if(IMAGES.length===0){
            const note = document.querySelector('.gallery-note');
            if(note) note.style.display = 'block';
            return true;
        }
        return false;
    }

    function createImageEl(src){
        const img = document.createElement('img');
        img.dataset.src = src;
        img.classList.add('thumb-small');
        img.alt = '';
        img.loading = 'lazy';
        img.addEventListener('click',()=>openLightbox(src));
        return img;
    }

    function createVideoEl(src){
        // cria um elemento de miniatura usando a tag video (sem controles)
        const wrapper = document.createElement('div');
        wrapper.className = 'video-play-overlay';
        const vid = document.createElement('video');
        vid.className = 'video-thumb';
        vid.src = src;
        vid.preload = 'metadata';
        vid.muted = true;
        vid.playsInline = true;
        vid.setAttribute('aria-hidden','true');
        // não mostrar controles na miniatura
        vid.addEventListener('click', (e)=>{ e.stopPropagation(); openLightbox(src); });
        wrapper.appendChild(vid);
        return wrapper;
    }

    function openLightbox(src){
        const isVideo = /\.(mp4|webm|ogg)$/i.test(src);
        const lb = document.createElement('div');
        lb.className = 'lightbox';
        lb.innerHTML = `<span class="close" role="button" aria-label="Fechar">✕</span>`;

        if(isVideo){
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.autoplay = true;
            video.playsInline = true;
            video.style.maxWidth = '95%';
            video.style.maxHeight = '95%';
            lb.appendChild(video);

            function cleanup(){
                try{ video.pause(); video.removeAttribute('src'); }catch(e){}
                removeLb();
            }

            lb.querySelector('.close').addEventListener('click', cleanup);
            lb.addEventListener('click',(e)=>{ if(e.target===lb) cleanup(); });

            function onKey(e){ if(e.key === 'Escape') cleanup(); }
            document.addEventListener('keydown', onKey);

            function removeLb(){ if(document.body.contains(lb)) document.body.removeChild(lb); document.removeEventListener('keydown', onKey); }
            document.body.appendChild(lb);
            return;
        }

        // se não for vídeo, mostra imagem
        const img = document.createElement('img'); img.src = src;
        lb.appendChild(img);

        function closeLb(){
            if(document.body.contains(lb)) document.body.removeChild(lb);
            document.removeEventListener('keydown', onKey);
        }

        lb.querySelector('.close').addEventListener('click', closeLb);
        lb.addEventListener('click',(e)=>{ if(e.target===lb) closeLb(); });

        function onKey(e){ if(e.key === 'Escape') closeLb(); }
        document.addEventListener('keydown', onKey);

        document.body.appendChild(lb);
    }

    // Populate image gallery
    if(!showNoteIfEmpty()){
        document.querySelector('#gallery .gallery-note')?.remove();
        IMAGES.forEach(path=>{
            const el = createImageEl(path);
            el.src = path; // set src so the browser loads it
            gallery.appendChild(el);
        });
    }

    // Populate video gallery
    const videoGallery = document.getElementById('video-gallery');
    if(videoGallery){
        if(VIDEOS.length===0){
            // leave note
        } else {
            document.querySelector('#video-gallery .gallery-note')?.remove();
            VIDEOS.forEach(path=>{
                const el = createVideoEl(path);
                videoGallery.appendChild(el);
            });
        }
    }
});
