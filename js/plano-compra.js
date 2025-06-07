document.addEventListener('DOMContentLoaded', function() {
    const formId = 'osPlanoCompraForm'; // ID do formulário desta página
    const generateButtonId = 'generateTextPlanoCompra';
    const copyButtonId = 'copyButtonPlanoCompra';
    const resultAreaId = 'resultAreaPlanoCompra';
    const formattedTextId = 'formattedTextPlanoCompra';
    const dataInstalacaoInputId = 'dataInstalacao'; // Mesmo ID do campo de data

    const osForm = document.getElementById(formId);
    const generateTextButton = document.getElementById(generateButtonId);
    const copyButton = document.getElementById(copyButtonId);
    const resultArea = document.getElementById(resultAreaId);
    const formattedTextElement = document.getElementById(formattedTextId);
    const dataInstalacaoInput = document.getElementById(dataInstalacaoInputId);

    // Helper to get radio button value
    const getRadioValue = (form, name) => {
        const selected = form.querySelector(`input[name="${name}"]:checked`);
        return selected ? selected.value : '';
    };

    if (generateTextButton && osForm) {
        generateTextButton.addEventListener('click', function() {
            const data = {};

            // Get form values
            data.localizacao = osForm.elements['localizacao'].value.trim() || 'Não informado';
            data.podeAdiantar = getRadioValue(osForm, 'podeAdiantar');
            data.postePadrao = getRadioValue(osForm, 'postePadrao');

            const dataInstalacaoValue = osForm.elements['dataInstalacao'].value;
            const periodoValue = osForm.elements['periodo'].value;
            if (dataInstalacaoValue) {
                // Formata a data para dd/mm/aaaa
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
            data.lado = getRadioValue(osForm, 'lado') || 'Não informado'; // Captura N/A se for o caso
            data.modalidade = osForm.elements['modalidade'].value || 'Não informado';
            data.comodoInstalacao = osForm.elements['comodoInstalacao'].value.trim() || 'Não informado';
            data.servico = osForm.elements['servico'].value.trim() || 'Não informado';
            
            // Novos campos específicos deste formulário
            data.recargaMaior = getRadioValue(osForm, 'recargaMaior');
            data.velocidadeValorRecarga = osForm.elements['velocidadeValorRecarga'].value.trim() || 'Não informado';
            
            data.taxaAtivacao = osForm.elements['taxaAtivacao'].value.trim() || 'instalação gratuita';
            data.total = osForm.elements['total'].value.trim() || 'Não informado';
            data.vendedor = osForm.elements['vendedor'].value.trim() || 'Não informado';
            data.dataVencimentoFatura = osForm.elements['dataVencimentoFatura'].value.trim() || 'Não informado';

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
RECARGA MAIOR?: ${data.recargaMaior}
VELOCIDADE E VALOR DA RECARGA: ${data.velocidadeValorRecarga}
TAXA DE ATIVAÇÃO: ${data.taxaAtivacao}
TOTAL: ${data.total}
VENDEDOR: ${data.vendedor}
DATA DE VENCIMENTO DA FATURA: ${data.dataVencimentoFatura}
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
            formattedTextElement.setSelectionRange(0, 99999); // For mobile devices

            try {
                navigator.clipboard.writeText(formattedTextElement.value);
                alert('Texto copiado para a área de transferência!');
            } catch (err) {
                console.error('Erro ao copiar texto: ', err);
                alert('Não foi possível copiar o texto. Por favor, copie manualmente.');
            }
        });
    }

    // Set initial date to today for dataInstalacao and default period
    if (dataInstalacaoInput) {
        const today = new Date();
        // Adicionando 1 dia à data atual para o padrão (ou manter hoje se preferir)
        // today.setDate(today.getDate() + 1); // Se quiser que o padrão seja D+1
        
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(today.getDate()).padStart(2, '0');
        
        dataInstalacaoInput.value = `${year}-${month}-${day}`; // Formato YYYY-MM-DD exigido pelo input date

        // Define o período padrão como "integral" se o elemento select existir
        const periodoSelect = osForm ? osForm.elements['periodo'] : null;
        if (periodoSelect) {
            periodoSelect.value = 'integral';
        }
    }
});