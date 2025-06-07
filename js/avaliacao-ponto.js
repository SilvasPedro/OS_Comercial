document.addEventListener('DOMContentLoaded', function() {
    const formId = 'osAvaliacaoPontoForm';
    const generateButtonId = 'generateTextAvaliacaoPonto';
    const copyButtonId = 'copyButtonAvaliacaoPonto';
    const resultAreaId = 'resultAreaAvaliacaoPonto';
    const formattedTextId = 'formattedTextAvaliacaoPonto';
    const dataAgendamentoInputId = 'dataAgendamentoPonto'; // ID do campo de data desta página

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

            data.servicoAvaliacao = getRadioValue(osForm, 'servicoAvaliacao');

            const dataAgendamentoValue = osForm.elements['dataAgendamentoPonto'].value;
            const periodoAgendamentoValue = osForm.elements['periodoAgendamentoPonto'].value;
            if (dataAgendamentoValue) {
                const [year, month, day] = dataAgendamentoValue.split('-');
                data.dataPeriodoAgendamento = `${day}/${month}/${year} PERÍODO: ${periodoAgendamentoValue}`;
            } else {
                data.dataPeriodoAgendamento = `Data não informada PERÍODO: ${periodoAgendamentoValue}`;
            }

            data.isento = getRadioValue(osForm, 'isento');
            data.equipamento = getRadioValue(osForm, 'equipamento');
            data.servicoVelocidade = osForm.elements['servicoVelocidade'].value.trim() || 'Não informado';


            const formattedOutput = `
SERVIÇO PARA AVALIAÇÃO: ${data.servicoAvaliacao}
DATA E PERÍODO (AGENDAMENTO): ${data.dataPeriodoAgendamento}
ISENTO: ${data.isento}
EQUIPAMENTO: ${data.equipamento}
SERVIÇO (VELOCIDADE): ${data.servicoVelocidade}
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

        const periodoSelect = osForm ? osForm.elements['periodoAgendamentoPonto'] : null;
        if (periodoSelect) {
            periodoSelect.value = 'integral';
        }
    }
});