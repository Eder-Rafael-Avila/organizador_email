process.env.OPENROUTER_API_KEY = 'test-key';

import test from 'node:test';
import assert from 'node:assert/strict';

import { selecionarEmailsRelevantes } from '../controllers/aiController.js';

test('prioriza alertas de segurança do Google sobre marketing ao buscar por segurança', () => {
  const emails = [
    {
      remetente: 'SHEIN',
      remetenteEmail: 'noreply@shein.com.br',
      assunto: 'Oferta do dia com até 70% off',
      conteudo: 'Promoção exclusiva de roupas e acessórios com frete grátis.',
      data: '2026-09-19',
      importante: false,
      lido: true,
      pasta: 'Marketing'
    },
    {
      remetente: 'Google',
      remetenteEmail: 'no-reply@accounts.google.com',
      assunto: 'Alerta de segurança da sua conta do Google',
      conteudo: 'Foi detectado um acesso incomum à sua conta. Revise sua atividade e verifique sua senha e autenticação.',
      data: '2026-09-19',
      importante: true,
      lido: false,
      pasta: 'Segurança'
    }
  ];

  const contexto = selecionarEmailsRelevantes(emails, 'quais emails de segurança do google são importantes?');
  const blocos = contexto
    .split(/(?=Remetente:)/g)
    .map(bloco => bloco.trim())
    .filter(Boolean);

  assert.ok(blocos.length >= 2, 'esperava incluir os dois emails no contexto');
  assert.match(blocos[0], /Google|accounts\.google\.com|Alerta de segurança/i, 'o alerta de segurança do Google deveria aparecer primeiro');
  assert.doesNotMatch(blocos[0], /SHEIN|Oferta do dia/i, 'marketing não deveria vencer a segurança');
});
