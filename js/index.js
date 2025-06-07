document.addEventListener('DOMContentLoaded', function() {
    const generateTextButton = document.getElementById('generateText');
    const copyButton = document.getElementById('copyButton');
    const osForm = document.getElementById('osForm');
    const formattedTextElement = document.getElementById('formattedText');
    const resultArea = document.getElementById('resultArea');
    const dataInstalacaoInput = document.getElementById('dataInstalacao');

    if (generateTextButton) {
        generateTextButton.addEventListener('click', function() {
            const data = {};

            // Helper to get radio button value
            const getRadioValue = (name) => {
                const selected = osForm.querySelector(`input[name="${name}"]:checked`);
                return selected ? selected.value : '';
            };

            // Get form values
            data.localizacao = osForm.elements['localizacao'].value.trim() || 'Não informado';
            data.podeAdiantar = getRadioValue('podeAdiantar');
            data.postePadrao = getRadioValue('postePadrao');

            const dataInstalacao = osForm.elements['dataInstalacao'].value;
            const periodo = osForm.elements['periodo'].value;
            if (dataInstalacao) {
                data.dataPeriodo = `${dataInstalacao.split('-').reverse().join('/')} PERÍODO: ${periodo}`;
            } else {
                data.dataPeriodo = `Data não informada PERÍODO: ${periodo}`;
            }

            data.termoAceito = getRadioValue('termoAceito');
            data.telefone1 = osForm.elements['telefone1'].value.trim() || 'Não informado';
            data.telefone2 = osForm.elements['telefone2'].value.trim() || 'Não informado';
            data.pontoRef = osForm.elements['pontoRef'].value.trim() || 'Não informado';
            data.titularAcompanha = getRadioValue('titularAcompanha');
            data.lado = getRadioValue('lado') || 'Não informado';
            data.modalidade = osForm.elements['modalidade'].value || 'Não informado';
            data.comodoInstalacao = osForm.elements['comodoInstalacao'].value.trim() || 'Não informado';
            data.servico = osForm.elements['servico'].value.trim() || 'Não informado';
            data.valorPlano = osForm.elements['valorPlano'].value.trim() || 'Não informado';
            data.taxaAtivacao = osForm.elements['taxaAtivacao'].value.trim() || 'instalação gratuita';
            data.total = osForm.elements['total'].value.trim() || 'Não informado';
            data.vendedor = osForm.elements['vendedor'].value.trim() || 'Não informado';
            data.dataVencimentoFatura = osForm.elements['dataVencimentoFatura'].value.trim() || 'Não informado';
            data.pontoAdicional = getRadioValue('pontoAdicional');

            // Format the text
            const formattedOutput = `
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
VALOR DO PLANO: ${ `R$` + data.valorPlano}
TAXA DE ATIVAÇÃO: ${data.taxaAtivacao}
TOTAL: ${`R$` + data.total}
VENDEDOR: ${data.vendedor}
DATA DE VENCIMENTO DA FATURA: ${data.dataVencimentoFatura}
AVALIAÇÃO PARA PONTO ADICIONAL: ${data.pontoAdicional}
            `.trim();

            if (formattedTextElement) {
                formattedTextElement.value = formattedOutput;
            }
            if (resultArea) {
                resultArea.classList.remove('hidden');
            }
        });
    }

    if (copyButton) {
        copyButton.addEventListener('click', function() {
            if (formattedTextElement) {
                formattedTextElement.select();
                formattedTextElement.setSelectionRange(0, 99999); // For mobile devices

                try {
                    navigator.clipboard.writeText(formattedTextElement.value);
                    alert('Texto copiado para a área de transferência!');
                } catch (err) {
                    console.error('Erro ao copiar texto: ', err);
                    alert('Não foi possível copiar o texto. Por favor, copie manualmente.');
                }
            }
        });
    }

    // Set initial date to today
    if (dataInstalacaoInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${yyyy}-${mm}-${dd}`;
        dataInstalacaoInput.value = formattedDate;
    }
});