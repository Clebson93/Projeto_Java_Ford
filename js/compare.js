
//guarda os carros selecionados para comparação
let carArr = [];

class Car {
   

    constructor(nome, preco, alturaCacamba, alturaVeiculo, alturaSolo, capacidadeCarga, motor, potencia, volumeCacamba, roda, image){
        this.nome = nome;
        this.preco = preco;
        this.alturaCacamba = alturaCacamba;
        this.alturaVeiculo = alturaVeiculo;
        this.alturaSolo = alturaSolo;
        this.capacidadeCarga = capacidadeCarga;
        this.motor = motor;
        this.potencia = potencia;
        this.volumeCacamba = volumeCacamba;
        this.roda = roda;
        this.image = image;
        
    }
} 

// procura no array se o objeto carClass já existe 
function GetCarArrPosition(arr, carClass) {
    for(let i = 0; i < arr.length; i++){
        if(arr[i].nome  === carClass.nome)
            return i;
    }
    return -1;
}

function SetCarToCompare(el, carClass) {
   
    if(carClass instanceof Car){       
        if(el.checked){
                // se já existem 2 carros selecionados, não permite adicionar
                if(carArr.length >= 2){
                    el.checked = false;
                    alert('Você só pode comparar até 2 carros.');
                    return;
                }
                // adiciona se ainda não estiver presente
                if(GetCarArrPosition(carArr, carClass) === -1){
                    carArr.push(carClass);
                }
        } else {
            // remove do array 
            const pos = GetCarArrPosition(carArr, carClass);
            if(pos !== -1) carArr.splice(pos, 1);
        }
    } else {
        throw "É necessário informar uma instância da classe Car";
    }
}

function ShowCompare() {
    if(carArr.length < 2) {
        alert("Precisa marcar 2 carros para apresentar a comparação");
        return;
    }

    UpdateCompareTable();
    document.getElementById("compare").style.display = "block";
}

function HideCompare(){
    document.getElementById("compare").style.display = "none"; 
}

function UpdateCompareTable() {

    const set = (id, html) => {
        const el = document.getElementById(id);
        if(el) el.innerHTML = html !== undefined && html !== null ? html : '';
    };


    const fields = ['image','modelo','alturacacamba','alturaveiculo','alturasolo','capacidadecarga','motor','potencia','volumecacamba','roda','preco'];
    for(const f of fields){
        set(`compare_${f}_0`, '');
        set(`compare_${f}_1`, '');
    }

    for(let i = 0; i < Math.min(carArr.length, 2); i++){
        const c = carArr[i];
        set(`compare_image_${i}`, c.image ? `<img src="${c.image}" style="max-width:150px;">` : '');
        set(`compare_modelo_${i}`, c.nome || '');
        set(`compare_alturacacamba_${i}`, c.alturaCacamba || '');
        set(`compare_alturaveiculo_${i}`, c.alturaVeiculo || '');
        set(`compare_alturasolo_${i}`, c.alturaSolo || '');
        set(`compare_capacidadecarga_${i}`, c.capacidadeCarga || '');
        set(`compare_motor_${i}`, c.motor || '');
        set(`compare_potencia_${i}`, c.potencia || '');
        set(`compare_volumecacamba_${i}`, c.volumeCacamba || '');
        set(`compare_roda_${i}`, c.roda || '');
        set(`compare_preco_${i}`, c.preco ? ('R$ ' + c.preco.toLocaleString('pt-BR')) : '');
    }
}
