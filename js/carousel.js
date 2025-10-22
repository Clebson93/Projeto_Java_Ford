



let carouselArr = [];


// Classe Carousel
class Carousel {

    constructor(Image, Title, Url){
        this.Image = Image;
        this.Title = Title;
        this.Url = Url;
    }

    
      
    static Start(arr){
        // Carousel e inicia a rotação automática
        if(arr){

            if(arr.length > 0){
                    Carousel._sequence = 0;
                    Carousel._size = arr.length;
                    Carousel._arr = arr;
                    // preparar estrutura do container (imagem + controles) se ainda não existir
                    const carouselDiv = document.getElementById('carousel');
                    if(carouselDiv){
                        // cria um container interno para a imagem (assim mantemos controles fora da limpeza)
                        if(!carouselDiv.querySelector('.carousel-image')){
                            const inner = document.createElement('div');
                            inner.className = 'carousel-image';
                            carouselDiv.appendChild(inner);
                        }
                        // cria botões de navegação lateral se não existirem
                        if(!carouselDiv.querySelector('.carousel-arrow-left')){
                            const btnL = document.createElement('button');
                            btnL.className = 'carousel-arrow carousel-arrow-left';
                            btnL.setAttribute('aria-label','Anterior');
                            btnL.innerHTML = '&#10094;'; // seta esquerda
                            btnL.addEventListener('click', function(e){ Carousel.Previous(); });
                            carouselDiv.appendChild(btnL);
                        }
                        if(!carouselDiv.querySelector('.carousel-arrow-right')){
                            const btnR = document.createElement('button');
                            btnR.className = 'carousel-arrow carousel-arrow-right';
                            btnR.setAttribute('aria-label','Próximo');
                            btnR.innerHTML = '&#10095;'; // seta direita
                            btnR.addEventListener('click', function(e){ Carousel.Next(); });
                            carouselDiv.appendChild(btnR);
                        }
                    }

                    Carousel.Next(); // iniciar exibindo o primeiro
                    // inicia o intervalo de troca automática (2000ms)
                    if(Carousel._interval) clearInterval(Carousel._interval);
                    Carousel._interval = setInterval(function(){ Carousel.Next(); },2000);
            }
            
        } else {
            throw "O método Start precisa receber um array.";
        }
    }

    static Next(){
        // array de itens
        if(!Carousel._arr || Carousel._arr.length === 0) return;

        // índice e o item atual a ser exibido
        const idx = Carousel._sequence % Carousel._size;
        const item = Carousel._arr[idx];

        // inserir imagem dentro do container .carousel-image (mantendo os controles)
        const carouselDiv = document.getElementById('carousel');
        if(carouselDiv){
            let imageContainer = carouselDiv.querySelector('.carousel-image');
            if(!imageContainer){
                imageContainer = document.createElement('div');
                imageContainer.className = 'carousel-image';
                carouselDiv.appendChild(imageContainer);
            }
            imageContainer.innerHTML = '';
            const img = document.createElement('img');
            const imgSrc = (item.Image && item.Image.indexOf('img/') === 0) ? item.Image : ('img/' + item.Image);
            img.src = imgSrc;
            img.alt = item.Title || '';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.onerror = function(e){
                console.error('Falha ao carregar imagem do carrossel:', imgSrc, e);
                imageContainer.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#eee;color:#333;">Imagem não encontrada: '+imgSrc+'</div>';
                return;
            };
            console.debug('Carrossel mostrando imagem:', idx, imgSrc);
            imageContainer.appendChild(img);
        }

        // injeta title
        const titleDiv = document.getElementById('carousel-title');
        if(titleDiv){
            titleDiv.innerHTML = '';
            if(item.Url){
                const a = document.createElement('a');
                a.href = item.Url;
                a.textContent = item.Title || '';
                titleDiv.appendChild(a);
            } else {
                titleDiv.textContent = item.Title || '';
            }
        }

        Carousel._sequence++;
    }

    static Previous(){
        if(!Carousel._arr || Carousel._arr.length === 0) return;
        // voltar uma posição
        Carousel._sequence = ((Carousel._sequence - 2) % Carousel._size + Carousel._size) % Carousel._size;
        Carousel.Next();
    }

    static JumpTo(index){
        if(!Carousel._arr || Carousel._arr.length === 0) return;
        if(typeof index !== 'number') return;
        if(index < 0) index = 0;
        if(index >= Carousel._size) index = Carousel._size - 1;
        Carousel._sequence = index;
        Carousel.Next();
    }

}
