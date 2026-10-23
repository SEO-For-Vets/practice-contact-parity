import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {analyse,render} from '../src/index.js';import {parseCSV,toCSV,escape} from '../src/util.js';
const data=JSON.parse(fs.readFileSync(new URL('../examples/input.json',import.meta.url),'utf8'));
test('the complete synthetic example produces a readable report',()=>{const r=analyse(data);assert.ok(r.title);assert.ok(r.summary);assert.match(render(r),/<h2>/);assert.ok(Array.isArray(r.issues));});
test('quoted CSV and dangerous spreadsheet values remain safe',()=>{assert.equal(parseCSV('id,note\r\n1,"one, two"')[0].note,'one, two');assert.throws(()=>parseCSV('id,note\n1,"unclosed'),/Unclosed/);assert.match(toCSV([{name:'=HYPERLINK("x")'}]),/'=HYPERLINK/);});
test('HTML escaping never emits an executable supplied tag',()=>{assert.equal(escape('<script>"&'), '&lt;script&gt;&quot;&amp;');});

test('formatting differences and wrong branch numbers have different states',()=>{const r=analyse(data);assert.equal(r.comparisons[0].state,'Formatting only');assert.equal(r.comparisons[1].state,'Conflict');assert.equal(r.comparisons[2].state,'Missing');});
test('similar branch names do not merge unknown explicit IDs',()=>{const d=structuredClone(data);d.observations[0].branch_id='north-unknown';assert.equal(analyse(d).comparisons[0].state,'Unknown branch');});
test('approval date stays attached to findings and unobserved fields stay unchecked',()=>{const r=analyse(data);assert.equal(r.comparisons[0].approved_on,'2026-10-01');assert.ok(r.issues.some(i=>i.code==='not-supplied'));});
