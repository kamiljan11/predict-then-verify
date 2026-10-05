/* Sprawdza, ze eksport postepu nie zawiera danych uwierzytelniajacych, a import ich nie kasuje.
   Uruchom: node test-export-secrets.js  (exit 0 = OK) */
const fs = require('fs'), assert = require('assert');
const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
function grab(re, what){ const m = html.match(re); if(!m) throw new Error('nie znaleziono w index.html: ' + what); return m[0]; }
const src = [
  grab(/const VFS_PREFIX = [^\n]*\n/, 'VFS_PREFIX'),
  grab(/const CFG_KEY\s*=[^\n]*\n/, 'CFG_KEY'),
  grab(/function cfgGet\(\)[^\n]*\n/, 'cfgGet'),
  grab(/function vfsRead\(path\)[^\n]*\n/, 'vfsRead'),
  grab(/function vfsWrite\(path, txt\)\{[\s\S]*?\n\}\n/, 'vfsWrite'),
  grab(/function vfsList\(\)[^\n]*\n/, 'vfsList'),
  grab(/const SECRET_FIELD_RE[^\n]*\n/, 'SECRET_FIELD_RE'),
  grab(/function stripSecretFields\(obj\)\{[\s\S]*?\n\}\n/, 'stripSecretFields'),
  grab(/function sanitizeKeyValue\(k, raw\)\{[\s\S]*?\n\}\n/, 'sanitizeKeyValue'),
  grab(/function exportProgress\(\)\{[\s\S]*?\n\}\n/, 'exportProgress'),
  grab(/function importProgress\(file, cb\)\{[\s\S]*?\n\}\n/, 'importProgress'),
].join('\n');

function makeEnv(){
  const store = new Map();
  const localStorage = {
    get length(){ return store.size; },
    key: i => [...store.keys()][i] ?? null,
    getItem: k => store.has(k) ? store.get(k) : null,
    setItem: (k, v) => { store.set(k, String(v)); },
  };
  let exported = null;
  const Blob = function(parts){ exported = parts.join(''); };
  const document = { createElement: () => ({ click(){} }) };
  const URL = { createObjectURL: () => 'blob:x' };
  const FileReader = function(){ this.readAsText = f => { this.result = f; this.onload(); }; };
  const toast = () => {};
  const todayStr = () => '2026-01-01';
  const run = new Function('localStorage','Blob','document','URL','FileReader','toast','todayStr',
    src + '\nreturn {exportProgress, importProgress, cfgGet};');
  const api = run(localStorage, Blob, document, URL, FileReader, toast, todayStr);
  return { store, api, getExport: () => exported };
}

const SECRET = 'sk-ant-TESTVALUE-0000';
{ /* eksport nie zawiera klucza ani pol key/token/secret, zachowuje reszte */
  const { store, api, getExport } = makeEnv();
  store.set('crq.config', JSON.stringify({ apiKey: SECRET, model: 'm1', authToken: 't', client_secret: 's', lang: 'pl' }));
  store.set('crq.vfs::a.md', 'tresc');
  store.set('crq.other', 'x');
  api.exportProgress();
  const out = getExport();
  assert(!out.includes(SECRET), 'klucz API wyciekl do eksportu');
  const d = JSON.parse(out);
  const cfg = JSON.parse(d.keys['crq.config']);
  assert.deepStrictEqual(cfg, { model: 'm1', lang: 'pl' });
  assert.strictEqual(d.files['a.md'], 'tresc');
  assert.strictEqual(d.keys['crq.other'], 'x');
}
{ /* uszkodzony crq.config nie wycieka surowo */
  const { store, api, getExport } = makeEnv();
  store.set('crq.config', 'nie-json ' + SECRET);
  api.exportProgress();
  assert(!getExport().includes(SECRET));
}
{ /* import (takze starego pliku z kluczem) nie nadpisuje lokalnego klucza */
  const { store, api } = makeEnv();
  store.set('crq.config', JSON.stringify({ apiKey: SECRET, model: 'local' }));
  for (const incoming of [
    { model: 'new', apiKey: '' },
    { model: 'new' },
    { model: 'new', apiKey: 'sk-ant-INNY' },
  ]) {
    let err = 'unset';
    api.importProgress(JSON.stringify({ _app: 'code-reading-quest', files: {}, keys: { 'crq.config': JSON.stringify(incoming) } }), e => { err = e; });
    assert.strictEqual(err, null);
    const cfg = api.cfgGet();
    assert.strictEqual(cfg.apiKey, SECRET, 'import nadpisal lokalny klucz');
    assert.strictEqual(cfg.model, 'new');
  }
}
console.log('OK: eksport bez danych uwierzytelniajacych, import nie rusza lokalnego klucza');
