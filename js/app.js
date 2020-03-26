function initCotacao() {

    const htmlDolar = document.querySelector('#dolar');
    const htmlReal = document.querySelector('#real');

    if (htmlDolar && htmlReal) {
        htmlDolar.addEventListener('change', handleArruma);
        htmlReal.addEventListener('change', handleArruma);

        htmlDolar.addEventListener('keyup', handleValores);
        htmlReal.addEventListener('keyup', handleValores);



        async function handleValores(event) {
            const valor = event.target.value;
            const dadosResponse = await fetch('https://api.hgbrasil.com/finance?format=json-cors&key=37a925cc');
            const dadosJSON = await dadosResponse.json();
            const valorDolar = dadosJSON.results.currencies.USD.buy;


            if (valor == htmlDolar.value)
                htmlReal.value = arrumaNumero((valorDolar * valor).toFixed(2));
            else {
                const valorReal = (valor / valorDolar);
                const arredondando = parseFloat(valorReal);
                htmlDolar.value = arrumaNumero(arredondando.toFixed(2));
            }
        }

        function handleArruma(event) {
            event.target.value = arrumaNumero(event.target.value);
        }

        function arrumaNumero(numero) {
            const numArrumado = (+numero).toFixed(2).replace('.', ',');
            return numArrumado;
        }
    }


}

initCotacao();