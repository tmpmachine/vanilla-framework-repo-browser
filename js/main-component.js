let compoMain = (function() {
  
  // # self
  let SELF = {
    Init,
    GetCDN,
    Download,
  };

  // # local
  let local = {
    
  };
  
  let $ = document.querySelector.bind(document);
  let $$ = document.querySelectorAll.bind(document);
  let baseCDN = 'https://cdn.jsdelivr.net/gh/tmpmachine/vanilla-framework@latest/{0}'  
  let baseRaw = 'https://raw.githubusercontent.com/tmpmachine/vanilla-framework/main/{0}'  
  let baseBlob = 'https://github.com/tmpmachine/vanilla-framework/blob/main/{0}';  
  let baseScript = '<script src="{0}"><\/script>'  
  
  // # function
  
  function Init() {
    initTree();
  }
  

  function GetCDN() {
    let value = Array.from($$('._wgTree input')).filter(e => e.checked).map(e => {
      let val = e.value;
      
      if ($('._inIsMinified').checked) {
        val = val.replace('.js', '.min.js'); 
      }
      
      val = baseCDN.replace('{0}', val)
      
      
      if (!$('._isArrayFormat').checked && $('._inIsScript').checked) {
        val = baseScript.replace('{0}', val); 
      }
      
      return val;
    });
    
    let values = value;
    
    if ($('._isArrayFormat').checked) {
      values = JSON.stringify(values, null, 4)
    } else {
      values = value.join('\n')
    }
    
    $('._cdn').value = values;
  }

  function Download() {
    console.log(1)
  }
  
  // 
  function initTree() {
      tree = tree.map(e => {
        let {type, path} = e;
        let paths = path.split('/');
        let name = paths.pop(); // remove last slug (file/dir name);
        let dirPath = paths.join('/')
        
        return {
          type,
          path,
          name,
          dirPath,
        }
      })
      
      tree.sort((a, b) => {
        if (a.type == b.type) {
          return a.name.localeCompare(b.name)
        }
        return a.type == 'tree' ? -1 : 1
      });
      
      
      // # build
      for (let item of tree) {
        let {type, path, name, dirPath} = item;
        let paths = path.split('/');
        
        if (type == 'tree') {
          
          let node = $('._itemTree').content.cloneNode(true);
          let slots = DOMSlots(node);
          
          slots.name.textContent = name + '/';
          slots.ul.dataset.path = path;
          
          let parentNode = $(`._wgTree [data-path="${dirPath}"]`) ?? $('._wgTree');
          parentNode?.append(node);
          
        } else if (type =='blob') {
          
          if (name.endsWith('.md')) continue;
          
          let node = $('._itemBlob').content.cloneNode(true);
          let slots = DOMSlots(node);
          let mdLink = tree.find(e => e.dirPath == dirPath && e.name == name.replace(/\.js|\.css/, '.md'))
          
          slots.name.textContent = name;
          slots.input.value = path;
          slots.cdn.href = baseCDN.replace('{0}', path);
          slots.raw.href = baseRaw.replace('{0}', path);
          slots.blob.href = baseBlob.replace('{0}', path);
          
          if (mdLink) {
            slots.md.href = baseBlob.replace('{0}', mdLink.path);
          } else {
            slots.md.remove();
          }
          
          let parentNode = $(`._wgTree [data-path="${dirPath}"]`) ?? $('._wgTree');
          parentNode?.append(node);
          
        }
      }
    }
  
  return SELF;
  
})();