import {array,text,unique,date,escape,issue,table,issuesHTML} from './util.js';
export const guide='Supply practice, branches [{branch_id,name,address,phone,opening_hours,out_of_hours_contact,out_of_hours_note,approved_on,approver}] and observations [{branch_id,page,field,value}]. Branch IDs are explicit; no records are merged by name. Synthetic demo contact strings are nondialable.';
export function normalisePhone(value){const raw=text(value,'phone');const match=raw.match(/\s*(?:ext\.?|x)\s*(\d+)\s*$/i);const main=match?raw.slice(0,match.index):raw;return main.replace(/[\s().-]/g,'')+(match?' ext '+match[1]:'');}
const fields=['name','address','phone','opening_hours','out_of_hours_contact','out_of_hours_note'];
export function analyse(input){
 text(input.practice,'practice');const issues=[];
 const branches=unique(array(input.branches,'branches'),'branch_id');
 for(const b of branches){for(const field of fields)text(b[field],field);date(b.approved_on,'approved_on');text(b.approver,'approver');}
 const comparisons=array(input.observations,'observations').map(o=>{
  text(o.page,'page');if(!fields.includes(o.field))throw Error('Unsupported field');
  const branch=branches.find(b=>b.branch_id===o.branch_id);
  if(!branch){issues.push(issue('identity','Unknown explicit branch ID; no automatic matching',o.page));return {branch_id:o.branch_id,page:o.page,field:o.field,state:'Unknown branch',expected:null,observed:o.value??null,approved_on:null};}
  const expected=branch[o.field],observed=o.value;
  let state=observed===undefined||observed===null||observed===''?'Missing':observed===expected?'Exact match':(['phone','out_of_hours_contact'].includes(o.field)&&normalisePhone(String(observed))===normalisePhone(expected))?'Formatting only':'Conflict';
  if(['Missing','Conflict'].includes(state))issues.push(issue(state.toLowerCase(),o.field+': '+state+'; use the approved record for human review',o.page));
  return {branch_id:o.branch_id,page:o.page,field:o.field,state,expected,observed:observed??null,approved_on:branch.approved_on};
 });
 for(const b of branches)for(const field of fields)if(!input.observations.some(o=>o.branch_id===b.branch_id&&o.field===field))issues.push(issue('not-supplied','No website observation for '+field+'; visibility is unchecked',b.branch_id));
 return {title:input.practice+' contact comparison',summary:'Compare supplied records only. No calls, clinical advice, live-service verification or profile changes.',comparisons,issues,markdown:comparisons.map(c=>'- '+c.page+' | '+c.field+' | '+c.state+' | approved '+(c.approved_on||'Not matched')).join('\n')};
}
export const render=r=>'<h2>'+escape(r.title)+'</h2><p>'+escape(r.summary)+'</p>'+table(['Branch / source','Field','Comparison','Approved record','Observed'],r.comparisons.map(c=>[c.branch_id+' / '+c.page,c.field,c.state,c.expected||'Not matched',c.observed||'Missing']))+issuesHTML(r.issues);
