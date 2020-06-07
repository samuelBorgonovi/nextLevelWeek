function populateUFs(){ 
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json()) //funcao anonima que esta retornando um valor
    .then(states => {
       
        for( const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url =`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`   
    
    citySelect.innerHTML = "<option value>Selecione a cidade</option>" //limpa o campo cidade
    citySelect.disabled = true 

    fetch(url)
    .then( res => res.json()) //funcao anonima que esta retornando um valor
    .then(cities => {

       
        for( const city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) 
    

//itens de coleta 
//pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")

//variavel para quais os itens vao ser selecionados
let selectedItems = [];


function handleSelectedItem(event){
    const itemLi = event.target
    //ADICIONAR OU REMOVER UMA CLASSE COM JAVASCPRIPT
    itemLi.classList.toggle("selected") //toogle faz a funcao de adicionar ou remover

    const itemId = itemLi.dataset.id

    console.log('ITEM ID:', itemId)

    
    //verisificar se existem items selecionados, se sim
    //pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId // == isso sera true or false
        return itemFound
    })

    //se ja estiver selecionado, 
    if (alreadySelected >= 0){
        //tirar da selecao
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        //se nao tiver selecionado, 
        //add a selecao
        selectedItems.push(itemId)
    }


    //por fim ataulizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}