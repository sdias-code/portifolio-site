/* main.js — Menu mobile + validação e envio do formulário de contato (LGPD).
   Carregado com <script src="main.js" defer> no <head>: executa após o
   parsing do HTML, antes do DOMContentLoaded. */
'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // ---------- Menu mobile ----------
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', function () {
            const isHidden = mobileMenu.classList.toggle('hidden');
            mobileBtn.setAttribute('aria-expanded', isHidden ? 'false' : 'true');
        });

        // Fechar menu mobile ao clicar em um link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ---------- Formulário de contato (validação + envio AJAX via Fetch API) ----------
    const form = document.getElementById('contact-form');
    if (form) {
        const nome = document.getElementById('nome');
        const email = document.getElementById('email');
        const descricao = document.getElementById('descricao');
        const count = document.getElementById('descricao-count');
        const feedback = document.getElementById('form-feedback');
        const submitBtn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const lgpdConsent = document.getElementById('lgpd-consent');
        const lgpdError = document.getElementById('lgpd-error');
        const lgpdConsentValue = document.getElementById('lgpd-consent-value');
        const lgpdDatetime = document.getElementById('lgpd-datetime');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        const showError = (input, errorId, message) => {
            const el = document.getElementById(errorId);
            if (message) {
                el.textContent = message;
                el.classList.remove('hidden');
                input.classList.add('form-input-error');
                input.setAttribute('aria-invalid', 'true');
            } else {
                el.textContent = '';
                el.classList.add('hidden');
                input.classList.remove('form-input-error');
                input.removeAttribute('aria-invalid');
            }
        };

        const updateCount = () => {
            count.textContent = descricao.value.length + ' / 1000';
        };
        descricao.addEventListener('input', () => {
            updateCount();
            if (descricao.value.trim().length >= 20) showError(descricao, 'descricao-error', '');
        });
        updateCount();

        nome.addEventListener('input', () => {
            if (nome.value.trim().length >= 2) showError(nome, 'nome-error', '');
        });
        email.addEventListener('input', () => {
            if (emailPattern.test(email.value.trim())) showError(email, 'email-error', '');
        });

        // LGPD: botão desativado até o consentimento + validação do checkbox
        const showLgpdError = (message) => {
            if (!lgpdError) return;
            if (message) {
                lgpdError.textContent = message;
                lgpdError.classList.remove('hidden');
                if (lgpdConsent) lgpdConsent.setAttribute('aria-invalid', 'true');
            } else {
                lgpdError.textContent = '';
                lgpdError.classList.add('hidden');
                if (lgpdConsent) lgpdConsent.removeAttribute('aria-invalid');
            }
        };

        const syncSubmitState = () => {
            if (submitBtn && lgpdConsent) {
                submitBtn.disabled = !lgpdConsent.checked;
            }
        };
        if (lgpdConsent) {
            lgpdConsent.addEventListener('change', () => {
                if (lgpdConsent.checked) showLgpdError('');
                syncSubmitState();
            });
            syncSubmitState();
        }

        const showFeedback = (message, type) => {
            feedback.textContent = message;
            if (type === 'success') {
                feedback.className = 'mt-4 text-center text-sm font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl';
            } else {
                feedback.className = 'mt-4 text-center text-sm font-medium text-rose-400 bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl';
            }
        };

        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            let valid = true;
            const nomeVal = nome.value.trim();
            const emailVal = email.value.trim();
            const descVal = descricao.value.trim();

            if (nomeVal.length < 2) {
                showError(nome, 'nome-error', 'Informe seu nome (mínimo 2 caracteres).');
                valid = false;
            } else {
                showError(nome, 'nome-error', '');
            }

            if (!emailVal) {
                showError(email, 'email-error', 'Informe seu e-mail.');
                valid = false;
            } else if (!emailPattern.test(emailVal)) {
                showError(email, 'email-error', 'Informe um e-mail válido (ex.: seu@email.com).');
                valid = false;
            } else {
                showError(email, 'email-error', '');
            }

            if (!descVal) {
                showError(descricao, 'descricao-error', 'Descreva sua necessidade.');
                valid = false;
            } else if (descVal.length < 20) {
                showError(descricao, 'descricao-error', 'A descrição precisa de no mínimo 20 caracteres (atual: ' + descVal.length + ').');
                valid = false;
            } else if (descVal.length > 1000) {
                showError(descricao, 'descricao-error', 'A descrição permite no máximo 1000 caracteres.');
                valid = false;
            } else {
                showError(descricao, 'descricao-error', '');
            }

            // Validação do consentimento LGPD (obrigatório)
            if (!lgpdConsent || !lgpdConsent.checked) {
                showLgpdError('É necessário ler e concordar com a Política de Privacidade para enviar.');
                valid = false;
            } else {
                showLgpdError('');
            }

            feedback.classList.add('hidden');
            if (!valid) {
                const firstInvalid = form.querySelector('[aria-invalid="true"]');
                if (firstInvalid) firstInvalid.focus();
                showFeedback('Verifique os campos destacados antes de enviar.', 'error');
                return;
            }

            // Estado de envio
            const originalBtnText = btnText ? btnText.textContent : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                if (btnText) btnText.textContent = 'Enviando...';
            }

            try {
                // Evidência de consentimento LGPD no corpo do e-mail (log com data/hora)
                const consentDate = new Date();
                if (lgpdConsentValue) {
                    lgpdConsentValue.value = 'O usuário marcou o checkbox e aceitou os termos da Política de Privacidade.';
                }
                if (lgpdDatetime) {
                    lgpdDatetime.value = consentDate.toLocaleString('pt-BR', { timeZone: 'America/Campo_Grande' });
                }
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    form.reset();
                    updateCount();
                    syncSubmitState();
                    showFeedback('✓ Mensagem enviada com sucesso! Responderei em breve.', 'success');
                } else {
                    let errorMsg = 'Ocorreu um erro ao enviar a mensagem. Tente novamente.';
                    try {
                        const data = await response.json();
                        if (data && data.message) errorMsg = data.message;
                    } catch (_) { /* ignora parse */ }
                    showFeedback(errorMsg, 'error');
                }
            } catch (err) {
                showFeedback('Erro de conexão. Verifique sua internet e tente novamente.', 'error');
            } finally {
                if (submitBtn) {
                    if (btnText) btnText.textContent = originalBtnText || 'Enviar mensagem';
                    syncSubmitState();
                }
            }
        });
    }
});
