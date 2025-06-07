document.addEventListener('DOMContentLoaded', function() {
    const formId = 'osPlanoComboForm';
    const generateButtonId = 'generateTextPlanoCombo';
    const copyButtonId = 'copyButtonPlanoCombo';
    const resultAreaId = 'resultAreaPlanoCombo';
    const formattedTextId = 'formattedTextPlanoCombo';
    const dataInstalacaoInputId = 'dataInstalacao';

    const osForm = document.getElementById(formId);
    const generateTextButton = document.getElementById(generateButtonId);
    const copyButton = document.getElementById(copyButtonId);
    const resultArea = document.getElementById(resultAreaId);
    const formattedTextElement = document.getElementById(formattedTextId);
    const dataInstalacaoInput = document.getElementById(dataInstalacaoInputId);

    const getRadioValue = (form, name) => {
        const selected = form.querySelector(`input[name="${name}"]:checked`);
        return selected ? selected.value : '';
    };

    if (generateTextButton && osForm) {
        generateTextButton.addEventListener('click', function() {
            const data = {};

            data.comboCom = getRadioValue(osForm, 'comboCom');
            data.localizacao = osForm.elements['localizacao'].value.trim() || 'Não informado';
            data.podeAdiantar = getRadioValue(osForm, 'podeAdiantar');
            data.postePadrao = getRadioValue(osForm, 'postePadrao');

            const dataInstalacaoValue = osForm.elements['dataInstalacao'].value;
            const periodoValue = osForm.elements['periodo'].value;
            if (dataInstalacaoValue) {
                const [year, month, day] = dataInstalacaoValue.split('-');
                data.dataPeriodo = `${day}/${month}/${year} PERÍODO: ${periodoValue}`;
            } else {
                data.dataPeriodo = `Data não informada PERÍODO: ${periodoValue}`;
            }

            data.termoAceito = getRadioValue(osForm, 'termoAceito');
            data.telefone1 = osForm.elements['telefone1'].value.trim() || 'Não informado';
            data.telefone2 = osForm.elements['telefone2'].value.trim() || 'Não informado';
            data.pontoRef = osForm.elements['pontoRef'].value.trim() || 'Não informado';
            data.titularAcompanha = getRadioValue(osForm, 'titularAcompanha');
            data.lado = getRadioValue(osForm, 'lado') || 'Não informado';
            data.modalidade = osForm.elements['modalidade'].value || 'Não informado';
            data.comodoInstalacao = osForm.elements['comodoInstalacao'].value.trim() || 'Não informado';
            data.servico = osForm.elements['servico'].value.trim() || 'Não informado';
            data.valorPlano = osForm.elements['valorPlano'].value.trim() || 'Não informado';
            data.taxaAtivacao = osForm.elements['taxaAtivacao'].value.trim() || 'instalação gratuita';
            data.total = osForm.elements['total'].value.trim() || 'Não informado';
            data.vendedor = osForm.elements['vendedor'].value.trim() || 'Não informado';
            data.dataVencimentoFatura = osForm.elements['dataVencimentoFatura'].value.trim() || 'Não informado';
            data.avaliacaoCabearTv = getRadioValue(osForm, 'avaliacaoCabearTv');
            data.quantasTv = osForm.elements['quantasTv'].value.trim() || '0';


            const formattedOutput = `
COMBO COM: ${data.comboCom}
LOCALIZAÇÃO (GOOGLE): ${data.localizacao}
PODE ADIANTAR: ${data.podeAdiantar}
POSTE PADRÃO: ${data.postePadrao}
DATA INSTALAÇÃO E PERÍODO: ${data.dataPeriodo}
TERMO ACEITO: ${data.termoAceito}
TELEFONE 1: ${data.telefone1}
TELEFONE 2: ${data.telefone2}
PONTO DE REF: ${data.pontoRef}
TITULAR QUEM ACOMPANHARÁ A INSTALAÇÃO: ${data.titularAcompanha}
LADO PRAIA OU MORRO: ${data.lado}
MODALIDADE DA CONTRATAÇÃO: ${data.modalidade}
COMODO DE INSTALAÇÃO: ${data.comodoInstalacao}
SERVIÇO: ${data.servico}
VALOR DO PLANO: ${data.valorPlano}
TAXA DE ATIVAÇÃO: ${data.taxaAtivacao}
TOTAL: ${data.total}
VENDEDOR: ${data.vendedor}
DATA DE VENCIMENTO DA FATURA: ${data.dataVencimentoFatura}
AVALIAÇÃO PARA CABEAR TV: ${data.avaliacaoCabearTv}
QUANTAS: ${data.quantasTv}
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

    if (dataInstalacaoInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        dataInstalacaoInput.value = `${year}-${month}-${day}`;

        const periodoSelect = osForm ? osForm.elements['periodo'] : null;
        if (periodoSelect) {
            periodoSelect.value = 'integral';
        }
    }
});