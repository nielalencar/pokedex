const pokemonNome = document.querySelector('.pokemon__nome');
const pokemonNumero = document.querySelector('.pokemon__numero');
const pokemonImagem = document.querySelector('.pokedex__pokemon');

const pesquisa = document.querySelector('.pokemon__formulario');
const resultado = document.querySelector('.formulario__pesquisa');
const botaoVolt = document.querySelector('.botao-prev');
const botaoProx = document.querySelector('.botao-next');

let pesquisaPokemon = 1;


const fetchPokemon = async (pokemon) => {
    const APIResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResposta.status === 200) {
        const dados = await APIResposta.json();
        return dados;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonNome.innerHTML = 'Carregando...';
    pokemonNumero.innerHTML = '';

    const dados = await fetchPokemon(pokemon);

    if (dados) {
        pokemonImagem.style.display = 'block';
    pokemonNome.innerHTML = dados.name;
    pokemonNumero.innerHTML = dados.id;
    pokemonImagem.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; 
    resultado.value = '';
    pesquisaPokemon = dados.id;
    } else {
        pokemonImagem.style.display = 'none';
        pokemonNome.innerHTML = 'Pokemon não existe';
        pokemonNumero.innerHTML = '';
    }
}


pesquisa.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(resultado.value.toLowerCase());
});

botaoVolt.addEventListener('click', () => {
    if (pesquisaPokemon > 1) {
    pesquisaPokemon -= 1;
    renderPokemon(pesquisaPokemon);
    }
});

botaoProx.addEventListener('click', () => {
    pesquisaPokemon += 1;
    renderPokemon(pesquisaPokemon);
});

renderPokemon(pesquisaPokemon);