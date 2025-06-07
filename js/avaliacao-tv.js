document.addEventListener('DOMContentLoaded', function() {
    const formId = 'osAvaliacaoTvForm';
    const generateButtonId = 'generateTextAvaliacaoTv';
    const copyButtonId = 'copyButtonAvaliacaoTv';
    const resultAreaId = 'resultAreaAvaliacaoTv';
    const formattedTextId = 'formattedTextAvaliacaoTv';
    const dataAgendamentoInputId = 'dataAgendamento'; // ID do campo de data desta página

    const osForm = document.getElementById(formId);
    const generateTextButton = document.getElementById(generateButtonId);
    const copyButton = document.getElementById(copyButtonId);
    const resultArea = document.getElementById(resultAreaId);
    const formattedTextElement = document.getElementById(formattedTextId);
    const dataAgendamentoInput = document.getElementById(dataAgendamentoInputId);

    const getRadioValue = (form, name) => {
        const selected = form.querySelector(`input[name="${name}"]:checked`);
        return selected ? selected.value : '';
    };

    if (generateTextButton && osForm) {
        generateTextButton.addEventListener('click', function() {
            const data = {};

            const dataAgendamentoValue = osForm.elements['dataAgendamento'].value;
            const periodoAgendamentoValue = osForm.elements['periodoAgendamento'].value;
            if (dataAgendamentoValue) {
                const [year, month, day] = dataAgendamentoValue.split('-');
                data.dataPeriodoAgendamento = `${day}/${month}/${year} PERÍODO: ${periodoAgendamentoValue}`;
            } else {
                data.dataPeriodoAgendamento = `Data não informada PERÍODO: ${periodoAgendamentoValue}`;
            }

            data.comboTipo = getRadioValue(osForm, 'comboTipo');
            data.baixouApp = getRadioValue(osForm, 'baixouApp');
            data.quantasTvs = osForm.elements['quantasTvs'].value.trim() || '0';
            data.tvSmart = getRadioValue(osForm, 'tvSmart');
            data.termoAceito = getRadioValue(osForm, 'termoAceito');

            const formattedOutput = `
CLIENTE CONTRATOU PLANO COM TV, AVALIAR POSSIBILIDADE DE CABEAR AS TELEVISÕES

DATA E PERÍODO (AGENDAMENTO): ${data.dataPeriodoAgendamento}
COMBO: ${data.comboTipo}
CLIENTE JÁ CONSEGUIU BAIXAR O APP: ${data.baixouApp}
QUANTAS TVS?: ${data.quantasTvs}
TV SMART?: ${data.tvSmart}
TERMO ACEITO: ${data.termoAceito}
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

    // Set initial date to today for dataAgendamento and default period
    if (dataAgendamentoInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        dataAgendamentoInput.value = `${year}-${month}-${day}`;

        const periodoSelect = osForm ? osForm.elements['periodoAgendamento'] : null;
        if (periodoSelect) {
            periodoSelect.value = 'integral';
        }
    }
});