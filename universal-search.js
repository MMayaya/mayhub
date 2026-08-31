(function (global) {
  'use strict';

  const FILTER_ALL = 'All';
  const MAX_RESULTS = 24;
  const synonymGroups = [
    ['activity', 'activities', 'worksheet', 'task'],
    ['answer', 'answers', 'memo', 'memorandum', 'marking guideline'],
    ['assessment', 'exam', 'test', 'question paper'],
    ['document', 'pdf', 'download'],
    ['game', 'games', 'quiz', 'practice', 'challenge'],
    ['guide', 'guides', 'learning guide', 'study guide'],
    ['history', 'social sciences'],
    ['lesson', 'notes', 'presentation', 'slides'],
    ['migration', 'movement'],
    ['rural urban', 'rural-urban', 'urbanisation'],
    ['support', 'downloads', 'app']
  ];

  function normalise(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function words(value) {
    return normalise(value).split(' ').filter(Boolean);
  }

  function editDistanceAtMostOne(left, right) {
    if (left === right) return true;
    if (Math.abs(left.length - right.length) > 1) return false;

    let changes = 0;
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] === right[rightIndex]) {
        leftIndex += 1;
        rightIndex += 1;
        continue;
      }

      changes += 1;
      if (changes > 1) return false;
      if (left.length > right.length) leftIndex += 1;
      else if (right.length > left.length) rightIndex += 1;
      else {
        leftIndex += 1;
        rightIndex += 1;
      }
    }

    if (leftIndex < left.length || rightIndex < right.length) changes += 1;
    return changes <= 1;
  }

  function variantsFor(token) {
    const variants = new Set([token]);
    synonymGroups.forEach(group => {
      const normalisedGroup = group.map(normalise);
      if (normalisedGroup.some(item => item === token || item.split(' ').includes(token))) {
        normalisedGroup.forEach(item => {
          variants.add(item);
          item.split(' ').forEach(part => variants.add(part));
        });
      }
    });
    return [...variants];
  }

  function normaliseEntry(entry, fallbackIndex) {
    const title = entry.title || entry.label || 'May Learning Hub resource';
    const category = entry.category || (
      /presentation|notes/i.test(entry.type || '') ? 'Notes'
        : /game/i.test(entry.type || '') ? 'Games'
          : /activit/i.test(entry.type || '') ? 'Activities'
            : /guide/i.test(entry.type || '') ? 'Guides'
              : /document|paper|memo|pdf/i.test(entry.type || '') ? 'Documents'
                : 'Pages'
    );
    const searchable = [
      title,
      entry.keywords,
      entry.description,
      entry.subject,
      entry.topic,
      entry.type,
      category,
      entry.grade ? `grade ${entry.grade}` : '',
      entry.term ? `term ${entry.term}` : ''
    ].filter(Boolean).join(' ');

    return {
      id: entry.id || `fallback-${fallbackIndex}`,
      title,
      href: entry.href || '#',
      subject: entry.subject || 'May Learning Hub',
      grade: entry.grade || null,
      term: entry.term || null,
      category,
      type: entry.type || category,
      topic: entry.topic || '',
      description: entry.description || '',
      _normalTitle: normalise(title),
      _normalTopic: normalise(entry.topic || ''),
      _normalMeta: normalise([
        entry.subject,
        entry.type,
        category,
        entry.grade ? `grade ${entry.grade}` : '',
        entry.term ? `term ${entry.term}` : ''
      ].filter(Boolean).join(' ')),
      _normalSearchable: normalise(searchable),
      _words: words(searchable)
    };
  }

  function tokenMatch(entry, token) {
    const variants = variantsFor(token);
    for (const variant of variants) {
      if (entry._normalSearchable.includes(variant)) return { matched: true, fuzzy: false, variant };
    }

    if (token.length < 5) return { matched: false, fuzzy: false, variant: token };
    const fuzzyWord = entry._words.find(candidate => candidate.length >= 4 && editDistanceAtMostOne(token, candidate));
    return { matched: Boolean(fuzzyWord), fuzzy: Boolean(fuzzyWord), variant: fuzzyWord || token };
  }

  function scoreEntry(entry, query, selectedFilter) {
    if (selectedFilter !== FILTER_ALL && entry.category !== selectedFilter) return -1;
    const phrase = normalise(query);
    const queryTokens = [...new Set(words(query))];
    if (!phrase || queryTokens.length === 0) return -1;

    let score = 0;
    if (entry._normalTitle === phrase) score += 240;
    else if (entry._normalTitle.startsWith(phrase)) score += 150;
    else if (entry._normalTitle.includes(phrase)) score += 115;
    if (entry._normalTopic === phrase) score += 160;
    else if (entry._normalTopic.includes(phrase)) score += 90;
    if (entry._normalMeta.includes(phrase)) score += 55;

    for (const token of queryTokens) {
      const match = tokenMatch(entry, token);
      if (!match.matched) return -1;
      if (entry._normalTitle.split(' ').includes(token)) score += 48;
      else if (entry._normalTitle.includes(token)) score += 32;
      else if (entry._normalTopic.includes(token)) score += 26;
      else if (entry._normalMeta.includes(token)) score += 20;
      else score += match.fuzzy ? 7 : 12;

      if (/^\d+$/.test(token)) {
        if (Number(token) === entry.grade) score += 34;
        if (Number(token) === entry.term) score += 18;
      }
    }

    if (/^(?:assessment game|games page|activities page|presentation|learning guide|exam paper|memorandum)$/i.test(entry.type)) {
      score += 28;
    }
    if (/game zone|learning hub|assessment games/i.test(entry.title)) score += 14;
    if (entry.category === 'Notes') score += 4;
    return score;
  }

  function buildCatalogue(fallbackItems) {
    const source = [
      ...(Array.isArray(global.MAY_UNIVERSAL_SEARCH_INDEX) ? global.MAY_UNIVERSAL_SEARCH_INDEX : []),
      ...(Array.isArray(fallbackItems) ? fallbackItems : [])
    ];
    const seen = new Set();
    return source
      .map(normaliseEntry)
      .filter(entry => {
        const key = String(entry.href || '').toLowerCase();
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  function search(query, catalogue, selectedFilter = FILTER_ALL) {
    return catalogue
      .map(entry => ({ entry, score: scoreEntry(entry, query, selectedFilter) }))
      .filter(result => result.score >= 0)
      .sort((left, right) => right.score - left.score
        || left.entry.title.localeCompare(right.entry.title, 'en', { sensitivity: 'base' }))
      .map(result => result.entry);
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function resultMeta(entry) {
    return [
      entry.subject && entry.subject !== 'May Learning Hub' ? entry.subject : '',
      entry.grade ? `Grade ${entry.grade}` : '',
      entry.term ? `Term ${entry.term}` : '',
      entry.type
    ].filter(Boolean).join(' • ');
  }

  function mount(options) {
    const input = options && options.input;
    const results = options && options.results;
    const list = options && options.list;
    const filters = options && options.filters;
    const status = options && options.status;
    if (!input || !results || !list || input.dataset.universalSearchMounted === 'true') return null;

    input.dataset.universalSearchMounted = 'true';
    const catalogue = buildCatalogue(options.fallbackItems);
    let selectedFilter = FILTER_ALL;

    function setStatus(message) {
      if (status) status.textContent = message;
    }

    function closeResults() {
      results.classList.remove('active');
      list.innerHTML = '';
      input.setAttribute('aria-expanded', 'false');
      setStatus(`${catalogue.length} learning resources are ready to search.`);
    }

    function render() {
      const query = input.value.trim();
      if (!query) {
        closeResults();
        return;
      }

      const matches = search(query, catalogue, selectedFilter);
      results.classList.add('active');
      input.setAttribute('aria-expanded', 'true');

      if (matches.length === 0) {
        list.innerHTML = `
          <li class="search-empty-state">
            <strong>No learning resources matched “${escapeHtml(query)}”.</strong>
            <span>Try a topic, subject, grade, term, presentation, game, activity, paper or memorandum.</span>
          </li>`;
        setStatus(`No results in ${selectedFilter === FILTER_ALL ? 'all resources' : selectedFilter}.`);
        return;
      }

      const visibleMatches = matches.slice(0, MAX_RESULTS);
      list.innerHTML = visibleMatches.map(entry => `
        <li>
          <a href="${escapeHtml(entry.href)}" class="universal-search-result">
            <span class="search-result-topline">
              <span class="search-result-category search-result-category-${escapeHtml(entry.category.toLowerCase())}">${escapeHtml(entry.category)}</span>
              ${entry.topic ? `<span class="search-result-topic">${escapeHtml(entry.topic)}</span>` : ''}
            </span>
            <strong class="search-result-title">${escapeHtml(entry.title)}</strong>
            <span class="result-meta">${escapeHtml(resultMeta(entry))}</span>
          </a>
        </li>`).join('');
      setStatus(`${matches.length} result${matches.length === 1 ? '' : 's'} found${matches.length > MAX_RESULTS ? ` · showing the best ${MAX_RESULTS}` : ''}.`);
    }

    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-controls', list.id || 'searchResultsList');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'false');
    input.addEventListener('input', render);
    input.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        input.value = '';
        closeResults();
      }
      if (event.key === 'ArrowDown') {
        const firstLink = list.querySelector('a');
        if (firstLink) {
          event.preventDefault();
          firstLink.focus();
        }
      }
    });

    list.addEventListener('keydown', event => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      const links = [...list.querySelectorAll('a')];
      const currentIndex = links.indexOf(document.activeElement);
      if (currentIndex < 0) return;
      event.preventDefault();
      const nextIndex = event.key === 'ArrowDown'
        ? Math.min(links.length - 1, currentIndex + 1)
        : Math.max(0, currentIndex - 1);
      links[nextIndex].focus();
    });

    if (filters) {
      filters.addEventListener('click', event => {
        const button = event.target.closest('[data-search-filter]');
        if (!button) return;
        selectedFilter = button.dataset.searchFilter || FILTER_ALL;
        filters.querySelectorAll('[data-search-filter]').forEach(filterButton => {
          const active = filterButton === button;
          filterButton.classList.toggle('active', active);
          filterButton.setAttribute('aria-pressed', String(active));
        });
        render();
        input.focus();
      });
    }

    setStatus(`${catalogue.length} learning resources are ready to search.`);
    return { catalogue, search: query => search(query, catalogue, selectedFilter), render };
  }

  global.MayUniversalSearch = Object.freeze({ buildCatalogue, mount, search });
}(window));
