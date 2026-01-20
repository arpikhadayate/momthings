/* Boilerplate drag-and-drop family-match widget
   Pointer Events (touch + mobile-friendly) drag support.
   Updated: clearer SVG illustrations for first-graders to count visible edges & vertices.
   Configure columns and families below.
*/

(() => {
  // Columns configuration: key must match properties in families objects
  const columns = [
    { key: 'image', title: 'Shape', type: 'image' },
    { key: 'vertices', title: 'Vertices', type: 'number' },
    { key: 'edges', title: 'Edges', type: 'number' },
    { key: 'property', title: 'Property', type: 'text', editable: false }
  ];

  // Families data. Each object must include `id` and values for each column key.
  // Images are friendly, bold SVG wireframes with visible vertex dots to make counting easy.
  const families = [
    {
      id: 'cube',
      image: inlineSvgDataURI(
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120" role="img" aria-label="Cube">
  <defs>
    <style>
      .e{stroke:#2b7aee;stroke-width:3;stroke-linejoin:round;stroke-linecap:round;fill:none}
      .v{fill:#ff6b6b;stroke:none}
    </style>
  </defs>
  <!-- back square -->
  <rect x="48" y="18" width="44" height="44" class="e" rx="2"/>
  <!-- front square -->
  <rect x="24" y="44" width="44" height="44" class="e" rx="2"/>
  <!-- connecting edges -->
  <path class="e" d="M24 44 L48 18 M68 44 L92 18 M24 88 L48 62 M68 88 L92 62"/>
  <!-- vertices (8 dots) -->
  <circle class="v" cx="48" cy="18" r="3.6"/>
  <circle class="v" cx="92" cy="18" r="3.6"/>
  <circle class="v" cx="48" cy="62" r="3.6"/>
  <circle class="v" cx="92" cy="62" r="3.6"/>
  <circle class="v" cx="24" cy="44" r="3.6"/>
  <circle class="v" cx="68" cy="44" r="3.6"/>
  <circle class="v" cx="24" cy="88" r="3.6"/>
  <circle class="v" cx="68" cy="88" r="3.6"/>
</svg>`
      ),
      vertices: '8',
      edges: '12',
      property: 'All faces are squares'
    },
    {
      id: 'tetrahedron',
      image: inlineSvgDataURI(
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120" role="img" aria-label="Tetrahedron">
  <defs>
    <style>
      .e{stroke:#2b7aee;stroke-width:3;stroke-linejoin:round;stroke-linecap:round;fill:none}
      .v{fill:#ff6b6b;stroke:none}
    </style>
  </defs>
  <!-- base triangle -->
  <path class="e" d="M28 86 L92 86 L60 34 Z"/>
  <!-- internal edges (to top vertex) — here top is the same as the peak, so connect -->
  <!-- vertices (4 dots) -->
  <circle class="v" cx="28" cy="86" r="4.2"/>
  <circle class="v" cx="92" cy="86" r="4.2"/>
  <circle class="v" cx="60" cy="34" r="4.2"/>
  <!-- to make the 4th vertex obvious, we show a small inner point slightly forward to imply depth -->
  <!-- draw the center-top apex as a distinct dot and connect to the base corners -->
  <circle class="v" cx="60" cy="18" r="4.2"/>
  <path class="e" d="M60 18 L28 86 M60 18 L92 86 M60 18 L60 34"/>
</svg>`
      ),
      vertices: '4',
      edges: '6',
      property: '4 triangular faces'
    },
    {
      id: 'octahedron',
      image: inlineSvgDataURI(
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120" role="img" aria-label="Octahedron">
  <defs>
    <style>
      .e{stroke:#2b7aee;stroke-width:3;stroke-linejoin:round;stroke-linecap:round;fill:none}
      .v{fill:#ff6b6b;stroke:none}
    </style>
  </defs>

  <!-- Top point -->
  <circle class="v" cx="60" cy="12" r="3.8"/>
  <!-- Upper ring (4 equatorial vertices) -->
  <circle class="v" cx="36" cy="44" r="3.8"/>
  <circle class="v" cx="84" cy="44" r="3.8"/>
  <circle class="v" cx="36" cy="76" r="3.8"/>
  <circle class="v" cx="84" cy="76" r="3.8"/>
  <!-- Bottom point -->
  <circle class="v" cx="60" cy="108" r="3.8"/>

  <!-- edges: top to equator -->
  <path class="e" d="M60 12 L36 44 M60 12 L84 44 M60 12 L36 76 M60 12 L84 76"/>
  <!-- edges: bottom to equator -->
  <path class="e" d="M60 108 L36 44 M60 108 L84 44 M60 108 L36 76 M60 108 L84 76"/>
  <!-- equator band (connect equatorial vertices to emphasize shape) -->
  <path class="e" d="M36 44 L84 44 L84 76 L36 76 L36 44" />
</svg>`
      ),
      vertices: '6',
      edges: '12',
      property: '8 triangular faces'
    }
  ];

  // Utility: create inline svg data URI for placeholders
  function inlineSvgDataURI(svgString){
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svgString);
  }

  // Shuffle in-place
  function shuffle(array){
    for (let i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Build column-wise items from families: for each column we create an array of items
  function buildColumnItems(){
    return columns.map(col => families.map(family => {
      return {
        uid: `${family.id}-${col.key}`, // unique id for element
        familyId: family.id,
        value: family[col.key],
        colKey: col.key
      };
    }));
  }

  // State: columnsData is array per column (array of items)
  let columnsData = buildColumnItems();

  // Shuffle each column independently
  function shuffleColumns(){
    columnsData = buildColumnItems(); // rebuild then shuffle
    columnsData.forEach(colArr => shuffle(colArr));
  }

  // DOM references
  const columnsRoot = document.getElementById('columns');
  const shuffleBtn = document.getElementById('shuffleBtn');
  const checkBtn = document.getElementById('checkBtn');
  const statusEl = document.getElementById('status');

  // Feature detect Pointer Events
  const HAS_POINTER = window.PointerEvent !== undefined;

  // Render function (calls syncRowHeights at the end)
  function render(){
    columnsRoot.innerHTML = '';
    // Create columns
    columns.forEach((colDef, colIndex) => {
      const col = document.createElement('section');
      col.className = 'column';
      col.dataset.colIndex = String(colIndex);

      const header = document.createElement('div');
      header.className = 'col-header';
      header.textContent = colDef.title;
      col.appendChild(header);

      const list = document.createElement('ul');
      list.className = 'list';
      list.dataset.colIndex = String(colIndex);
      list.setAttribute('aria-label', colDef.title);
      list.setAttribute('role', 'list');

      // Render items for this column
      const items = columnsData[colIndex];
      items.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'cell';
        // If Pointer Events are used, we'll handle dragging ourselves; disable native draggable
        li.draggable = !HAS_POINTER;
        li.dataset.uid = item.uid;
        li.dataset.familyId = item.familyId;
        li.dataset.colIndex = String(colIndex);
        li.dataset.index = String(index);

        // accessible name
        li.setAttribute('role','listitem');
        li.setAttribute('tabindex','0');

        // content by column type
        if (colDef.type === 'image') {
          const img = document.createElement('img');
          img.src = item.value;
          img.alt = `${item.familyId} ${colDef.title}`;
          li.appendChild(img);
          const label = document.createElement('div');
          label.textContent = item.familyId;
          label.style.fontSize = '.9rem';
          label.style.color = 'var(--muted)';
          li.appendChild(label);
        } else if (colDef.type === 'number') {
          const num = document.createElement('div');
          num.textContent = String(item.value);
          num.style.fontWeight = '600';
          li.appendChild(num);
        } else if (colDef.type === 'text') {
          const input = document.createElement('input');
          input.type = 'text';
          input.value = String(item.value);
          input.disabled = colDef.editable === false;
          input.style.width = '100%';
          input.style.border = 'none';
          input.style.background = 'transparent';
          input.style.fontSize = '0.95rem';
          li.appendChild(input);
        } else {
          li.textContent = String(item.value);
        }

        // attach event handlers depending on capability
        if (HAS_POINTER) {
          // pointer-based (touch & pointer devices)
          li.addEventListener('pointerdown', handlePointerDown);
        } else {
          // fallback to native HTML5 DnD for non-pointer environments
          li.addEventListener('dragstart', handleDragStart);
          li.addEventListener('dragend', handleDragEnd);

          // make individual list items droppable for precise location
          li.addEventListener('dragover', handleDragOverOnItem);
          li.addEventListener('drop', handleDropOnItem);
        }

        list.appendChild(li);
      });

      // Column-level drop area (drop at end)
      if (!HAS_POINTER) {
        list.addEventListener('dragover', handleDragOverOnList);
        list.addEventListener('drop', handleDropOnList);
      }

      col.appendChild(list);
      columnsRoot.appendChild(col);
    });

    // Clear status when rendering
    statusEl.textContent = '';

    // Ensure rows across columns have equal heights
    // Call after the DOM is in place and styles applied (use requestAnimationFrame)
    requestAnimationFrame(syncRowHeights);
  }

  //
  // --- Existing HTML5 DnD handlers (kept for non-pointer fallback) ---
  //
  let draggingUid = null;
  let draggingSource = { colIndex: null, index: null };
  let placeholder = null;

  function handleDragStart(e){
    const li = e.currentTarget;
    draggingUid = li.dataset.uid;
    const colIndex = Number(li.dataset.colIndex);
    const index = Number(li.dataset.index);
    draggingSource = { colIndex, index };

    e.dataTransfer.setData('text/plain', draggingUid);
    li.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragEnd(e){
    const el = e.currentTarget;
    el.classList.remove('dragging');
    cleanupPlaceholder();
    draggingUid = null;
    draggingSource = { colIndex: null, index: null };
    render();
  }

  function handleDragOverOnList(e){
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const list = e.currentTarget;
    cleanupPlaceholder();
    placeholder = document.createElement('div');
    placeholder.className = 'placeholder';
    list.appendChild(placeholder);
  }

  function handleDropOnList(e){
    e.preventDefault();
    const list = e.currentTarget;
    const targetColIndex = Number(list.dataset.colIndex);
    const uid = e.dataTransfer.getData('text/plain');
    if (!uid) return;
    moveItem(uid, targetColIndex, null);
    cleanupPlaceholder();
    render();
  }

  function handleDragOverOnItem(e){
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const target = e.currentTarget;
    const list = target.parentElement;
    const rect = target.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    cleanupPlaceholder();
    placeholder = document.createElement('div');
    placeholder.className = 'placeholder';
    const insertBefore = offsetY < rect.height / 2;
    if (insertBefore) {
      list.insertBefore(placeholder, target);
      placeholder.dataset.insert = 'before';
    } else {
      if (target.nextSibling) list.insertBefore(placeholder, target.nextSibling);
      else list.appendChild(placeholder);
      placeholder.dataset.insert = 'after';
    }
  }

  function handleDropOnItem(e){
    e.preventDefault();
    const target = e.currentTarget;
    const list = target.parentElement;
    const targetColIndex = Number(list.dataset.colIndex);
    const uid = e.dataTransfer.getData('text/plain');
    if (!uid) return;

    let insertIndex = null;
    if (placeholder && placeholder.parentElement === list) {
      const nodes = Array.from(list.children);
      insertIndex = nodes.indexOf(placeholder);
    } else {
      insertIndex = Number(target.dataset.index);
    }

    moveItem(uid, targetColIndex, insertIndex);
    cleanupPlaceholder();
    render();
  }

  function cleanupPlaceholder(){
    if (placeholder && placeholder.parentElement) placeholder.parentElement.removeChild(placeholder);
    placeholder = null;
  }

  //
  // --- Pointer-based drag support (touch-friendly) ---
  //
  let pointerState = {
    active: false,
    startX: 0,
    startY: 0,
    uid: null,
    sourceCol: null,
    sourceIndex: null,
    ghost: null,
    initialElement: null,
    currentTargetList: null,
    insertIndex: null,
    pointerId: null
  };

  function handlePointerDown(e){
    // only start for primary button/touch
    if (e.button && e.button !== 0) return;
    e.preventDefault();

    const li = e.currentTarget;
    try { li.setPointerCapture && li.setPointerCapture(e.pointerId); } catch (err) { /* not critical */ }
    pointerState.pointerId = e.pointerId;
    pointerState.active = true;
    pointerState.startX = e.clientX;
    pointerState.startY = e.clientY;
    pointerState.uid = li.dataset.uid;
    pointerState.sourceCol = Number(li.dataset.colIndex);
    pointerState.sourceIndex = Number(li.dataset.index);
    pointerState.initialElement = li;

    // create ghost
    const rect = li.getBoundingClientRect();
    const ghost = li.cloneNode(true);
    ghost.classList.add('drag-ghost');
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    ghost.style.left = `${e.clientX}px`;
    ghost.style.top = `${e.clientY}px`;
    document.body.appendChild(ghost);
    pointerState.ghost = ghost;

    // add dragging visual
    li.classList.add('dragging');
    // disable text selection & page scrolling while dragging
    document.body.style.userSelect = 'none';
    document.body.style.touchAction = 'none';

    // pointermove / pointerup on window to catch events outside element
    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
  }

  function handlePointerMove(e){
    if (!pointerState.active || e.pointerId !== pointerState.pointerId) return;
    e.preventDefault();

    // update ghost position
    const ghost = pointerState.ghost;
    if (ghost) {
      ghost.style.left = `${e.clientX}px`;
      ghost.style.top = `${e.clientY}px`;
    }

    // hit-test: what's under pointer?
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el) return;

    // find closest .list ancestor
    const list = el.closest('.list');
    if (!list) {
      // not over a list: remove placeholder if any
      if (placeholder && placeholder.parentElement) placeholder.parentElement.removeChild(placeholder);
      placeholder = null;
      pointerState.currentTargetList = null;
      pointerState.insertIndex = null;
      return;
    }

    // If dragging over a different list, update state
    pointerState.currentTargetList = list;

    // compute insert index by comparing midlines of children
    const children = Array.from(list.children).filter(n => n.nodeType === 1 && !n.classList.contains('placeholder'));
    let insertAt = children.length; // default append
    for (let i = 0; i < children.length; i++) {
      const childRect = children[i].getBoundingClientRect();
      const midY = childRect.top + childRect.height / 2;
      if (e.clientY < midY) {
        insertAt = i;
        break;
      }
    }

    pointerState.insertIndex = insertAt;

    // show placeholder at computed position
    cleanupPlaceholder();
    placeholder = document.createElement('div');
    placeholder.className = 'placeholder';

    if (insertAt >= children.length) {
      list.appendChild(placeholder);
    } else {
      list.insertBefore(placeholder, children[insertAt]);
    }
  }

  function handlePointerUp(e){
    if (!pointerState.active || e.pointerId !== pointerState.pointerId) return;
    e.preventDefault();

    // finalize move if over a list
    const targetList = pointerState.currentTargetList;
    if (targetList && pointerState.uid) {
      const targetColIndex = Number(targetList.dataset.colIndex);
      const insertIndex = pointerState.insertIndex;
      moveItem(pointerState.uid, targetColIndex, insertIndex);
    }

    // cleanup
    if (pointerState.initialElement) pointerState.initialElement.classList.remove('dragging');
    if (pointerState.ghost && pointerState.ghost.parentElement) pointerState.ghost.parentElement.removeChild(pointerState.ghost);
    pointerState.ghost = null;
    pointerState.active = false;
    pointerState.uid = null;
    pointerState.sourceCol = null;
    pointerState.sourceIndex = null;
    pointerState.currentTargetList = null;
    pointerState.insertIndex = null;

    cleanupPlaceholder();

    // restore user-select and touchAction
    document.body.style.userSelect = '';
    document.body.style.touchAction = '';

    window.removeEventListener('pointermove', handlePointerMove, { passive: false });
    window.removeEventListener('pointerup', handlePointerUp);
    window.removeEventListener('pointercancel', handlePointerUp);

    // re-render to refresh indices and then sync heights via render()
    render();
  }

  //
  // Move item with uid into target column at index (if index === null -> append)
  //
  function moveItem(uid, targetColIndex, insertIndex){
    // find and remove from its source column
    for (let c = 0; c < columnsData.length; c++){
      const idx = columnsData[c].findIndex(it => it.uid === uid);
      if (idx !== -1){
        const [item] = columnsData[c].splice(idx, 1);
        if (insertIndex === null) {
          columnsData[targetColIndex].push(item);
        } else {
          // clamp insertIndex
          const clamped = Math.max(0, Math.min(insertIndex, columnsData[targetColIndex].length));
          columnsData[targetColIndex].splice(clamped, 0, item);
        }
        return;
      }
    }
  }

  // Check solution by rows: build rows by taking the item at same index from each column
  function checkSolution(){
    const rowsCount = Math.max(...columnsData.map(c => c.length));
    let correctRows = 0;
    render();

    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++){
      const familyIds = columnsData.map(col => (col[rowIndex] ? col[rowIndex].familyId : null));
      const allEqual = familyIds.every(id => id !== null && id === familyIds[0]);

      columns.forEach((_, colIndex) => {
        const list = columnsRoot.querySelector(`.list[data-col-index="${colIndex}"]`);
        const cell = list && list.children[rowIndex];
        if (cell) {
          if (allEqual) {
            cell.style.background = 'var(--success)';
          } else {
            cell.style.background = 'var(--fail)';
          }
        }
      });

      if (allEqual) correctRows++;
    }

    statusEl.textContent = `Correct rows: ${correctRows} / ${rowsCount}`;
    if (correctRows === rowsCount) {
      statusEl.textContent += ' — All matched! 🎉';
    }
  }

  // Controls
  shuffleBtn.addEventListener('click', () => {
    shuffleColumns();
    render();
  });

  checkBtn.addEventListener('click', () => {
    checkSolution();
  });

  // --- Row height synchronization ---
  function syncRowHeights() {
    // clear inline heights first so we measure natural heights
    const allCells = Array.from(document.querySelectorAll('.cell'));
    allCells.forEach(c => {
      c.style.height = '';
      c.style.minHeight = '';
    });

    const lists = Array.from(document.querySelectorAll('.list'));
    if (lists.length === 0) return;

    // determine max number of rows among columns
    const rowCount = Math.max(...lists.map(l => l.children.length));
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      // measure heights for this row index across lists
      const heights = lists.map(l => {
        const cell = l.children[rowIndex];
        return cell ? cell.getBoundingClientRect().height : 0;
      });
      const maxH = Math.max(...heights, 0);
      if (maxH > 0) {
        // apply max height to each cell in this row
        lists.forEach(l => {
          const cell = l.children[rowIndex];
          if (cell) {
            cell.style.height = `${maxH}px`;
            cell.style.minHeight = `${maxH}px`;
          }
        });
      }
    }
  }

  // debounce utility for resize handling
  function debounce(fn, wait = 120) {
    let t = null;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  // Call syncRowHeights on resize (debounced)
  const debouncedSync = debounce(() => {
    syncRowHeights();
  }, 120);
  window.addEventListener('resize', debouncedSync);

  // Initialize
  shuffleColumns();
  render();

  // Expose some functions for debugging/extension
  window.familyWidget = {
    columns, families,
    getState: () => JSON.parse(JSON.stringify(columnsData)),
    checkSolution,
    shuffleColumns,
    render,
    syncRowHeights
  };
})();
