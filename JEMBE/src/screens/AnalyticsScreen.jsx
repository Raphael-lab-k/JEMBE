import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import analyticsService from '../services/analyticsService';
import { showToast } from '../components/Toast';

const AnalyticsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');

  // fuzzy match: tokens must each match (substring or subsequence) in name/props/ts
  function fuzzyContains(text = '', token) {
    const s = String(text).toLowerCase();
    const q = token.toLowerCase();
    if (s.includes(q)) return true;
    // subsequence check
    let qi = 0;
    for (let i = 0; i < s.length && qi < q.length; i++) {
      if (s[i] === q[qi]) qi++;
    }
    return qi === q.length;
  }

  const tokens = useMemo(() => (search || '').trim().split(/\s+/).filter(Boolean), [search]);

  const filtered = useMemo(() => {
    if (!tokens.length) return events;
    return events.filter(ev => {
      const hay = ((ev.name || '') + ' ' + JSON.stringify(ev.props || {}) + ' ' + (ev.ts || '')).toLowerCase();
      return tokens.every(t => fuzzyContains(hay, t));
    });
  }, [events, tokens]);

  // compute a simple relevance score for each event given tokens
  const scored = useMemo(() => {
    if (!tokens.length) return events.map(e => ({ e, score: 0 }));
    const res = events.map(ev => {
      const name = String(ev.name || '');
      const props = JSON.stringify(ev.props || {});
      const hay = (name + ' ' + props + ' ' + (ev.ts || '')).toLowerCase();
      let score = 0;
      tokens.forEach(t => {
        const q = t.toLowerCase();
        // substring in name -> high score
        const nameIdx = name.toLowerCase().indexOf(q);
        if (nameIdx !== -1) {
          score += 200 + Math.max(0, 100 - nameIdx);
          return;
        }
        // substring in props or ts
        const idx = hay.indexOf(q);
        if (idx !== -1) {
          score += 100 + Math.max(0, 50 - idx);
          return;
        }
        // subsequence match -> partial score proportional to matched chars
        let qi = 0;
        for (let i = 0; i < hay.length && qi < q.length; i++) {
          if (hay[i] === q[qi]) qi++;
        }
        if (qi > 0) score += qi * 4;
      });
      return { e: ev, score };
    });
    res.sort((a, b) => b.score - a.score);
    return res;
  }, [events, tokens]);

  const listItems = useMemo(() => {
    if (!tokens.length) return events.map(e => ({ e, score: 0 }));
    return scored.filter(s => s.score > 0);
  }, [events, scored, tokens.length]);

  const load = async () => {
    setLoading(true);
    const ev = await analyticsService.getEvents();
    setEvents(ev.reverse());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleClear = async () => {
    const ok = await analyticsService.clearEvents();
    if (ok) {
      showToast('Analytics cleared', 'success');
      setEvents([]);
    } else {
      showToast('Failed to clear analytics', 'error');
    }
  };

  // highlight matching substrings if possible, otherwise highlight matched chars
  const highlightText = (text = '') => {
    if (!tokens.length) return <Text style={styles.props}>{text}</Text>;
    const lower = String(text).toLowerCase();
    // try to find the first token as substring and highlight all token occurrences
    let segments = [{ text: String(text), highlight: false }];
    tokens.forEach(token => {
      const t = token.toLowerCase();
      const newSegments = [];
      segments.forEach(seg => {
        if (seg.highlight) { newSegments.push(seg); return; }
        const s = seg.text;
        let idx = s.toLowerCase().indexOf(t);
        if (idx === -1) {
          newSegments.push(seg);
        } else {
          let start = 0;
          while (idx !== -1) {
            if (idx - start > 0) newSegments.push({ text: s.slice(start, idx), highlight: false });
            newSegments.push({ text: s.slice(idx, idx + t.length), highlight: true });
            start = idx + t.length;
            idx = s.toLowerCase().indexOf(t, start);
          }
          if (start < s.length) newSegments.push({ text: s.slice(start), highlight: false });
        }
      });
      segments = newSegments;
    });

    // if nothing highlighted (no substring match), fallback to char-level highlight for tokens sequential matches
    const hasHighlight = segments.some(s => s.highlight);
    if (!hasHighlight) {
      // mark characters that belong to first token sequence occurrences
      const chars = String(text).split('');
      let out = [];
      let q = tokens.join(' ');
      q = q.replace(/\s+/g, '').toLowerCase();
      let qi = 0;
      for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        if (qi < q.length && c.toLowerCase() === q[qi]) {
          out.push({ text: c, highlight: true });
          qi++;
        } else {
          out.push({ text: c, highlight: false });
        }
      }
      segments = out.reduce((acc, cur) => {
        const last = acc[acc.length - 1];
        if (!last || last.highlight !== cur.highlight) acc.push({ text: cur.text, highlight: cur.highlight });
        else last.text += cur.text;
        return acc;
      }, []);
    }

    return (
      <Text style={styles.props}>
        {segments.map((s, i) => (
          <Text key={i} style={s.highlight ? styles.match : undefined}>{s.text}</Text>
        ))}
      </Text>
    );
  };

  const renderItem = ({ item }) => {
    const event = item.e;
    return (
      <View style={styles.item}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={styles.name}>{event.name}</Text>
            <Text style={styles.ts}>{new Date(event.ts).toLocaleString()}</Text>
          </View>
          {item.score > 0 && (
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreText}>{item.score}</Text>
            </View>
          )}
        </View>
        {highlightText(JSON.stringify(event.props))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Analytics Events</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.button} onPress={load}>
            <Text style={styles.buttonText}>Refresh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { marginLeft: 10, backgroundColor: '#c62828' }]} onPress={handleClear}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
      {tokens.length > 0 && (
        <View style={styles.subHeaderRow}>
          <Text style={styles.subHeaderText}>Results are relevance-sorted for your query.</Text>
        </View>
      )}

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search events by name, props, or timestamp"
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />
        {search.length > 0 && (
          <TouchableOpacity style={styles.clearBtn} onPress={() => setSearch('')}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 24 }} size="large" color="#2d5016" />
      ) : (
        <FlatList
          data={listItems}
          keyExtractor={(item, idx) => `${item.e.ts}_${idx}`}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 12 }}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 24, color: '#666' }}>No analytics events</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  headerRow: { padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '700', color: '#2d5016' },
  button: { backgroundColor: '#2d5016', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 },
  buttonText: { color: '#fff', fontWeight: '600' },
  item: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#2d5016' },
  name: { fontWeight: '700', color: '#333' },
  ts: { color: '#777', fontSize: 12 },
  props: { color: '#444', marginTop: 8, fontSize: 12 },
  match: { backgroundColor: 'rgba(255,235,59,0.25)' },
  scoreBadge: { backgroundColor: '#e8f5e9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  scoreText: { color: '#2e7d32', fontWeight: '700' },
  subHeaderRow: { paddingHorizontal: 12, paddingBottom: 8 },
  subHeaderText: { color: '#555', fontSize: 12, fontStyle: 'italic' },
  searchRow: { paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center' },
  searchInput: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 6, borderWidth: 1, borderColor: '#ddd' },
  clearBtn: { marginLeft: 8 },
  clearText: { color: '#1976d2' },
});

export default AnalyticsScreen;
