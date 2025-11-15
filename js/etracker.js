document.addEventListener('DOMContentLoaded', function() {
    const formId = 'osEtrackerForm';
    const generateButtonId = 'generateTextEtracker';
    const copyButtonId = 'copyButtonEtracker';
    const resultAreaId = 'resultAreaEtracker';
    const formattedTextId = 'formattedTextEtracker';

    const osForm = document.getElementById(formId);
    const generateTextButton = document.getElementById(generateButtonId);
    const copyButton = document.getElementById(copyButtonId);
    const resultArea = document.getElementById(resultAreaId);
    const formattedTextElement = document.getElementById(formattedTextId);

    const getRadioValue = (form, name) => {
        const selected = form.querySelector(`input[name="${name}"]:checked`);
        return selected ? selected.value : '';
    };

    if (generateTextButton && osForm) {
        generateTextButton.addEventListener('click', function() {
            const data = {};

            data.contato = osForm.elements['contato'].value.trim() || 'Não informado';
            data.titularMesmo = getRadioValue(osForm, 'titularMesmo');
            data.tipoVeiculo = osForm.elements['tipoVeiculo'].value;
            data.quantidadeVeiculos = osForm.elements['quantidadeVeiculos'].value.trim() || '1';
            data.numeroRastreador = osForm.elements['numeroRastreador'].value.trim() || 'Não informado';
            data.numeroChip = osForm.elements['numeroChip'].value.trim() || 'Não informado';
            data.modeloRastreador = osForm.elements['modeloRastreador'].value.trim();

            const formattedOutput = `
CLIENTE CONTRATOU RASTREADOR ETECC
CONTATO: ${data.contato}
TITULAR DA INTERNET É O MESMO DO VEICULO: ${data.titularMesmo}
TIPO DO VEICULO: ${data.tipoVeiculo}
QUANTIDADE DE VEICULOS: ${data.quantidadeVeiculos}
NUMERO DO RASTREADOR: ${data.numeroRastreador}
NUMERO DO CHIP DO RASTREADOR: ${data.numeroChip}
MODELO RASTREADOR: ${data.modeloRastreador}
            `.trim();

            if (formattedTextElement) {
                formattedTextElement.value = formattedOutput;
            }
            if (resultArea) {
                resultArea.classList.remove('hidden');
            }
        });
    }

    if (copyButton && formattedTextElement) {
        copyButton.addEventListener('click', function() {
            formattedTextElement.select();
            formattedTextElement.setSelectionRange(0, 99999);

            try {
                navigator.clipboard.writeText(formattedTextElement.value);
                alert('Texto copiado para a área de transferência!');
            } catch (err) {
                console.error('Erro ao copiar texto: ', err);
                alert('Não foi possível copiar o texto. Por favor, copie manualmente.');
            }
        });
    }
});