#!/usr/bin/env node

// Claude Swarm Command Center
// Zero dependencies. Just run: node command-center.js
// Opens at http://localhost:4200

const { execFileSync } = require('child_process');
const http = require('http');
const PORT = 4200;

function run(cmd, args) {
  try {
    return execFileSync(cmd, args, { encoding: 'utf-8', timeout: 5000 }).trim();
  } catch {
    return '';
  }
}

function getSession() {
  const sessions = run('tmux', ['list-sessions', '-F', '#{session_name}']);
  if (!sessions) return null;
  const list = sessions.split('\n');
  return list.find(s => s.includes('swarm')) || list[0];
}

function getAgents(session) {
  const raw = run('tmux', ['list-windows', '-t', session, '-F', '#{window_index}|#{window_name}|#{window_active}|#{pane_current_command}']);
  if (!raw) return [];
  return raw.split('\n').map(line => {
    const [index, name, active, command] = line.split('|');
    const output = run('tmux', ['capture-pane', '-t', `${session}:${name}`, '-p', '-S', '-200']);
    const lines = output.split('\n')
      .filter(l => l.trim())
      .filter(l => !(/^[\u2500\u2501\u2502\u2503\u250c\u2510\u2514\u2518\u251c\u2524\u252c\u2534\u253c\u2550-\u256c\u2574-\u257f\u2580-\u259f\u25a0-\u25ff\u2600-\u26ff\u2700-\u27bf\u2b00-\u2bff─━│┃┄┅┆┇┈┉┊┋┌┍┎┏┐┑┒┓└┕┖┗┘┙┚┛├┝┞┟┠┡┢┣┤┥┦┧┨┩┪┫┬┭┮┯┰┱┲┳┴┵┶┷┸┹┺┻┼┽┾┿╀╁╂╃╄╅╆╇╈╉╊╋═║╒╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡╢╣╤╥╦╧╨╩╪╫╬\-]+$/.test(l.trim())))
      .filter(l => !(l.trim() === '\u276F' || l.trim() === '>'));
    const lastLines = lines.slice(-80);
    // Status detection — only check the last 5 raw lines for activity indicators
    const rawTail = output.split('\n').slice(-8).join(' ');
    let status = 'unknown';
    if (name === 'monitor') {
      status = 'monitoring';
    } else if (rawTail.includes('esc to interrupt')) {
      status = 'working';
    } else if (rawTail.includes('bypass permissions') && rawTail.includes('\u276F')) {
      status = 'idle';
    } else if (rawTail.includes('\u276F')) {
      status = 'idle';
    }
    const statusFile = run('cat', [`/tmp/claude-shared/status/${name}.md`]);
    return { index, name, active: active === '1', command, status, lastLines, statusFile };
  });
}

function getSharedFiles() {
  const dirs = ['status', 'tasks', 'results', 'messages'];
  const files = {};
  for (const dir of dirs) {
    const list = run('ls', [`/tmp/claude-shared/${dir}/`]);
    files[dir] = list ? list.split('\n').filter(f => f.trim()) : [];
  }
  return files;
}

function readSharedFile(dir, file) {
  if (dir.includes('..') || file.includes('..') || dir.includes('/') || file.includes('/')) return '';
  return run('cat', [`/tmp/claude-shared/${dir}/${file}`]);
}

const CSS = `
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:-apple-system,'Helvetica Neue',sans-serif; background:#0a0a0a; color:#e0e0e0; min-height:100vh; }
header { padding:16px 24px; border-bottom:1px solid #1a1a1a; display:flex; align-items:center; justify-content:space-between; }
header h1 { font-size:16px; font-weight:600; color:#fff; }
header h1 span { color:#00d4aa; }
.session-info { font-size:13px; color:#555; }
.pulse { font-size:11px; color:#333; transition:color .3s; }
.pulse.on { color:#00d4aa; }
.container { display:grid; grid-template-columns:1fr 300px; height:calc(100vh - 53px); }
.left { display:flex; flex-direction:column; height:100%; }
.stats { display:flex; gap:16px; padding:16px 16px 0; }
.stat { text-align:center; }
.stat-num { font-size:24px; font-weight:800; color:#fff; }
.stat-num.green { color:#00d4aa; }
.stat-label { font-size:10px; color:#555; text-transform:uppercase; }
.agents { padding:16px; overflow-y:auto; flex:1; display:grid; grid-template-columns:repeat(auto-fit,minmax(420px,1fr)); gap:12px; align-content:start; }
.card { background:#111; border:1px solid #1a1a1a; border-radius:10px; overflow:hidden; transition:border-color .2s; resize:vertical; min-height:150px; }
.card:hover { border-color:#333; }
.card.working { border-left:3px solid #00d4aa; }
.card.idle { border-left:3px solid #555; }
.card.monitoring { border-left:3px solid #aa66ff; }
.card.expanded { grid-column:1 / -1; }
.card-head { padding:12px 14px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #1a1a1a; }
.card-name { font-weight:600; font-size:14px; color:#fff; }
.card-controls { display:flex; gap:8px; align-items:center; }
.expand-btn { background:none; border:1px solid #333; border-radius:4px; color:#666; font-size:11px; padding:2px 6px; cursor:pointer; }
.expand-btn:hover { color:#fff; border-color:#555; }
.badge { font-size:11px; padding:2px 8px; border-radius:10px; font-weight:500; }
.badge.working { background:#0a2a1a; color:#00d4aa; }
.badge.idle { background:#1a1a1a; color:#888; }
.badge.monitoring { background:#1a0a2a; color:#aa66ff; }
.badge.unknown { background:#1a1a1a; color:#555; }
.card-output { font-family:'SF Mono','Menlo',monospace; font-size:11px; line-height:1.5; padding:10px 14px; max-height:500px; overflow-y:auto; overflow-x:auto; color:#888; white-space:pre; }
.card-sf { padding:8px 14px; border-top:1px solid #1a1a1a; font-size:11px; color:#666; max-height:60px; overflow-y:auto; }
.card-actions { padding:8px 14px; border-top:1px solid #1a1a1a; display:flex; gap:6px; }
.msg-input { flex:1; background:#0a0a0a; border:1px solid #222; border-radius:6px; padding:6px 10px; color:#e0e0e0; font-size:12px; outline:none; }
.msg-input:focus { border-color:#00d4aa; }
.msg-input::placeholder { color:#333; }
.send-btn { background:#00d4aa; color:#000; border:none; border-radius:6px; padding:6px 12px; font-size:12px; font-weight:600; cursor:pointer; }
.send-btn:hover { background:#00eebb; }
.bcast { padding:12px 16px; border-top:1px solid #1a1a1a; display:flex; gap:8px; background:#0a0a0a; }
.sidebar { border-left:1px solid #1a1a1a; padding:16px; overflow-y:auto; }
.sidebar h2 { font-size:13px; font-weight:600; color:#888; text-transform:uppercase; letter-spacing:.05em; margin-bottom:12px; }
.sidebar h3 { font-size:12px; color:#555; margin:12px 0 6px; }
.flist { list-style:none; }
.flist li { font-size:12px; padding:4px 8px; border-radius:4px; cursor:pointer; color:#888; }
.flist li:hover { background:#1a1a1a; color:#fff; }
.fprev { margin-top:12px; background:#111; border:1px solid #1a1a1a; border-radius:8px; padding:10px; font-family:'SF Mono',monospace; font-size:11px; color:#888; max-height:300px; overflow-y:auto; white-space:pre-wrap; display:none; }
.fprev .close-btn { float:right; cursor:pointer; color:#555; font-size:13px; }
.fprev .close-btn:hover { color:#fff; }
.no-session { display:flex; align-items:center; justify-content:center; height:100vh; flex-direction:column; gap:12px; }
.no-session h2 { color:#555; font-weight:300; }
.no-session code { background:#111; padding:8px 16px; border-radius:6px; color:#00d4aa; font-size:14px; }
`;

const JS = `
var built = false, fpContent = '', fpOpen = false, expandedCards = {};

function api(p) { return fetch('/api'+p).then(function(r){return r.json()}); }
function sendCmd(a,m) { return fetch('/api/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({agent:a,message:m})}); }
function getFile(d,f) { return fetch('/api/file?dir='+encodeURIComponent(d)+'&file='+encodeURIComponent(f)).then(function(r){return r.json()}); }

function build() {
  var app = document.getElementById('app');
  app.textContent = '';
  // header
  var hdr = document.createElement('header');
  hdr.innerHTML = '<h1><span>\\u25CF</span> Claude Swarm Command Center</h1>';
  var si = document.createElement('span'); si.className='session-info'; si.id='si';
  var pu = document.createElement('span'); pu.className='pulse'; pu.id='pulse'; pu.textContent='refreshing...';
  hdr.appendChild(si); hdr.appendChild(pu); app.appendChild(hdr);
  // container
  var c = document.createElement('div'); c.className='container';
  var l = document.createElement('div'); l.className='left';
  var st = document.createElement('div'); st.className='stats'; st.id='stats'; l.appendChild(st);
  var ag = document.createElement('div'); ag.className='agents'; ag.id='agents'; l.appendChild(ag);
  // broadcast
  var bb = document.createElement('div'); bb.className='bcast';
  var bi = document.createElement('input'); bi.className='msg-input'; bi.placeholder='Message admin...'; bi.id='msg-broadcast';
  bi.addEventListener('keydown',function(e){if(e.key==='Enter')bsend();});
  var bt = document.createElement('button'); bt.className='send-btn'; bt.textContent='Send to Admin';
  bt.addEventListener('click',bsend);
  bb.appendChild(bi); bb.appendChild(bt); l.appendChild(bb); c.appendChild(l);
  // sidebar
  var sb = document.createElement('div'); sb.className='sidebar'; sb.id='sidebar';
  var sh = document.createElement('h2'); sh.textContent='Shared Files'; sb.appendChild(sh);
  var fw = document.createElement('div'); fw.id='fw'; sb.appendChild(fw);
  var fp = document.createElement('div'); fp.className='fprev'; fp.id='fp'; sb.appendChild(fp);
  c.appendChild(sb); app.appendChild(c);
  built = true;
}

function mkCard(a) {
  var card = document.createElement('div'); card.className='card '+a.status; card.id='c-'+a.name;
  var hd = document.createElement('div'); hd.className='card-head';
  var nm = document.createElement('span'); nm.className='card-name'; nm.textContent=a.name;
  var ctrls = document.createElement('div'); ctrls.className='card-controls';
  var exp = document.createElement('button'); exp.className='expand-btn'; exp.id='exp-'+a.name;
  exp.textContent = expandedCards[a.name] ? 'collapse' : 'expand';
  exp.addEventListener('click',(function(name){return function(){
    expandedCards[name] = !expandedCards[name];
    var c=document.getElementById('c-'+name);
    if(c){
      c.classList.toggle('expanded', expandedCards[name]);
      this.textContent = expandedCards[name] ? 'collapse' : 'expand';
    }
  };})(a.name));
  var bg = document.createElement('span'); bg.className='badge '+a.status; bg.id='b-'+a.name; bg.textContent=a.status;
  ctrls.appendChild(exp); ctrls.appendChild(bg);
  hd.appendChild(nm); hd.appendChild(ctrls); card.appendChild(hd);
  var out = document.createElement('div'); out.className='card-output'; out.id='o-'+a.name; card.appendChild(out);
  var sf = document.createElement('div'); sf.className='card-sf'; sf.id='s-'+a.name; sf.style.display='none'; card.appendChild(sf);
  if(a.name!=='monitor'){
    var act = document.createElement('div'); act.className='card-actions';
    var inp = document.createElement('input'); inp.className='msg-input'; inp.placeholder='Message '+a.name+'...'; inp.id='msg-'+a.name;
    inp.addEventListener('keydown',(function(n){return function(e){if(e.key==='Enter')smsg(n);};})(a.name));
    var btn = document.createElement('button'); btn.className='send-btn'; btn.textContent='Send';
    btn.addEventListener('click',(function(n){return function(){smsg(n);};})(a.name));
    act.appendChild(inp); act.appendChild(btn); card.appendChild(act);
  }
  document.getElementById('agents').appendChild(card);
}

function refresh() {
  api('/status').then(function(d) {
    if(!d.session) {
      built=false;
      var app=document.getElementById('app'); app.textContent='';
      var w=document.createElement('div'); w.className='no-session';
      var h=document.createElement('h2'); h.textContent='No swarm session detected';
      var c=document.createElement('code'); c.textContent='claude-swarm ~/your-project 3';
      w.appendChild(h); w.appendChild(c); app.appendChild(w);
      return;
    }
    if(!built) build();
    var vis=d.agents.filter(function(a){return a.name!=='monitor';});
    var wk=vis.filter(function(a){return a.status==='working';}).length;
    var id=vis.filter(function(a){return a.status==='idle';}).length;
    // session info
    var si=document.getElementById('si'); if(si) si.textContent='session: '+d.session+' \\u00B7 '+vis.length+' agents';
    // stats — update text only
    var stats=document.getElementById('stats');
    if(stats.childNodes.length===0){
      [{k:'total',l:'Total',g:false},{k:'working',l:'Working',g:true},{k:'idle',l:'Idle',g:false}].forEach(function(x){
        var div=document.createElement('div'); div.className='stat';
        var n=document.createElement('div'); n.className='stat-num'+(x.g?' green':''); n.id='sn-'+x.k;
        var lb=document.createElement('div'); lb.className='stat-label'; lb.textContent=x.l;
        div.appendChild(n); div.appendChild(lb); stats.appendChild(div);
      });
    }
    var st=document.getElementById('sn-total'); if(st) st.textContent=vis.length;
    var sw=document.getElementById('sn-working'); if(sw) sw.textContent=wk;
    var si2=document.getElementById('sn-idle'); if(si2) si2.textContent=id;
    // agent cards — create once, update output/badge only
    d.agents.forEach(function(a) {
      if(!document.getElementById('c-'+a.name)) mkCard(a);
      var card=document.getElementById('c-'+a.name);
      card.className='card '+a.status+(expandedCards[a.name]?' expanded':'');
      var bg=document.getElementById('b-'+a.name);
      if(bg){bg.textContent=a.status; bg.className='badge '+a.status;}
      // only update output if user is NOT typing in this card
      var mi=document.getElementById('msg-'+a.name);
      if(!mi || document.activeElement!==mi){
        var out=document.getElementById('o-'+a.name);
        if(out) out.textContent=a.lastLines.join('\\n');
      }
      var sf=document.getElementById('s-'+a.name);
      if(sf){
        if(a.statusFile){sf.textContent=a.statusFile.slice(0,200);sf.style.display='';}
        else sf.style.display='none';
      }
    });
    // sidebar files — skip if file preview is open
    if(!fpOpen){
      var fw=document.getElementById('fw');
      if(fw){
        fw.textContent='';
        Object.keys(d.files).forEach(function(dir){
          var h3=document.createElement('h3'); h3.textContent=dir+'/'; fw.appendChild(h3);
          var ul=document.createElement('ul'); ul.className='flist';
          if(d.files[dir].length){
            d.files[dir].forEach(function(f){
              var li=document.createElement('li'); li.textContent=f;
              li.addEventListener('click',(function(dd,ff){return function(){openFile(dd,ff);};})(dir,f));
              ul.appendChild(li);
            });
          } else { var li=document.createElement('li'); li.textContent='empty'; li.style.color='#333'; ul.appendChild(li); }
          fw.appendChild(ul);
        });
      }
    }
    // keep file preview if open
    var fp=document.getElementById('fp');
    if(fp && fpOpen){ fp.style.display='block'; fp.textContent=fpContent; }
    // pulse
    var pu=document.getElementById('pulse');
    if(pu){pu.classList.add('on');setTimeout(function(){pu.classList.remove('on');},500);}
  });
}

function smsg(agent){
  var inp=document.getElementById('msg-'+agent);
  if(!inp||!inp.value.trim()) return;
  sendCmd(agent,inp.value.trim()); inp.value='';
}
function bsend(){
  var inp=document.getElementById('msg-broadcast');
  if(!inp||!inp.value.trim()) return;
  sendCmd('admin',inp.value.trim()); inp.value='';
}
function openFile(dir,file){
  fpOpen=true;
  getFile(dir,file).then(function(d){
    fpContent=d.content||'(empty)';
    var fp=document.getElementById('fp');
    if(fp){fp.style.display='block'; fp.textContent=fpContent;}
  });
}
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'&&fpOpen){
    fpOpen=false; fpContent='';
    var fp=document.getElementById('fp'); if(fp) fp.style.display='none';
  }
});

refresh();
setInterval(refresh,3000);
`;

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Claude Swarm Command Center</title>
<style>${CSS}</style>
</head>
<body>
<div id="app"></div>
<script>${JS}</script>
</body>
</html>`;

const server = http.createServer(function(req, res) {
  var url = new URL(req.url, 'http://localhost:' + PORT);

  if (url.pathname === '/' || url.pathname === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(HTML);
    return;
  }

  if (url.pathname === '/api/status') {
    var session = getSession();
    if (!session) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ session: null, agents: [], files: {} }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ session: session, agents: getAgents(session), files: getSharedFiles() }));
    return;
  }

  if (url.pathname === '/api/send' && req.method === 'POST') {
    var body = '';
    req.on('data', function(chunk) { body += chunk; });
    req.on('end', function() {
      try {
        var parsed = JSON.parse(body);
        var agent = parsed.agent;
        var message = parsed.message;
        var session = getSession();
        if (!session || !agent || !message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'missing fields' }));
          return;
        }
        if (!/^[a-zA-Z0-9_-]+$/.test(agent)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'invalid agent name' }));
          return;
        }
        run('tmux', ['send-keys', '-t', session + ':' + agent, message]);
        setTimeout(function() {
          run('tmux', ['send-keys', '-t', session + ':' + agent, 'Enter']);
        }, 100);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'failed' }));
      }
    });
    return;
  }

  if (url.pathname === '/api/file') {
    var dir = url.searchParams.get('dir');
    var file = url.searchParams.get('file');
    if (!dir || !file) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'missing params' }));
      return;
    }
    var content = readSharedFile(dir, file);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ content: content }));
    return;
  }

  res.writeHead(404);
  res.end('not found');
});

server.listen(PORT, function() {
  console.log('');
  console.log('  Claude Swarm Command Center');
  console.log('  http://localhost:' + PORT);
  console.log('');
  console.log('  Auto-detects tmux swarm sessions.');
  console.log('  Refreshes every 3 seconds.');
  console.log('  Inputs preserved during refresh.');
  console.log('  Press Escape to close file preview.');
  console.log('');
});
