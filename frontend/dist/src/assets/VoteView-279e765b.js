import{d as w,r,o as a,e as k,f as y,F as B,c as i,w as n,a as d,b as u,t as _,g as m,h}from"./index-d0402e1b.js";const C={class:"choice"},D={class:"choice"},$={class:"choice"},O={data:()=>({votings:[],results:{},options:{},success:{},values:{},optionsLoadButton:{},submitButton:{}}),methods:{async getVotings(){const t=await fetch("/votings");if(t.status===401){this.$router.push("/");return}this.votings=await t.json();for(let e of this.votings)this.values[e.voting]=["","",""],this.optionsLoadButton[e.voting]={loading:!1},this.submitButton[e.voting]={loading:!1},this.success[e.voting]=!1},async getResults(){if((await fetch("/result")).status===401){this.$router.push("/");return}},async getOptions(t){const e=await fetch(`/options?time=${t}`);if(e.status===401){this.$router.push("/");return}const f=await e.json();console.table(f),this.options[t]=f},async submit(t){if(this.submitButton[t]={loading:!0},this.values[t][0]===""||this.values[t][1]===""||this.values[t][2]===""){this.submitButton[t]={loading:!1};return}const e=this.values[t].map(l=>{var c;return(c=this.options[t].find(p=>p.name===l))==null?void 0:c.id});if(!this.options[t].map(l=>l.id).includes(e[0]??"")||!this.options[t].map(l=>l.id).includes(e[1]??"")||!this.options[t].map(l=>l.id).includes(e[2]??"")){this.submitButton[t]={loading:!1},alert("Du hast eine ungültige Option gewählt!");return}if(this.values[t][0]===this.values[t][1]||this.values[t][0]===this.values[t][2]||this.values[t][1]===this.values[t][2]){this.submitButton[t]={loading:!1},alert("Du musst drei verschiedene Optionen wählen!");return}if((await fetch(`/vote?time=${t}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify([e[0],e[1],e[2]])})).status!==200){this.$router.push("/error");return}this.submitButton[t]={loading:!1},this.options[t]=[],delete this.options[t],this.success[t]=!0}},async beforeMount(){await this.getVotings(),await this.getResults(),console.log("Everything parsed"),console.table(this.votings),console.log(this.results)}},N=w({...O,__name:"VoteView",setup(t){return(e,f)=>{const l=r("v-card-title"),c=r("v-card-subtitle"),p=r("v-select"),v=r("v-card-text"),g=r("v-btn"),b=r("v-card-actions"),V=r("v-card");return a(!0),k(B,null,y(e.votings,s=>(a(),i(V,null,{default:n(()=>[d(l,null,{default:n(()=>[u(_(s.voting),1)]),_:2},1024),s.open?(a(),i(c,{key:0},{default:n(()=>[u("Jetzt wählen")]),_:1})):(a(),i(c,{key:1},{default:n(()=>[u("Du kannst hier nicht mehr wählen")]),_:1})),s.open&&e.options[s.voting]!==void 0&&e.options[s.voting].length>0?(a(),i(v,{key:2},{default:n(()=>[m("div",C,[d(p,{items:e.options[s.voting].map(o=>o.name),label:"1. Wunsch",modelValue:e.values[s.voting][0],"onUpdate:modelValue":o=>e.values[s.voting][0]=o},null,8,["items","modelValue","onUpdate:modelValue"])]),m("div",D,[d(p,{items:e.options[s.voting].filter(o=>o.name!==e.values[s.voting][0]).map(o=>o.name),label:"2. Wunsch",modelValue:e.values[s.voting][1],"onUpdate:modelValue":o=>e.values[s.voting][1]=o},null,8,["items","modelValue","onUpdate:modelValue"])]),m("div",$,[u(" Drittwahl: "),d(p,{items:e.options[s.voting].filter(o=>o.name!==e.values[s.voting][0]&&o.name!==e.values[s.voting][1]).map(o=>o.name),label:"3. Wunsch",modelValue:e.values[s.voting][2],"onUpdate:modelValue":o=>e.values[s.voting][2]=o},null,8,["items","modelValue","onUpdate:modelValue"])])]),_:2},1024)):h("",!0),e.success[s.voting]?(a(),i(v,{key:3},{default:n(()=>[u(" Deine Wahl wurde erfolgreich gespeichert. ")]),_:1})):h("",!0),!s.open&&!e.success[s.voting]&&!e.results[s.voting]?(a(),i(v,{key:4},{default:n(()=>[u(" Du kannst hier nicht, noch nicht oder nicht mehr wählen. ")]),_:1})):h("",!0),e.results[s.voting]?(a(),i(v,{key:5},{default:n(()=>[u(" Dein zugeteiltes Projekt: "+_(e.results[s.voting]),1)]),_:2},1024)):h("",!0),s.open&&(!e.options[s.voting]||e.options[s.voting].length===0)&&!e.success[s.voting]&&!e.results[s.voting]?(a(),i(v,{key:6},{default:n(()=>[d(g,{onClick:o=>e.getOptions(s.voting),loading:e.optionsLoadButton[s.voting].loading},{default:n(()=>[u("Optionen laden")]),_:2},1032,["onClick","loading"])]),_:2},1024)):h("",!0),s.open&&e.options[s.voting]!==void 0&&e.options[s.voting].length>0?(a(),i(b,{key:7},{default:n(()=>[d(g,{onClick:o=>e.submit(s.voting)},{default:n(()=>[u("Absenden")]),_:2},1032,["onClick"])]),_:2},1024)):h("",!0)]),_:2},1024))),256)}}});export{N as default};
//# sourceMappingURL=VoteView-279e765b.js.map