import React, { useEffect, useRef, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

type Token = { text: string; color?: string };
type Line = { indent: number; tokens: Token[] };

const COLORS = {
  keyword: '#ff79c6',
  variable: '#bd93f9',
  property: '#8be9fd',
  string: '#f1fa8c',
  fn: '#50fa7b',
  punct: '#f8f8f2',
  comment: '#6272a4',
};

const lines: Line[] = [
  { indent: 0, tokens: [{ text: '// developer.ts', color: COLORS.comment }] },
  {
    indent: 0,
    tokens: [
      { text: 'const ', color: COLORS.keyword },
      { text: 'developer', color: COLORS.variable },
      { text: ' = {', color: COLORS.punct },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: 'name', color: COLORS.property },
      { text: ': ', color: COLORS.punct },
      { text: "'Nay Oo Lwin'", color: COLORS.string },
      { text: ',', color: COLORS.punct },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: 'role', color: COLORS.property },
      { text: ': ', color: COLORS.punct },
      { text: "'Software Developer'", color: COLORS.string },
      { text: ',', color: COLORS.punct },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: 'skills', color: COLORS.property },
      { text: ': [', color: COLORS.punct },
      { text: "'TypeScript'", color: COLORS.string },
      { text: ', ', color: COLORS.punct },
      { text: "'React'", color: COLORS.string },
      { text: ', ', color: COLORS.punct },
      { text: "'Next.js'", color: COLORS.string },
      { text: ', ', color: COLORS.punct },
      { text: "'Node.js'", color: COLORS.string },
      { text: ',', color: COLORS.punct },
    ],
  },
  {
    indent: 2,
    tokens: [
      { text: "'Python'", color: COLORS.string },
      { text: ', ', color: COLORS.punct },
      { text: "'Go'", color: COLORS.string },
      { text: ', ', color: COLORS.punct },
      { text: "'PHP'", color: COLORS.string },
      { text: '],', color: COLORS.punct },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: 'build', color: COLORS.fn },
      { text: '() {', color: COLORS.punct },
    ],
  },
  {
    indent: 2,
    tokens: [
      { text: 'return ', color: COLORS.keyword },
      { text: "'Clean, scalable, accessible code'", color: COLORS.string },
      { text: ';', color: COLORS.punct },
    ],
  },
  { indent: 1, tokens: [{ text: '},', color: COLORS.punct }] },
  { indent: 0, tokens: [{ text: '};', color: COLORS.punct }] },
];

const TYPING_SPEED = 14;
const LINE_PAUSE = 80;

const CodeEditor: React.FC = () => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const [lineIdx, setLineIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (lineIdx >= lines.length) {
      setDone(true);
      return;
    }
    const lineText = lines[lineIdx].tokens.map((t) => t.text).join('');
    if (charCount < lineText.length) {
      timer.current = setTimeout(() => setCharCount((c) => c + 1), TYPING_SPEED);
    } else {
      timer.current = setTimeout(() => {
        setLineIdx((i) => i + 1);
        setCharCount(0);
      }, LINE_PAUSE);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [lineIdx, charCount]);

  const renderLine = (line: Line, isCurrent: boolean) => {
    let remaining = isCurrent ? charCount : Number.MAX_SAFE_INTEGER;
    const out: React.ReactNode[] = [];
    line.tokens.forEach((tok, i) => {
      if (remaining <= 0) return;
      const slice = tok.text.slice(0, remaining);
      remaining -= slice.length;
      out.push(
        <span key={i} style={{ color: tok.color }}>
          {slice}
        </span>
      );
    });
    return out;
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      sx={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: isLight ? 'rgba(30, 30, 30, 0.97)' : 'rgba(20, 20, 24, 0.92)',
        boxShadow: isLight
          ? '0 20px 60px rgba(94, 53, 177, 0.25), 0 4px 12px rgba(0,0,0,0.1)'
          : '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.06)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Title bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          px: 2,
          py: 1.25,
          backgroundColor: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          <Box sx={dot('#ff5f57')} />
          <Box sx={dot('#ffbd2e')} />
          <Box sx={dot('#28ca41')} />
        </Box>
        <Box
          sx={{
            ml: 1.5,
            px: 1.25,
            py: 0.25,
            borderRadius: '6px',
            backgroundColor: 'rgba(255,255,255,0.06)',
            color: 'rgba(248,248,242,0.85)',
            fontFamily: 'monospace',
            fontSize: '0.78rem',
            letterSpacing: '0.02em',
          }}
        >
          developer.ts
        </Box>
      </Box>

      {/* Code body */}
      <Box
        sx={{
          fontFamily: 'monospace',
          fontSize: '0.92rem',
          lineHeight: 1.65,
          color: '#f8f8f2',
          p: 2.5,
          pl: 1,
          minHeight: 320,
        }}
      >
        {lines.map((line, i) => {
          const visible = i < lineIdx || (i === lineIdx && charCount > 0) || done;
          if (!visible) return null;
          const isCurrent = i === lineIdx && !done;
          return (
            <Box key={i} sx={{ display: 'flex', whiteSpace: 'pre' }}>
              <Box
                sx={{
                  width: 32,
                  textAlign: 'right',
                  pr: 1.25,
                  color: 'rgba(248,248,242,0.25)',
                  userSelect: 'none',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {i + 1}
              </Box>
              <Box component="span">
                {'  '.repeat(line.indent)}
                {renderLine(line, isCurrent)}
                {isCurrent && <BlinkingCursor />}
              </Box>
            </Box>
          );
        })}
        {done && (
          <Box sx={{ display: 'flex', whiteSpace: 'pre', mt: 0.5 }}>
            <Box sx={{ width: 32, pr: 1.25 }} />
            <Box component="span" sx={{ color: COLORS.comment }}>
              {'> '}
              <Box component="span" sx={{ color: '#50fa7b' }}>ready</Box>
              <BlinkingCursor />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const dot = (color: string) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: color,
});

const BlinkingCursor: React.FC = () => (
  <Box
    component={motion.span}
    animate={{ opacity: [1, 1, 0, 0] }}
    transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
    sx={{
      display: 'inline-block',
      width: '8px',
      height: '1em',
      backgroundColor: '#bd93f9',
      verticalAlign: 'text-bottom',
      ml: '2px',
    }}
  />
);

export default CodeEditor;
