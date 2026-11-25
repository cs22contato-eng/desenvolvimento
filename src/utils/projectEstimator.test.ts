import test from 'node:test';
import assert from 'node:assert/strict';
import { SOLUTIONS } from '../data/studioData';
import {
  buildBriefingWhatsAppMessage,
  buildWhatsAppUrl,
  computeArchitectureBlueprint,
  filterSolutionsByCategory,
  validateBriefingForm,
} from './projectEstimator';

test('filterSolutionsByCategory returns all items when category is todas', () => {
  const result = filterSolutionsByCategory(SOLUTIONS, 'todas');
  assert.equal(result.length, SOLUTIONS.length);
});

test('filterSolutionsByCategory filters strictly to matching category', () => {
  const saasOnly = filterSolutionsByCategory(SOLUTIONS, 'saas');
  assert.equal(saasOnly.length, 2);
  assert.ok(saasOnly.every((item) => item.category === 'saas'));
});

test('computeArchitectureBlueprint scales window and complexity with modules', () => {
  const lean = computeArchitectureBlueprint('site', 'padrao', []);
  assert.equal(lean.complexityTier, 'Enxuta');
  assert.equal(lean.estimatedWindow, '3 a 5 semanas');

  const full = computeArchitectureBlueprint('microsaas', 'padrao', [
    'auth',
    'admin',
    'automation',
    'payments',
  ]);
  assert.equal(full.complexityTier, 'Completa');
  assert.equal(full.estimatedWindow, '10 a 15 semanas');
  assert.equal(full.activeLayerTags.length, 4);
});

test('validateBriefingForm catches missing or malformed fields', () => {
  const invalid = validateBriefingForm({
    name: '',
    company: '',
    email: 'email-invalido',
    phone: '123',
    description: 'curto',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.description);
});

test('validateBriefingForm accepts valid submission with optional empty phone', () => {
  const valid = validateBriefingForm({
    name: 'Maria Silva',
    company: 'TechFlow Ltda',
    email: 'maria@techflow.com.br',
    phone: '(11) 99999-8888',
    description: 'Precisamos desenvolver um portal B2B com automação de pedidos.',
  });
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});

test('buildWhatsAppUrl targets 5518991621455 with encoded message', () => {
  const url = buildWhatsAppUrl('Olá CS22');
  assert.equal(url, 'https://wa.me/5518991621455?text=Ol%C3%A1%20CS22');
});

test('buildBriefingWhatsAppMessage includes blueprint and form details', () => {
  const blueprint = computeArchitectureBlueprint('app', 'padrao', ['auth']);
  const message = buildBriefingWhatsAppMessage({
    blueprint,
    values: { name: 'João', company: 'Alfa' },
  });
  assert.ok(message.includes('Aplicativo Mobile'));
  assert.ok(message.includes('João'));
  assert.ok(message.includes('Alfa'));
});
